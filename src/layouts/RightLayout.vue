<template>
  <div>
    <q-tab-panels style="margin-top:26%;" dense v-model="tab2" animated>
      <q-tab-panel class="no-padding no-margin" style="width:100%;" name="online">
        <!-- <div v-if="loader" style="margin-top: 50%: margin-left: 50%;">
          <q-spinner-hourglass
            color="primary"
            size="5em"
          />
          <q-tooltip :offset="[0, 8]">QSpinnerHourglass</q-tooltip>
        </div> -->
        <q-list class="no-padding no-margin" separator style="width:100%;">
          <q-item
            clickable
            v-ripple
            v-for="rider in onlineRiders" :key="rider.id"
            @click="dialog2 = true, fetchRider(rider.id)"
          >
          <q-item-section top avatar style="margin-top:10px;">
            <q-btn round>
              <q-avatar color="bg-indigo" :style='{ backgroundColor: rider.color }'>
              <span style="color: white;">{{ rider.firstLetter }}</span>
              <q-badge class="rider_badge" floating color="green" rounded><span style="color:transparent; font-size:7px;">0</span></q-badge>
              </q-avatar>
            </q-btn>
          </q-item-section>

          <q-item-section style="margin-top:20px; margin-bottom:20px;">
            <q-item-label>{{ rider.Name }}</q-item-label>
            <q-item-label style="color:grey;">{{ rider.phoneNo }}</q-item-label>
          </q-item-section>

          <q-item-section side top style="margin-top:10px; margin-right:25px;">
            <q-btn round>
            <q-avatar color="transparent"  text-color="black" :id="rider.Name+rider.id">{{ rider.tasksNo }}</q-avatar>
            </q-btn>
            <q-item-label style="margin-right:8px;" caption>
              <span>Tasks</span>
            </q-item-label>
            <q-icon
                name="chevron_right"
                class="absolute-right"
                style="top:30%; right: 4%; font-size:30px;"
            />
          </q-item-section>

          </q-item>
          <q-separator class="no-margin" style="width:100%;" spaced inset="item" />
        </q-list>
      </q-tab-panel>
      <q-tab-panel class="no-padding no-margin" style="width:100%;" name="offline">
        <q-list class="no-padding no-margin" separator style="width:100%;">
          <q-item
            clickable
            v-ripple
            v-for="rider in offlineRiders" :key="rider.id"
            @click="dialog2 = true, fetchRider(rider.id)"
          >
          <q-item-section top avatar style="margin-top:10px;">
            <q-btn round>
              <q-avatar color="bg-indigo" :style='{ backgroundColor: rider.color }'>
              <span style="color: white;">{{ rider.firstLetter }}</span>
              <q-badge class="rider_badge2" floating color="indigo" rounded><span style="color:transparent; font-size:7px;">0</span></q-badge>
              </q-avatar>
            </q-btn>
          </q-item-section>

          <q-item-section style="margin-top:20px; margin-bottom:20px;">
            <q-item-label>{{ rider.Name }}</q-item-label>
            <q-item-label style="color:grey;">{{ rider.phoneNo }}</q-item-label>
          </q-item-section>

          <q-item-section side top style="margin-top:10px; margin-right:25px;">
            <q-btn round>
            <q-avatar color="transparent"  text-color="black">{{ rider.tasksNo }}</q-avatar>
            </q-btn>
            <q-item-label style="margin-right:8px;" caption>
              <span>Tasks</span>
            </q-item-label>
            <q-icon
                name="chevron_right"
                class="absolute-right"
                style="top:30%; right: 4%; font-size:30px;"
            />
          </q-item-section>

          </q-item>
          <q-separator class="no-margin" style="width:100%;" spaced inset="item" />
        </q-list>
      </q-tab-panel>
      <q-tab-panel class="no-padding no-margin" style="width:100%;" name="inactive">
        <q-list class="no-padding no-margin" separator style="width:100%;">
          <q-item
            clickable
            v-ripple
            v-for="rider in inactiveRiders" :key="rider.id"
            @click="dialog2 = true, fetchRider(rider.id)"
          >
          <q-item-section top avatar style="margin-top:10px;">
            <q-btn round>
              <q-avatar color="bg-indigo" :style='{ backgroundColor: rider.color }'>
              <span style="color: white;">{{ rider.firstLetter }}</span>
              <q-badge class="rider_badge2" floating color="orange" rounded><span style="color:transparent; font-size:7px;">0</span></q-badge>
              </q-avatar>
            </q-btn>
          </q-item-section>

          <q-item-section style="margin-top:20px; margin-bottom:20px;">
            <q-item-label>{{ rider.Name }}</q-item-label>
            <q-item-label style="color:grey;">{{ rider.phoneNo }}</q-item-label>
          </q-item-section>

          <q-item-section side top style="margin-top:10px; margin-right:25px;">
            <q-icon
                name="chevron_right"
                class="absolute-right"
                style="top:30%; right: 4%; font-size:30px;"
            />
          </q-item-section>

          </q-item>
          <q-separator class="no-margin" style="width:100%;" spaced inset="item" />
        </q-list>
      </q-tab-panel>
    </q-tab-panels>

    <div class="row shadow-5 absolute-top">
      <q-toolbar class="bg-indigo">
        <q-toolbar-title style="color:white;">Associates</q-toolbar-title>
        <q-input color="white" v-model="search" debounce="500" dense style="width:63%;" clearable>
          <template v-slot:append>
            <q-icon style="color:white;" name="search" />
          </template>
        </q-input>
      </q-toolbar>
      <q-tabs v-model="tab2" dense class="col-12 bg-grey-3" style="color:#1a237e;font-size:13px;">
        <q-tab name="online">
          {{ online }} Online
        </q-tab>
        <q-tab name="offline">
          {{ offline }} offline
        </q-tab>
        <q-tab name="inactive">
          {{ inactive }} inactive
        </q-tab>
      </q-tabs>
      <input type="hidden" :value="showRiders" id="onlineRiders" />
      <input type="hidden" :value="showRiders2" id="offlineRiders" />
    </div>

    <q-dialog
      id="right_dialog"
      v-model="dialog2"
      persistent
      seamless
      maximized
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-layout view="Lhh lpR fff" container class="bg-white">
        <q-header class="bg-primary">
          <q-toolbar>
            <q-toolbar-title>Associate # _{{ riderId }}</q-toolbar-title>
            <q-btn flat v-close-popup round dense icon="close" />
          </q-toolbar>
          <q-tabs v-model="tab4" dense class="col-12 bg-grey-3" style="color:#1a237e;">
          <q-tab name="Details2">
            Details
          </q-tab>
          <q-tab name="History2">
            History
          </q-tab>
        </q-tabs>
        </q-header>
        <AssociateFields :tab4="tab4" :showRider="showRider"></AssociateFields>
      </q-layout>
    </q-dialog>
  </div>
