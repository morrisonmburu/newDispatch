<template>
    <q-layout view="hHh Lpr lff" class="shadow-2">
      <q-header style="background-color:#212F3C;">
        <q-toolbar>
          <q-btn flat @click="drawerLeft = !drawerLeft" round dense icon="menu" />
          <q-toolbar-title>
          <q-img align="center" style="width: 3%; height: 3%;" src="images/volant-logo.png" />
            Volant Dispatch Panel
            <span style="margin-left: 25%;"> {{ time }} </span>
          </q-toolbar-title>
          <div style="padding-right: 10px;">
            <span> Autoassign </span>
            <q-toggle v-model="Autoassign1" />
          </div>
          <div style="padding-right: 10px;">
          <q-btn round left @click="refresh">
              <q-avatar>
                <q-icon name="refresh"></q-icon>
              </q-avatar>
          </q-btn>
          </div>
          <q-btn round left>
              <q-avatar class="bg-indigo-10">
                <q-img align="center" style="width: 90%; height: 90%;" src="images/volant-logo.png" />
                <q-badge class="rider_badge_front" floating color="green" rounded><span style="color:transparent; font-size:3px;">0</span></q-badge>
              </q-avatar>
              <q-menu>
                <q-list style="min-width: 100px">
                <q-item clickable v-close-popup @click="dispatchRoute">
                  <q-item-section right style="font-size: 32px;">
                    <q-icon right name="map"></q-icon>
                  </q-item-section>
                  <q-item-section left>
                    Dispatcher
                  </q-item-section>
                </q-item>
                <q-separator />
                <q-item clickable v-close-popup @click="schedulerRoute">
                  <q-item-section right style="font-size: 32px;">
                    <q-icon right name="alarm"></q-icon>
                  </q-item-section>
                  <q-item-section left>
                    Scheduler
                  </q-item-section>
                </q-item>
                <q-separator />
                <q-item clickable v-close-popup @click="logout">
                  <q-item-section right style="font-size: 32px;">
                    <q-icon right name="exit_to_app"></q-icon>
                  </q-item-section>
                  <q-item-section left>
                    Logout
                  </q-item-section>
                </q-item>
                </q-list>
              </q-menu>
          </q-btn>
        </q-toolbar>
      </q-header>

      <q-drawer
        v-model="drawerLeft"
        show-if-above
        :width="400"
        :breakpoint="700"
        elevated
        content-class="bg-grey-3"
      >
      <LeftLayout :sendOrder="sendOrder" :Autoassign1="Autoassign1"></LeftLayout>
      </q-drawer>

      <div class="q-mini-drawer-hide absolute" id="leftBtn">
          <q-btn
            dense
            unelevated
            color="grey"
            style="border-radius: 0px; height: 50px; width: 40px"
            :icon="drawerLeft ? 'chevron_left' : 'chevron_right'"
            @click="drawerLeft = !drawerLeft"
          />
      </div>

      <q-drawer
        side="right"
        v-model="drawerRight"
        show-if-above
        :width="350"
        :breakpoint="500"
        elevated
        content-class="bg-grey-3"
      >
        <RightLayout :sendInactiveRider="sendInactiveRider" :activateRider="activateRider" :makeOnline="makeOnline" :makeOffline="makeOffline"></RightLayout>
      </q-drawer>

      <div class="q-mini-drawer-hide absolute" id="rightBtn">
          <q-btn
            dense
            unelevated
            color="grey"
            style="border-radius: 0px; height: 50px; width: 40px"
            :icon="drawerRight ? 'chevron_right' : 'chevron_left'"
            @click="drawerRight = !drawerRight"
          />
      </div>

      <q-page-container>
        <router-view />
      </q-page-container>
    </q-layout>
</template>
<style lang="sass">
  .rider_badge_front
    position: absolute
    border-radius: 40px
    top: 27px
    width: 7px
    height: 12px
    box-shadow: 0 0 0 0px
</style>
<style>

  @keyframes ripple {
    0%, 35% {
      transform: scale(0);
      opacity: 1;
    }
    50% {
      transform: scale(1.5);
      opacity: 0.8;
    }
    100% {
      opacity: 0;
      transform: scale(4);
    }
  }

  .rider_badge_front:after {
    content: '';
    mix-blend-mode: screen;
    position: absolute;
    top: 0px;
    left: 0px;
    width: 12px;
    height: 12px;
    background: rgba(3, 245, 75, 0.938);
    opacity: 1.5;
    border-radius: 100%;
    transform-origin: 50% 50%;
  }

  .rider_badge_front::after {
    animation: ripple 1.2s ease-out infinite;
    animation-delay: 1s;
  }
</style>
<script>
import LeftLayout from './LeftLayout.vue'
import RightLayout from './RightLayout.vue'
import io from 'socket.io-client'
import ordersApi from '../apiService/ordersApi.js'
import { date } from 'quasar'

import { crono } from 'vue-crono'

