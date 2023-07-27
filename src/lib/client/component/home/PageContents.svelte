<script lang="ts" context="module">
  import PageContent, { type ContentWithUser } from './PageContent.svelte';

  export async function fetchContents(): Promise<ContentWithUser[]> {
    const res = await fetch('/api/diary/content');
    return (await res.json()).contents;
  }
</script>

<script lang="ts">
  export let contents: ContentWithUser[] = [];
</script>

<ul>
  {#each contents as content}
    <PageContent {content} />
  {/each}
</ul>
