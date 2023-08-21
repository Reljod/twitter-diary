import { AppServer } from '$lib/server/index.js';
import AddContentRequestSchema from '$lib/server/schema/content-schema/add-content-request-schema';
import AddContentResponseSchema from '$lib/server/schema/content-schema/add-content-response-schema';
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
  const { contentId } = (await request.json()) as { contentId: number };
  await AppServer.contentService.deleteContent(contentId);
  return json({ contentId }, { status: 200 });
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
