<template>
  <v-app>
    <v-toolbar
      fixed
      app
      color="yellow"
    >
      <v-toolbar-title v-text="title"/>
    </v-toolbar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-footer
      :fixed="fixed"
      app
      color="yellow"
    >
      <span>&copy; 2018 saken649</span>
    </v-footer>
  </v-app>
</template>

<script>
  export default {
    data() {
      return {
        fixed: false,
        title: 'ユメ語変換器'
      }
    }
  }
</script>
