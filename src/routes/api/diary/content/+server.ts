import { json } from '@sveltejs/kit';
import { AppServer } from '$lib/server/index.js';
import type { Content } from '$lib/server/services/content-service.js';

export async function POST({ request }) {
  const { content } = (await request.json()) as { content: Content };
  const contentId = await AppServer.contentService.addContent(1, content);
  return json({ contentId }, { status: 201 });
}

export async function GET({ url }) {
  const contents = await AppServer.contentService.getContents({ count: 20, skip: 0 });

  return json({ contents }, { status: 200 });
}
