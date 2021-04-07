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
            <!-- <v-btn
              class="btn btn-facebook"
              text
              v-bind="attrs"
              v-on="on"
              @click="signInWithFacebook"
            >
              <v-icon>mdi-facebook</v-icon>
              Login with Facebook
            </v-btn>
            <v-btn
              class="btn btn-google"
              text
              v-bind="attrs"
              v-on="on"
              @click="signInWithGoogle"
            >
              <v-icon>mdi-google</v-icon>
              Login with Google
            </v-btn> -->
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
                      @keyup.enter="handleLogin"
                    />
                    <v-text-field
                      v-model="password"
                      type="password"
                      label="Password"
                      @keyup.enter="handleLogin"
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
      /* signInWithGoogle () {
        var provider = new firebase.auth.GoogleAuthProvider()
        firebase.auth().signInWithPopup(provider).then(() => {
          this.$router.push('/dashboard')
        })
      },
      signInWithFacebook () {
        var provider = new firebase.auth.FacebookAuthProvider()
        firebase.auth().signInWithPopup(provider).then(() => {
          this.$router.push('/dashboard')
        })
      }, */
      handleLogin () {
        firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(credential => {
          this.setDataUser(credential.user.uid)
          this.setUser(credential.user)
          this.$router.push('/dashboard')
        })
      },
      setDataUser (uid) {
        firestore.collection('users').doc(uid).get().then(doc => {
          if (doc.exists) {
            this.setUserData(doc.data())
          }
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

<style>
.btn-facebook {
    background: #3B5998;
    color: #fff !important;
    margin-left:26%;
    margin-bottom: 5px;
    text-transform: none;
    min-width: 190px !important;
}

.btn-google {
    background: #428ec0;
    color: #fff !important;
    margin-left:26%;
    text-transform: none;
    min-width: 190px !important;
}
</style>
