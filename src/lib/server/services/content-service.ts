import type { Content, User } from '@prisma/client';
import type {
  ContentFetchOptions,
  IContentRepository,
  IUserRepostory
} from '../models';

export interface CreateContent {
  title: string;
  body: string;
}

export interface IContentService {
  addContent: (
    authorId: number,
    content: CreateContent,
    updatedBy: Date | undefined
  ) => Promise<string>;
}

interface Dependencies {
  repo: IContentRepository<Content>;
  userRepo: IUserRepostory<User>;
}

export class ContentService implements IContentService {
  private repo: IContentRepository<Content>;
  private userRepo: IUserRepostory<User>;

  constructor(deps: Dependencies) {
    this.repo = deps.repo;
    this.userRepo = deps.userRepo;
  }

  async addContent(
    authorId: number,
    content: CreateContent,
    updatedAt: Date | undefined = undefined
  ) {
    return await this.repo.save({
      authorId,
      title: content.title,
      body: content.body,
      updatedAt: updatedAt || new Date()
    });
  }

  async getContents(options: ContentFetchOptions | undefined = undefined) {
    const contents = await this.repo.fetch(options);
    return await Promise.all(
      contents.map(async (content) => {
        const userId = content.authorId;
        const { username } = await this.userRepo.getUserById(userId);
        return { ...content, username };
      })
    );
  }

  async deleteContent(contentId: number) {
    await this.repo.delete(contentId);
  }
}
