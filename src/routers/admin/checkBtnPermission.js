import Vue from 'vue'
import dink from 'dinkjs'

// 判断按钮级权限
const checkBtnPermission = function (value) {
  const permissionArr = JSON.parse(dink.decrypt(dink.getStorage('ui'))).ps
  if (permissionArr.indexOf(value.toString()) > -1) {
    return true
  } else {
    return false
  }
}

Vue.directive('permission', {
  inserted: function (el, binding) {
    if (!checkBtnPermission(binding.value)) {
      el.parentNode.removeChild(el)
    }
  }
})

export default checkBtnPermission
