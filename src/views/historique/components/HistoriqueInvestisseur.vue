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
              Name
            </th>
            <th class="primary--text">
              Author First Name
            </th>
            <th class="primary--text">
              Author Last Name
            </th>
            <th class="text-right primary--text">
              Budget
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(project,index) in userData.history"
            :key="project.name"
          >
            <td>{{ index }}</td>
            <td>{{ project.name }}</td>
            <td>{{ project.firstNameAuthor }}</td>
            <td>{{ project.lastNameAuthor }}</td>
            <td class="text-right">
              {{ project.budget }}€
            </td>
          </tr>
        </tbody>
      </v-simple-table>
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
      <v-simple-table>
        <thead>
          <tr>
            <th class="secondary--text">
              ID
            </th>
            <th class="secondary--text">
              Name
            </th>
            <th class="primary--text">
              Author First Name
            </th>
            <th class="primary--text">
              Author Last Name
            </th>
            <th class="text-right primary--text">
              Budget
            </th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="(project,index) in userData.history"
            :key="project.name"
          >
            <td>{{ index }}</td>
            <td>{{ project.name }}</td>
            <td>{{ project.firstNameAuthor }}</td>
            <td>{{ project.lastNameAuthor }}</td>
            <td class="text-right">
              {{ project.budget }}€
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