export default {
  mixins: [crono],
  data () {
    return {
      drawerLeft: false,
      drawerRight: false,
      link: '1',
      dialog: false,
      maximizedToggle: true,
      isConnected: false,
      socketMessage: [],
      sendOrder: [],
      sendInactiveRider: [],
      activateRider: [],
      makeOnline: [],
      makeOffline: [],
      distances: [],
      user: [],
      Autoassign1: false,
      time: undefined
    }
  },
  watch: {
    orders (val) {
    },
    isConnected (val) {
    },
    socketMessage (val) {
    }
  },
  components: {
    LeftLayout,
    RightLayout
  },
  created () {
    this.socketIO()
    const user = JSON.parse(localStorage.getItem('dispatch.user'))
    this.user = user
    this.load()
  },
  methods: {
    socketIO: function () {
      const socket = io('https://dispatchpanel.volantltd.com', {
        secure: true,
        rejectUnauthorized: false,
        path: '/server/socket.io',
        transports: ['polling']
      })
      socket.on('connect', () => {
        this.isConnected = true
      })
      socket.on('connected', () => {
        console.log('connected')
      })
      socket.on('orderUpdates', data => {
        this.socketMessage = data
      })
      socket.on('orderInserts', data => {
        setTimeout(() => {
          this.fetchOrder(data)
        }, 3000)
      })
      socket.on('orderComplete', data => {
        console.log(data)
      })
      socket.on('ridersInserts', data => {
        this.sendInactiveRider = data
        const title = 'Hi there Volant Admin'
        const message = 'A new Associate Has been made 😎'
        const icon = 'images/logo.jpg'
        const sound = 'images/play1.mp3'
        this.showDesktopNotification(message, title, icon, sound)
      })
      socket.on('ridersUpdatesActive', data => {
        this.activateRider = data
        const title = 'Hi there Volant Admin'
        const message = 'An Associate Has Been Acitvated Has been made 😎'
        const icon = 'images/logo.jpg'
        const sound = 'images/once.mp3'
        this.showDesktopNotification(message, title, icon, sound)
      })
      socket.on('ridersUpdatesOnline', data => {
        this.makeOnline = data
        const title = 'Hi there Volant Admin'
        const message = 'Associate Is Online 😎'
        const icon = 'images/logo.jpg'
        const sound = 'images/once.mp3'
        this.showDesktopNotification(message, title, icon, sound)
      })
      socket.on('ridersUpdatesOffline', data => {
        this.makeOffline = data
        const title = 'Hi there Volant Admin'
        const message = 'Associate Is Offline 😎'
        const icon = 'images/logo.jpg'
        const sound = 'images/once.mp3'
        this.showDesktopNotification(message, title, icon, sound)
      })
    },
    async fetchOrder (orderId) {
      const sendOrder = await ordersApi.getOrder(orderId)
      this.sendOrder = sendOrder
      const title = 'Hi there Volant Admin'
      const message = 'A new Order Has been made 😎'
      const icon = 'images/logo.jpg'
      const sound = 'images/play1.mp3'
      this.successNotification(message)
      this.showDesktopNotification(message, title, icon, sound)
    },
    successNotification: function (message) {
      this.$notify.create(
        {
          progress: true,
          color: 'positive',
          textColor: 'white',
          icon: 'done',
          message: message,
          position: 'top-right',
          actions: [
            { label: 'Dismiss', color: 'white', handler: () => { /* ... */ } }
          ],
          timeout: 10000
        }
      )
    },
    showDesktopNotification: function (message, body, icon, sound) {
      const timeout = 10000
      this.requestNotificationPermissions()
      const instance = new Notification(
        message, {
          body: body,
          icon: icon
        }
      )
      instance.onclick = function () {
        // Something to do
      }
      instance.onerror = function () {
        // Something to do
      }
      instance.onshow = function () {
      }
      instance.onclose = function () {
        // Something to do
      }
      this.$playSound(sound)
      setTimeout(instance.close.bind(instance), timeout)
      return false
    },
    requestNotificationPermissions: function () {
      var Notification = window.Notification || window.mozNotification || window.webkitNotification
      Notification.requestPermission(function (permission) {
      })
      if (Notification.permission !== 'denied') {
        Notification.requestPermission(function (permission) {
        })
      }
    },
    logout () {
      localStorage.removeItem('dispatch.jwt')
      localStorage.removeItem('dispatch.user')
      const nextUrl = this.$route.params.nextUrl
      this.$router.push((nextUrl != null ? nextUrl : '/login'))
    },
    dispatchRoute () {
      const nextUrl = this.$route.params.nextUrl
      this.$router.push((nextUrl != null ? nextUrl : '/'))
    },
    schedulerRoute () {
      const nextUrl = this.$route.params.nextUrl
      this.$router.push((nextUrl != null ? nextUrl : '/scheduler'))
    },
    refresh: function () {
      window.location.href = '/dispatch/'
    },
    load () {
      const date1 = new Date()
      const newDate = date.formatDate(date1, 'dddd MMM Do')
      this.time = newDate + ' ' + (new Date().toLocaleTimeString())
    }
  },
  cron: {
    time: 1000,
    method: 'load'
  }
}
</script>
