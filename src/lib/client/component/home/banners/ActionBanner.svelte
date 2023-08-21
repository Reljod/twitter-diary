<script lang="ts" context="module">
</script>

<script lang="ts">
  import { afterUpdate, createEventDispatcher, onDestroy } from 'svelte';

  // id is important to trigger afterUpdate
  export let id: number;
  export let show = false;
  export let text: string;

  const dispatch = createEventDispatcher<{ display: boolean }>();

  let timeout: NodeJS.Timeout;

  afterUpdate(() => {
    clearTimeout(timeout);

    if (show === true) {
      timeout = setTimeout(() => {
        dispatch('display', false);
      }, 5000);
    }
  });

  onDestroy(() => clearTimeout(timeout));
</script>

{#if show}
  <div
    id={`action-banner-${id}`}
    class="fixed bottom-0 bg-primary-blue w-full px-4 py-2"
  >
    <p class="text-white">{text}</p>
  </div>
{/if}
