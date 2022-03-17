import { connectToDB } from '$utils/db';

export async function get({ params, locals }) {
    try {
        const { mongoose, schemas } = await connectToDB();
        const { EventSchema } = await schemas;
        const Event = mongoose.models.Events || mongoose.model('Events', EventSchema);
        const eventRegX = new RegExp('-' + params.event);

        const eventLookup = await Event.findOne({ event_id: { $regex: eventRegX } });

        if (!eventLookup)
            return {
                status: 404,
                body: {
                    message: 'Cannot find event with id of ' + params.event
                }
            };

        const { event_id, title, details, host, date, createdBy } = eventLookup;
        locals.event_metadata = {
            event_id,
            title,
            details,
            host,
            date,
            createdBy
        };

        return {
            status: 201,
            body: {
                message: 'Event found, transferring data!',
                event_metadata: {
                    event_id,
                    title,
                    details,
                    host,
                    date,
                    createdBy
                }
            }
        };
    } catch (e) {
        return {
            status: e.status || 500,
            body: {
                message: e.message || 'Server Error!',
                code: e.code,
                err: e
            }
        };
    }
}

export async function post({ params, body }) {
    body = JSON.parse(body);

    try {
        const { mongoose, schemas } = await connectToDB();
        const { EventSchema } = await schemas;
        const Event = mongoose.models.Events || mongoose.model('Events', EventSchema);
        const eventRegX = new RegExp('-' + params.event);

        const { title, details, host, date } = body;

        const updateEvent = await Event.updateOne({ event_id: { $regex: eventRegX } }, { title, details, host, date });

        if (updateEvent.acknowledged)
            return {
                status: 200,
                body: {
                    message: 'Event modified!',
                    code: 'event-modified'
                }
            };

        return {
            status: 500,
            body: {
                message: "Error trying to update data (mongodb wouldn't acknowledge update",
                code: 'update-not-acknowledged'
            }
        };
    } catch (e) {
        return {
            status: e.status || 500,
            body: {
                message: e.message || 'Server Error!',
                code: e.code,
                err: e
            }
        };
    }
}
