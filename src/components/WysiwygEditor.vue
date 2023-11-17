<template>
  <q-dialog v-model="editorShow" :maximized="maxized" @hide="dialogHide">
    <q-card class="YL__editor_card">
      <q-bar>
        <!-- <q-icon name="network_wifi" />
        <q-icon name="network_cell" />
        <q-icon name="battery_full" /> -->
        <!-- <div>9:34</div> -->
        <q-space />
        <q-btn dense flat icon="close" v-close-popup>
          <q-tooltip>Close</q-tooltip>
        </q-btn>
      </q-bar>
      <q-card-section>
        <q-form @submit="onSubmit" class="q-gutter-sm">
          <div class="q-gutter-sm">
            <q-input
              dense
              outlined
              standout="bg-yellow"
              v-model="title"
              placeholder="标题"
              hide-bottom-space
              autofocus
              type="text"
            />
          </div>
          <q-editor
            ref="editor"
            v-model="post"
            height="400px"
            :definitions="{
              upload: {
                tip: 'Upload to cloud',
                icon: 'photo',
                handler: uploadIt,
              },
            }"
            :toolbar="[
              ['bold', 'italic', 'strike', 'underline'],
              ['link'],
              ['upload'],
              ['undo', 'redo'],
            ]"
          />
          <q-select
            outlined
            rounded
            standout="bg-yellow"
            v-model="tag"
            :options="options"
            label="标签"
            dense
            options-dense
            hide-bottom-space
            style="max-width: 200px"
          />

          <div class="q-mt-sm">
            <q-btn label="提交" type="submit" color="light-green" size="xs" />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<style lang="sass">
.YL
  &__editor_card
    @media(min-width: $breakpoint-xs-max)
      width: 600px
    @media(max-width: $breakpoint-xs-max)
      width: 100%
</style>
<script>
import { Screen } from 'quasar';

export default {
  name: 'WysisygEditor',
  data() {
    return {
      post: '',
      title: '',
      options: ['影视', '动漫', '学习', '游戏/软件', '音乐/音频', '图片', '书籍', '求资源', '其他'],
      tag: '',
      maxized: Screen.gt.sm ? false : true,
      filesSizeTotal: 0,
    };
  },
  computed: {
    editorShow: {
      set: function (newV) {
        this.$emit('editor-show-changed', newV);
        // this.isEditorShow = newV;
      },
      get: function () {
        return this.isEditorShow;
      },
    },
  },
  props: ['isEditorShow'], // 微信auth code
  emits: ['editor-show-changed'],

  mounted() {
    console.log('WysisygEditor is mounted');
  },

  methods: {
    dialogHide() {},
    uploadIt() {
      this.$refs.editor.focus();
      //   const post = this.post;
      // create an input file element to open file dialog
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = '.png, .jpg, .jpeg, .gif, .webp'; // file extensions allowed
      let file;
      input.onchange = (_) => {
        var image = new Image();
        image.dynsrc = input.value;

        const files = Array.from(input.files);
        file = files[0];
        console.log('size' + file.size);
        this.filesSizeTotal += file.size;
        if (this.filesSizeTotal > 5 * 1024 * 1024) {
          this.$q.notify({
            type: 'negative',
            message: '图片不能超过5M',
            icon: 'warning',
          });
          this.filesSizeTotal = this.filesSizeTotal - file.size;
          return;
        }
        // lets load the file as dataUrl
        const reader = new FileReader();
        let dataUrl = '';
        reader.onloadend = function () {
          dataUrl = reader.result;
          // insert result to the cursor of your post
          document.execCommand(
            'insertHTML',
            true,
            '<div><img src="' + dataUrl + '" style="width:50%; height:50%" /></div>'
          );

          //   post.body += '<div><img src="' + dataUrl + '" style="width:50%; height:50%" /></div>';
          //   console.log(post.body);
        };
        reader.readAsDataURL(file);
      };
      input.click();
    },
    onSubmit() {
      if (this.title == '') {
        this.$q.notify({
          type: 'negative',
          message: '请输入标题',
          icon: 'warning',
        });
        return;
      }
      if (this.tag == '') {
        this.$q.notify({
          type: 'negative',
          message: '请选择标签',
          icon: 'warning',
        });
        return;
      }
      if (this.post == '') {
        this.$q.notify({
          type: 'negative',
          message: '请输入内容',
          icon: 'warning',
        });
        return;
      }
      this.$q.loading.show({
        delay: 200, // ms
      });
      this.$axios
        .post(`${global.config.domain}/yunpan/post`, {
          title: this.title,
          tag: this.tag,
          content: this.post,
        })
        .then((res) => {
          this.$q.loading.hide();
          if (res.data.code < 0) {
            if (!this.$q.localStorage.has('userInfo')) {
              if (this.isWeixin()) {
                window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxa249d330e183eb43&redirect_uri=https://www.hjdang.com/auth/xxx&response_type=code&scope=snsapi_userinfo&state=yunpanList#wechat_redirect`;
              } else {
                this.$router.push({ path: 'login' });
              }
            } else {
              this.$q.notify({
                type: 'negative',
                icon: 'warning',
                message: `${res.data.msg}`,
              });
            }
          } else {
            this.post = '';
            this.title = '';
            this.tag = '';
            this.$emit('editor-show-changed', false);
          }
        });
    },
    isWeixin() {
      var ua = window.navigator.userAgent.toLowerCase();
      console.log(ua);
      if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>
