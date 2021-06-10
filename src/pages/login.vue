<template>
  <q-page class="column" style="overflow: hidden">
    <div class="q-pa-md items-start q-gutter-md" style="margin-left: 33%; margin-top: 6%;">
       <q-card class="my-card" style="width: 45%;">
        <q-form @submit="login">
          <q-card-section class="bg-indigo-10 text-white">
            <q-img align="center" style="width: 20%; height: 20%; margin-left: 40%;" src="images/volant-logo.png" />
          </q-card-section>

          <q-card-section>
            <q-btn round class="absolute"
              style="top: 0; right: 12px; transform: translateY(-50%);">
              <q-avatar color="bg-indigo-10" style="background-color: blue;">
                <span style="color: white;">V</span>
                <q-badge class="rider_badge" floating color="red" rounded><span style="color:transparent; font-size:3px;">0</span></q-badge>
              </q-avatar>
            </q-btn>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <p style="margin-left: 27%; font-size: 17px;"> Volant Dispatch Panel </p>
            <q-input outlined v-model="email" label="Email Address" :rules="emailRules">
              <template v-slot:before>
                <q-icon name="mail" />
              </template>

               <template v-slot:append>
                <q-icon name="close" @click="email = ''" class="cursor-pointer" />
              </template>
            </q-input>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <q-input outlined v-model="password" :type="isPwd ? 'password' : 'text'" label="Password" :rules="passwordRules">
              <template v-slot:before>
                <q-icon name="lock" />
              </template>

               <template v-slot:append>
                <q-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"
                />
              </template>

            </q-input>
          </q-card-section>

          <q-separator />

          <q-card-actions>
            <q-btn rounded :loading="loading" style="width: 100%;" type="submit" class="bg-indigo-10 text-white" label="Login" >
              <template v-slot:loading>
                <q-spinner-hourglass class="on-left" />
                Loging In ...
              </template>
            </q-btn>
          </q-card-actions>
         </q-form>
        </q-card>
    </div>
  </q-page>
</template>

<style lang="sass">
  .rider_badge
    position: absolute
    border-radius: 40px
    top: 36px
    width: 10px
    height: 12px
    box-shadow: 0 0 0 2px
</style>

<script>
import Login from '../apiService/loginApi.js'

export default {
  name: 'login',
  data () {
    return {
      name: 'Login Page',
      email: '',
      isPwd: true,
      password: '',
      loading: false,
      emailRules: [
        v => !!v || 'Your Email is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid'
      ],
      passwordRules: [
        v => !!v || 'Your password is required'
      ]
    }
  },
  methods: {
    async login () {
      this.loading = true
      if (this.email === '' && this.password === '') {
        const message = 'You Must Enter all Fields'
        this.errorNotification(message)
        setTimeout(() => {
          this.loading = false
        }, 3000)
      } else {
        const email = this.email
        const password = this.password
        const res = await Login.login(email, password)

        const data = res.data
        const Authenticated = res.authorized

        if (Authenticated) {
          localStorage.setItem('dispatch.user', JSON.stringify(data))
          localStorage.setItem('dispatch.jwt', data.password)

          const message = 'User Authenticated Successfully, Loging In ...'
          this.successNotification(message)
          setTimeout(() => {
            this.loading = false
            if (localStorage.getItem('dispatch.jwt') != null) {
              this.$emit('loggedIn')
              const nextUrl = this.$route.params.nextUrl
              // window.location.replace("http://volantltd.com/volantuser/home")
              this.$router.push((nextUrl != null ? nextUrl : '/'))
            }
          }, 3000)
        } else {
          const message = 'Oops Seems like your credentials Are Wrong, try Again'
          this.errorNotification(message)
          setTimeout(() => {
            this.loading = false
            this.email = ''
            this.password = ''
          }, 3000)
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
          timeout: 3000
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
          timeout: 4000
        }
      )
    }
  }
}
</script>
