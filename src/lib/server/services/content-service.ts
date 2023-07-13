import type { ContentFetchOptions, IContentRepository } from '../models';
import type { IUserRepostory } from '../models/user-repository';

export interface Content {
  title: string;
  body: string;
}

export interface IContentService {
  addContent: (authorId: number, content: Content, updatedBy: Date | undefined) => Promise<string>;
}

interface Dependencies {
  repo: IContentRepository;
  userRepo: IUserRepostory;
}

export class ContentService implements IContentService {
  private repo: IContentRepository;
  private userRepo: IUserRepostory;

  constructor(deps: Dependencies) {
    this.repo = deps.repo;
    this.userRepo = deps.userRepo;
  }

  async addContent(authorId: number, content: Content, updatedAt: Date | undefined = undefined) {
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
}
