export type ContentFetchOptions = {
  count: number;
  skip: number;
};

export type ContentRequest = {
  title: string;
  body: string;
  updatedAt: Date;
  authorId: number;
};

export interface IUserRepostory<T> {
  getUserById: (id: number) => Promise<T>;
}

export interface IContentRepository<T> {
  save: (content: ContentRequest) => Promise<string>;
  fetch: (options: ContentFetchOptions | undefined) => Promise<T[]>;
  delete: (contentId: number) => Promise<void>;
}

export * from './prisma/content-repository';
export * from './prisma/user-repository';
