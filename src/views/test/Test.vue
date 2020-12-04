<template>
  <v-row justify="center">
    <v-col cols="6">
      <v-text-field v-model="text" />
      <div>
        {{ text2 }}
      </div>
      <!--      <div>-->
      <!--        {{ reverse }}-->
      <!--      </div>-->
    </v-col>
  </v-row>
</template>

<script>
  export default {
    name: 'Test',
    data () {
      return {
        text: '',
      }
    },
    computed: {
    },
  }
</script>
