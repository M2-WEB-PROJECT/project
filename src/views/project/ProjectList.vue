<template>
  <v-container
    id="regular-tables"
    fluid
    tag="section"
  >
    <base-v-component
      heading="Projects"
      subheading="Be inventive..."
    />
    <v-row
      align="center"
      justify="center"
      class="mb-10"
    >
      <v-col
        cols="4"
        class="text-md-center"
      >
        <v-btn
          x-large
          color="secondary"
          @click="toProjectForm"
        >
          <v-icon
            dark
            class="mr-3"
          >
            mdi-pencil-plus
          </v-icon>
          Create New Project
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <transition
        v-for="(project, i) in projects"
        :key="i"
        name="fade"
      >
        <v-col
          cols="6"
        >
          <base-material-card
            class="v-card-profile"
            :avatar="project.photoProjectURL"
          >
            <v-card-text class="text-center">
              <h6 class="display-1 mb-1 grey--text">
                {{ project.nameProject }}
              </h6>

              <h4 class="display-2 font-weight-light mb-3 black--text">
                {{ userData.prenom }} {{ userData.nom }}
              </h4>

              <p class="font-weight-light grey--text">
                {{ project.abstract }}
              </p>

              <v-btn
                color="primary"
                rounded
                class="mr-5"
                @click="toEditProject(project)"
              >
                Edit
              </v-btn>
              <v-btn
                color="primary"
                rounded
                class="mr-0"
                @click="toDetailsProject(project)"
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

  export default {
    name: 'Project',
    data () {
      return {
        projects: [],
      }
    },
    computed: {
      userData () {
        return this.$store.state.userData
      },
    },
    mounted () {
      this.getProjects()
    },
    methods: {
      getProjects () {
        this.userData.projects.forEach(item => {
          firestore.collection('projects').doc(item).get().then(doc => {
            if (doc.exists) {
              const project = doc.data()
              project.uid = item
              this.projects.push(project)
            }
          })
        })
      },
      toEditProject (project) {
        this.$router.push({
          name: 'ProjectForm',
          params: { project: project },
        })
      },
      toProjectForm () {
        this.$router.push({ name: 'ProjectForm' })
      },
      toDetailsProject (project) {
        this.$router.push({
          name: 'Project',
          params: { project: project },
        })
      },
    },
  }
</script>

<style scoped>

</style>
