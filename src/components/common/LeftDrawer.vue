<template>
    <a-drawer
            class="drawer-box"
            width="400px"
            title="东方五金网"
            placement="left"
            :closable="false"
            :visible="visible"
            :after-visible-change="afterVisibleChange"
            @close="onClose"
    >
        <div class="drawer-box-content">
            <a href="http://www.baidu.com" target="_blank">
                <img src="../../assets/img/icon/baidu.png" alt="">
                <p>百度</p>
            </a>
        </div>
        <div class="drawer-box-content">
            <a href="http://360.cn" target="_blank">
                <img src="../../assets/img/icon/360.png" alt="">
                <p>360</p>
            </a>
        </div>
        <div class="drawer-box-content">
            <a href="http://weibo.com" target="_blank">
                <img src="../../assets/img/icon/weibo.png" alt="">
                <p>微博</p>
            </a>
        </div>
        <div class="drawer-box-content">
            <a href="http://360.cn" target="_blank">
                <img src="../../assets/img/icon/360.png" alt="">
                <p>360</p>
            </a>
        </div>
        <div class="drawer-box-content">
            <a href="http://360.cn" target="_blank">
                <img src="../../assets/img/icon/360.png" alt="">
                <p>360</p>
            </a>
        </div>
    </a-drawer>
</template>

<script>
  export default {
    name: "LeftDrawer",
    props: ["LeftDrawerShow"],
    data() {
      return {
        visible: false,
      };
    },
    methods: {
      afterVisibleChange(val) {
        console.log('visible', val);
      },
      showDrawer() {
        this.visible = true;
      },
      onClose() {
        this.visible = false;
      },
    },
    watch: {
      LeftDrawerShow: function (n) {
        if (n == false) {
          this.visible = true
        } else {
          this.visible = n
        }
      }
    }
  }
</script>

<style scoped>

</style>