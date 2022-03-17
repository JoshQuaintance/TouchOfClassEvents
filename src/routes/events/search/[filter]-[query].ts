import { connectToDB } from '$utils/db';

export async function get({ params }) {
    const { mongoose, schemas } = await connectToDB();
    const { EventSchema } = await schemas;
    const Event = mongoose.models.Events || mongoose.model('Events', EventSchema);
    const { filter, query } = params;

    const queryRegX = new RegExp(query, 'ig');
    const getEvents = await Event.find({ [filter]: { $regex: queryRegX } });

    const retrievedData = getEvents.map((event) => {
        const { event_id, title, host, date, details } = event;
        return {
            event_id,
            title,
            host,
            date,
            details
        };
    });

    return {
        status: 200,
        body: JSON.stringify({
            results: retrievedData || []
        })
    };
}
