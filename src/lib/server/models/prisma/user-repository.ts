import type { IUserRepostory } from '$lib/server/models';
import type { PrismaClient, User } from '@prisma/client';

interface Dependencies {
  prisma: PrismaClient;
}

export class UserRepository implements IUserRepostory<User> {
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
