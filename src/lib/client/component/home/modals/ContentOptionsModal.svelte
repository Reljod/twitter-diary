<script lang="ts">
  import PageModal from '$lib/client/component/generic/modals/PageModal.svelte';
  import { modalContent } from '$lib/client/stores/modals';
  import DeleteContentOption from './DeleteContentOption.svelte';

  let showModal: boolean = false;

  modalContent.subscribe((value) => {
    showModal = !!value;
  });
</script>

<PageModal
  bind:showModal
  class="fixed bottom-0 mb-0 h-1/2 w-[500rem] rounded-t-2xl"
  on:close={() => modalContent.set(null)}
>
  <div class="flex flex-col justify-between w-full h-full p-2">
    <div class="flex-1">
      <DeleteContentOption />
    </div>
    <div class="w-full h-fit">
      <button
        class="border-2 rounded-3xl w-full py-2 font-bo ld"
        on:click={() => (showModal = false)}>Cancel</button
      >
    </div>
  </div>
</PageModal>
