<template>
<q-layout view="hHh Lpr lff" class="shadow-2">
  <q-header style="background-color:#212F3C;">
    <q-toolbar>
      <q-btn flat round dense icon="menu" />
        <q-img align="center" style="width: 3%; height: 3%;" src="images/volant-logo.png" />
        <q-toolbar-title>
          Volant Dispatch Panel
          <span style="margin-left: 25%;"> {{ time }} </span>
        </q-toolbar-title>
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

  <!-- add/edit an event -->
    <q-dialog v-model="addEvent" no-backdrop-dismiss>
      <div>
        <q-form
          ref='event'
          @submit="onSubmit"
          @reset="onReset"
        >
          <q-card v-if="addEvent" style="width: 400px;">
            <q-toolbar class="bg-primary text-white">
              <q-toolbar-title>
                Schedule Order / {{ orderNo }}
              </q-toolbar-title>
              <q-btn flat round color="white" icon="close" v-close-popup></q-btn>
            </q-toolbar>
            <q-card-section class="inset-shadow">

              <q-input
                v-model="EventDate"
                label="Enter date"
                mask="####-##-##"
                color="blue-6"
                outlined
                style="padding-bottom: 20px;"
              >
                <template #append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                      <q-date v-model="EventDate" mask="YYYY-MM-DD" :options="optionsDate" />
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>

              <q-input
                v-model="EventTime"
                label="Enter Order Time"
                mask="##:##"
                color="blue-6"
                outlined
                style="padding-bottom: 20px;"
              >
                <template v-slot:append>
                  <q-icon name="access_time" class="cursor-pointer">
                    <q-popup-proxy transition-show="scale" transition-hide="scale">
                      <q-time v-model="EventTime" :option="optionsTime" />
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>

              <q-input
                v-model="eventColor"
                label="Color"
                outlined
                clearable
              >
                <template #append>
                  <q-icon name="colorize" class="cursor-pointer">
                    <q-popup-proxy>
                      <q-color v-model="eventColor"></q-color>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>

            </q-card-section>
            <q-card-actions align="right">
              <q-btn flat label="Submit" type="submit" color="primary"></q-btn>
              <q-btn flat label="Cancel" type="reset" color="primary" v-close-popup></q-btn>
            </q-card-actions>
          </q-card>
        </q-form>
      </div>
    </q-dialog>

  <q-drawer
    v-model="drawerLeft"
    show-if-above
    :width="420"
    :breakpoint="700"
    elevated
    content-class="bg-grey-3"
  >
    <q-tab-panels style="margin-top:22.5%;" dense v-model="tab" animated>
      <q-tab-panel class="no-padding no-margin" name="unscheduled">
        <q-list class="no-padding no-margin" separator style="width:100%;">
          <q-item
            clickable
            v-ripple
            v-for="order in unscheduledMoves" :key="order.order_id"
          >
            <q-item-section side avatar>
              <q-btn round>
               <q-avatar @click="scheduleEvent(order.ord_no, order.instructions, order.order_id, order.fcm_token)" color="indigo" text-color="white" icon="add" />
              </q-btn>
              <q-item-label caption>
                <p>Schedule</p>
                <!-- <p class="rider">Rider</p> -->
              </q-item-label>
            </q-item-section>

            <q-item-section>
              <q-item-label>
                <q-timeline dense color="indigo">
                  <q-timeline-entry
                    :title="order.sender_name"
                    :subtitle="order.made_at"
                    icon="location_on"
                    class="my-timeline text-max"
                    elevated
                  >
                    <div class="locations">
                      {{ order.origin[0] }}
                    </div>
                  </q-timeline-entry>

                  <q-timeline-entry
                    :title="order.recipient_name"
                    :subtitle="order.made_at"
                    icon="location_on"
                    class="my-timeline text-max"
                    elevated
                  >
                    <div class="locations">
                      {{ order.destination }}
                    </div>
                  </q-timeline-entry>
                </q-timeline>
              </q-item-label>
            </q-item-section>

            <q-item-section side top>
              <q-item-label caption>
                <q-btn
                  style="color: white; font-size:12px; top: 0.1em;"
                  class="bg-grey"
                  label="Unscheduled"
                />
              </q-item-label>
              <q-item-label>
                <q-btn
                  rounded
                  icon="chevron_right"
                  flat
                  style="margin-top:70px; margin-right:30px;"
                />
              </q-item-label>
            </q-item-section>

          </q-item>
          <q-separator class="no-margin" style="width:100%;" spaced inset="item" />
        </q-list>
      </q-tab-panel>
      <q-tab-panel class="no-padding no-margin" style="width:100%;" name="scheduled">
        <q-list class="no-padding no-margin" separator style="width:100%;">
          <q-item
            clickable
            v-ripple
             v-for="order in scheduledMoves" :key="order.order_id"
          >
            <q-item-section>
              <q-item-label>
                <q-timeline dense color="indigo">
                  <q-timeline-entry
                    :title="order.sender_name"
                    :subtitle="order.made_at"
                    icon="location_on"
                    class="my-timeline text-max2"
                    elevated
                  >
                    <div class="locations">
                      {{ order.origin[0] }}
                    </div>
                  </q-timeline-entry>
                  <q-separator style="width:100%;" spaced inset="item" />
                  <q-timeline-entry
                    :title="order.recipient_name"
                    :subtitle="order.picked_at"
                    icon="location_on"
                    class="my-timeline text-max2"
                    elevated
                  >
                    <div class="locations">
                      {{ order.destination }}
                    </div>
                  </q-timeline-entry>
                </q-timeline>
              </q-item-label>
              <!-- <q-item-label dense caption style="margin-top:-10%;">
                <div class="row">
                  <div class="col-md-1">
                    <q-icon name="account_circle" size="md" />
                  </div>
                  <div class="col-md-9">
                    <p style="margin-top:5%; margin-left: 10%;">Assigned To: {{ order.driverName }}</p>
                  </div>
                  <div class="col-md-2">
                    <q-btn
                      style="color: white; font-size:12px; margin-left:170%;"
                      class="bg-grey"
                      flat
                      label="Reassign"
                      @click="layout = true, assignRider(order.order_id, order.destination,
                        order.origin[0], order.total, order.truck_type, order.customerName, order.ord_no, order.user_id, 2)"
                    />
                  </div>
                </div>
              </q-item-label> -->
            </q-item-section>

            <q-item-section side top>
              <q-item-label caption>
                <q-btn
                  style="color: white; font-size:12px; margin-top:10%;"
                  class="bg-indigo"
                  flat
                  label="Unassigned"
                />
              </q-item-label>
              <q-item-label caption>
                <q-btn
                  rounded
                  icon="chevron_right"
                  flat
                  style="margin-top:40%;"
                />
              </q-item-label>
              <q-item-label caption>
                <q-btn
                  style="color: white; font-size:11px; margin-top:20px; width: 100px;"
                  class="bg-orange"
                  flat
                >
                  <span style="margin:1px;">Scheduled</span>
                </q-btn>
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-separator class="no-margin" style="width:100%;" spaced inset="item" />
        </q-list>
      </q-tab-panel>
    </q-tab-panels>
    <div class="row shadow-5 absolute-top">
      <q-toolbar class="bg-indigo leftHeader">
        <q-toolbar-title style="color: white; ">Scheduling Orders</q-toolbar-title>
        <!-- <q-input color="white" v-model="search" debounce="500" dense style="width:77%;" clearable>
          <template v-slot:append>white
            <q-icon style="color:white;" name="search" />
          </template>
        </q-input> -->
      </q-toolbar>
      <q-tabs v-model="tab" dense class="col-12 bg-grey-3" style="color:#1a237e; font-size:13px;">
        <q-tab name="unscheduled">
          {{ unscheduledCount }} Unscheduled
        </q-tab>
        <q-tab name="scheduled">
          {{ scheduledCount }} scheduled
        </q-tab>
      </q-tabs>
    </div>
  </q-drawer>

  <q-page-container>
    <router-view :scheduledMoves="scheduledMoves" :unscheduledMoves="unscheduledMoves" :event="event" @reschedule="reschedule" />
  </q-page-container>
