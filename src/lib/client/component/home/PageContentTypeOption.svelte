<script lang="ts">
  export let style: 'active' | 'inactive';
</script>

<div class="flex flex-1 justify-center h-full px-4">
  <div class="flex flex-col w-fit h-full">
    {#if style === 'active'}
      <p class="flex flex-1 items-center text-sm font-bold"><slot /></p>
      <div class="w-full border-2 border-primary-blue rounded-md" />
    {:else if style === 'inactive'}
      <p class="flex flex-1 items-center text-sm text-gray-500 font-semibold"><slot /></p>
      <div class="w-full border-2 rounded-md opacity-0" />
    {/if}
  </div>
</div>
