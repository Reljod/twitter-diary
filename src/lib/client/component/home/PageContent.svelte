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
  import MoreHoriz from '$lib/assets/icons/more-horiz.svelte';
  import { modalContent, showModalContent } from '$lib/client/stores/modals';
  import renderer from '$lib/client/ui-tools/renderer/markdown';
  import { DatetimeDifference, UNIT_MAP } from '$lib/client/utils/datetime';
  import { afterUpdate } from 'svelte';

  export let content: ContentWithUser;
  let contentTitle: HTMLElement;
  let contentBody: HTMLElement;

  function getCreatedAtTimeFromNow(date: Date): string {
    const { unit, minDiff } = new DatetimeDifference(new Date(), date)
      .minimumDifference;
    return `${Math.floor(minDiff)}${Object(UNIT_MAP)[unit]}`;
  }

  function onClickOptionHandler() {
    modalContent.set({ ...content });
    showModalContent.set(true);
  }

  afterUpdate(() => {
    contentTitle.innerHTML = renderer.render(content.title);
    contentBody.innerHTML = content.body || '';
  });
</script>

<li class="relative flex border-t border-gray-100 p-3">
  <button
    class="absolute top-0 right-0 p-2 m-2 rounded-full focus:bg-primary-blue focus:bg-opacity-25"
    on:click={() => onClickOptionHandler()}
  >
    <MoreHoriz class="fill-gray-500 h-5 w-5" />
  </button>
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
      <div bind:this={contentTitle} />
      <div bind:this={contentBody} />
    </div>
  </div>
</li>
