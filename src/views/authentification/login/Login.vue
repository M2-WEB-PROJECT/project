<template>
  <v-container
    style="background-color: #2E383D;"
  >
    <v-row
      justify="center"
    >
      <v-col cols="5">
        <base-material-card
          color="primary"
        >
          <template v-slot:heading>
            <div class="display-2 font-weight-light">
              Log in
            </div>

            <div class="subtitle-1 font-weight-light">
              Be a part of our community
            </div>
          </template>

          <v-card-text>
            <v-container
              class="pa-0"
              fluid
            >
              <v-col>
                <v-row>
                  <v-col>
                    <v-text-field
                      v-model="email"
                      label="Email"
                    />
                    <v-text-field
                      v-model="password"
                      type="password"
                      label="Password"
                    />
                  </v-col>
                </v-row>
                <v-row justify="end">
                  <v-btn
                    color="secondary"
                    @click="handleLogin"
                  >
                    Log in
                  </v-btn>
                </v-row>
              </v-col>
            </v-container>
          </v-card-text>
        </base-material-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import { mapState, mapMutations } from 'vuex'
  import firebase from 'firebase'
  import { firestore } from '@/main'

  export default {
    name: 'Login',

    data () {
      return {
        email: '',
        password: '',
      }
    },
    computed: {
      ...mapState(['uid']),
    },
    mounted () {
      this.checkIfLoggedIn()
    },
    methods: {
      checkIfLoggedIn () {
        firebase.auth().onAuthStateChanged(user => {
          if (user) {
            this.$router.push('/dashboard')
          }
        })
      },
      handleLogin () {
        firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(credential => {
          this.setDataUser(credential.user.uid)
          this.setUser(credential.user)
          this.$router.push('/dashboard')
        }).catch(error => {
          console.log(error)
        })
      },
      setDataUser (uid) {
        firestore.collection('users').doc(uid).get().then(doc => {
          if (doc.exists) {
            this.setUserData(doc.data())
          } else {
            // doc.data() will be undefined in this case
            console.log('No such document!')
          }
        }).catch(function (error) {
          console.log('Error getting document:', error)
        })
      },
      async handleGoogleLogin () {
      },
      async handleFacebookLogin () {
      },
      ...mapMutations({
        setUser: 'SET_USER',
        setUserData: 'SET_USER_DATA',
      }),
    },
  }
</script>
