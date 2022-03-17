import { connectToDB } from '$utils/db';
import type { DefaultBody } from '@sveltejs/kit/types/endpoint';
import type { ServerRequest } from '@sveltejs/kit/types/hooks';

export async function post(req: ServerRequest<Record<string, any>, DefaultBody>) {
    const { mongoose, schemas } = await connectToDB();
    const { EventSchema } = await schemas;

    const body = JSON.parse(req.body as string);
    const { data, event_id } = body;

    const Event = mongoose.models.Events || mongoose.model('Events', EventSchema);

    const eventLookupRegX = new RegExp('-' + event_id);
    const updateEventData = await Event.findOneAndUpdate(
        { event_id: { $regex: eventLookupRegX } },
        { seating_chart_data: data }
    );
}