</q-layout>
</template>

<style lang="sass">
.my-timeline
  font-size: 15px
  margin-top: 0
  margin-bottom: 0
.q-timeline__title
  font-size: 15px
  margin-top: 0
  margin-bottom: 0
.q-timeline__subtitle
  margin-top: 0
  margin-bottom: 0
.rider
  position: relative
  left: 0.4em
  top: -1em
#left_dialog .q-dialog__inner--maximized
  width: 400px
  height: 100%
  margin-top: 50px
.q-timeline
  margin-top: 0
.q-timeline__dot
    position: absolute;
    top: 0;
    bottom: 0;
    width: 10px;
.q-timeline__dot .q-icon
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    font-size: 16px;
    height: 38px;
    line-height: 38px;
    width: 100%;
    color: #fff;
.q-timeline__entry--icon .q-timeline__dot:after
    top: 38px
    left: 14px
    height: 130%
    border-left: 2px dotted #3f51b5
    background-color: #ffffff
.q-timeline--dense--right .q-timeline__entry--icon .q-timeline__dot
    left: -8px
    top: 25px
.text-max .q-timeline__content .q-timeline__title
    font-size: 15px
    margin-top: 0
    margin-bottom: 0
    text-overflow: ellipsis
    white-space: nowrap
    overflow: hidden
    width: 200px

