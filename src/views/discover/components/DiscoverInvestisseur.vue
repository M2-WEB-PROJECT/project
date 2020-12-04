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
            :avatar="project.photoProjectURL"
          >
            <v-card-text class="text-center">
              <v-row
                justify="center"
                class="mb-3"
              >
                <v-btn
                  v-for="tag in project.tags"
                  :key="tag"
                  x-small
                  :color="colorTag(tag)"
                >
                  {{ tag }}
                </v-btn>
              </v-row>

              <h6 class="display-1 mb-1 grey--text">
                {{ project.name }}
              </h6>

              <h4 class="display-2 font-weight-light mb-3 black--text">
                {{ project.firstNameAuthor }} {{ project.lastNameAuthor }}
              </h4>

              <p class="font-weight-light grey--text">
                {{ project.abstract }}
              </p>

              <v-btn
                color="primary"
                rounded
                class="mr-2"
                small
                :disabled="hasAccessProjects(project)"
                @click="addToHistory(project)"
              >
                En savoir plus
              </v-btn>
              <v-btn
                v-show="hasAccessProjects(project)"
                color="secondary"
                rounded
                class="mr-0"
                small
                :disabled="hasDemandAccessProjects(project)"
                @click="demandAccess(project)"
              >
                Demander l'acces
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
    name: 'DiscoverInvestisseur',
    data () {
      return {
        searchNameInput: '',
        searchBudgetMinInput: '',
        searchBudgetMaxInput: '',
        loading: false,
        projects: [],
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
      this.getProjects()
      this.projectsFiltered = this.projects
      this.history = this.userData.history
    },
    beforeDestroy () {
      this.updateHistory()
      this.setDataUser()
    },
    methods: {
      hasAccessProjects (project) {
        return !project.accessProject.includes(this.uid)
      },
      hasDemandAccessProjects (project) {
        return project.accessDemand.includes(this.uid)
      },
      async demandAccess (project) {
        project.accessDemand.push(this.uid)
        await firestore.collection('projects').doc(project.uid).update({
          accessDemand: project.accessDemand,
        }).then(() => {
          this.getProjects()
        })
      },
      colorTag (tag) {
        switch (tag) {
          case 'web': return 'primary'
          case 'crypto-currency': return 'secondary'
          case 'security': return 'info'
          case 'IT': return 'info'
          default: return ''
        }
      },
      async getProjects () {
        await firestore.collection('projects').get().then(projects => {
          this.projects = projects.docs.map(doc => {
            return {
              uid: doc.id,
              ...doc.data(),
            }
          })
          this.search()
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
        setAccessProjects: 'SET_ACCESS_PROJECTS',
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
