<script lang="ts" context="module">
  import type { Content } from '@prisma/client';

  export type ModalType = OwnerPageContentControlModal;
  export interface OwnerPageContentControlModal extends Content {}
</script>

<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  export let showModal: boolean;
  let dialog: HTMLDialogElement;

  const dispatch = createEventDispatcher();

  $: if (dialog && showModal) dialog.showModal();
  $: if (dialog && !showModal) dialog.close();
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog
  bind:this={dialog}
  on:close={() => dispatch('close')}
  on:click|self={() => (showModal = false)}
  class={$$props.class}
>
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div class="w-full h-full" on:click|stopPropagation>
    <slot />
  </div>
</dialog>
