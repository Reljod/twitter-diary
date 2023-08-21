<script lang="ts">
  import DeleteTrashIcon from '$lib/assets/icons/delete-trash.svelte';
  import {
    deleteModelContentId,
    modalContent,
    showDeleteModalConfirmation,
    showModalContent
  } from '$lib/client/stores/modals';

  async function onClickDeleteHandler() {
    const id = $modalContent?.id || null;
    deleteModelContentId.set(id);
    showDeleteModalConfirmation.set(true);
    showModalContent.set(false);
  }
</script>

<button
  class="flex items-center w-full hover:cursor-pointer"
  on:click|preventDefault={async () => await onClickDeleteHandler()}
>
  <DeleteTrashIcon class="w-5 h-5 fill-red-500" />
  <span class="flex-1 ml-3 text-start text-red-500 font-bold"> Delete</span>
</button>
