<script lang="ts">
  import {
    submitContent,
    type ContentRequest,
    type ContentWithUser,
    extractContent
  } from '$lib/client/component/home/PageContent.svelte';
  import PageContentTypeOption from '$lib/client/component/home/PageContentTypeOption.svelte';
  import PageContents, { fetchContents } from '$lib/client/component/home/PageContents.svelte';
  import { onMount } from 'svelte';
  import addIcon from '$lib/assets/icons/add-700.svg';
  import { goto } from '$app/navigation';

  let contentBody: string;
  let contents: ContentWithUser[] = [];
  onMount(async () => (contents = await fetchContents()));

  async function submitContentHandler(content: ContentRequest) {
    await submitContent(content);
    contents = await fetchContents();
  }
</script>

<main class="relative">
  <section id="home-page__header">
    <div class="hidden">
      <nav>
        <a href="/">TD</a>
        <a href="Home">H</a>
      </nav>
    </div>
    <div class="flex mx-4 max-h-12 py-2">
      <button class="flex-1"
        ><img src="/template-profile-picture.svg" alt="" class="max-h-8" /></button
      >
      <div class="flex items-center">
        <img src="/twitter-logo.svg" alt="" class="max-h-full h-5" />
      </div>
      <div class="flex-1" />
    </div>
  </section>
  <section id="home-page__body">
    <div id="page-content-type" class="flex items-center h-14 my-1">
      <PageContentTypeOption style="active">For you</PageContentTypeOption>
      <PageContentTypeOption style="inactive">Following</PageContentTypeOption>
    </div>
    <div id="page-content-post">
      <div class="hidden">
        <div id="profile-pic" class="w-10 aspect-square rounded-full bg-gray-600" />
        <form on:submit|preventDefault={() => submitContentHandler(extractContent(contentBody))}>
          <div>
            <textarea bind:value={contentBody} />
          </div>
          <div id="line" />
          <div>
            <div>
              <button type="submit">Post</button>
            </div>
          </div>
        </form>
      </div>
    </div>
    <div id="page-content-main" class="text-xs">
      <PageContents {contents} />
    </div>
  </section>
  <button class="m-2 fixed bottom-10 right-4" on:click={() => goto('/compose/content')}>
    <img alt="" src={addIcon} class="w-10 p-2 rounded-full bg-sky-400 hover:bg-sky-500" />
  </button>
</main>
