import Vue from 'vue'
import Vuex from 'vuex'

// import createPersistedState from 'vuex-persistedstate'
// import SecureLS from 'secure-ls'
// const ls = new SecureLS({ isCompression: false })
import example from './module-example'
import orders from './orders'
import riders from './riders'
import calendar from './calender'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      example,
      orders,
      riders,
      calendar
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    // plugins: [createPersistedState()],
    // plugins: [
    //   createPersistedState({
    //     storage: {
    //       getItem: key => ls.get(key),
    //       setItem: (key, value) => ls.set(key, value),
    //       removeItem: key => ls.remove(key)
    //     }
    //   })
    // ],
    strict: process.env.DEV
  })

  return Store
}
