<template>
<q-tab-panels style="margin-top:9%;" dense v-model="tab3" animated>
  <q-tab-panel class="no-padding no-margin" style="width:100%;" name="Details">
    <q-scroll-area
        :thumb-style="thumbStyle"
        :content-style="contentStyle"
        :content-active-style="contentActiveStyle"
        style="height: 600px; width:400px;"
      >
        <q-list bordered padding style="margin-top:50px; background-color: #FFFFFF;">
          <q-item clickable v-ripple>
            <q-item-section left>
              <q-item-label>Status</q-item-label>
            </q-item-section>
            <q-item-section right style="margin-left:20%;">
              <q-item-label caption lines="2"><span :style="{ color: showOrder.statusColor }">{{ showOrder.statusName }}</span></q-item-label>
            </q-item-section>
          </q-item>

          <q-separator spaced inset />

          <q-item clickable v-ripple>
            <q-item-section left>
              <q-item-label>Pickup Point</q-item-label>
            </q-item-section>
            <q-item-section right style="margin-left:20%;">
              <q-item-label caption lines="2">{{ showOrder.pickup }}</q-item-label>
            </q-item-section>
          </q-item>

          <q-separator spaced inset />

          <q-item clickable v-ripple>
            <q-item-section left>
              <q-item-label>Destination</q-item-label>
            </q-item-section>
            <q-item-section right style="margin-left:20%;">
              <q-item-label caption lines="2">{{ showOrder.destination }}</q-item-label>
            </q-item-section>
          </q-item>

          <q-separator spaced inset />

          <q-item clickable v-ripple>
            <q-item-section left>
              <q-item-label>Order Description</q-item-label>
            </q-item-section>
            <q-item-section right style="margin-left:20%;">
              <q-item-label caption lines="2">{{ showOrder.instructions }}</q-item-label>
            </q-item-section>
          </q-item>

          <q-separator spaced inset />

          <q-item clickable v-ripple>
            <q-item-section left>
              <q-item-label>Distance In Kms</q-item-label>
            </q-item-section>
            <q-item-section right style="margin-left:20%;">
              <q-item-label caption lines="2">{{ showOrder.distance }}</q-item-label>
            </q-item-section>
          </q-item>

          <q-separator spaced inset />

          <q-item clickable v-ripple>
            <q-item-section left>
              <q-item-label>Order Amount In Ksh</q-item-label>
            </q-item-section>
            <q-item-section right style="margin-left:20%;">
              <q-item-label caption lines="2">Ksh {{ showOrder.total }}</q-item-label>
            </q-item-section>
          </q-item>

          <q-separator spaced inset />

          <q-item clickable v-ripple>
            <q-item-section left>
              <q-item-label>Order Package Type</q-item-label>
            </q-item-section>
            <q-item-section right style="margin-left:20%;">
              <q-item-label caption lines="2">{{ showOrder.truck_type }}</q-item-label>
            </q-item-section>
          </q-item>

          <q-separator spaced inset />

          <q-item clickable v-ripple>
            <q-item-section left>
              <q-item-label>Order Category</q-item-label>
            </q-item-section>
            <q-item-section right style="margin-left:20%;">
              <q-item-label caption lines="2">{{ showOrder.category }}</q-item-label>
            </q-item-section>
          </q-item>

          <q-separator spaced inset />

          <q-item clickable v-ripple>
            <q-item-section left>
              <q-item-label>Number Of Stops</q-item-label>
            </q-item-section>
            <q-item-section right style="margin-left:20%;">
              <q-item-label caption lines="2">{{ showOrder.stops_count }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
  </q-tab-panel>
  <q-tab-panel class="no-padding no-margin" style="width:100%;" name="Customer">
    <q-scroll-area
        :thumb-style="thumbStyle"
        :content-style="contentStyle"
        :content-active-style="contentActiveStyle"
        style="height: 600px; width:400px;"
      >
        <q-list bordered padding style="margin-top:50px; background-color: #FFFFFF;">
        <q-card class="my-card" style="margin-left: 10px; margin-right: 10px;" bordered elevated>
          <q-item class="no-margin no-padding">
            <q-item-section top avatar style="margin-top:10px; margin-left: 10px">
              <q-btn round>
                <q-avatar color="bg-indigo" style="background-color: blue;">
                  <span style="color: white;">{{ showOrder.firstLetter }}</span>
                  <q-badge class="rider_badge" floating color="red" rounded><span style="color:transparent; font-size:3px;">0</span></q-badge>
                </q-avatar>
              </q-btn>
            </q-item-section>

            <q-item-section style="margin-top:20px; margin-bottom:20px;">
              <q-item-label>{{ showOrder.customerName }}</q-item-label>
              <q-item-label style="color:grey;">{{ showOrder.customerPhone }}</q-item-label>
            </q-item-section>

          </q-item>
        </q-card>

        <q-card class="my-card" style="margin-left: 10px; margin-right: 10px; margin-top: 20px;" bordered elevated>
          <q-item class="no-margin no-padding">
            <q-item-section top avatar style="margin-top:10px; margin-left: 10px">
              <q-btn round>
                <q-avatar color="bg-indigo" style="background-color: green;">
                  <span style="color: white;">{{ showOrder.firstLetter2 }}</span>
                  <q-badge class="rider_badge" floating color="red" rounded><span style="color:transparent; font-size:3px;">0</span></q-badge>
                </q-avatar>
              </q-btn>
            </q-item-section>

            <q-item-section style="margin-top:20px; margin-bottom:20px;">
              <q-item-label>Sender: {{ showOrder.sender_name }}</q-item-label>
              <q-item-label style="color:grey;">{{ showOrder.sender_phone }}</q-item-label>
            </q-item-section>

          </q-item>
        </q-card>

        <q-card class="my-card" style="margin-left: 10px; margin-right: 10px; margin-top: 20px;" bordered elevated>
          <q-item class="no-margin no-padding">
            <q-item-section top avatar style="margin-top:10px; margin-left: 10px">
              <q-btn round>
                <q-avatar color="bg-indigo" style="background-color: orange;">
                  <span style="color: white;">{{ showOrder.firstLetter3 }}</span>
                  <q-badge class="rider_badge" floating color="red" rounded><span style="color:transparent; font-size:3px;">0</span></q-badge>
                </q-avatar>
              </q-btn>
            </q-item-section>

            <q-item-section style="margin-top:20px; margin-bottom:20px;">
              <q-item-label>Recipient: {{ showOrder.recipient_name }}</q-item-label>
              <q-item-label style="color:grey;">{{ showOrder.recipient_name }}</q-item-label>
            </q-item-section>

          </q-item>
        </q-card>

        </q-list>
      </q-scroll-area>
  </q-tab-panel>
  <q-tab-panel class="no-padding no-margin" style="width:100%;" name="History">
    <q-scroll-area
        :thumb-style="thumbStyle"
        :content-style="contentStyle"
        :content-active-style="contentActiveStyle"
        style="height: 600px; width:400px;"
      >
        <q-list bordered padding style="margin-top:50px; background-color: #FFFFFF;">
          <q-card class="my-card" style="margin-left: 10px; margin-right: 10px;" bordered elevated>
              <q-item class="no-margin no-padding">
                <q-item-section top avatar style="margin-top:10px; margin-left: 10px">
                  <q-btn round>
                    <q-avatar color="bg-indigo" style="background-color: blue;">
                    <span style="color: white;">{{ showOrder.firstLetter }}</span>
                    <q-badge class="rider_badge" floating color="red" rounded><span style="color:transparent; font-size:3px;">0</span></q-badge>
                    </q-avatar>
                  </q-btn>
                </q-item-section>

                <q-item-section style="margin-top:20px; margin-bottom:20px;">
                  <q-item-label>{{ showOrder.customerName }}</q-item-label>
                  <q-item-label style="color:grey;">{{ showOrder.customerPhone }}</q-item-label>
                </q-item-section>

                <q-item-section side top style="margin-top:10px; margin-right:25px;">
                  <q-item-label class="absolute" style="top:60%; right: 4%; font-size:12px; color:grey;">{{ showOrder.customerDate }}</q-item-label>
                </q-item-section>

              </q-item>
          </q-card>

          <div style="margin-top: 10%;" class="q-px-lg q-pb-md">
            <q-timeline color="indigo">

              <q-timeline-entry
                title="Order Created At"
                :subtitle="showOrder.orderMadeAt"
              >
                <div>
                  <q-card class="my-card" bordered elevated>
                      <q-item class="no-margin no-padding">
                        <q-item-section top style="margin-top:10px; margin-left: 10px">
                          <q-btn flat class="bg-indigo text-white" style="width: 40%;" label="Unassigned"></q-btn>
                          <q-item-label style="padding: 10px;">{{ showOrder.pickup }}</q-item-label>
                        </q-item-section>

                      </q-item>
                  </q-card>
                </div>
              </q-timeline-entry>

              <q-timeline-entry
                title="Order To Be Picked Up On"
                :subtitle="showOrder.pickup_datetime"
              >
                <div>
                  <q-card class="my-card" bordered elevated>
                      <q-item class="no-margin no-padding">

                        <q-item-section top style="margin-top:10px; margin-left: 10px">
                          <q-btn flat class="bg-indigo text-white" style="width: 40%;" :label="showOrder.statusName"></q-btn>
                          <q-item-label style="padding: 10px;">{{ showOrder.destination }}</q-item-label>
                        </q-item-section>

                      </q-item>
                  </q-card>
                </div>
              </q-timeline-entry>

              <q-timeline-entry
                title="Order Updated At"
                :subtitle="showOrder.updated_at"
              >
                <div>
                  <q-card class="my-card" bordered elevated>
                      <q-item class="no-margin no-padding">

                        <q-item-section top style="margin-top:10px; margin-left: 10px">
                          <q-btn flat class="bg-indigo text-white" style="width: 40%;" label="Updated At"></q-btn>
                          <q-item-label style="padding: 10px;">{{ showOrder.destination }}</q-item-label>
                        </q-item-section>

                      </q-item>
                  </q-card>
                </div>
              </q-timeline-entry>

            </q-timeline>
          </div>
        </q-list>

      </q-scroll-area>
  </q-tab-panel>
</q-tab-panels>
</template>
<script>
import { date } from 'quasar'

export default {
  name: 'OrderFields',
  props: ['showOrder', 'tab3'],
  data () {
    return {
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
      }
    }
  },
  watch: {
    showOrder (val) {
      val.pickup = val.origin[0]
      if (val.status === 0) {
        val.statusName = 'Unassigned'
        val.statusColor = '#E74C3C'
      } else if (val.status === 1) {
        val.statusName = 'Accepted'
        val.statusColor = '#2E86C1'
      } else if (val.status === 2) {
        val.statusName = 'Picked Up'
        val.statusColor = '#5DADE2'
      } else if (val.status === 3) {
        val.statusName = 'In Transit'
        val.statusColor = '#F1C40F'
      } else if (val.status === 4) {
        val.statusName = 'Completed'
        val.statusColor = '#2ECC71'
      } else if (val.status === 5) {
        val.statusName = 'Cancelled'
        val.statusColor = '#E74C3C'
      }

      if (val.device === 'website') {
        val.distance = val.distance + ' Kms'
      } else {
        val.distance = val.distance / 1000 + ' Kms'
      }

      const firstLetter = val.customerName.charAt(0)
      val.firstLetter = firstLetter

      const firstLetter2 = val.sender_name.charAt(0)
      val.firstLetter2 = firstLetter2

      const firstLetter3 = val.recipient_name.charAt(0)
      val.firstLetter3 = firstLetter3

      const customerDate = date.formatDate(val.orderMadeAt, 'Do MMMM YYYY')
      val.customerDate = customerDate

      const createdAt = date.formatDate(val.orderMadeAt, 'Do MMMM YYYY HH:mm a')
      val.orderMadeAt = createdAt

      const pickupDatetime = date.formatDate(val.pickup_datetime, 'Do MMMM YYYY HH:mm a')
      val.pickup_datetime = pickupDatetime

      const updatedAt = date.formatDate(val.updated_at, 'Do MMMM YYYY HH:mm a')
      val.updated_at = updatedAt
    }
  }
}
</script>