.text-max .q-timeline__content .locations
    font-size: 15px
    margin-top: 0
    margin-bottom: 0
    text-overflow: ellipsis
    white-space: nowrap
    overflow: hidden
    width: 230px
.text-max2 .q-timeline__content .locations
    font-size: 15px
    margin-top: 5%
    margin-bottom: 0
    text-overflow: ellipsis
    white-space: nowrap
    overflow: hidden
    width: 230px
</style>

<script>
import { date } from 'quasar'
import io from 'socket.io-client'
import ordersApi from '../../apiService/ordersApi.js'
import { crono } from 'vue-crono'

export default {
  name: 'MainCalender',
  mixins: [crono],
  data () {
    return {
      welcome: 'Welcome to this Page',
      selectedDate: '',
      drawerLeft: false,
      unscheduledMoves: [],
      scheduledMoves: [],
      unscheduledCount: 0,
      scheduledCount: 0,
      tab: 'unscheduled',
      search: '',
      showDateScrollerAllDay: false,
      EventDate: '',
      eventColor: '',
      addEvent: false,
      Date: '',
      Time: '',
      EventTime: '',
      orderNo: '',
      event: [],
      details: '',
      isConnected: false,
      order_id: 0,
      time: undefined,
      fcmToken: ''
    }
  },
  watch: {
    unscheduledMoves (val) {
      this.unscheduledCount = val.length
      for (let i = 0; i < val.length; i++) {
        const newDate = date.formatDate(val[i].orderMadeAt, 'HH:mm a')
        val[i].made_at = 'Made At ' + newDate
      }
    },
    scheduledMoves (val) {
      this.scheduledCount = val.length
      for (let i = 0; i < val.length; i++) {
        const newDate = date.formatDate(val[i].orderMadeAt, 'HH:mm a')
        val[i].made_at = 'Made At ' + newDate
      }
    },
    event (val) {
    },
    isConnected (val) {
    }
  },
  created () {
    this.getAllUnscheduledMoves()
    this.getAllSchedulledMoves()
    this.Date = date.formatDate(new Date(), 'YYYY/MM/DD')
    this.Time = date.formatDate(new Date(), 'H')
    this.socketIO()
  },
  methods: {
    async getAllUnscheduledMoves () {
      const orders = await this.$store.dispatch('orders/getUnscheduledMoves')
      this.unscheduledMoves = orders
    },
    async getAllSchedulledMoves () {
      const orders = await this.$store.dispatch('orders/getScheduledMoves')
      this.scheduledMoves = orders
    },
    scrollerPopupStyle160 () {
      if (this.$q.screen.lt.sm) {
        return {
          width: '100vw',
          height: '100vh'
        }
      } else {
        return {
          maxHeight: '400px',
          height: '400px',
          width: '160px'
        }
      }
    },
    onSubmit () {
      const event = {}
      event.title = 'Order ' + this.orderNo
      event.details = this.details
      event.date = this.EventDate
      event.time = this.EventTime
      event.duration = 100
      event.bgcolor = this.eventColor
      event.icon = ''
      event.orderNo = this.orderNo
      event.orderId = this.order_id
      event.fcmToken = this.fcmToken
      // event.fcmToken = 'eeZ5SFBeSQSySgIcpqNp1k:APA91bEuPkA-BlOdzdz9XauC3twK1dusCPehAAk4Ojk2G8nIkfdj_AssUarasQLGhbh8fDfz9iJTuaZdwmXkbzEMs5RyQTVcwo10crwjqYYk522J7y7uCnhauD-laX-sI1ZmmE-2UqxB'
      this.event = event
      const message = 'Order ' + this.orderNo + ' Successfully Scheduled'
      this.successNotification(message)
      this.updateScheduleMove(this.orderNo, this.EventDate, this.EventTime, this.fcmToken)
      this.addEvent = false
      this.EventDate = ''
      this.EventTime = ''
      this.eventColor = ''
    },
    reschedule (event) {
      this.orderNo = event.orderNo
      this.details = event.details
      this.EventTime = event.time
      this.EventDate = event.date
      this.order_id = event.orderId
      this.fcmToken = 'eeZ5SFBeSQSySgIcpqNp1k:APA91bEuPkA-BlOdzdz9XauC3twK1dusCPehAAk4Ojk2G8nIkfdj_AssUarasQLGhbh8fDfz9iJTuaZdwmXkbzEMs5RyQTVcwo10crwjqYYk522J7y7uCnhauD-laX-sI1ZmmE-2UqxB'
      this.addEvent = true
    },
    onReset () {
      this.EventDate = ''
      this.EventTime = ''
      this.eventColor = ''
      this.event = []
    },
    scheduleEvent (orderId, details, ordId, fcmToken) {
      this.orderNo = orderId
      this.details = details
      this.order_id = ordId
      this.addEvent = true
      this.fcmToken = 'eeZ5SFBeSQSySgIcpqNp1k:APA91bEuPkA-BlOdzdz9XauC3twK1dusCPehAAk4Ojk2G8nIkfdj_AssUarasQLGhbh8fDfz9iJTuaZdwmXkbzEMs5RyQTVcwo10crwjqYYk522J7y7uCnhauD-laX-sI1ZmmE-2UqxB'
    },
    optionsDate (date) {
      return date >= this.Date
    },
    optionsTime (hr) {
      if (hr >= this.Time.parseInt()) {
        return true
      }
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
          timeout: 5000
        }
      )
    },
    async updateScheduleMove (orderNo, date, time, fcmToken) {
      const values = {
        orderNo: orderNo,
        date: date,
        time: time,
        registrationToken: fcmToken
      }
      const res = await this.$store.dispatch('orders/updateScheduleMove', values)
      console.log(res)
      for (let i = 0; i < this.unscheduledMoves.length; i++) {
        if (this.unscheduledMoves[i].ord_no === orderNo) {
          this.unscheduledMoves[i].is_scheduled = 1
          this.unscheduledMoves[i].scheduled_at = this.formatDate(date, time)
          this.scheduledMoves.unshift(this.unscheduledMoves[i])
          this.unscheduledMoves.splice(i, 1)
        }
      }
    },
    formatDate: function (date, time) {
      // create Date object from valid string inputs
      const datetime = new Date(date + ' ' + time)

      // format the output
      const month = datetime.getMonth() + 1
      const day = datetime.getDate()
      const year = datetime.getFullYear()

      let hour = datetime.getHours()
      if (hour < 10) {
        hour = '0' + hour
      }

      let min = datetime.getMinutes()
      if (min < 10) {
        min = '0' + min
      }

      let sec = datetime.getSeconds()
      if (sec < 10) {
        sec = '0' + sec
      }

      // put it all togeter
      const dateTimeString = month + '/' + day + '/' + year + ' ' + hour + ':' + min + ':' + sec
      return dateTimeString
    },
    socketIO: function () {
      const socket = io('/', {
        secure: true,
        rejectUnauthorized: false,
        path: '/server/socket.io',
        transports: ['polling']
      })
      socket.on('connect', () => {
        this.isConnected = true
      })
      socket.on('insertMoves', (data) => {
        setTimeout(() => {
          this.fetchOrder(data)
        }, 3000)
      })
    },
    async fetchOrder (orderId) {
      const order = await ordersApi.fetchOrder(orderId)
      this.storeOrderState(order)
      const title = 'Hi there Volant Admin'
      const message = 'A new Packaging And Moves Order Has been made 😎'
      const icon = 'images/logo.jpg'
      const sound = 'images/play1.mp3'
      this.successNotification(message)
      this.showDesktopNotification(message, title, icon, sound)
    },
    storeOrderState (order) {
      for (let i = 0; i < order.length; i++) {
        const order2 = order[i]
        this.unscheduledMoves.unshift(order2)
      }
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
    refresh: function () {
      window.location.href = '/dispatch/'
    },
    load () {
      const date1 = new Date()
      const newDate = date.formatDate(date1, 'dddd MMM Do')
      this.time = newDate + ' ' + (new Date().toLocaleTimeString())
    },
    dispatchRoute () {
      const nextUrl = this.$route.params.nextUrl
      this.$router.push((nextUrl != null ? nextUrl : '/'))
    },
    schedulerRoute () {
      const nextUrl = this.$route.params.nextUrl
      this.$router.push((nextUrl != null ? nextUrl : '/scheduler'))
    }
  },
  cron: {
    time: 1000,
    method: 'load'
  }
}
</script>
