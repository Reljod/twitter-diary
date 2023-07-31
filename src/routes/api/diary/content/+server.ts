import { AppServer } from '$lib/server/index.js';
import type { Content } from '$lib/server/services/content-service.js';
import { json } from '@sveltejs/kit';

export async function POST({ request }) {
  const { content } = (await request.json()) as { content: Content };
  const contentId = await AppServer.contentService.addContent(1, content);
  return json({ contentId }, { status: 201 });
}

export async function DELETE({ request }) {
  const { contentId } = (await request.json()) as { contentId: number };
  await AppServer.contentService.deleteContent(contentId);
  return json({ contentId }, { status: 200 });
}

export async function GET({ url }) {
  const n = url.searchParams.get('n');
  const s = url.searchParams.get('s');

  const count = !!n ? parseInt(n) : 20;
  const skip = !!s ? parseInt(s) : 0;

  const options = !!count && !!skip ? { count, skip } : undefined;
  const contents = await AppServer.contentService.getContents(options);

  return json({ contents }, { status: 200 });
}
