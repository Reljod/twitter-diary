import { writable } from 'svelte/store';
import type { ContentWithUser } from '../component/home/PageContent.svelte';

export const homeContents = writable<ContentWithUser[] | null>(null);
