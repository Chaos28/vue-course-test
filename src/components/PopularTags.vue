<template>
  <div class="sidebar">
    <p>Popular Tags</p>
    <div>
      <mcv-loading v-if="isLoading" />
      <mcv-error-message v-if="error" />
      <div class="sidebar" v-if="popularTags">
        <div class="tag-list">
          <router-link
            class="tag-default tag-pill"
            v-for="popularTag in popularTags"
            :key="popularTag"
            :to="{name: 'tag', params: {slug: popularTag}}"
            >{{ popularTag }}</router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import McvLoading from '@/components/Loading.vue';
import McvErrorMessage from '@/components/ErrorMessage.vue';
import {mapState} from 'vuex';
import {actionTypes} from '@/store/modules/popular-tags';
export default {
  name: 'McvPopularTags',
  components: {
    McvLoading,
    McvErrorMessage,
  },
  computed: {
    ...mapState({
      isLoading: (state) => state.popularTags.isLoading,
      error: (state) => state.popularTags.error,
      popularTags: (state) => state.popularTags.data,
    }),
  },
  mounted() {
    this.$store.dispatch(actionTypes.getPopularTags);
  },
};
</script>
