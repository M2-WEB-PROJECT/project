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
    <v-col>
      <base-material-card
        color="info"
      >
        <template v-slot:heading>
          <div class="display-2 font-weight-light">
            Edit Project
          </div>

          <div class="subtitle-1 font-weight-light">
            Be powerful & complete your project
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
                  v-model="emailPro"
                  label="Email Address Pro"
                />
              </v-col>

              <v-col
                cols="12"
                md="4"
              >
                <v-text-field
                  disabled
                  label="First Name"
                  :value="userData.prenom"
                />
              </v-col>

              <v-col
                cols="12"
                md="4"
              >
                <v-text-field
                  disabled
                  label="Last Name"
                  :value="userData.nom"
                />
              </v-col>

              <v-col
                cols="12"
                md="4"
              >
                <v-text-field
                  v-model="nameProject"
                  label="Name Project"
                />
              </v-col>
              <v-col
                cols="12"
                md="4"
              >
                <v-select
                  v-model="tags"
                  :items="values"
                  label="Tags"
                  multiple
                  attach
                  prepend-icon="mdi-tag-multiple"
                />
              </v-col>
              <v-col
                cols="12"
                md="4"
              >
                <v-text-field
                  v-model="budgetProject"
                  label="Budget"
                  suffix="€"
                />
              </v-col>
              <v-col>
                <v-file-input
                  v-model="photoProject"
                  accept="image/jpeg"
                  placeholder="Pick a photo"
                  prepend-icon="mdi-camera"
                  label="Project Photo"
                  @change="previewPhotoProject"
                />
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="abstractProject"
                  prepend-icon="mdi-pen"
                  label="About The project"
                />
              </v-col>
              <v-col cols="12">
                <v-textarea
                  v-model="bioProject"
                  label="About The project"
                />
              </v-col>
              <v-col cols="12">
                <v-file-input
                  v-model="slides"
                  multiple
                  accept="image/jpeg"
                  placeholder="Pick some photo for your slides"
                  prepend-icon="mdi-camera"
                  label="Carousel"
                  @change="previewCarrousel"
                />
              </v-col>
              <v-col
                cols="12"
                class="text-right"
              >
                <v-btn
                  color="primary"
                  class="mr-5"
                  @click="toProjectList"
                >
                  <v-icon
                    dark
                    class="mr-3"
                  >
                    mdi-arrow-left
                  </v-icon>
                  Back
                </v-btn>
                <v-btn
                  v-if="isEditing"
                  color="primary"
                  class="mr-0"
                  :loading="loading"
                  :disabled="loading"
                  @click="editProject"
                >
                  Edit Project
                </v-btn>
                <v-btn
                  v-else
                  color="primary"
                  class="mr-0"
                  :loading="loading"
                  :disabled="loading"
                  @click="createProject"
                >
                  Create Project
                </v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </base-material-card>
    </v-col>

    <v-col>
      <base-material-card
        class="v-card-profile"
        :avatar="previewPhoto"
      >
        <v-card-text class="text-center">
          <h6 class="display-1 mb-1 grey--text">
            {{ nameProject }}
          </h6>

          <h4 class="display-2 font-weight-light mb-3 black--text">
            <v-btn
              v-for="tag in tags"
              :key="tag"
              small
              :color="colorTag(tag)"
            >
              {{ tag }}
            </v-btn>
          </h4>

          <p class="font-weight-light grey--text">
            {{ bioProject }}
          </p>
        </v-card-text>
        <v-row justify="center">
          <v-col cols="9">
            <v-card
              class="mx-auto"
            >
              <v-carousel v-model="carrousel">
                <v-carousel-item
                  v-for="(slide, i) in slidesURL"
                  :key="i"
                >
                  <v-sheet
                    height="100%"
                    tile
                  >
                    <v-row
                      align="center"
                      justify="center"
                    >
                      <v-img :src="slide" />
                    </v-row>
                  </v-sheet>
                </v-carousel-item>
              </v-carousel>
              <v-list two-line>
                <v-list-item>
                  <v-list-item-avatar>
                    <v-img :src="userData.photoURL" />
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title>{{ userData.prenom }} {{ userData.nom }}</v-list-item-title>
                    <v-list-item-subtitle>Author</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card>
          </v-col>
        </v-row>
      </base-material-card>
    </v-col>
  </v-container>
</template>

