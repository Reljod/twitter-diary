<script lang="ts">
	import type { Content } from '@prisma/client';
	import { onMount } from 'svelte';

	import { DatetimeDifference, UNIT_MAP } from '$lib/client/utils/datetime';

	interface ContentRequest {
		title: string;
		body: string;
	}

	interface ContentWithUser extends Content {
		username: string;
	}

	let contents: ContentWithUser[] = [];

	let contentBody: string;
	$: content = extractContent(contentBody);

	function extractContent(text: string): ContentRequest {
		if (!text) return { title: '', body: '' };

		const [title, ...body] = text.split('\n');
		return { title, body: body.join('\n') };
	}

	function getCreatedAtTimeFromNow(date: Date): string {
		const dt = new DatetimeDifference(new Date(), date);
		const { unit, minDiff } = dt.minimumDifference;
		const unitMin = Object(UNIT_MAP)[unit];
		const minDiffFormatted = Math.floor(minDiff);
		return `${minDiffFormatted}${unitMin}`;
	}

	async function submitDiaryContentHandler() {
		await fetch('/api/diary/content', {
			method: 'POST',
			body: JSON.stringify({ content })
		});
		await updateContents();
	}

	async function updateContents() {
		const res = await fetch('/api/diary/content');
		contents = (await res.json()).contents;
	}

	onMount(updateContents);
</script>

<main>
	<section id="home-page__header">
		<div class="hidden">
			<nav>
				<a href="/">TD</a>
				<a href="Home">H</a>
			</nav>
		</div>
		<div class="flex mx-4 max-h-12 py-2">
			<button class="flex-1"><img src="/template-profile-picture.svg" alt="" class="max-h-8"></button>
			<div class="flex items-center"><img src="/twitter-logo.svg" alt="" class="max-h-full h-5" ></div>
			<div class="flex-1"></div>
		</div>
	</section>
	<section id="home-page__body">
		<div id="page-content-type" class="flex items-center h-14 my-1">
			<div class="flex flex-1 justify-center h-full px-4">
				<div class="flex flex-col w-fit h-full">
					<p class="flex flex-1 items-center text-sm font-bold" >For you</p>
					<div class="w-full border-2 border-primary-blue rounded-md"></div>
				</div>
			</div>
			<div class="flex flex-1 justify-center h-full px-4">
				<div class="flex flex-col w-fit h-full">
					<p class="flex flex-1 items-center text-sm text-gray-500 font-semibold" >Following</p>
					<div class="w-full border-2 border-primary-blue opacity-0"></div>
				</div>
			</div>
		</div>
		<div id="page-content-post">
			<div class="hidden">
				<div id="profile-pic" class="w-10 aspect-square rounded-full bg-gray-600" />
				<form on:submit|preventDefault={submitDiaryContentHandler}>
					<div>
						<textarea bind:value={contentBody} />
					</div>
					<div id="line" />
					<div>
						<div>
							<button type="submit">Post</button>
						</div>
					</div>
				</form>
			</div>
		</div>
		<div id="page-content-main" class="text-xs">
			<ul>
				{#each contents as c}
					<li class="flex border-t border-gray-100 p-3">
						<div class="mr-3">
							<img src="/template-profile-picture.svg" alt="" class="max-h-8"/>
						</div>
						<div class="flex-1">
							<div>
								<span class="font-bold">{c.username}</span>
								<span class="text-gray-500">&#x2022; {getCreatedAtTimeFromNow(new Date(c.createdAt))}</span>
							</div>
							<div class="mt-1">
								<p class="font-medium first-letter:capitalize">{c.title}</p>
								<p class="italic">&#x201C;{c.body}&#x201D;</p>
							</div>
						</div>
					</li>
				{/each}
			</ul>
			<div />
		</div>
	</section>
</main>
