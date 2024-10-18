<template>
  <div>
    <v-img
      class="mx-auto my-6"
      max-width="228"
      src="https://cdn.vuetifyjs.com/docs/images/logos/vuetify-logo-v3-slim-text-light.svg"
    ></v-img>

    <v-card
      class="mx-auto pa-12 pb-8"
      elevation="8"
      max-width="448"
      rounded="lg"
    >
      <v-form ref="form" @submit.prevent="login">
        <div class="text-subtitle-1 text-medium-emphasis">E-mail</div>
        <v-text-field
          density="compact"
          placeholder="E-mail"
          prepend-inner-icon="mdi-email-outline"
          variant="outlined"
          v-model="dados.email"
          :rules="rules"
        ></v-text-field>
        <div
          class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between"
        >
          Senha
        </div>
        <v-text-field
          :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
          :type="visible ? 'text' : 'password'"
          density="compact"
          placeholder="Senha"
          prepend-inner-icon="mdi-lock-outline"
          variant="outlined"
          @click:append-inner="visible = !visible"
          v-model="dados.password"
          :rules="rules"
        ></v-text-field>
        <v-btn
          class="mb-8"
          color="blue"
          size="large"
          variant="tonal"
          block
          type="submit"
        >
          ENTRAR
        </v-btn>
      </v-form>
    </v-card>
    <div>
      <v-snackbar v-model="snackbar">
        {{ text }}

        <template v-slot:actions>
          <v-btn color="blue" variant="text" @click="snackbar = false">
            Close
          </v-btn>
        </template>
      </v-snackbar>
    </div>
  </div>
</template>

<script>
import api from "@/plugins/api.js";

export default {
  data: () => ({
    visible: false,
    dados: {},
    rules: [
      (value) => {
        if (value) return true;
        return "Campo obrigatório.";
      },
    ],
    snackbar: false,
    text: null,
  }),
  methods: {
    async login() {
      const { valid } = await this.$refs.form.validate();
      if (valid) {
        try {
          const response = await api.post("Auth/login", this.dados);
          localStorage.setItem("auth_token", response.data.token);
          this.$router.push("/");
        } catch (error) {
          if (error.response && error.response.status === 400) {
            // Exemplo: redirecionar para o login
            //window.location = '/login';
            this.text = "E-mail ou Senha incorretos!";
            this.snackbar = true;
          }
        }
      } else {
      }
    },
  },
};
</script>
