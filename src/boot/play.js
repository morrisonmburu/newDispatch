import Vue from 'vue'

Vue.prototype.$playSound = (path, volume = 1) => {
  var audio = new Audio(path)
  audio.volume = volume
  audio.play()
}
