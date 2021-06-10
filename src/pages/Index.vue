<template>
  <q-page class="flex">
  <div id="googleMap"></div>

  <div id="infowindow-content-origin">
    <span id="place-name"  class="title"></span><br>
  </div>

  <div id="infowindow-content-destination">
    <span id="place-name2"  class="title"></span><br>
  </div>

  <div id="infowindow-content-stop">
    <span id="place-name3"  class="title"></span><br>
  </div>

  </q-page>
</template>
<style scoped>
#map #infowindow-content {
 display: inline;
}
#googleMap{
    left:0;
    top:0;
    height:100%;
    width:100%;
    position:absolute;
}
</style>
<script>
export default {
  name: 'PageIndex',
  data () {
    return {
    }
  },
  beforeMount () {
    const maps = document.createElement('script')
    maps.setAttribute('src', 'js/maps.js')
    document.head.appendChild(maps)

    const mapsApi = document.createElement('script')
    mapsApi.setAttribute(
      'src',
      'https://maps.googleapis.com/maps/api/js?libraries=places&language=en&key=AIzaSyC_WPxndykde_MAUC_5FKnXPp035kJw5nI&callback=myMap'
    )
    document.head.appendChild(mapsApi)
  },
  methods: {
  }
}
</script>
