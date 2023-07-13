<script lang="ts">
  type STATUS = 'active' | 'inactive';

  export let type: STATUS;
</script>

{#if type === 'active'}
  <button
    on:click|preventDefault
    class="px-4 py-[0.35rem] my-3 bg-sky-500 rounded-3xl text-sm text-white font-bold"
    >Publish</button
  >
{:else}
  <button class="px-4 py-[0.35rem] my-3 bg-blue-300 rounded-3xl text-sm text-white font-bold"
    >Publish</button
  >
{/if}
