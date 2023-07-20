<script lang="ts" context="module">
  import renderer from '$lib/client/ui-tools/renderer/markdown';

  function getContent(inputHTML: string) {
    const capturedTitleObj = /<h1 class=".+">(.+)<\/h1>(.+)/.exec(inputHTML);
    if (!capturedTitleObj) return { title: '', body: '' };

    const title = capturedTitleObj[1];
    const body = capturedTitleObj[2];

    return { title, body };
  }

  export function parseContentOutput(input: string) {
    if (!input) return { htmlOutput: '', content: { title: '', body: '' } };
    const htmlOutput = renderer.render(input) as string;
    const { title, body } = getContent(htmlOutput);

    return {
      htmlOutput,
      content: {
        title: title,
        body: body
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
  $: if (showPreview && contentOutputElem)
    contentOutputElem.innerHTML = contentOutput.htmlOutput;

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
        <div class="h-60 max-w-[19rem] text-xl px-2 py-3">
          {#if showPreview && !!contentOutput.htmlOutput}
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <!-- svelte-ignore a11y-no-static-element-interactions -->
            <div
              class="h-full w-full overflow-y-scroll px-1 break-words"
              bind:this={contentOutputElem}
              on:click={onTextAreaClick}
            />
          {:else}
            <textarea
              id="content-textarea"
              on:blur={() => (showPreview = true)}
              bind:value={contentInput}
              placeholder="What is happening?!"
              class="h-full w-full break-words overflow-y-scroll outline-none px-1 resize-none"
            />
          {/if}
        </div>
      </div>
    </div>
  </div>
</div>
