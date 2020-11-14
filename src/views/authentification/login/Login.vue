<template>
  <v-container
    style="background-color: #2E383D;"
  >
    <v-row
      justify="center"
    >
      <v-col cols="5">
        <base-material-card
          color="primary"
        >
          <template v-slot:heading>
            <div class="display-2 font-weight-light">
              Log in
            </div>

            <div class="subtitle-1 font-weight-light">
              Be a part of our community
            </div>
          </template>

          <v-card-text>
            <v-container
              class="pa-0"
              fluid
            >
              <v-col>
                <v-row>
                  <v-col>
                    <v-text-field
                      label="Email"
                    />
                    <v-text-field
                      label="Password"
                    />
                  </v-col>
                </v-row>
                <v-row justify="end">
                  <v-btn
                    color="secondary"
                  >
                    Log in
                  </v-btn>
                </v-row>
              </v-col>
            </v-container>
          </v-card-text>
        </base-material-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: 'Login',
  }
</script>
