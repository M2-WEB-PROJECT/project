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
            <div class="text-h3 font-weight-light">
              Register
            </div>

            <div class="text-subtitle-1 font-weight-light">
              Be a part of our community
            </div>
          </template>
          <v-card-text>
            <v-btn
              class="btn btn-facebook"
              text
              v-bind="attrs"
              v-on="on"
              @click="signUpWithFacebook"
            >
              <v-icon>mdi-facebook</v-icon>
              Login with Facebook
            </v-btn>
            <v-btn
              class="btn btn-google"
              text
              v-bind="attrs"
              v-on="on"
              @click="signUpWithGoogle"
            >
              <v-icon>mdi-google</v-icon>
              Login with Google
            </v-btn>
            <v-row>
              <v-col class="col-md-5">
                <div style="align-items: center;border-bottom: 1px solid #dadde1;display: flex;margin-top:16px;text-align: center;" />
              </v-col>
              <v-col class="text-center">
                <div style="color: #dadde1; margin-top:6px">
                  or
                </div>
              </v-col>
              <v-col class="col-md-5">
                <div style="align-items: center;border-bottom: 1px solid #dadde1;display: flex;margin-top:16px;text-align: center;" />
              </v-col>
            </v-row>
            <v-container
              class="pa-0"
              fluid
            >
              <v-col>
                <v-row>
                  <v-col>
                    <v-text-field
                      v-model="nom"
                      label="Nom"
                    />
                    <v-text-field
                      v-model="prenom"
                      label="Prénom"
                    />
                  </v-col>
                  <v-col>
                    <v-text-field
                      v-model="email"
                      label="Email"
                    />
                    <v-text-field
                      v-model="password"
                      label="Password"
                    />
                  </v-col>
                </v-row>
                <v-row>
                  <v-radio-group
                    v-model="role"
                    row
                  >
                    <v-radio
                      color="secondary"
                      value="Créateur"
                      label="Créateur"
                    />
                    <v-radio
                      color="secondary"
                      value="Investisseur"
                      label="Investisseur"
                    />
                  </v-radio-group>
                </v-row>
                <v-row justify="end">
                  <v-btn
                    color="secondary"
                    @click="handleRegister"
                  >
                    Register
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
  import firebase from 'firebase/app'
  import { firestore } from '@/main'

  export default {
    name: 'Register',
    data () {
      return {
        email: '',
        password: '',
        nom: '',
        prenom: '',
        role: '',
      }
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
      handleRegister () {
        firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(credential => {
          return firestore.collection('users').doc(credential.user.uid).set({
            nom: this.nom,
            prenom: this.prenom,
            role: this.role,
            projects: [],
            accessProjects: [],
          })
        }).then(() => {
          this.$router.push('/auth/login')
        })
      },
      signUpWithGoogle () {
        var provider = new firebase.auth.GoogleAuthProvider()
        firebase.auth().signInWithPopup(provider).then(result => {
          return firestore.collection('users').doc(result.user.uid).set({
            nom: '',
            prenom: '',
            role: this.role ? this.role : result.user.role,
            projects: [],
            accessProjects: [],
          })
        }).then(() => {
          this.$router.push('/dashboard')
        })
      },
      signUpWithFacebook () {
        var provider = new firebase.auth.FacebookAuthProvider()
        firebase.auth().signInWithPopup(provider).then(result => {
          return firestore.collection('users').doc(result.user.uid).set({
            nom: '',
            prenom: '',
            role: this.role ? this.role : result.user.role,
            projects: [],
            accessProjects: [],
          })
        }).then(() => {
          this.$router.push('/dashboard')
        })
      },
    },
  }
</script>
<style>
a { cursor: pointer }

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
