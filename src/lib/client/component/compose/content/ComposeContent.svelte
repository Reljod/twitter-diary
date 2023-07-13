<script lang="ts" context="module">
  import { marked } from 'marked';
  import { mangle } from 'marked-mangle';

  marked.use(mangle());
  marked.use({
    headerIds: false,
    gfm: true
  });

  export function transformTitle(title: string) {
    const cleanedTitle = title.replaceAll('*', '').trim();
    if (!cleanedTitle) return '';
    const uppercasedTitle = cleanedTitle.slice(0, 1).toUpperCase() + cleanedTitle.slice(1);
    return `**${uppercasedTitle}**`;
  }

  export function parseContentOutput(input: string) {
    if (!input) return { htmlOutput: '', content: { title: '', body: '' } };
    const [title, ...bodies] = input.split('<br>');
    const parsedTitle = transformTitle(title);

    const markedTitle = marked.parse(parsedTitle).trim();
    const markedBody = bodies
      .reduce((acc: string[], body: string) => {
        return [...acc, marked.parse(body).trim()];
      }, [])
      .join('');

    return {
      htmlOutput: markedTitle + markedBody,
      content: {
        title: markedTitle,
        body: markedBody
      }
    };
  }
</script>

<script lang="ts">
  import templatePfp from '$lib/assets/template-profile-picture.svg';
  import expandMore from '$lib/assets/icons/expand-more.svg';
  import PublishContentButton from './PublishContentButton.svelte';
  import { submitContent } from '$lib/client/component/home/PageContent.svelte';
  import { goto } from '$app/navigation';

  let contentInput: string = '';
  let contentOutputElem: HTMLDivElement | undefined;
  let showPreview: boolean = false;

  $: contentOutput = parseContentOutput(contentInput);
  $: if (showPreview && contentOutputElem) contentOutputElem.innerHTML = contentOutput.htmlOutput;

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
    reset();
    await submitContent(contentOutput.content);
    goto('/');
  }

  function reset() {
    contentInput = '';
    showPreview = false;
  }
</script>

<div>
  <div class="flex justify-end w-full px-4">
    {#if !!contentOutput.htmlOutput}
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
          {#if showPreview && !!contentOutput.htmlOutput}
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
