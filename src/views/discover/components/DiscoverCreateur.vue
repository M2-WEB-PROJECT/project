<template>
  <v-container
    id="regular-tables"
    fluid
    tag="section"
  >
    <v-card
      dark
      class="mb-10"
      color="primary"
    >
      <v-card-text>
        <v-text-field
          v-model="searchInput"
          :loading="loading"
          item-text="Description"
          item-value="API"
          label="Search Projects"
          placeholder="Start typing to Search"
          prepend-icon="mdi-magnify"
        />
      </v-card-text>
      <v-divider />
    </v-card>
    <v-row>
      <transition
        v-for="investisseur in investisseursFiltered"
        :key="investisseur.uid"
        name="fade"
      >
        <v-col
          cols="4"
        >
          <base-material-card
            class="v-card-profile"
            :avatar="investisseur.photoURL"
          >
            <v-card-text class="text-center">
              <h6 class="display-1 mb-1 grey--text">
                {{ investisseur.job }}
              </h6>

              <h4 class="display-2 font-weight-light mb-3 black--text">
                {{ investisseur.nom }} {{ investisseur.prenom }}
              </h4>

              <p class="font-weight-light grey--text">
                {{ investisseur.abstract }}
              </p>

              <v-btn
                color="primary"
                rounded
                class="mr-0"
                @click="toDetailsInv(investisseur)"
              >
                En savoir plus
              </v-btn>
            </v-card-text>
          </base-material-card>
        </v-col>
      </transition>
    </v-row>
  </v-container>
</template>
<script>
  import { firestore } from '@/main'
  import { mapMutations } from 'vuex'
  export default {
    name: 'DiscoverCreateur',
    data () {
      return {
        searchInput: '',
        loading: false,
        investisseurs: [],
        investisseursFiltered: [],
        history: [],
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
    },
    watch: {
      searchInput () {
        this.search()
      },
    },
    mounted () {
      this.getInvestisseurs()
      this.history = this.userData.history
    },
    beforeDestroy () {
      this.updateHistory()
      this.setDataUser()
    },
    methods: {
      toDetailsInv (investisseur) {
        this.addToHistory(investisseur)
      },
      async getInvestisseurs () {
        await firestore.collection('users').get().then(projects => {
          this.investisseurs = projects.docs.map(doc => {
            return {
              uid: doc.id,
              ...doc.data(),
            }
          })
          this.investisseurs = this.investisseurs.filter(investisseur => investisseur.role === 'Investisseur')
          this.investisseursFiltered = this.investisseurs
        })
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
      async updateHistory () {
        await firestore.collection('users').doc(this.uid).update({
          history: this.history,
        })
      },
      addToHistory (investisseur) {
        this.history.push(investisseur)
      },
      search () {
        this.loading = true
        if (this.searchInput !== '') {
          this.investisseursFiltered = this.investisseurs.filter(item => item.name.includes(this.searchInput))
        } else {
          this.investisseursFiltered = this.investisseurs
        }
        this.loading = false
      },
    },
  }
</script>
<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to{
  opacity: 0;
}
</style>
