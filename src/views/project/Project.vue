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
          </v-card-text>
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
    computed: {
      userData () {
        return this.$store.state.userData
      },
    },
  }
  </script>
