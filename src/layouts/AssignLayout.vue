<template>
      <q-layout view="Lhh lpR fff" container class="bg-white">
        <q-header class="bg-primary">
          <q-toolbar v-if="ordData.status === 1">
            <q-toolbar-title>Assign Order Number: #_{{ ordData.ord_no }}</q-toolbar-title>
            <q-btn flat v-close-popup round dense icon="close" />
          </q-toolbar>
          <q-toolbar v-if="ordData.status === 2">
            <q-toolbar-title>Reassign Order Number: #_{{ ordData.ord_no }}</q-toolbar-title>
            <q-btn flat v-close-popup round dense icon="close" />
          </q-toolbar>
        </q-header>

        <q-footer v-if="!spinner" class="bg-black text-white">
          <q-toolbar inset>
            <q-toolbar-title></q-toolbar-title>
            <q-btn @click="dispatchOrder()" color="info">Dispatch Order</q-btn>
          </q-toolbar>
        </q-footer>

        <q-page-container>
          <div v-if="spinner" style="padding-left: 36%; padding-top: 30%;">
              <q-spinner-pie
                color="primary"
                size="10em"
              />
              <q-tooltip v-if="!loader" :offset="[0, 8]">Dispatching Order ...</q-tooltip>
              <p v-if="!loader" style="margin-top: 10%; font-size: 20px;" > Dispatching Order ... </p>
          </div>
          <q-page v-if="!spinner" padding>
            <div class="q-pa-md" style="width: 100%">
              <div class="q-gutter-md">
                <h6 style="margin-bottom:0;">
                  Online And Available Riders
                </h6>
                <q-select
                  filled
                  v-model="model"
                  :options="options"
                  label="Online Riders"
                  color="info"
                  options-selected-class="text-deep-orange"
                >
                  <template v-slot:option="scope" style="height: 300px;">
                    <q-item
                      v-bind="scope.itemProps"
                      v-on="scope.itemEvents"
                    >
                      <q-item-section avatar>
                          <q-btn round>
                            <q-avatar color="bg-indigo" :style='{ backgroundColor: scope.opt.color }'>
                            <span style="color: white;">{{ scope.opt.firstLetter }}</span>
                            <q-badge class="rider_badge" floating color="green" rounded><span style="color:transparent; font-size:7px;">0</span></q-badge>
                            </q-avatar>
                          </q-btn>
                      </q-item-section>
                      <q-item-section style="margin-left:10%;">
                        <q-item-label v-html="scope.opt.label" />
                        <q-item-label caption>{{ scope.opt.description }}</q-item-label>
                      </q-item-section>
                       <q-item-section avatar style="margin-right: 10%;">
                        <q-btn round>
                         <q-avatar color="transparent"  text-color="black">{{ scope.opt.tasksNo }}</q-avatar>
                        </q-btn>
                        <q-item-label style="margin-right: 10%;" caption>Tasks</q-item-label>
                      </q-item-section>
                    </q-item>
                  </template>
                  <template v-slot:append>
                    <q-icon v-if="model !== ''" name="close" @click.stop="model = ''" class="cursor-pointer" />
                  </template>
                </q-select>
              </div>
            </div>
              <q-list bordered padding>
                <q-item clickable v-ripple>
                  <q-item-section left>
                    <q-item-label>Dropoff Point</q-item-label>
                  </q-item-section>
                  <q-item-section right style="margin-left:10%;">
                    <q-item-label caption lines="2">{{ ordData.destination }}</q-item-label>
                  </q-item-section>
                </q-item>
                <q-separator spaced inset />
                <q-item clickable v-ripple>
                  <q-item-section left>
                    <q-item-label>Pickup Point</q-item-label>
                  </q-item-section>
                  <q-item-section right style="margin-left:10%;">
                    <q-item-label caption lines="2">{{ ordData.origin }}</q-item-label>
                  </q-item-section>
                </q-item>
                <q-separator spaced inset />
                <q-item clickable v-ripple>
                  <q-item-section left>
                    <q-item-label>Amount</q-item-label>
                  </q-item-section>
                  <q-item-section right style="margin-left:10%;">
                    <q-item-label caption lines="2">{{ ordData.total }}</q-item-label>
                  </q-item-section>
                </q-item>
                <q-separator spaced inset />
                <q-item clickable v-ripple>
                  <q-item-section left>
                    <q-item-label>Truck Type</q-item-label>
                  </q-item-section>
                  <q-item-section right style="margin-left:10%;">
                    <q-item-label caption lines="2">{{ ordData.truck_type }}</q-item-label>
                  </q-item-section>
                </q-item>
                <q-separator spaced inset />
                <q-item clickable v-ripple>
                  <q-item-section left>
                    <q-item-label>Customer Name</q-item-label>
                  </q-item-section>
                  <q-item-section right style="margin-left:10%;">
                    <q-item-label caption lines="2">{{ ordData.customerName }}</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
          </q-page>
        </q-page-container>
      </q-layout>
