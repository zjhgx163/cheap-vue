<script>
export default {
  mounted() {
    //解决iphone移动端的延迟
    // FastClick.attach(document.body);
    // this.selectedTab = 'main';
    this.mockLogin();

    // this.windowWidth = window.innerWidth;
    // window.onresize = () => {
    //   this.windowWidth = window.innerWidth;
    // };
  },
  methods: {
    mockLogin() {
      this.$axios.post(`${global.config.domain}/user/mock/login`, {}).then((res) => {
        console.log(res.data);
      });
    },
  },
};
</script>
