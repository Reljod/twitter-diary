import { PrismaClient } from '@prisma/client';
import { ContentRepository } from './models';
import { UserRepository } from './models/user-repository';
import { ContentService, type IContentService } from './services';

export interface IAppServer {
  contentService: IContentService;
}

class AppServerBuilder implements IAppServer {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  private get contentRepository() {
    return new ContentRepository({ prisma: this.prisma });
  }

  private get userRepository() {
    return new UserRepository({ prisma: this.prisma });
  }

  get contentService() {
    return new ContentService({
      repo: this.contentRepository,
      userRepo: this.userRepository
    });
  }
}

export const AppServer = new AppServerBuilder();
