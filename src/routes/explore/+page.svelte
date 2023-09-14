<script lang="ts">
  import type { PageData, Video } from './$types';
  import VideoCard from '../../components/video-card.svelte';
  import Loading from '../../components/loading.svelte';
  import Typography from '../../components/typography.svelte';
  import Meta from '../../components/meta.svelte';
  import '@fontsource/red-hat-display/300.css';

  export let data: PageData;

  let videoList: Video[] | undefined = data.videoList;
</script>

<Meta
  title="Explore | Shards"
  description="Shards: A Better Social Media Experience"
/>

<main>
  <div class="explore-container">
    <div class="explore-videos">
      <div class="explore-videos-grid">
        {#if videoList}
          {#each videoList as video}
            <VideoCard {video} />
          {/each}
        {:else}
          <Loading dimensions={256} />
          <Typography size="xl">Loading Explore</Typography>
        {/if}
      </div>
    </div>
  </div>
</main>

<style>
  main {
    height: 96vh;
    width: 96vw;
  }

  .explore-container {
    height: 100%;
    width: 100%;
  }

  .explore-videos {
    display: grid;
    padding: 1em;
    height: 100%;
    width: 100%;
  }

  .explore-videos > .explore-videos-grid {
    display: grid;
    place-items: center;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    grid-gap: 1em;
  }
</style>
