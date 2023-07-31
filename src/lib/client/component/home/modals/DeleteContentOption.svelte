<script lang="ts">
  import DeleteTrashIcon from '$lib/assets/icons/delete-trash.svelte';
  import { homeContents } from '$lib/client/stores/home-contents';
  import { modalContent } from '$lib/client/stores/modals';
  import { fetchContents } from '../PageContents.svelte';

  let modalContentId: number | undefined;

  modalContent.subscribe((value) => {
    modalContentId = value?.id;
  });

  async function deleteContentHandler(contentId: number) {
    await fetch('/api/diary/content', {
      method: 'DELETE',
      body: JSON.stringify({ contentId })
    });
    homeContents.set(await fetchContents());
    modalContent.set(null);
  }
</script>

<button
  class="flex items-center w-full hover:cursor-pointer"
  disabled={!modalContentId}
  on:click|preventDefault={async () => {
    modalContentId && (await deleteContentHandler(modalContentId));
  }}
>
  <DeleteTrashIcon class="w-5 h-5 fill-red-500" />
  <span class="flex-1 ml-3 text-start text-red-500 font-bold"> Delete</span>
</button>
