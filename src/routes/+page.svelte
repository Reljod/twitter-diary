<script lang="ts">
	import type { Content } from '@prisma/client';
	import { onMount } from 'svelte';

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

	async function submitDiaryContentHandler() {
		console.log({ content });
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
	<section>
		<nav>
			<a href="/">TD</a>
			<a href="Home">H</a>
		</nav>
	</section>
	<section>
		<h1>Home</h1>
		<div>
			<div>
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
			<ul>
				{#each contents as c}
					<li>
						<div>
							<p>{c.username}</p>
						</div>
						<h3>{c.title}</h3>
						<p>{c.body}</p>
					</li>
				{/each}
			</ul>
			<div />
		</div>
	</section>
</main>
