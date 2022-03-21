/**
 * File Location: 'routes/seating-chart/[event].ts'
 */

import type uuid_T from 'uuid';
import { connectToDB } from '$utils/db';

export async function post(request) {
    // Dynamically imported
    const uuid: typeof uuid_T = await import('uuid');

    // Get the parameters and the locals from the request
    const { params, locals } = request;

    const { event } = params;
    // If the event param (which is seating-chart/new)
    if (event == 'new') {
        // If user isn't signed in, forbid from creating one
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
        const Event = mongoose.models.Events || mongoose.model('Events', EventSchema);
        const { date, title, host, details } = body;

        try {
            const event_id = uuidv4();

            const newEvent = new Event({
                event_id,
                date: new Date(date),
                title,
                host: host || locals.user.nickname,
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
        if (event == 'save') {
            const { mongoose, schemas } = await connectToDB();
            const { EventSchema } = await schemas;

            const body = JSON.parse(request.body as string);
            const { data, event_id } = body;

            const Event = mongoose.models.Events || mongoose.model('Events', EventSchema);

            const eventLookupRegX = new RegExp('-' + event_id);
            try {
                const updateEventData = await Event.findOneAndUpdate(
                    { event_id: { $regex: eventLookupRegX } },
                    { seating_chart_data: data }
                );
            } catch (e: unknown) {
                return {
                    status: 500,
                    body: {
                        message: 'Error occured while updating seating chart!',
                        error: e
                    }
                };
            }

            return {
                status: 200,
                body: {
                    message: 'Update successful!'
                }
            };
        }
        const { mongoose, schemas } = await connectToDB();
        const { EventSchema } = await schemas;

        const Event = mongoose.models.Events || mongoose.model('Events', EventSchema);

        const eventRegX = new RegExp('-' + event);

        const eventLookup = await Event.findOne({ event_id: { $regex: eventRegX } });

        if (!eventLookup)
            return {
                status: 404,
                body: {
                    message: 'Cannot find event with id of ' + event
                }
            };

        locals.seating_chart_data = eventLookup.seating_chart_data;
        locals.event_title = eventLookup.title;
        locals.createdBy = eventLookup.createdBy;

        return {
            status: 201,
            body: {
                message: 'Event found, transferring data!',
                seating_chart_data: eventLookup.seating_chart_data,
                event_title: eventLookup.title,
                createdBy: eventLookup.createdBy
            }
        };
    }
}
