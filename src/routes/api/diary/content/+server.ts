import { AppServer } from '$lib/server/index.js';
import * as schema from '$lib/server/schema';
import { json } from '@sveltejs/kit';

export async function POST({ request }) {
  const data = await request.json();
  const { content } = schema.AddContentRequestSchema.parse(data);

  const contentId = await AppServer.contentService.addContent(1, content);

  const response = schema.AddContentResponseSchema.parse({
    contentId: contentId.toString()
  });
  return json(response, { status: 201 });
}

export async function DELETE({ request }) {
  const data = await request.json();
  const { contentId } = schema.DeleteContentRequestSchema.parse(data);

  await AppServer.contentService.deleteContent(contentId);

  const response = schema.DeleteContentResponseSchema.parse({ contentId });
  return json(response, { status: 200 });
}

export async function GET({ url }) {
  const n = url.searchParams.get('n');
  const s = url.searchParams.get('s');

  const optionsReq = schema.GetContentRequestParamsSchema.parse({
    count: n,
    skip: s
  });

  const count = !!optionsReq?.count ? parseInt(optionsReq.count) : null;
  const skip = !!optionsReq?.skip ? parseInt(optionsReq.skip) : null;
  const options = count != null && skip != null ? { count, skip } : undefined;

  const contents = await AppServer.contentService.getContents(options);

  const response = schema.GetContentResponseParamsSchema.parse({ contents });
  return json(response, { status: 200 });
}
