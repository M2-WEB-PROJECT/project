<template>
  <v-container
    id="user-profile"
    fluid
    tag="section"
  >
    <v-row>
      <v-col
        cols="12"
      >
        <base-material-card
          class="v-card-profile"
          :avatar="profilCreateur.photoURL"
        >
          <v-card-text class="text-center">
            <h6 class="text-h4 mb-1 grey--text">
              {{ profilCreateur.job }} chez <span class="black--text">{{ profilCreateur.company }}</span>
            </h6>

            <h4 class="text-h3 font-weight-light mb-3 black--text">
              {{ profilCreateur.prenom }} {{ profilCreateur.nom }}
            </h4>

            <p class="font-weight-light grey--text">
              {{ profilCreateur.extract }}
            </p>

            <p class="font-weight-light">
              {{ profilCreateur.bio }}
            </p>

            <v-btn
              color="primary"
              rounded
              class="mr-0"
              @click="back()"
            >
              Back
            </v-btn>
          </v-card-text>
        </base-material-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: 'ProfileCreateur',
    data () {
      return {
        profilCreateur: {},
      }
    },
    mounted () {
      this.profilCreateur = this.$route.params.profilCreateur
    },
    methods: {
      back () {
        this.$router.push({ name: 'Discover' })
      },
    },
  }
</script>