</template>
<style lang="sass">
.q-badge
  border-radius: 40px
  box-shadow: 0 0 0 2px

.rider_badge
  position: absolute
  border-radius: 40px
  top: 36px
  box-shadow: 0 0 0 2px
</style>
<script>
export default {
  name: 'AssignLayout',
  props: ['sendData', 'fetchRiderAccounts'],
  data () {
    return {
      moreContent: true,
      model: null,
      options: [],
      ordData: [],
      spinner: true,
      loader: true
    }
  },
  watch: {
    sendData (val) {
      this.ordData = val[0]
    },
    fetchRiderAccounts (val) {
      const options = []
      for (let i = 0; i < val.length; i++) {
        const firstLetter = val[i].Name.charAt(0)
        const firstLetter2 = firstLetter
        const color = '#' + (Math.random() * 0xFFFFFF << 0).toString(16)
        const data = {
          label: val[i].Name,
          value: val[i].boardNo,
          description: val[i].associate_type + ' Associate',
          icon: 'mail',
          color: color,
          firstLetter: firstLetter2,
          AssociateId: val[i].id,
          tasksNo: val[i].tasksNo,
          orderNo: this.sendData[0].orderId,
          driverPhone: val[i].phoneNo,
          origin: this.sendData[0].origin,
          destination: this.sendData[0].destination,
          price: this.sendData[0].total,
          registrationToken: val[i].api_token,
          // registrationToken: 'cMtt3evfSPqkwApiLBgPs5:APA91bHzIWbhhGSAswVrm1n-4hEXr-z7Z1sg3tIb0WeFbfXYfZweluqK3Gbtz5kTHIlQV5elvrQdoUEDOlZP-5RzXZH4sv1uxv1v8iPBraONBqzAY2q7EDvFUB2V51BFlNstp5zr6I0E',
          package: val[i].associate_type,
          user_id: this.sendData[0].user_id,
          associateEmail: val[i].email,
          customerName: this.sendData[0].customerName,
          plateNumber: val[i].vehicle_platenumber,
          status: this.sendData[0].status
        }
        options.push(data)
      }
      this.options = options
      this.spinner = false
      this.loader = false
    },
    model (val) {
    }
  },
  methods: {
    async dispatchOrder () {
      this.spinner = true
      const data = this.model
      if (data === null) {
        const message = 'You must select an Associate'
        this.errorNotification(message)
      } else {
        const res = await this.$store.dispatch('orders/dispatch', data)
        // const text = document.getElementById(data.label + data.AssociateId).innerHTML
        const sendDataState = [
          { resultData: res },
          { orderData: data },
          { dialogState: false }
        ]

        if (res.data.length === 0) {
          const message2 = 'Dispatch Process Did not go through'
          this.errorNotification(message2)
        } else {
          this.$emit('updateOrderState', sendDataState)
          this.spinner = false
          const message3 = 'Order Successfully Dispatched'
          this.successNotification(message3)
        }
      }
    },
    errorNotification: function (message) {
      this.$notify.create(
        {
          progress: true,
          color: 'negative',
          textColor: 'white',
          icon: 'warning',
          message: message,
          position: 'top-right',
          actions: [
            { label: 'Dismiss', color: 'white', handler: () => { /* ... */ } }
          ],
          timeout: 5000
        }
      )
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
    }
  }
}
</script>
