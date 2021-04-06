<template>
  <v-container
    id="regular-tables"
    fluid
    tag="section"
  >
    <base-v-component
      heading="Historique"
      subheading="Remonter dans le temps..."
    />

    <base-material-card
      color="primary"
      icon="mdi-clipboard-text"
      title="Historique de navigation profile"
      class="px-5 py-3"
      delete-icon
      @delete="deleteProfileHistory"
    >
      <v-data-table
        :headers="headersProfile"
        :items="userData.historyProfile"
        :items-per-page="5"
      />
    </base-material-card>

    <div class="py-3" />

    <base-material-card
      color="secondary"
      dark
      icon="mdi-history"
      title="Historique de navigation projet"
      class="px-5 py-3"
      delete-icon
      @delete="deleteProjectHistory"
    >
      <v-data-table
        :headers="headers"
        :items="userData.history"
        :items-per-page="5"
      />
    </base-material-card>
  </v-container>
</template>
<script>
  import { firestore } from '@/main'
  import { mapMutations } from 'vuex'

  export default {
    data () {
      return {
        headers: [
          {
            text: 'Name',
            align: 'start',
            sortable: true,
            value: 'name',
          },
          { text: 'First Name Author', value: 'firstNameAuthor' },
          { text: 'Last Name Author', value: 'lastNameAuthor' },
          { text: 'Budget (€)', value: 'budget' },
        ],
        headersProfile: [
          {
            text: 'Name',
            align: 'start',
            sortable: true,
            value: 'name',
          },
          { text: 'First Name Author', value: 'firstNameAuthor' },
          { text: 'Last Name Author', value: 'lastNameAuthor' },
          { text: 'Budget (€)', value: 'budget' },
        ],
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
    methods: {
      async deleteProjectHistory () {
        await firestore.collection('users').doc(this.uid).update({
          history: [],
        }).then(() => {
          this.setDataUser()
        })
      },
      deleteProfileHistory () {

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
      }),
    },
  }
</script>
