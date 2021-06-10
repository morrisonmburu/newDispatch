<template>
  <q-page class="column" style="overflow: hidden">
    <q-dialog v-model="card">
      <q-card class="my-card">
       <q-timeline dense color="indigo">
          <q-timeline-entry
              :title="order.sender_name"
              :subtitle="order.made_at"
              icon="location_on"
              class="my-timeline2 text-max"
              elevated
            >
              <div class="locations">
                {{ order.pickup }}
              </div>
            </q-timeline-entry>

            <q-timeline-entry
              :title="order.recipient_name"
              :subtitle="order.made_at"
              icon="location_on"
              class="my-timeline2 text-max"
              elevated
            >
            <div class="locations">
              {{ order.destination }}
            </div>
          </q-timeline-entry>
        </q-timeline>

        <q-btn
          color="primary"
          class="absolute"
          label="Unassigned"
          style="top: 2em; right: 12px; transform: translateY(-50%);"
        />

        <q-card-section>
          <div class="row no-wrap items-center">
            <div class="col text-h6 ellipsis">
              Scheduled For
            </div>
            <div class="col-auto text-grey text-caption q-pt-xs row no-wrap items-center">
              <q-icon style="right: 5px; font-size: 20px;" name="alarm" />
              <span> {{ order.scheduled_at }} </span>
            </div>
          </div>
        </q-card-section>

        <q-card-section>
          <q-card class="my-card" bordered elevated>
              <q-item class="no-margin no-padding">
              <q-item-section top avatar style="margin-top:10px; margin-left: 10px">
                <q-btn round>
                  <q-avatar color="bg-indigo" style="background-color: blue;">
                  <span style="color: white;">{{ order.firstLetter }}</span>
                  <q-badge class="rider_badge" floating color="red" rounded><span style="color:transparent; font-size:3px;">0</span></q-badge>
                  </q-avatar>
                </q-btn>
              </q-item-section>

              <q-item-section style="margin-top:20px; margin-bottom:20px;">
                <q-item-label>{{ order.customerName }}</q-item-label>
                <q-item-label style="color:grey;">{{ order.customerPhone }}</q-item-label>
              </q-item-section>

              <q-item-section side top style="margin-top:10px; margin-right:25px;">
                <q-item-label class="absolute" style="top:60%; right: 4%; font-size:12px; color:grey;">{{ order.customerDate }}</q-item-label>
              </q-item-section>

              </q-item>
          </q-card>
        </q-card-section>

        <q-separator />

        <q-card-actions>
          <q-btn flat color="primary" label="Reschedule" @click="reschedule(order.order_id)" class="q-mr-xl" />
          <q-btn v-close-popup flat color="negative" label="close" icon="close" style="margin-left: 10em;" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <div style="max-width: 100%; width: 100%; height: 100%; max-height: 100%;">
      <q-toolbar class="text-primary row justify-between items-center">
        <q-btn-group flat class="col-3">
          <q-btn color="primary" flat label="Prev" @click="calendarPrev" />
          <q-btn color="primary" flat label="Next" @click="calendarNext" />
        </q-btn-group>

      </q-toolbar>
      <q-separator class="full-width" />
      <q-calendar
        ref="calendar"
        class="calendar"
        v-model="selectedDate"
        view="month"
        animated
        day-height="94"
        day-padding="10px 0 0 0"
      >
        <template #day="{ timestamp }">
          <template v-for="(event, index) in getEvents(timestamp.date)">
            <q-badge
              :key="index"
              style="width: 100%; cursor: pointer; height: 20px; max-height: 20px"
              class="q-event"
              :color="event.bgcolor"
              :class="badgeClasses(event, 'day')"
              :style="badgeStyles(event, 'day')"
              @click.stop.prevent="showEvent(event)"
            >
            <q-icon v-if="event.icon" :name="event.icon" class="q-mr-xs"></q-icon>
            <span class="ellipsis no-margin no-padding" style="font-size: 13px;">{{ event.title }}</span>
          </q-badge>
          </template>
        </template>
      </q-calendar>
    </div>
  </q-page>
</template>

<style lang="sass">
.my-timeline2
  font-size: 15px
  margin-top: 0
  margin-bottom: 0
  margin-left: 2em
.q-timeline__title
  font-size: 15px
  margin-top: 0
  margin-bottom: 0