<script>
  import firebase from 'firebase'
  import { firestore } from '@/main'

  export default {
    name: 'ProjectForm',
    data () {
      return {
        loading: false,
        carrousel: 0,
        photoProject: null,
        photoProjectURL: 'https://dpcpa.com/wp-content/uploads/2015/01/thumbnail-default.jpg',
        nameProject: '',
        budgetProject: 0,
        bioProject: '',
        abstractProject: '',
        slides: [],
        slidesURL: [
          'https://dpcpa.com/wp-content/uploads/2015/01/thumbnail-default.jpg',
          'https://dpcpa.com/wp-content/uploads/2015/01/thumbnail-default.jpg',
          'https://dpcpa.com/wp-content/uploads/2015/01/thumbnail-default.jpg',
        ],
        emailPro: '',
        snackbar: false,
        cycle: false,
        tags: ['IT', 'web', 'crypto-currency', 'security'],
        values: ['IT', 'web', 'crypto-currency', 'security'],
      }
    },
    computed: {
      uid () {
        return this.$store.state.user.uid
      },
      userData () {
        return this.$store.state.userData
      },
      previewPhoto () {
        if (this.photoProject === null && this.photoProjectURL === null) {
          return this.userData.photoURL
        } else {
          return this.photoProjectURL
        }
      },
      projectParams () {
        return this.$route.params.project
      },
      isEditing () {
        if (this.projectParams) {
          return true
        } else {
          return false
        }
      },
    },
    mounted () {
      if (this.isEditing) {
        this.setEditData()
      }
    },
    methods: {
      setEditData () {
        this.photoProjectURL = this.projectParams.photoProjectURL
        this.nameProject = this.projectParams.name
        this.slidesURL = this.projectParams.slidesURL
        this.emailPro = this.projectParams.emailPro
        this.bioProject = this.projectParams.bio
        this.tags = this.projectParams.tags
        this.budgetProject = this.projectParams.budget
        this.abstractProject = this.projectParams.abstract
      },
      previewPhotoProject () {
        this.photoProjectURL = URL.createObjectURL(this.photoProject)
      },
      previewCarrousel () {
        this.slidesURL = []
        this.slides.forEach(slide => {
          this.slidesURL.push(URL.createObjectURL(slide))
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
      async createProject () {
        this.loading = true
        firestore.collection('projects').add({
          name: this.nameProject,
          emailPro: this.emailPro,
          tags: this.tags,
          budget: this.budgetProject,
          bio: this.bioProject,
          abstract: this.abstractProject,
        }).then(async (success) => {
          this.userData.projects.push(success.id)
          const slidesURL = []
          let photoProjectURL = 'https://dpcpa.com/wp-content/uploads/2015/01/thumbnail-default.jpg'
          if (this.photoProject) {
            await firebase.storage().ref(`users/${this.uid}/projects/${success.id}/project.jpg`).put(this.photoProject).then(() => {
              firebase.storage().ref(`users/${this.uid}/projects/${success.id}/project.jpg`).getDownloadURL().then(imgURL => {
                photoProjectURL = imgURL
              }).then(() => {
                firestore.collection('projects').doc(success.id).update({
                  photoProjectURL: photoProjectURL,
                })
              })
            })
          } else {
            await firestore.collection('projects').doc(success.id).update({
              photoProjectURL: photoProjectURL,
            })
          }
          if (!this.slides) {
            this.slides.forEach((item, index) => {
              firebase.storage().ref(`users/${this.uid}/projects/${success.id}/project${index}.jpg`).put(item).then(() => {
                firebase.storage().ref(`users/${this.uid}/projects/${success.id}/project${index}.jpg`).getDownloadURL().then(imgURL => {
                  slidesURL.push(imgURL)
                }).then(() => {
                  firestore.collection('projects').doc(success.id).update({
                    slidesURL: slidesURL,
                  }).then(() => {
                    firestore.collection('users').doc(this.uid).update({
                      projects: this.userData.projects,
                    }).then(() => {
                      this.toProjectList()
                    })
                  })
                })
              })
            })
          } else {
            firestore.collection('users').doc(this.uid).update({
              projects: this.userData.projects,
            }).then(() => {
              this.toProjectList()
            })
          }
        })
      },
      async editProject () {
        this.loading = true
        if (this.photoProject) {
          let photoProjectURL = null
          await firebase.storage().ref(`users/${this.uid}/projects/${this.projectParams.uid}/project.jpg`).put(this.photoProject)
          await firebase.storage().ref(`users/${this.uid}/projects/${this.projectParams.uid}/project.jpg`).getDownloadURL().then(imgURL => {
            photoProjectURL = imgURL
          }).then(() => {
            firestore.collection('projects').doc(this.projectParams.uid).update({
              photoProjectURL: photoProjectURL,
            })
          })
        }
        if (this.photoProject) {
          const slidesURL = []
          this.slides.forEach((item, index) => {
            firebase.storage().ref(`/users/${this.uid}/projects/${this.projectParams.uid}/project${index}.jpg`).put(item).then(() => {
              firebase.storage().ref(`users/${this.uid}/projects/${this.projectParams.uid}/project${index}.jpg`).getDownloadURL().then(imgURL => {
                slidesURL.push(imgURL)
              })
            }).then(() => {
              firestore.collection('projects').doc(this.projectParams.uid).update({
                slidesURL: slidesURL,
              })
            })
          })
        }
        firestore.collection('projects').doc(this.projectParams.uid).update({
          name: this.nameProject,
          emailPro: this.emailPro,
          tags: this.tags,
          budget: this.budgetProject,
          bio: this.bioProject,
          abstract: this.abstractProject,
        }).then(() => {
          this.toProjectList()
        })
      },
      toProjectList () {
        this.$router.push({ name: 'Projects' })
      },
    },
  }
</script>
