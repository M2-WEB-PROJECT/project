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
    <v-row>
      <v-col>
        <div class="text-center">
          <v-btn
            class="mb-15"
            x-large
            color="secondary"
            @click="toProjectList"
          >
            <v-icon
              dark
              class="mr-3"
            >
              mdi-arrow-left
            </v-icon>
            Project List
          </v-btn>
        </div>
        <base-material-card
          class="v-card-profile"
          :avatar="project.photoProjectURL"
        >
          <v-card-text class="text-center">
            <h4 class="display-2 font-weight-light mb-3 black--text">
              {{ project.name }}
            </h4>

            <h6 class="display-1 mb-1 grey--text">
              {{ userData.prenom }} {{ userData.nom }}
            </h6>

            <h5 class="display-2 font-weight-light mb-3 black--text">
              <v-btn
                v-for="tag in project.tags"
                :key="tag"
                small
                :color="colorTag(tag)"
              >
                {{ tag }}
              </v-btn>
            </h5>

            <p class="font-weight-light grey--text">
              {{ project.bio }}
            </p>
          </v-card-text>
          <v-row justify="center">
            <v-col cols="9">
              <v-card
                class="mx-auto"
              >
                <v-carousel v-model="carrousel">
                  <v-carousel-item
                    v-for="(slide, i) in project.slidesURL"
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
    </v-row>
  </v-container>
</template>
  <script>
  export default {
    props: {
      project: {
        type: Object,
        default: () => {},
      },
    },
    data () {
      return {
        carrousel: 0,
      }
    },
    computed: {
      userData () {
        return this.$store.state.userData
      },
    },
    methods: {
      toProjectList () {
        this.$router.push({ name: 'Projects' })
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
    },
  }
  </script>
