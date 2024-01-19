import { defineStore } from 'pinia';
import { axios } from 'boot/axios';
import { Loading } from 'quasar';
import { Notify } from 'quasar';

export const useYunpanStore = defineStore('yunpan', {
  state: () => ({
    items: [],
    topArticleList: [],
    sideItems: [],
    isListEnd: false,
    pageNavigateHidden: true,
    stopLoading: false,
    max: 0,
    prefetchFlag: 0,
    itemDetail: {},
    previousItem: {},
    nextItem: {},
    replyList: [],
    replyMax: 0,
    isReplyListEnd: false,

    contentStr: '',
    isInvalid: false,
    userAgent: '',
  }),

  getters: {
    doubleCount(state) {
      return state.counter * 2;
    },
  },

  actions: {
    getItemList(page, query, tag, x, redirect) {
      // 取top article
      axios.post(`${global.config.domain}/yunpan/top/article/list`, {}).then((res) => {
        this.topArticleList = res.data.data;
      });
      return axios
        .post(`${global.config.domain}/yunpan/resource/list`, {
          page: page === undefined ? 1 : page,
          tag: tag,
          query: query,
        })
        .then((res) => {
          if (res.data.code < 0) {
            redirect({ path: '/error/404' }, 301);
          } else {
            this.items = res.data.data.records;
            this.max = Math.ceil(res.data.data.total / res.data.data.size);
            if (res.data.data.records.length < 30 || page >= this.max) {
              this.isListEnd = true;
              this.pageNavigateHidden = false;
              this.stopLoading = true;
            }

            //只有点击‘搜索’才记录关键词
            if (x !== undefined && x != null) {
              axios
                .post(`${global.config.domain}/yunpan/search/log`, {
                  searchKeyword: query,
                  total: res.data.data.total,
                  x: x,
                })
                .then((res) => {
                  console.log(res.data.data);
                });
            }
          }

          console.log('hidden = ' + this.pageNavigateHidden);
          console.log('this.current  = ' + page);
          console.log('this.isListEnd  = ' + this.isListEnd);
          Loading.hide();
        });
    },
    getYunpanItemContent(id, redirect) {
      return axios.post(`${global.config.domain}/yunpan/item/public/${id}`).then((res) => {
        if (res.data.code < 0) {
          Loading.hide();

          Notify.create({
            type: 'negative',
            icon: 'warning',
            message: `${res.data.msg}`,
          });
          if (res.data.code == -210) {
            redirect({ path: '/list' }, 404);
          } else {
            redirect({ path: '/list' }, 301);
          }
        } else {
          this.itemDetail = res.data.data.item;
          this.previousItem = res.data.data.previousItem;
          this.nextItem = res.data.data.nextItem;
          this.isInvalid = res.data.data.invalid;
          this.contentStr = res.data.data.contentStr;
          this.replyList = res.data.data.firstReplyPage.records;
          this.replyMax = Math.ceil(
            res.data.data.firstReplyPage.total / res.data.data.firstReplyPage.size
          );
          if (this.replyList.length < 30) {
            this.isReplyListEnd = true;
          }

          if (this.itemDetail == null) {
            redirect({ path: '/list' }, 404);
          }
          if (res.data.data.redirectId != null && res.data.data.redirectId > 0) {
            redirect({ path: '/d/' + res.data.data.redirectId }, 301);
          }

          Loading.hide();
        }
      });
    },

    getYunpanArticleContent(id, redirect) {
      return axios.post(`${global.config.domain}/yunpan/article/${id}`).then((res) => {
        if (res.data.code < 0) {
          Notify.create({
            type: 'negative',
            icon: 'warning',
            message: `${res.data.msg}`,
          });
          Loading.hide();
          if (res.data.code == -210) {
            redirect({ path: '/list' }, 404);
          } else {
            redirect({ path: '/list' }, 301);
          }
        } else {
          this.itemDetail = res.data.data.article;
          this.replyList = res.data.data.firstReplyPage.records;
          this.contentStr = res.data.data.contentStr;
          this.replyMax = Math.ceil(
            res.data.data.firstReplyPage.total / res.data.data.firstReplyPage.size
          );

          if (this.itemDetail == null) {
            redirect({ path: '/list' }, 301);
          }

          Loading.hide();
        }
      });
    },
    getSideYunpanList() {
      // console.log('$$$$$$' + this.query);
      // this.$q.loading.show({
      //   delay: 400, // ms
      // });
      return axios
        .post(`${global.config.domain}/yunpan/resource/list`, {
          page: 1,
        })
        .then((res) => {
          this.sideItems = res.data.data.records;

          // this.$q.loading.hide();
        });
    },
  },
});
