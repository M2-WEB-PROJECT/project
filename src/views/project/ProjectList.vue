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
            delete-icon
            :loading="loading"
            @delete="deleteProject(project)"
          >
            <v-card-text class="text-center">
              <h6 class="text-h4 mb-1 grey--text">
                {{ project.name }}
              </h6>

              <h4 class="text-h3 font-weight-light mb-3 black--text">
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
  import firebase from 'firebase'
  import { firestore } from '@/main'
  import { mapMutations } from 'vuex'

  export default {
    name: 'ProjectList',
    data () {
      return {
        loading: false,
        projects: [],
      }
    },
    computed: {
      uid () {
        return this.$store.state.user.uid
      },
      userData () {
        return this.$store.state.userData
      },
    },
    mounted () {
      this.getProjects()
    },
    methods: {
      async deleteProject (project) {
        this.loading = true
        this.setUserProjects(this.userData.projects.filter(item => project.uid !== item))
        await firestore.collection('projects').doc(project.uid).delete().then(async () => {
          await this.deleteFolderRecursive(`users/${this.uid}/projects/${project.uid}`)
          await firestore.collection('users').doc(this.uid).update({
            projects: this.userData.projects,
          }).then(() => {
            this.loading = false
            this.projects = this.projects.filter(item => project.uid !== item.uid)
          })
        })
      },
      async deleteFile (filePath) {
        const ref = firebase.storage().ref(filePath)
        return await ref.delete()
      },
      async deleteFolderRecursive (folderPath) {
        const ref = firebase.storage().ref(folderPath)
        const list = await ref.listAll()

        for await (const fileRef of list.items) {
          await this.deleteFile(fileRef.fullPath)
        }
        for await (const folderRef of list.prefixes) {
          await this.deleteFolderRecursive(folderRef.fullPath)
        }
      },
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
      ...mapMutations({
        setUserProjects: 'SET_PROJECTS',
      }),
    },
  }
</script>
