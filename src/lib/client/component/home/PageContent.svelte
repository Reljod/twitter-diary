<script lang="ts" context="module">
	import type { Content } from '@prisma/client';

	export interface ContentWithUser extends Content {
		username: string;
	}

	export interface ContentRequest {
		title: string;
		body: string;
	}

	export async function submitContent(content: ContentRequest) {
		await fetch('/api/diary/content', {
			method: 'POST',
			body: JSON.stringify({ content })
		});
	}

	export function extractContent(text: string): ContentRequest {
		if (!text) return { title: '', body: '' };

		const [title, ...body] = text.split('\n');
		return { title, body: body.join('\n') };
	}
</script>

<script lang="ts">
	import { DatetimeDifference, UNIT_MAP } from '$lib/client/utils/datetime';
	import { afterUpdate } from 'svelte';

	export let content: ContentWithUser;
	let contentTitle: HTMLElement;
	let contentBody: HTMLElement;

	function getCreatedAtTimeFromNow(date: Date): string {
		const { unit, minDiff } = new DatetimeDifference(new Date(), date).minimumDifference;
		return `${Math.floor(minDiff)}${Object(UNIT_MAP)[unit]}`;
	}

	afterUpdate(() => {
		contentTitle.innerHTML = content.title;
		contentBody.innerHTML = content.body || '';
	});
</script>

<div class="mr-3">
	<img src="/template-profile-picture.svg" alt="" class="max-h-8" />
</div>
<div class="flex-1">
	<div>
		<span class="font-bold">{content.username}</span>
		<span class="text-gray-500"
			>&#x2022; {getCreatedAtTimeFromNow(new Date(content.createdAt))}</span
		>
	</div>
	<div class="mt-1">
		<p bind:this={contentTitle} class="font-medium" />
		<p bind:this={contentBody} />
	</div>
</div>
