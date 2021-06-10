<template>
<q-tab-panels style="margin-top:9%;" dense v-model="tab4" animated>
  <q-tab-panel class="no-padding no-margin" style="width:100%;" name="Details2">
    <q-scroll-area
        :thumb-style="thumbStyle"
        :content-style="contentStyle"
        :content-active-style="contentActiveStyle"
        style="height: 600px; width:355px;"
      >
        <q-list bordered padding style="margin-top:50px; background-color: #FFFFFF;">
          <q-item clickable v-ripple>
            <q-item-section left>
              <q-item-label>Associate Name</q-item-label>
            </q-item-section>
            <q-item-section right style="margin-left:10%;">
              <q-item-label caption lines="2">{{ showRider.Name }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-separator spaced inset />
           <q-item clickable v-ripple>
            <q-item-section left>
              <q-item-label>Associate Contact</q-item-label>
            </q-item-section>
            <q-item-section right style="margin-left:10%;">
              <q-item-label caption lines="2">{{ showRider.phoneNo }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-separator spaced inset />
          <q-item clickable v-ripple>
            <q-item-section left>
              <q-item-label>Associate Status</q-item-label>
            </q-item-section>
            <q-item-section right style="margin-left:10%;">
              <q-item-label caption lines="2"><span :style="{ color: showRider.statusColor }">{{ showRider.statusName }}</span></q-item-label>
            </q-item-section>
          </q-item>
          <q-separator spaced inset />
          <q-item clickable v-ripple>
            <q-item-section left>
              <q-item-label>Vehicle Type</q-item-label>
            </q-item-section>
            <q-item-section right style="margin-left:10%;">
              <q-item-label caption lines="2">{{ showRider.vehicle_type }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-separator spaced inset />
          <q-item clickable v-ripple>
            <q-item-section left>
              <q-item-label>Vehicle Plate Number</q-item-label>
            </q-item-section>
            <q-item-section right style="margin-left:10%;">
              <q-item-label caption lines="2">{{ showRider.vehicle_platenumber }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-separator spaced inset />
          <q-item clickable v-ripple>
            <q-item-section left>
              <q-item-label>Vehicler Model</q-item-label>
            </q-item-section>
            <q-item-section right style="margin-left:10%;">
              <q-item-label caption lines="2">{{ showRider.vehicle_model }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-separator spaced inset />
          <q-item clickable v-ripple>
            <q-item-section left>
              <q-item-label>Number Of Passengers</q-item-label>
            </q-item-section>
            <q-item-section right style="margin-left:10%;">
              <q-item-label caption lines="2">{{ showRider.number_of_passengers }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
  </q-tab-panel>
  <q-tab-panel class="no-padding no-margin" style="width:100%;" name="History2">
    <q-scroll-area
        :thumb-style="thumbStyle"
        :content-style="contentStyle"
        :content-active-style="contentActiveStyle"
        style="height: 600px; width:355px;"
      >
        <q-list bordered padding style="margin-top:50px; background-color: #FFFFFF;">

          <div style="margin-top: 10%;" class="q-px-lg q-pb-md">
            <q-timeline color="indigo">

              <q-timeline-entry
                title="Rider Created At"
                :subtitle="showRider.created_at"
              >
                <div>
                  <q-card class="my-card" bordered elevated>
                      <q-item class="no-margin no-padding">

                        <q-item-section top style="margin-top:10px; margin-left: 10px">
                          <q-btn flat :style="{ color: showRider.statusColor }" style="width: 40%;" :label="showRider.statusName"></q-btn>
                          <q-item-label style="padding: 10px;">{{ showRider.Name }}</q-item-label>
                        </q-item-section>

                      </q-item>
                  </q-card>
                </div>
              </q-timeline-entry>

              <q-timeline-entry
                title="Rider Updated At"
                :subtitle="showRider.updated_at"
              >
                <div>
                  <q-card class="my-card" bordered elevated>
                      <q-item class="no-margin no-padding">

                        <q-item-section top style="margin-top:10px; margin-left: 10px">
                          <q-btn flat :style="{ color: showRider.statusColor }" style="width: 40%;" :label="showRider.statusName"></q-btn>
                          <q-item-label style="padding: 10px;">{{ showRider.Name }}</q-item-label>
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
  name: 'AssociateFields',
  props: ['tab4', 'showRider'],
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
    showRider (val) {
      if (val.is_online === 1 && val.status === 1) {
        val.statusName = 'Online'
        val.statusColor = '#58D68D'
      } else if (val.is_online === 0 && val.status === 1) {
        val.statusName = 'Offline'
        val.statusColor = '#2980B9'
      } else if (val.status === 0 && val.status === 0) {
        val.statusName = 'Inactive'
        val.statusColor = '#F39C12'
      }

      const createdAt = date.formatDate(val.created_at, 'Do MMMM YYYY HH:mm a')
      val.created_at = createdAt

      const updatedAt = date.formatDate(val.updated_at, 'Do MMMM YYYY HH:mm a')
      val.updated_at = updatedAt
    }
  }
}
</script>
