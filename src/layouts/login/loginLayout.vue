<template>
<q-layout view="hHh Lpr lff" class="shadow-2">
  <q-page-container style="background-image: url('images/dispatch1.png')">
    <router-view />
  </q-page-container>
</q-layout>
</template>

<script>
export default {
  name: 'LoginLayout',
  data () {
    return {
      test: 'Welcome To Login'
    }
  }
}
</script>
