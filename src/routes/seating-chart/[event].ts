/**
 * File Location: 'routes/seating-chart/[event].ts'
 */

import type uuid_T from 'uuid';
import { connectToDB } from '$utils/db';
import { get as getStore } from 'svelte/store';

export async function post(request) {
    // Dynamically imported
    const uuid: typeof uuid_T = await import('uuid');

    // Get the parameters and the locals from the request
    let { params, locals } = request;

    let { event } = params;
    // If the event param (which is seating-chart/new)
    if (event == 'new') {
        // If user isn't signed in, forbade from creating one
        if (!locals.isSignedIn)
            return {
                status: 403,
                body: {
                    message: 'Unauthorized... Only signed in user can create new events!'
                }
            };

        const content = request.body;
        const { v4: uuidv4 } = uuid;
        const { mongoose, schemas } = await connectToDB();
        const { EventSchema } = await schemas;

        const body = JSON.parse(content as string);
        const { date, title, host, details } = body;
        const Event = mongoose.models.Events || mongoose.model('Events', EventSchema);

        try {
            const event_id = uuidv4();

            const newEvent = new Event({
                event_id,
                date: new Date(date),
                title,
                host,
                details,
                createdBy: locals.user.uid,
                seating_chart_data: []
            });

            await newEvent.save((err: any) => {
                if (err)
                    throw {
                        status: 500,
                        message: 'Error saving new event data',
                        err
                    };
            });

            return {
                status: 201,
                body: {
                    message: 'Event Created',
                    event_id
                }
            };
        } catch (err) {
            return {
                status: err.status || 500,
                body: {
                    message: err.message || 'Server Error',
                    err: err || null
                }
            };
        }
    } else {
        if (event == 'save') return {};
        const { mongoose, schemas } = await connectToDB();
        const { EventSchema } = await schemas;

        const Event = mongoose.models.Events || mongoose.model('Events', EventSchema);

        let eventRegX = new RegExp('-' + event);

        let eventLookup = await Event.findOne({ event_id: { $regex: eventRegX } });

        if (!eventLookup)
            return {
                status: 404,
                body: {
                    message: 'Cannot find event with id of ' + event
                }
            };

        locals.seating_chart_data = eventLookup.seating_chart_data;

        return {
            status: 201,
            body: {
                message: 'Event found, transferring data!',
                seating_chart_data: eventLookup.seating_chart_data
            }
        };
    }
}