.q-timeline__subtitle
  margin-top: 0
  margin-bottom: 0
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

.rider_badge
  position: absolute
  border-radius: 40px
  top: 36px
  width: 10px
  height: 12px
  box-shadow: 0 0 0 2px
</style>

<script>
import QCalendar from '@quasar/quasar-ui-qcalendar'
import ordersApi from '../apiService/ordersApi.js'
import { date } from 'quasar'

export default {
  name: 'myCalender',
  props: ['unscheduledMoves', 'scheduledMoves', 'event'],
  data () {
    return {
      selectedDate: '',
      events: [],
      card: false,
      stars: 3,
      order: []
    }
  },
  watch: {
    scheduledMoves (val) {
      const events = []
      for (let i = 0; i < val.length; i++) {
        const newDate = date.formatDate(val[i].scheduled_at, 'YYYY-MM-DD')
        const newTime = date.formatDate(val[i].scheduled_at, 'HH:mm')
        const event = {
          title: 'Order ' + val[i].ord_no,
          details: val[i].instructions,
          date: newDate,
          time: newTime,
          duration: 100,
          bgcolor: 'blue',
          icon: '',
          orderNo: val[i].ord_no,
          orderId: val[i].order_id
        }
        events.push(event)
      }
      this.events = events
    },
    unscheduledMoves (val) {
    },
    event (val) {
      for (let i = 0; i < this.events.length; i++) {
        if (this.events[i].orderId === val.orderId) {
          this.events.splice(i, 1)
        }
      }
      this.events.push(val)
    },
    order (val) {
      val.pickup = val.origin[0]
      const firstLetter = val.customerName.charAt(0)
      val.firstLetter = firstLetter
      const newDate = date.formatDate(val.orderMadeAt, 'HH:mm a')
      val.made_at = 'Made At ' + newDate
      const scheduled = date.formatDate(val.scheduled_at, 'dddd, MMMM YYYY HH:mm a')
      val.scheduled_at = scheduled
      const customerDate = date.formatDate(val.orderMadeAt, 'Do MMMM YYYY')
      val.customerDate = customerDate
    }
  },
  created () {
  },
  methods: {
    calendarNext () {
      this.$refs.calendar.next()
    },
    calendarPrev () {
      this.$refs.calendar.prev()
    },
    getEvents (date) {
      const currentDate = QCalendar.parseTimestamp(date)
      const events = []
      for (let i = 0; i < this.events.length; i++) {
        let added = false
        const event = this.events[i]
        if (event.date === date) {
          if (!added) {
            event.side = 0
            events.push(event)
          }
        } else if (event.days) {
          // check for overlapping dates
          const startDate = QCalendar.parseTimestamp(event.date)
          const endDate = QCalendar.addToDate(startDate, { day: event.days })
          if (QCalendar.isBetweenDates(currentDate, startDate, endDate)) {
            events.push(event)
            added = true
          }
        }
      }
      return events
    },
    isCssColor (color) {
      return !!color && !!color.match(/^(#|(rgb|hsl)a?\()/)
    },
    badgeClasses (event, type) {
      const cssColor = this.isCssColor(event.bgcolor)
      const isHeader = type === 'header'
      return {
        [`text-white bg-${event.bgcolor}`]: !cssColor,
        'full-width': !isHeader && (!event.side || event.side === 'full'),
        'left-side': !isHeader && event.side === 'left',
        'right-side': !isHeader && event.side === 'right'
      }
    },

    badgeStyles (event, type, timeStartPos, timeDurationHeight) {
      const s = {}
      if (this.isCssColor(event.bgcolor)) {
        s['background-color'] = event.bgcolor
      }
      if (timeStartPos) {
        s.top = timeStartPos(event.time) + 'px'
      }
      if (timeDurationHeight) {
        s.height = timeDurationHeight(event.duration) + 'px'
      }
      s['align-items'] = 'flex-start'
      return s
    },
    async showEvent (event) {
      this.card = true
      const order = await ordersApi.fetchOrder(event.orderId)
      this.order = order[0]
    },
    reschedule (orderId) {
      for (let i = 0; i < this.events.length; i++) {
        if (this.events[i].orderId === orderId) {
          this.$emit('reschedule', this.events[i])
          this.card = false
        }
      }
    }
  }
}

</script>
