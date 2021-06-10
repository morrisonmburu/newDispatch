<template>
  <div>
    <q-tab-panels style="margin-top:22.5%;" dense v-model="tab" animated>
      <q-tab-panel class="no-padding no-margin" name="unassigned">
        <div v-if="unassigned === 0" class="bg-grey-3">
          <q-img align="center" style="width: 30%; height: 30%; margin-left:35%; margin-top: 35%;" src="icons/zero.png" />
          <span style="margin-left:38%; margin-top: 35%; font-size: 15px;">No Orders Here</span>
        </div>
        <q-list v-if="unassigned !== 0" class="no-padding no-margin" separator style="width:100%;">
          <q-item
            clickable
            v-ripple
            v-for="order in ordersUnassigned" :key="order.order_id"
          >
            <q-item-section side avatar>
              <q-btn round @click="layout = true, assignRider(order.order_id, order.destination,
              order.origin[0], order.total, order.truck_type, order.customerName, order.ord_no, order.user_id, 1)">
               <q-avatar color="indigo" text-color="white" icon="add" />
              </q-btn>
              <q-item-label caption>
                <p>Assign</p>
                <p class="rider">Rider</p>
              </q-item-label>
            </q-item-section>

            <q-item-section>
              <q-item-label :style="{ paddingBottom : autoAssignOrder ? '1.6em' : '0' }" @click="dialog = true, fetchOrder(order.order_id)">
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

              <q-banner v-if="order.failed === 2 && autoAssignOrder" dense inline-actions class="text-white bg-red absolute" style="width: 100%; left: 0; top: 14.5em;">
                  <span style="margin-left: 5px; margin-right: 5px;">
                    <q-spinner-pie
                      color="white"
                      size="2em"
                    />
                    <q-tooltip :offset="[0, 8]">AutoAssign Order ...</q-tooltip>
                  </span> AutoAssign Failed
              </q-banner>

              <q-banner v-if="order.failed === 1 && autoAssignOrder" dense inline-actions class="text-white bg-primary absolute" style="width: 100%; left: 0; top: 14.5em;">
                  <span style="margin-left: 5px; margin-right: 5px;">
                    <q-spinner-pie
                      color="white"
                      size="2em"
                    />
                    <q-tooltip :offset="[0, 8]">AutoAssign Order ...</q-tooltip>
                  </span> Autoassigning Order / #{{ order.ord_no }}
              </q-banner>

              <q-banner v-if="order.failed === 0 && autoAssignOrder" dense inline-actions class="text-white bg-warning absolute" style="width: 100%; left: 0; top: 15em;">
                  <span style="margin-left: 5px; margin-right: 5px;">
                    <q-tooltip :offset="[0, 8]">AutoAssign Order Locked ...</q-tooltip>
                  </span> Autoassigning Order / #{{ order.ord_no }} Locked
              </q-banner>

            </q-item-section>

            <q-item-section side top>
              <q-item-label caption>
                <q-btn
                  style="color: white; font-size:12px; top: 0.1em;"
                  class="bg-grey"
                  label="Unassigned"
                />
              </q-item-label>
              <q-item-label caption @click="dialog = true, fetchOrder(order.order_id)">
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
      <q-tab-panel class="no-padding no-margin" style="width:100%;" name="assigned">
        <div v-if="loader" class="bg-grey-3">
            <div style="padding-left:30%; padding-top: 30%;">
              <q-spinner-pie
                color="primary"
                size="10em"
              />
                <q-tooltip :offset="[0, 8]">Fetching Intransit Orders ...</q-tooltip>
            </div>
          <!-- <div v-if="!loader">
            <q-img align="center" style="width: 30%; height: 30%; margin-left:35%; margin-top: 35%;" src="icons/zero.png" />
            <span style="margin-left:38%; margin-top: 35%; font-size: 15px;">No Orders Here</span>
          </div> -->
        </div>
        <q-list v-if="!loader" class="no-padding no-margin" separator style="width:100%;">
          <q-item
            clickable
            v-ripple
             v-for="order in ordersIntransit" :key="order.order_id"
          >
            <q-item-section>
              <q-item-label @click="dialog = true, fetchOrder(order.order_id)">
                <q-timeline dense color="indigo">
                  <q-timeline-entry
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
              <q-item-label dense caption style="margin-top:-10%;">
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
              </q-item-label>
            </q-item-section>

            <q-item-section side top @click="dialog = true, fetchOrder(order.order_id)">
              <q-item-label caption>
                <q-btn
                  style="color: white; font-size:12px; margin-top:10%;"
                  class="bg-indigo"
                  flat
                  label="In Progress"
                />
              </q-item-label>
              <q-item-label caption @click="dialog = true, fetchOrder(order.order_id)">
                <q-btn
                  rounded
                  icon="chevron_right"
                  flat
                  style="margin-top:40%;"
                />
              </q-item-label>
              <q-item-label caption>
                <q-btn
                  style="color: white; font-size:11px; margin-top:0; width: 100px;"
                  class="bg-orange"
                  flat
                >
                  <span style="margin:1px;">Assigned</span>
                </q-btn>
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-separator class="no-margin" style="width:100%;" spaced inset="item" />
        </q-list>
      </q-tab-panel>
      <q-tab-panel class="no-padding no-margin" style="width:100%;" name="completed">
        <div class="bg-grey-3">
          <q-img align="center" style="width: 30%; height: 30%; margin-left:35%; margin-top: 35%;" src="icons/zero.png" />
          <span style="margin-left:38%; margin-top: 35%; font-size: 15px;">No Orders Here</span>
        </div>
      </q-tab-panel>
    </q-tab-panels>

    <div class="row shadow-5 absolute-top">
      <q-toolbar class="bg-indigo leftHeader">
        <q-toolbar-title style="color:white; ">Orders</q-toolbar-title>
        <q-input color="white" v-model="search" debounce="500" dense style="width:77%;" clearable>
          <template v-slot:append>
            <q-icon style="color:white;" name="search" />
          </template>
        </q-input>
      </q-toolbar>
      <q-tabs v-model="tab" dense class="col-12 bg-grey-3" style="color:#1a237e; font-size:13px;">
        <q-tab name="unassigned">
          {{ unassigned }} unassigned
        </q-tab>
        <q-tab name="assigned">
          {{ intransit }} assigned
        </q-tab>
        <q-tab name="completed">
          {{ completed }} completed
        </q-tab>
      </q-tabs>
    </div>

    <q-dialog v-model="layout">
      <AssignLayout :sendData="sendData" :fetchRiderAccounts="fetchRiderAccounts" @updateOrderState="updateOrderState"></AssignLayout>
    </q-dialog>

    <q-dialog
      id="left_dialog"
      v-model="dialog"
      persistent
      seamless
      :maximized="maximizedToggle"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-layout view="Lhh lpR fff" container class="bg-white">
        <q-header class="bg-primary">
          <q-toolbar>
            <q-toolbar-title>#Order _{{ orderId }}</q-toolbar-title>
            <q-btn flat v-close-popup round dense icon="close" />
          </q-toolbar>
          <q-tabs v-model="tab3" dense class="col-12 bg-grey-3" style="color:#1a237e;">
          <q-tab name="Details">
            Details
          </q-tab>
          <q-tab name="Customer">
            Customer
          </q-tab>
          <q-tab name="History">
            History
          </q-tab>
        </q-tabs>
        </q-header>
          <OrderFields :showOrder="showOrder" :tab3="tab3"></OrderFields>
      </q-layout>
    </q-dialog>
    <input type="hidden" id="locations" />
  </div>
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
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
<script>
import AssignLayout from './AssignLayout'
import OrderFields from './OrderFields.vue'
import ordersApi from '../apiService/ordersApi.js'
import ridersApi from '../apiService/ridersApi.js'
import { date } from 'quasar'
// destructuring to keep only what is needed
const { addToDate } = date

