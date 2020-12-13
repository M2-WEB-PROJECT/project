<template>
  <v-container
    id="user-profile"
    fluid
    tag="section"
  >
    <base-material-snackbar
      v-model="snackbar"
      color="primary"
      v-bind="{
        top: true,
        right: true
      }"
    >
      Profile mis à jour avec succès.
    </base-material-snackbar>
    <v-row justify="center">
      <v-col
        cols="12"
        md="8"
      >
        <base-material-card
          color="secondary"
        >
          <template v-slot:heading>
            <div class="display-2 font-weight-light">
              Edit Profile
            </div>

            <div class="subtitle-1 font-weight-light">
              Be powerful & complete your profile
            </div>
          </template>

          <v-form>
            <v-container class="py-0">
              <v-row>
                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                    label="Email Address"
                    :value="user.email"
                    disabled
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                    :value="userData.prenom"
                    label="First Name"
                    disabled
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                    :value="userData.nom"
                    label="Last Name"
                    disabled
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                    v-model="company"
                    label="Company"
                  />
                </v-col>
                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                    v-model="job"
                    label="Job"
                  />
                </v-col>
                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                    v-model="budget"
                    label="Budget"
                    suffix="€"
                  />
                </v-col>
                <v-col>
                  <v-file-input
                    v-model="photo"
                    :rules="rules"
                    accept="image/jpeg"
                    placeholder="Pick a photo"
                    prepend-icon="mdi-camera"
                    label="Photo de profile"
                    @change="previewPhotoProject"
                  />
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="extract"
                    label="Une phrase pour me décrire"
                  />
                </v-col>
                <v-col cols="12">
                  <v-textarea
                    v-model="bio"
                    label="About Me"
                  />
                </v-col>

                <v-col
                  cols="12"
                  class="text-right"
                >
                  <v-btn
                    color="primary"
                    class="mr-0"
                    @click="updateProfile"
                  >
                    Update Profile
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </base-material-card>
      </v-col>

      <v-col
        cols="12"
        md="4"
      >
        <base-material-card
          class="v-card-profile"
          :avatar="previewPhoto"
        >
          <v-card-text class="text-center">
            <h6 class="display-1 mb-1 grey--text">
              {{ job }} chez <span class="black--text">{{ company }}</span>
            </h6>

            <h4 class="display-2 font-weight-light mb-3 black--text">
              {{ userData.prenom }} {{ userData.nom }}
            </h4>

            <p class="font-weight-light grey--text">
              {{ extract }}
            </p>

            <v-btn
              color="primary"
              rounded
              class="mr-0"
            >
              Follow
            </v-btn>
          </v-card-text>
        </base-material-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import firebase from 'firebase/app'
  import { firestore } from '@/main'
  import { mapMutations } from 'vuex'
  export default {
    name: 'UserProfileInvestisseur',
    data () {
      return {
        photoURL: null,
        snackbar: false,
        photo: null,
        job: '',
        bio: '',
        budget: 0,
        company: '',
        extract: '',
        rules: [
          value => !value || value.size < 2000000 || 'Avatar size should be less than 2 MB!',
        ],
      }
    },
    computed: {
      user () {
        return this.$store.state.user
      },
      userData () {
        return this.$store.state.userData
      },
      uid () {
        return this.$store.state.user.uid
      },
      previewPhoto () {
        if (this.photo === null && this.photoURL === null) {
          return this.userData.photoURL
        } else {
          return this.photoURL
        }
      },
    },
    watch: {
      userData () {
        this.setData()
      },
    },
    mounted () {
      this.setData()
    },
    methods: {
      previewPhotoProject () {
        this.photoURL = URL.createObjectURL(this.photo)
      },
      setData () {
        this.job = this.userData.job ? this.userData.job : ''
        this.bio = this.userData.bio ? this.userData.bio : ''
        this.extract = this.userData.extract ? this.userData.extract : ''
        this.budget = this.userData.budget ? this.userData.budget : ''
        this.company = this.userData.company ? this.userData.company : ''
      },
      async updateProfile () {
        if (this.photo) {
          await firebase.storage().ref(`users/${this.uid}/profile.jpg`).put(this.photo)
          await firebase.storage().ref(`users/${this.uid}/profile.jpg`).getDownloadURL().then(imgURL => {
            this.photoURL = imgURL
          })
          await firestore.collection('users').doc(this.uid).update({
            bio: this.bio,
            job: this.job,
            budget: this.budget,
            company: this.company,
            photoURL: this.photoURL,
            extract: this.extract,
          }).then(() => {
            this.setDataUser()
            this.snackbar = true
          })
        } else {
          await firestore.collection('users').doc(this.uid).update({
            bio: this.bio,
            job: this.job,
            budget: this.budget,
            company: this.company,
            extract: this.extract,
          }).then(() => {
            this.setDataUser()
            this.snackbar = true
          })
        }
      },
      setDataUser () {
        firestore.collection('users').doc(this.uid).get().then(doc => {
          if (doc.exists) {
            this.setUserData(doc.data())
          }
        })
      },
      ...mapMutations({
        setUserData: 'SET_USER_DATA',
      }),
    },
  }
</script>
