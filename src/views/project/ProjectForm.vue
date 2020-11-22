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
                  label="Email Address"
                  disabled
                />
              </v-col>

              <v-col
                cols="12"
                md="4"
              >
                <v-text-field
                  label="First Name"
                  disabled
                />
              </v-col>

              <v-col
                cols="12"
                md="4"
              >
                <v-text-field
                  label="Last Name"
                  disabled
                />
              </v-col>

              <v-col
                cols="12"
                md="4"
              >
                <v-text-field
                  label="Company"
                />
              </v-col>
              <v-col
                cols="12"
                md="4"
              >
                <v-text-field
                  label="Job"
                />
              </v-col>
              <v-col
                cols="12"
                md="4"
              >
                <v-text-field
                  label="Budget"
                  suffix="€"
                />
              </v-col>
              <v-col>
                <v-file-input
                  accept="image/jpeg"
                  placeholder="Pick a photo"
                  prepend-icon="mdi-camera"
                  label="Photo de profile"
                />
              </v-col>
              <v-col cols="12">
                <v-textarea
                  label="About Me"
                />
              </v-col>

              <v-col
                cols="12"
                class="text-right"
              >
                <v-btn
                  color="primary"
                  class="mr-0"
                >
                  Update Project
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
        :avatar="userData.photoURL"
      >
        <v-card-text class="text-center">
          <h6 class="display-1 mb-1 grey--text">
            fgdfhfdgh
          </h6>

          <h4 class="display-2 font-weight-light mb-3 black--text">
            lkùklùlkmùklmù
          </h4>

          <p class="font-weight-light grey--text">
            lkmùlmkùmlkùklmù
          </p>
        </v-card-text>
      </base-material-card>
    </v-col>
  </v-container>
</template>

<script>
  export default {
    name: 'ProjectForm',
    data () {
      return {
        snackbar: false,
      }
    },
    computed: {
      userData () {
        return this.$store.state.userData
      },
    },
  }
</script>

<style scoped>

</style>
