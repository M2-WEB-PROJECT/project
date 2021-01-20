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
        <v-row>
          <v-col cols="3">
            <v-text-field
              v-model="searchLastNameInput"
              :loading="loading"
              label="Rechercher un investisseur par son nom"
              placeholder="Saisissez un nom"
              prepend-icon="mdi-magnify"
            />
          </v-col>
          <!--v-col cols="3">
            <v-text-field
              v-model="searchFirstNameInput"
              :loading="loading"
              label="Rechercher un investisseur par son prénom"
              placeholder="Saisissez un prénom"
              prepend-icon="mdi-magnify"
            />
          </v-col-->
          <v-col cols="4">
            <v-select
              v-model="job"
              :items="values"
              label="Job"
              multiple
              attach
              @change="search()"
              prepend-icon="mdi-alpha-j-circle "
            />
          </v-col>
          <v-col cols="4">
            <v-text-field
              v-model="searchCompany"
              :loading="loading"
              label="Entreprise"
              placeholder="Saisissez le nom d'entreprise"
              prepend-icon="mdi-domain"
              suffix=""
            />
          </v-col>
        </v-row>
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
                {{ investisseur.job }} chez {{ investisseur.company }}
              </h6>

              <h4 class="display-2 font-weight-light mb-3 black--text">
                <router-link v-bind:to="'/user/investor/' + investisseur.uid">
                  {{ investisseur.nom }} {{ investisseur.prenom }}
                </router-link>
              </h4>

              <p class="font-weight-light grey--text">
                {{ investisseur.abstract }}
              </p>

              <router-link v-bind:to="'/user/investor/' + investisseur.uid">
                <v-btn
                  color="primary"
                  rounded
                  class="mr-2"
                  small
                  @click="toDetailsInvestisseur(investisseur)"
                >
                  Regarder le profil
                </v-btn>
              </router-link>

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
        searchLastNameInput: '',
        // searchFirstNameInput: '',
        searchCompany: '',
        loading: false,
        investisseurs: [],
        investisseursFiltered: [],
        jobFilter: [],
        job: ['CTO', 'Développeur web', 'Autres'],
        values: ['CTO', 'Développeur web', 'Autres'],
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
      searchLastNameInput () {
        this.search()
      },
      /* searchFirstNameInput () {
        this.search()
      }, */
      searchCompany () {
        this.search()
      },
      job () {
        this.search()
      },
    },
    mounted () {
      this.getInvestisseurs()
      this.history = this.userData.history
    },
    // beforeDestroy () {
    //  this.updateHistory()
    //  this.setDataUser()
    // },
    methods: {
      toDetailsInvestisseur (investisseur) {
        this.addToHistory(investisseur)
        this.$router.push({
          name: 'Investisseur',
          params: { investisseur: investisseur },
        })
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
        // console.log(this.job.length)
        this.loading = true
        if (this.searchLastNameInput === '' /* && this.searchFirstNameInput === '' */ && this.searchCompany === '' && this.job.length === 3) {
          this.investisseursFiltered = this.investisseurs
        } else if (this.job.length === 0) {
          this.investisseursFiltered = []
        } else {
          this.investisseursFiltered = this.investisseurs.filter(item => item.nom.toLowerCase().includes(this.searchLastNameInput.toLowerCase()))
          // this.investisseursFiltered = this.investisseurs.filter(item => item.prenom.toLowerCase().includes(this.searchFirstNameInput.toLowerCase()))
          this.investisseursFiltered = this.investisseurs.filter(item => item.company.toLowerCase().includes(this.searchCompany.toLowerCase()))
          this.investisseursFiltered.forEach(element => {
            this.jobFilter.push(element.job.some(r => this.job.includes(r)) ? this.investisseursFiltered : this.investisseursFiltered.splice(this.investisseursFiltered.indexOf(element), 1))
          })
          // console.log(this.jobFilter)
          this.jobFilter = []
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
