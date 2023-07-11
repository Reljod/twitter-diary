<script lang="ts" context="module">
	export function parseTitle(title: string) {
		const cleanedTitle = title.replaceAll('*', '').trim();
		if (!cleanedTitle) return '';
		const uppercasedTitle = cleanedTitle.slice(0, 1).toUpperCase() + cleanedTitle.slice(1);
		return `**${uppercasedTitle}**<br>`;
	}

	export function extractContentFromHTMLPTag(input: string) {
		const cleanedInput = input.trim().slice(3, -5);
		const [title, ...bodies] = cleanedInput.split('<br>');
		const body = bodies.join('<br>');
		return { title, body };
	}

	export function parseContentOutput(input: string) {
		if (!input) return '';
		const [title, ...bodies] = input.split('<br>');
		const body = bodies.join('<br>');
		const parsedTitle = parseTitle(title);
		return marked.parse(parsedTitle + body);
	}
</script>

<script lang="ts">
	import { marked } from 'marked';
	import { mangle } from 'marked-mangle';

	import templatePfp from '$lib/assets/template-profile-picture.svg';
	import expandMore from '$lib/assets/icons/expand-more.svg';
	import PublishContentButton from './PublishContentButton.svelte';
	import { submitContent } from '$lib/client/component/home/PageContent.svelte';
	import { goto } from '$app/navigation';

	marked.use(mangle());
	marked.use({
		headerIds: false,
		gfm: true
	});

	let contentInput: string = '';
	let contentOutputElem: HTMLDivElement | undefined;
	let showPreview: boolean = false;

	$: contentOutput = parseContentOutput(contentInput);
	$: if (showPreview && contentOutputElem) contentOutputElem.innerHTML = contentOutput;
	$: console.log({ contentInput, contentOutput, contentOutputElem: contentOutputElem?.innerHTML });

	function onKeyDown(event: KeyboardEvent) {
		if (event?.key === 'Enter') {
			document.execCommand('insertLineBreak');
			event.preventDefault();
		}
	}

	function onTextAreaClick() {
		showPreview = false;
	}

	async function publishContent() {
		const { title, body } = extractContentFromHTMLPTag(contentOutput);
		reset();
		await submitContent({ title, body });
		goto('/');
	}

	function reset() {
		contentInput = '';
		showPreview = false;
	}
</script>

<div>
	<div class="flex justify-end w-full px-4">
		{#if !!contentOutput}
			<PublishContentButton on:click={publishContent} type="active" />
		{:else}
			<PublishContentButton type="inactive" />
		{/if}
	</div>
	<div class="px-4">
		<div class="flex">
			<div class="pt-3 mr-3">
				<img src={templatePfp} alt="" class="max-h-10" />
			</div>
			<div class="flex flex-col flex-1">
				<div class="pb-3 px-3">
					<button class="flex text-sm font-bold">
						Diary
						<img alt="" src={expandMore} class="w-5" />
					</button>
				</div>
				<div class="min-h-[7rem] max-h-44 max-w-[19rem] text-xl px-2 py-3">
					{#if showPreview && !!contentOutput}
						<!-- svelte-ignore a11y-click-events-have-key-events -->
						<!-- svelte-ignore a11y-no-static-element-interactions -->
						<div
							class="h-full w-full break-words"
							bind:this={contentOutputElem}
							on:click={onTextAreaClick}
						/>
					{:else}
						<!-- svelte-ignore a11y-no-static-element-interactions -->
						<div
							id="content-textarea"
							contenteditable="true"
							bind:innerHTML={contentInput}
							on:blur={() => (showPreview = true)}
							on:keydown={onKeyDown}
							placeholder="What is happening?!"
							class="h-full w-full break-words overflow-y-scroll outline-none px-1"
						/>
					{/if}
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	#content-textarea[contenteditable='true']:empty:before {
		content: attr(placeholder);
		pointer-events: none;
		display: block; /* For Firefox */
		color: rgb(107 114 128);
	}
</style>