</template>
<style lang="sass">
.my-menu-link
  color: white
  background: #1a237e
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

.q-badge
  border-radius: 40px
  box-shadow: 0 0 0 2px

.rider_badge
  position: absolute
  border-radius: 40px
  top: 37px
  right: 1px
  width: 13.5px
  height: 13px
  box-shadow: 0 0 0 2px

.rider_badge2
  position: absolute
  border-radius: 40px
  top: 37px
  right: 1px
  width: 13.5px
  height: 13px
  box-shadow: 0 0 0 2px

#right_dialog .q-dialog__inner--maximized
  width: 355px
  height: 100%
  margin-top: 50px
  margin-right: 0
  margin-left: 74%
</style>

<style scoped>
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

  /* .rider_badge:after {
    content: '';
    mix-blend-mode: screen;
    position: absolute;
    top: 5px;
    left: 5px;
    width: 12px;
    height: 12px;
    background: rgba(3, 245, 75, 0.938);
    opacity: 1.5;
    border-radius: 100%;
    transform-origin: 50% 50%;
  }

  .rider_badge::after {
    animation: ripple 1.2s ease-out infinite;
    animation-delay: 1s;
  } */
</style>
<script>
import AssociateFields from './AssociateFields.vue'
import ridersApi from '../apiService/ridersApi.js'

// import { date } from 'quasar'

