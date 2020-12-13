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
              Register
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
            role: 'Administrator',
            projects: [],
            accessProjects: [],
          })
        }).then(() => {
          this.$router.push('/auth/login')
        })
      },
    },
  }
</script>
