<template>
  <div>
    <mcv-loading v-if="isLoading" />

    <mcv-error-message v-if="error" />

    <div v-if="feed">
      <div
        class="article-preview"
        v-for="(article, index) in feed.articles"
        v-bind:key="index">
        <div class="article-meta">
          <router-link
            :to="{
              name: 'userProfile',
              params: {slug: article.author.username},
            }">
            <img v-bind:src="article.author.image" alt=""
          /></router-link>

          <div class="info">
            <router-link
              :to="{
                name: 'userProfile',
                params: {slug: article.author.username},
              }"
              class="author">
              {{ article.author.username }}
            </router-link>

            <span class="date">{{ article.createdAt }}</span>
          </div>

          <div class="pull-xs-right">Add to favorites</div>
        </div>

        <router-link
          class="preview-link"
          :to="{name: 'article', params: {slug: article.slug}}">
          <h1>{{ article.title }}</h1>
          <p>{{ article.description }}</p>
          <span>Read more...</span>
          <mcv-tagList
            :tagList="article.tagList"
            v-if="article.tagList.length" />
        </router-link>
      </div>

      <mcv-pagination
        :total="feed.articlesCount"
        :limit="limit"
        :current-page="currentPage"
        :url="baseUrl" />
    </div>
  </div>
</template>

<script>
import {actionTypes} from '@/store/modules/feed';
import {mapState} from 'vuex';
import McvPagination from '@/components/Pagination';
import McvLoading from '@/components/Loading.vue';
import McvErrorMessage from '@/components/ErrorMessage.vue';
import McvTagList from '@/components/TagList.vue';
import {LIMIT} from '@/helpers/vars';
import {parseUrl, stringify} from 'query-string';

export default {
  name: 'McvFeed',
  data() {
    return {
      limit: LIMIT,
    };
  },
  components: {
    McvPagination,
    McvLoading,
    McvErrorMessage,
    McvTagList,
  },
  props: {
    apiUrl: {
      type: String,
      required: true,
    },
  },

  computed: {
    ...mapState({
      isLoading: (state) => state.feed.isLoading,
      feed: (state) => state.feed.data,
      error: (state) => state.feed.error,
    }),

    currentPage() {
      //вычисляем через Route текущую страницу
      return Number(this.$route.query.page || '1');
    },
    baseUrl() {
      return this.$route.path;
    },
    offset() {
      return this.currentPage * LIMIT - LIMIT;
    },
  },
  watch: {
    currentPage() {
      this.fetchFeed();
    },
  },

  mounted() {
    this.fetchFeed();
  },

  methods: {
    fetchFeed() {
      const parsedUrl = parseUrl(this.apiUrl);
      const stringifiedParams = stringify({
        limit: LIMIT,
        offset: this.offset,
        ...parsedUrl.query,
      });
      const apiUrlWithParams = `${parsedUrl.url}?${stringifiedParams}`;
      this.$store.dispatch(actionTypes.getFeed, {
        apiUrl: apiUrlWithParams,
      });
    },
  },
};
</script>
