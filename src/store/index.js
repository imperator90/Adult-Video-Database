const path = require("path")

import Vue from 'vue'
import Vuex from 'vuex'
import Videos from './modules/videos.js'
import Performers from './modules/performers.js'
import Tags from './modules/tags.js'
import Websites from './modules/websites.js'
import Bookmarks from './modules/bookmarks.js'
import Settings from './modules/settings.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: () => ({
    log: '',
    isLogVisible: false,
    notifications: [],
    isRouteChanged: false,
    quantityRecentVideos: 20,
    hoveredImage: false,
    hoveredImageId: '',
    hoveredImageType: '',
    hoveredImageTime: 0,
    hoveredImageX: 0,
    hoveredImageY: 0,
    x: 0,
    y: 0,
    pathToUserData: '',
  }),
  getters: {
    getNotifications(state) {
      return state.notifications
    },
    getPathToUserData(state) {
      return path.join(state.pathToUserData, 'userfiles')
    },
  },
  mutations: {
    setNotification(state, notification) {
      state.notifications.push({
        id: Math.ceil(Math.random()*new Date().getTime()),
        showing: true,
        type: notification.type,
        text: notification.text,
      })
    },
    removeNotification(state, id) {
      state.notifications = state.notifications.filter(n => n.id !== id)
    },
    clearAllNotifications(state) {
      state.notifications = []
    },
    changeQuantityRecentVideos(state, value) {
      state.quantityRecentVideos = value
    },
  },
  actions: {
    setNotification({ state, commit}, notification) {
      commit('setNotification', notification)
    },
    removeNotification({ state, commit}, id) {
      commit('removeNotification', id)
    },
    clearAllNotifications({ state, commit}) {
      commit('clearAllNotifications')
    },
  },
  modules: {
    Videos,
    Performers,
    Tags,
    Websites,
    Bookmarks,
    Settings,
  }
})
