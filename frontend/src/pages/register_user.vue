<template>
  <v-container>
    <v-card>
      <v-form ref="form" @submit.prevent="register">
        <div class="text-subtitle-1 text-medium-emphasis">Nome Completo</div>
        <v-text-field
          density="compact"
          placeholder="Nome Completo"
          variant="outlined"
          v-model="dados.fullName"
          :rules="rules"
        ></v-text-field>
        <div class="text-subtitle-1 text-medium-emphasis">E-mail</div>
        <v-text-field
          density="compact"
          placeholder="E-mail"
          variant="outlined"
          v-model="dados.email"
          :rules="rules"
        ></v-text-field>
        <div class="text-subtitle-1 text-medium-emphasis">Senha</div>
        <v-text-field
          :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
          :type="visible ? 'text' : 'password'"
          density="compact"
          placeholder="Senha"
          variant="outlined"
          @click:append-inner="visible = !visible"
          v-model="dados.password"
          :rules="rules"
        ></v-text-field>
        <div class="text-subtitle-1 text-medium-emphasis">Tipo de Usuário</div>
        <v-select
          v-model="dados.role"
          placeholder="Tipo de Usuário"
          :rules="rules"
          :items="roleSelect"
          label="Tipo de Usuário"
        ></v-select>
        <v-row>
          <v-col>
            <v-btn class="mt-4" color="error" block> VOLTAR </v-btn>
          </v-col>
          <v-col>
            <v-btn class="mt-4" color="success" block type="submit">
              CADASTRAR
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      dados: {},
      rules: [
        (value) => {
          if (value) return true;
          return "Campo obrigatório.";
        },
      ],
      visible: false,
      roleSelect: ["root", "admin", "user"],
    };
  },
  methods: {
    async register() {},
  },
};
</script>
