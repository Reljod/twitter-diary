import type { ContentFetchOptions, IContentRepository } from '../models';

export interface Content {
	title: string;
	body: string;
}

export interface IContentService {
	addContent: (authorId: number, content: Content, updatedBy: Date | undefined) => Promise<string>;
}

interface Dependencies {
	repo: IContentRepository;
}

export class ContentService implements IContentService {
	private repo: IContentRepository;

	constructor(deps: Dependencies) {
		this.repo = deps.repo;
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
		return await this.repo.fetch(options);
	}
}
