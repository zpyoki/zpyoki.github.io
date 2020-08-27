<template>
  <div id="layout-tab">
    <el-tag v-for="item of pageList" :key="item.href" :closable="!item.fixed" :disable-transitions="false"
      :effect="item.checked ? 'light' : 'plain'" @close="closePage({ page: item, type: '关闭标签' })"
      @click="checkPage({ title: item.title, href: item.href, checked: true, from: 'tab' })"
      @dblclick.native="dblPage(item)"
      @click.right.prevent.native="showRightMenu($event, item, item.fixed)"
    >
      {{item.title}}
    </el-tag>
    <transition name="fade-dialog" mode="out-in">
      <div class="right-menu" ref="rightMenu" v-show="showMenu" @click="operatePage">
        <el-dropdown-item>刷新</el-dropdown-item>
        <el-dropdown-item>关闭标签</el-dropdown-item>
        <el-dropdown-item>关闭其他标签</el-dropdown-item>
        <el-dropdown-item>关闭全部标签</el-dropdown-item>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'

export default {
  name: 'LayoutTab',
  data () {
    return {
      showMenu: false,
      handlerPage: {}
    }
  },
  computed: {
    ...mapState('admin/layout/tab', ['pageList'])
  },
  methods: {
    ...mapActions('admin/layout/tab', ['checkPage']),
    ...mapMutations('admin/layout/tab', ['closePage']),
    showRightMenu (e, page, fixed) {
      this.handlerPage = page
      if (!fixed) {
        this.$refs.rightMenu.style.left = e.pageX + 'px'
        this.$refs.rightMenu.style.top = e.pageY + 'px'
        this.showMenu = true
        document.addEventListener('click', () => {
          this.showMenu = false
          document.removeEventListener('click', () => {})
        })
      }
    },
    operatePage (e) {
      const operateType = e.target.innerText
      this.$store.dispatch('admin/layout/tab/handlerPage', { page: this.handlerPage, type: operateType })
    },
    dblPage (page) {
      this.handlerPage = page
      this.$store.dispatch('admin/layout/tab/handlerPage', { page: this.handlerPage, type: '刷新' })
    }
  }
}
</script>

<style lang='stylus' scoped>
  #layout-tab
    overflow auto
    height $layout-tab-height + $space-area
    line-height $layout-tab-height + $space-area
    box-shadow 0 2px 2px 0 rgba(0, 0, 0, 0.1)
  .el-tag
    margin-left: 10px
    cursor pointer
    user-select none
    &:hover
      background #ebf9f9
  .right-menu
    position absolute
    z-index 918
    width 150px
    background #fff
    border-radius 4px
    box-shadow 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
</style>
