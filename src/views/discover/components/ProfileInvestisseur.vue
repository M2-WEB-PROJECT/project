<template>
  <div id="ProfileInvestisseur">
    <h1 style="text-align:center">Détails de l'investisseur</h1>
    <!-- <h3>{{userSelected}}</h3> -->
    <div style="text-align:center"><br><br>
      <v-form>
        <v-container class="py-0">
          <base-material-card
            class="v-card-profile"
            :avatar="this.userSelected.photoURL"
          >
          </base-material-card>
          <v-row>
            <v-col
              cols="12"
              md="4"
            >
              <v-text-field
                label="Nom"
                :value="this.userSelected.nom"
                disabled
              />
            </v-col>

            <v-col
              cols="12"
              md="4"
            >
              <v-text-field
                :value="this.userSelected.prenom"
                label="Prenom"
                disabled
              />
            </v-col>

            <v-col
              cols="12"
              md="4"
            >
              <v-text-field
                :value="this.userSelected.bio"
                label="Bio"
                disabled
              />
            </v-col>
            <v-col
              cols="12"
              md="4"
            >
              <v-text-field
                :value="this.userSelected.budget"
                label="Budget"
                disabled
              />
            </v-col>
            <v-col
              cols="12"
              md="4"
            >
              <v-text-field
                :value="this.userSelected.job"
                label="Job"
                disabled
              />
            </v-col>
            <v-col
              cols="12"
              md="4"
            >
              <v-text-field
                :value="this.userSelected.role"
                label="Role"
                disabled
              />
            </v-col>

          </v-row>
        </v-container>
      </v-form>
    </div>

  </div>
</template>
<script>
  // import firebase from 'firebase/app'
  import { firestore } from '@/main'
  // import { mapMutations } from 'vuex'
  export default {
    name: 'ProfileInvestisseur',
    data () {
      // console.log(this.$store.state)
      return {
        id: this.$route.params.id,
        userSelected: {},
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
    created () {
      firestore.collection('users').doc(this.id).get().then(doc => {
        if (doc.exists) {
          // this.setUserData(doc.data())
          console.log(doc.data())
          this.userSelected = {
            bio: doc.data().bio,
            budget: doc.data().budget,
            company: doc.data().company,
            extract: doc.data().extract,
            job: doc.data().job,
            nom: doc.data().nom,
            prenom: doc.data().prenom,
            photoURL: doc.data().photoURL,
            role: doc.data().role,
          }
        }
      })
    },
    methods: {
    },
  }
</script>
<style>
</style>
