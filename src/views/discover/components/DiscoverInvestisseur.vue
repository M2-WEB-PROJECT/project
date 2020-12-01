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
              v-model="searchNameInput"
              :loading="loading"
              label="Search Projects"
              placeholder="Start typing to Search"
              prepend-icon="mdi-magnify"
            />
          </v-col>
          <v-col cols="4">
            <v-select
              v-model="tags"
              :items="values"
              label="Tags"
              multiple
              attach
              prepend-icon="mdi-tag-multiple"
            />
          </v-col>
          <v-col cols="2">
            <v-text-field
              v-model="searchBudgetMinInput"
              :loading="loading"
              label="Budget Min"
              placeholder="0"
              suffix="€"
            />
          </v-col>
          <v-col cols="2">
            <v-text-field
              v-model="searchBudgetMaxInput"
              :loading="loading"
              label="Budget Max"
              placeholder="999 999"
              suffix="€"
            />
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <v-row>
      <transition
        v-for="project in projectsFiltered"
        :key="project.name"
        name="fade"
      >
        <v-col
          cols="4"
        >
          <base-material-card
            class="v-card-profile"
            :avatar="userData.photoURL"
          >
            <v-card-text class="text-center">
              <h6 class="display-1 mb-1 grey--text">
                {{ project.name }}
              </h6>

              <h4 class="display-2 font-weight-light mb-3 black--text">
                John Doe
              </h4>

              <p class="font-weight-light grey--text">
                Projet informatique de niveau stratospherique
              </p>

              <v-btn
                color="primary"
                rounded
                class="mr-0"
                @click="addToHistory(project)"
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
    name: 'UserProfileInvestisseur',
    data () {
      return {
        searchNameInput: '',
        searchBudgetMinInput: '',
        searchBudgetMaxInput: '',
        loading: false,
        projects: [
          { name: 'Project 1' },
          { name: 'Project 2' },
          { name: 'Project 3' },
          { name: 'Project 4' },
          { name: 'Project 5' },
          { name: 'Project 6' },
        ],
        projectsFiltered: [],
        tags: ['IT', 'web', 'crypto-currency', 'security'],
        values: ['IT', 'web', 'crypto-currency', 'security'],
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
      searchNameInput () {
        this.search()
      },
    },
    mounted () {
      this.projectsFiltered = this.projects
      this.history = this.userData.history
    },
    beforeDestroy () {
      this.updateHistory()
      this.setDataUser()
    },
    methods: {
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
      addToHistory (project) {
        this.history.push(project)
      },
      search () {
        this.loading = true
        if (this.searchInput !== '') {
          this.projectsFiltered = this.projects.filter(item => item.name.includes(this.searchNameInput))
        } else {
          this.projectsFiltered = this.projects
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
