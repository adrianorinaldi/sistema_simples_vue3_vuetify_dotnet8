<template>
  <v-app>
    <v-card>
      <v-layout>
        <v-app-bar color="primary" prominent>
          <v-app-bar-nav-icon
            variant="text"
            @click.stop="drawer = !drawer"
          ></v-app-bar-nav-icon>

          <v-toolbar-title>Sistema Simples</v-toolbar-title>

          <v-spacer></v-spacer>

          <template v-if="$vuetify.display.mdAndUp">
            <v-btn icon="mdi-magnify" variant="text"></v-btn>

            <v-btn icon="mdi-filter" variant="text"></v-btn>
          </template>

          <v-btn icon="mdi-dots-vertical" variant="text"></v-btn>
        </v-app-bar>

        <v-navigation-drawer v-model="drawer" location="left" temporary>
          <v-list density="compact" nav>
            <v-list-item
              prepend-icon="mdi-account-supervisor-circle"
            >
              <RouterLink to="/">Página Inicial</RouterLink>
            </v-list-item>
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
  </v-app>
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
    console.log("teste",localStorage.getItem('auth_token'));
  },
  watch: {
    group () {
      this.drawer = false
    },
  },
}
</script>
