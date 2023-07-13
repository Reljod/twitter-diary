<script lang="ts">
  import arrowBack from '$lib/assets/icons/arrow-back-600.svg';
</script>

<main class="relative">
  <div class="absolute top-4 left-4">
    <a href="/">
      <img alt="" src={arrowBack} class="w-5" />
    </a>
  </div>
  <slot />
</main>
