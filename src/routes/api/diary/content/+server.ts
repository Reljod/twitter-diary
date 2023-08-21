import { AppServer } from '$lib/server/index.js';
import {
  AddContentRequestSchema,
  AddContentResponseSchema,
  DeleteContentRequestSchema,
  DeleteContentResponseSchema
} from '$lib/server/schema';
import { json } from '@sveltejs/kit';

export async function POST({ request }) {
  const data = await request.json();
  const { content } = AddContentRequestSchema.parse(data);

  const contentId = await AppServer.contentService.addContent(1, content);

  const response = AddContentResponseSchema.parse({
    contentId: contentId.toString()
  });
  return json(response, { status: 201 });
}

export async function DELETE({ request }) {
  const data = await request.json();
  const { contentId } = DeleteContentRequestSchema.parse(data);

  await AppServer.contentService.deleteContent(contentId);

  const response = DeleteContentResponseSchema.parse({ contentId });
  return json(response, { status: 200 });
}

export async function GET({ url }) {
  const n = url.searchParams.get('n');
  const s = url.searchParams.get('s');

  const count = !!n ? parseInt(n) : null;
  const skip = !!s ? parseInt(s) : null;
  const options = count != null && skip != null ? { count, skip } : undefined;

  const contents = await AppServer.contentService.getContents(options);

  return json({ contents }, { status: 200 });
}