export default {
  name: 'LeftLayout',
  props: ['sendOrder', 'Autoassign1'],
  data () {
    return {
      link: '1',
      tab: 'unassigned',
      search: '',
      dialog: false,
      maximizedToggle: true,
      tab3: 'Details',
      layout: false,
      ordersUnassigned: [],
      ordersIntransit: [],
      unassigned: 0,
      intransit: 0,
      completed: 0,
      showOrder: [],
      locations: '',
      orderId: '',
      tasks: [],
      fetchRiderAccounts: [],
      sendData: [],
      contentStyle: {
        backgroundColor: 'rgba(0,0,0,0.02)',
        color: '#555'
      },
      contentActiveStyle: {
        backgroundColor: '#eee',
        color: 'black'
      },
      thumbStyle: {
        right: '2px',
        borderRadius: '5px',
        backgroundColor: '#027be3',
        width: '5px',
        opacity: 0.75
      },
      riderSelected: 0,
      assignOrder: [],
      initiateAssign: false,
      failed: 0,
      autoAssignOrder: false,
      loader: true
    }
  },
  watch: {
    ordersUnassigned (val) {
      this.unassigned = val.length
      for (let i = 0; i < val.length; i++) {
        const order = val[i]
        const newDate = date.formatDate(val[i].orderMadeAt, 'HH:mm a')
        val[i].made_at = 'Made At ' + newDate
      }
    },
    ordersIntransit (val) {
      this.intransit = val.length
      for (let i = 0; i < val.length; i++) {
        const order = val[i];
        const newDate = date.formatDate(val[i].orderMadeAt, 'HH:mm a')
        val[i].made_at = 'Made At ' + newDate
        const newDate2 = date.formatDate(val[i].pickup_datetime, 'HH:mm a')
        val[i].picked_at = 'Picked At ' + newDate2
      }
    },
    showOrder (val) {
    },
    sendOrder (val) {
      for (let i = 0; i < val[0].order.length; i++) {
        if (this.autoAssignOrder && val[0].order[i].category_id === 1) {
          val[0].order[i].failed = 1
        } else {
          val[0].order[i].failed = 0
        }
        this.ordersUnassigned.unshift(val[0].order[i])
      }
      const origin = { lat: val[1].locations[0].latitude, lng: val[1].locations[0].longitude }
      const truckType = val[0].order[0].truck_type
      if (this.autoAssignOrder && val[0].order[0].category_id === 1) {
        setTimeout(() => {
          this.initiate(origin, truckType)
        }, 3000)
      }
    },
    Autoassign1 (val) {
      this.autoAssignOrder = val
      if (this.autoAssignOrder === true) {
        const message3 = 'Autoassign has been turned On'
        this.infoNotification(message3)
      } else {
        const message3 = 'Autoassign has been turned off'
        this.infoNotification(message3)
      }
    }
  },
  components: {
    AssignLayout,
    OrderFields
  },
  created () {
    this.getOrders()
    this.getIntransitOrders()
    this.getCompleteOrders()
  },
  methods: {
    async getCompleteOrders () {
      const res = await this.$store.dispatch('orders/getCompleteOrders')
      this.completed = res.length
    },
    async initiate (origin, truckType) {
      const res = await ordersApi.initiateAutoAssign(origin, truckType)
      const test = res
      const newArray = []
      for (let i = 0; i < test.length; i++) {
        newArray.push(test[i].distance)
      }

      const selectedDistance = this.testArray(newArray)

      this.riderSelected = this.getID(selectedDistance, test)
      this.assignOrder = this.sendOrder[0].order
      this.initiateAssign = true
      if (res.length === 0) {
        for (let i = 0; i < this.ordersUnassigned.length; i++) {
          if (this.ordersUnassigned[i].order_id === this.sendOrder[0].order) {
            this.ordersUnassigned[i].failed = 2
          }
        }
      } else {
        this.autoAssign()
      }
    },
    getID: function (selectedDistance, test) {
      const id = []
      for (let i = 0; i < test.length; i++) {
        if (test[i].distance === selectedDistance) {
          id.push(test[i].id)
        }
      }
      return id[0]
    },
    testArray: function (array) {
      return Math.min.apply(Math, array)
    },
    async getOrders () {
      this.ordersUnassigned = await this.$store.dispatch('orders/getOrders')
      for (let i = 0; i < this.ordersUnassigned.length; i++) {
        this.ordersUnassigned[i].failed = 0
      }
    },
    async getIntransitOrders () {
      const ordersIntransit = await this.$store.dispatch('orders/getIntransitOrders')
      for (let i = 0; i < ordersIntransit.length; i++) {
        const order = ordersIntransit[i];
        const data = await ordersApi.getDispatchedOrder(order.order_id)
        if (data.length === 0) {
          order.driverName = 'N/A'
        } else {
          order.driverName = data[0].driverName
        }
      }
      this.ordersIntransit = ordersIntransit
      this.loader = false
    },
    fetchOrder: function (orderId) {
      this.showOrderFunction(orderId)
    },
    async showOrderFunction (orderId) {
      const data = await ordersApi.getOrder(orderId)
      this.showOrder = data[0].order[0]
      if (data[0].order[0].ord_no !== null) {
        this.orderId = data[0].order[0].ord_no
      } else {
        this.orderId = data[0].order[0].order_id
      }
      $('#locations').val(JSON.stringify(data[1].locations))
      $('#locations').trigger('change')
    },
    async autoAssign () {
      const data = await ridersApi.getRider(this.riderSelected)

      const data2 = {
          label: data[0].Name,
          value: data[0].boardNo,
          description: data[0].associate_type + ' Associate',
          AssociateId: data[0].id,
          orderNo: this.assignOrder[0].order_id,
          driverPhone: data[0].phoneNo,
          origin: this.assignOrder[0].origin[0],
          destination: this.assignOrder[0].destination,
          price: this.assignOrder[0].total,
          registrationToken: data[0].api_token,
          // registrationToken: 'cMtt3evfSPqkwApiLBgPs5:APA91bHzIWbhhGSAswVrm1n-4hEXr-z7Z1sg3tIb0WeFbfXYfZweluqK3Gbtz5kTHIlQV5elvrQdoUEDOlZP-5RzXZH4sv1uxv1v8iPBraONBqzAY2q7EDvFUB2V51BFlNstp5zr6I0E',
          package: data[0].associate_type,
          user_id: this.assignOrder[0].user_id,
          associateEmail: data[0].email,
          customerName: this.assignOrder[0].customerName,
          plateNumber: data[0].vehicle_platenumber,
          status: 1
        }

      const res = await this.$store.dispatch('orders/dispatch', data2)
      // const text = document.getElementById(data.label + data.AssociateId).innerHTML
      const sendDataState = [
        { resultData: res },
        { orderData: data2 },
        { dialogState: false }
      ]

      this.updateOrderState(sendDataState)
      const message3 = 'Order Successfully AutoAssigned'
      this.successNotification(message3)
    },
    async assignRider (orderId, destination, origin, total, truck_type, customerName, ord_no, user_id, status) {
      const onlineRiders = await this.$store.dispatch('riders/getOnlineRiders')
      this.showRiders = JSON.stringify(onlineRiders)
      for (let i = 0; i < onlineRiders.length; i++) {
        const rider = onlineRiders[i]
        await this.getTasks(rider.id)
        rider.tasksNo = this.tasks.length
      }
      this.fetchRiderAccounts = onlineRiders
      const sendData = [
        {
          orderId: orderId,
          destination: destination,
          origin: origin,
          total: total,
          truck_type: truck_type,
          customerName: customerName,
          ord_no: ord_no,
          user_id: user_id,
          status: status
        }
      ]
      this.sendData = sendData
    },
    async getTasks (driverNo) {
      const data = await this.$store.dispatch('riders/getTasks', driverNo)
      this.tasks = data
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
    infoNotification: function (message) {
      this.$notify.create(
        {
          progress: true,
          color: 'info',
          textColor: 'white',
          icon: 'done',
          message: message,
          position: 'top-right',
          actions: [
            { label: 'Dismiss', color: 'white', handler: () => { /* ... */ } }
          ],
          timeout: 1000
        }
      )
    },
    updateOrderState: function (params) {
      const orderId = params[1].orderData.orderNo
      const status = params[1].orderData.status
      const unassigned = this.ordersUnassigned
      this.updateUnassigned(unassigned, orderId)
      if (status === 1) {
        this.updateIntransit(orderId)
      } else {
        this.updateIntransit2(orderId, params[1].orderData.label)
      }
      this.layout = params[1].dialogState
    },
    updateUnassigned: function (unassigned, orderId) {
      for (let i = 0; i < unassigned.length; i++) {
        const element = unassigned[i];
        if (element.id === orderId) {
          this.ordersUnassigned.splice(i, 1)
        }
      }
    },
    async updateIntransit (orderId) {
      const data = await ordersApi.getDispatchedOrder(orderId)
      this.ordersIntransit.unshift(data[0])
    },
    updateIntransit2: function (orderId, driverName) {
      for (let i = 0; i < this.ordersIntransit.length; i++) {
        const order = this.ordersIntransit[i]
        if (order.order_id === orderId) {
          this.ordersIntransit[i].driverName = driverName
        }
      }
    }
  }
}
</script>
