<script lang="ts" context="module">
  export type OnDeleteDispatcher = { id: number; text: string };
</script>

<script lang="ts">
  import PageModal from '$lib/client/component/generic/modals/PageModal.svelte';
  import { fetchContents } from '$lib/client/component/home/PageContents.svelte';
  import { homeContents } from '$lib/client/stores/home-contents';
  import {
    deleteModelContentId,
    showDeleteModalConfirmation
  } from '$lib/client/stores/modals';
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher<{ delete: OnDeleteDispatcher }>();

  async function deleteContentHandler(contentId: number) {
    await fetch('/api/diary/content', {
      method: 'DELETE',
      body: JSON.stringify({ contentId })
    });
  }

  async function onDeleteHandler() {
    if (!!$deleteModelContentId) {
      await deleteContentHandler($deleteModelContentId);
      homeContents.set(await fetchContents());
      dispatch('delete', {
        id: $deleteModelContentId,
        text: 'Your Tweet was deleted'
      });
    }

    showDeleteModalConfirmation.set(false);
  }
</script>

<PageModal
  class="w-80 rounded-2xl"
  bind:showModal={$showDeleteModalConfirmation}
  on:close={() => showDeleteModalConfirmation.set(false)}
>
  <div>
    <div class="space-y-1">
      <h2 class="text-2xl font-bold">Delete Tweet?</h2>
      <p class="text-gray-500">
        This can't be undone and it will be removed from your diary.
      </p>
    </div>
    <div class="mt-4 space-y-3">
      <button
        class="bg-red-500 rounded-3xl w-full py-2 text-white font-bold"
        on:click={async () => await onDeleteHandler()}>Delete</button
      >
      <button
        class="border-2 rounded-3xl w-full py-2 font-bold"
        on:click={() => showDeleteModalConfirmation.set(false)}>Cancel</button
      >
    </div>
  </div>
</PageModal>
