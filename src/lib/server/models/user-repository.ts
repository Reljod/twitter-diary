import type { PrismaClient, User } from '@prisma/client';

export interface IUserRepostory {
  getUserById: (id: number) => Promise<User>;
}

interface Dependencies {
  prisma: PrismaClient;
}

export class UserRepository implements IUserRepostory {
  prisma: PrismaClient;

  constructor(deps: Dependencies) {
    this.prisma = deps.prisma;
  }

  async getUserById(id: number): Promise<User> {
    return await this.prisma.user.findUniqueOrThrow({
      where: { id }
    });
  }
}
