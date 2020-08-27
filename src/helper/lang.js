import Vue from 'vue'
import VueI18n from 'vue-i18n'
import locale from 'element-ui/lib/locale'
import en from './lang/en'
import zh from './lang/zh'

Vue.use(VueI18n)
const i18n = new VueI18n({
  locale: localStorage.lang || 'zh',
  messages: { en, zh }
})
// 实现element插件的多语言切换
locale.i18n((key, value) => i18n.t(key, value))

export default i18n
