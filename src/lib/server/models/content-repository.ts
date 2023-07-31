import type { Content, PrismaClient } from '@prisma/client';

interface ContentRequest {
  title: string;
  body: string;
  updatedAt: Date;
  authorId: number;
}

export interface IContentRepository {
  save: (content: ContentRequest) => Promise<string>;
  fetch: (options: ContentFetchOptions | undefined) => Promise<Content[]>;
  delete: (contentId: number) => Promise<void>;
}

interface Dependencies {
  prisma: PrismaClient;
}

export class ContentRepository implements IContentRepository {
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
      take: options?.count || 10
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

export interface ContentFetchOptions {
  count: number;
  skip: number;
}
