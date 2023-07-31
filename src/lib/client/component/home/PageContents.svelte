<script lang="ts" context="module">
  import { homeContents } from '$lib/client/stores/home-contents';
  import { onMount } from 'svelte';
  import PageContent, { type ContentWithUser } from './PageContent.svelte';

  export async function fetchContents(): Promise<ContentWithUser[]> {
    const params = new URLSearchParams({ n: '20', s: '0' });
    const res = await fetch(`/api/diary/content?${params.toString()}`);
    return (await res.json()).contents;
  }
</script>

<script lang="ts">
  let contents: ContentWithUser[] = [];

  homeContents.subscribe((value) => {
    contents = value || [];
  });

  onMount(async () => {
    homeContents.set(await fetchContents());
  });
</script>

<ul>
  {#each contents as content}
    <PageContent {content} />
  {/each}
</ul>
