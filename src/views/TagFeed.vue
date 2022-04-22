<template>
  <div class="home-page">
    <mcv-banner />
    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <mcv-feed-toggler :tag-name="tagName" />
          <mcv-feed :api-url="apiUrl" />
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
import McvBanner from '@/components/Banner';
import McvFeedToggler from '@/components/FeedToggler';
export default {
  name: 'McvTagFeed',
  components: {
    McvFeed,
    McvPopularTags,
    McvBanner,
    McvFeedToggler,
  },
  computed: {
    apiUrl() {
      const tagName = this.$route.params.slug;
      return `/articles?tag=${tagName}`;
    },
    tagName() {
      return this.$route.params.slug;
    },
  },
};
</script>
