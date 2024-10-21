<template>
      <v-card>
        <v-layout>
          <v-app-bar color="primary" prominent>
            <v-app-bar-nav-icon
              variant="text"
              @click.stop="drawer = !drawer"
            ></v-app-bar-nav-icon>
            <v-btn icon="mdi-home" variant="text" v-tooltip="'Home'" to="/"></v-btn>
            <v-toolbar-title>Sistema Simples</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon="mdi-logout-variant" variant="text" v-tooltip="'Sair'" @click="logout"></v-btn>
          </v-app-bar>
          <v-navigation-drawer v-model="drawer" location="left" temporary>
            <v-list density="compact" nav>
              <v-list-item
              prepend-icon="mdi-account-supervisor-circle"
              >
                <RouterLink to="/user">Usuários</RouterLink>
              </v-list-item>
            </v-list>
          </v-navigation-drawer>
          <v-main
            class="d-flex align-center justify-center"
            style="min-height: 100vh"
          >
            <router-view />
          </v-main>
        </v-layout>
      </v-card>
  </template>  
  
  <script>
  export default {
    components: {
    },
    data: () => ({
      drawer: false,
      group: null,
    }),
    created() {
    },
    watch: {
      group () {
        this.drawer = false
      },
    },
    methods: {
      logout() {
        localStorage.removeItem('auth_token');
        window.location = "/login";
      }
    }
  }
  </script>
  
  