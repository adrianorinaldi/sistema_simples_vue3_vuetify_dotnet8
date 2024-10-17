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
            <v-btn class="mt-4" color="error" block to="/user"> VOLTAR </v-btn>
          </v-col>
          <v-col>
            <v-btn class="mt-4" color="success" block type="submit">
              CADASTRAR
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-card>
    <div>
      <v-snackbar v-model="snackbar" :timeout="timeout">
        {{ text }}

        <template v-slot:actions>
          <v-btn color="blue" variant="text" @click="snackbar = false">
            Close
          </v-btn>
        </template>
      </v-snackbar>
    </div>
  </v-container>
</template>

<script>
import api from "@/plugins/api";

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
      snackbar: false,
      text: null,
      timeout: 2000,
    };
  },
  created() {
    console.log("dados=", this.$route.params.dados)
  },
  methods: {
    async register() {
      const { valid } = await this.$refs.form.validate();
      if (valid) {
        try {
          const response = await api.post("/user", this.dados);
          this.text = "Cadastrado com sucesso!";
          this.snackbar = true;
          this.$router.push("/user");
        } catch (error) {
            this.text = "Não foi possível cadastrar!";
            this.snackbar = true;
        }
      } else {
        this.text = "Preencha os campos corretamente!";
        this.snackbar = true;
      }
    },
  },
};
</script>
