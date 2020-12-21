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
      <v-simple-table>
        <thead>
          <tr>
            <th class="primary--text">
              ID
            </th>
            <th class="primary--text">
              Nom
            </th>
            <th class="primary--text">
              Prenom
            </th>
            <th class="primary--text">
              Job
            </th>
            <th class="text-right primary--text">
              Company
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(investisseur, index) in userData.history"
            :key="investisseur.nom"
          >
            <td>{{ index }}</td>
            <td>{{ investisseur.nom }}</td>
            <td>{{ investisseur.prenom }}</td>
            <td>{{ investisseur.job }}</td>
            <td class="text-right">
              {{ investisseur.company }}
            </td>
          </tr>
        </tbody>
      </v-simple-table>
    </base-material-card>
  </v-container>
</template>
<script>
  import { firestore } from '@/main'
  import { mapMutations } from 'vuex'

  export default {
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
