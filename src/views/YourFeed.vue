<template>
  <div class="home-page">
    <mcv-banner />
    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <mcv-feed-toggler />
          <mcv-feed v-bind:api-url="apiUrl" />
        </div>
        <div class="col-md-3">
          <mcv-popular-tags />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import McvFeed from '@/components/Feed.vue';
import McvPopularTags from '@/components/PopularTags';
import McvFeedToggler from '@/components/FeedToggler';
import McvBanner from '@/components/Banner.vue';
export default {
  name: 'McvYourFeed',
  components: {
    McvFeed,
    McvPopularTags,
    McvBanner,
    McvFeedToggler,
  },
  data() {
    return {
      apiUrl: '/articles/feed',
    };
  },
};
</script>
