<template>
  <v-row justify="center">
    <v-col cols="6">
      <v-file-input
        v-model="image"
        @change="Preview_image"
      />
      <v-img :src="url" />
    </v-col>
  </v-row>
</template>

<script>
  export default {
    name: 'Test',
    data () {
      return {
        image: null,
        photoProject: null,
      }
    },
    methods: {
      Preview_image () {
        this.photoProject = URL.createObjectURL(this.image)
      },
    },
  }
</script>
