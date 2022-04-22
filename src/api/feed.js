import axious from '@/api/axios';

const getFeed = (apiUrl) => {
  return axious.get(apiUrl);
};

export default {
  getFeed,
};
