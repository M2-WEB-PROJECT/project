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
  export default {
    name: 'UserProfileInvestisseur',
    data () {
      return {
        searchInput: '',
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
      }
    },
    computed: {
      user () {
        return this.$store.state.user
      },
      userData () {
        return this.$store.state.userData
      },
    },
    watch: {
      searchInput () {
        this.search()
      },
    },
    mounted () {
      this.projectsFiltered = this.projects
    },
    methods: {
      search () {
        this.loading = true
        if (this.searchInput !== '') {
          this.projectsFiltered = this.projects.filter(item => item.name.includes(this.searchInput))
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