export default {
  name: 'RightLayout',
  props: ['sendInactiveRider', 'activateRider', 'makeOnline', 'makeOffline'],
  data () {
    return {
      link2: '1',
      tab2: 'online',
      search: '',
      dialog2: false,
      maximizedToggle2: true,
      offlineRiders: [],
      onlineRiders: [],
      inactiveRiders: [],
      showRiders: '',
      showRiders2: '',
      offline: 0,
      online: 0,
      inactive: 0,
      tab4: 'Details2',
      showRider: [],
      riderId: '',
      tasks: [],
      loader: true
    }
  },
  watch: {
    offlineRiders (val) {
      this.offline = val.length
      for (let i = 0; i < val.length; i++) {
        const firstLetter = val[i].Name.charAt(0)
        val[i].firstLetter = firstLetter
        val[i].color = '#' + (Math.random() * 0xFFFFFF << 0).toString(16)
      }
    },
    onlineRiders (val) {
      this.online = val.length
      for (let i = 0; i < val.length; i++) {
        const firstLetter = val[i].Name.charAt(0)
        val[i].firstLetter = firstLetter
        val[i].color = '#' + (Math.random() * 0xFFFFFF << 0).toString(16)
      }
    },
    inactiveRiders (val) {
      this.inactive = val.length
      for (let i = 0; i < val.length; i++) {
        const firstLetter = val[i].Name.charAt(0)
        val[i].firstLetter = firstLetter
        val[i].color = '#' + (Math.random() * 0xFFFFFF << 0).toString(16)
      }
    },
    sendInactiveRider (val) {
      this.inactiveRiders.unshift(val)
    },
    activateRider (val) {
      for (let i = 0; i < this.inactiveRiders.length; i++) {
        const element = this.inactiveRiders[i]
        if (element.id === val.id) {
          this.inactiveRiders.splice(i, 1)
        }
      }
      val.riderNo = 0
      this.offlineRiders.unshift(val)
    },
    makeOnline (val) {
      for (let i = 0; i < this.offlineRiders.length; i++) {
        const element = this.offlineRiders[i]
        if (element.id === val.id) {
          this.offlineRiders.splice(i, 1)
        }
      }
      val.riderNo = 0
      this.onlineRiders.unshift(val)
    },
    makeOffline (val) {
      for (let i = 0; i < this.onlineRiders.length; i++) {
        const element = this.onlineRiders[i]
        if (element.id === val.id) {
          this.onlineRiders.splice(i, 1)
        }
      }
      val.riderNo = 0
      this.offlineRiders.unshift(val)
    }
    // tasks (val) {
    //   console.log(val)
    //   // for (let i = 0; i < val.length; i++) {
    //   //   const element = val[i]
    //   //   console.log(element)
    //   // }
    // }
  },
  created () {
    this.getOfflineRiders()
    this.getOnlineRiders()
    this.getInactiveRiders()
  },
  components: {
    AssociateFields
  },
  methods: {
    async getOfflineRiders () {
      const offlineRiders = await this.$store.dispatch('riders/getOfflineRiders')
      this.showRiders2 = JSON.stringify(offlineRiders)
      for (let i = 0; i < offlineRiders.length; i++) {
        const rider = offlineRiders[i]
        await this.getTasks(rider.id)
        rider.tasksNo = this.tasks.length
      }
      this.offlineRiders = offlineRiders
    },
    async getOnlineRiders () {
      const onlineRiders = await this.$store.dispatch('riders/getOnlineRiders')
      this.showRiders = JSON.stringify(onlineRiders)
      for (let i = 0; i < onlineRiders.length; i++) {
        const rider = onlineRiders[i]
        await this.getTasks(rider.id)
        rider.tasksNo = this.tasks.length
      }
      this.onlineRiders = onlineRiders
    },
    async getInactiveRiders () {
      this.inactiveRiders = await this.$store.dispatch('riders/getInactiveRiders')
    },
    fetchRider: function (orderId) {
      this.fetchRiderApi(orderId)
    },
    async fetchRiderApi (orderId) {
      const data = await ridersApi.getRider(orderId)
      this.showRider = data[0]
      this.riderId = data[0].boardNo
    },
    async getTasks (driverNo) {
      const data = await this.$store.dispatch('riders/getTasks', driverNo)
      this.tasks = data
    }
  }
}
</script>
