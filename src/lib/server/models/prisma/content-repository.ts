import type {
  ContentFetchOptions,
  ContentRequest,
  IContentRepository
} from '$lib/server/models';
import type { Content, PrismaClient } from '@prisma/client';

interface Dependencies {
  prisma: PrismaClient;
}

export class ContentRepository implements IContentRepository<Content> {
  prisma: PrismaClient;

  constructor(deps: Dependencies) {
    this.prisma = deps.prisma;
  }

  async save(content: ContentRequest): Promise<string> {
    const response = await this.prisma.content.create({
      data: content
    });
    return response.id.toString();
  }

  async fetch(
    options: ContentFetchOptions | undefined = undefined
  ): Promise<Content[]> {
    return await this.prisma.content.findMany({
      skip: options?.skip || 0,
      take: options?.count || 10,
      orderBy: [
        {
          createdAt: 'desc'
        },
        {
          id: 'desc'
        }
      ]
    });
  }

  async delete(contentId: number) {
    await this.prisma.content.delete({
      where: {
        id: contentId
      }
    });
  }
}
