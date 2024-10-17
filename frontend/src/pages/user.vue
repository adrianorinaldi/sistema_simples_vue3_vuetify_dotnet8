<template>
  <v-container>
    <v-row>
      <v-col>
        <v-btn
          v-tooltip:bottom="'Alterar Categoria'"
          variant="flat"
          color="success"
          text="cadastrar"
          to="/register_user"
        />        
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <h1>Usuários</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title>
            <v-text-field
              v-model="search"
              density="compact"
              label="Buscar..."
              prepend-inner-icon="mdi-magnify"
              variant="solo-filled"
              flat
              hide-details
              single-line
            ></v-text-field>
          </v-card-title>
          <v-divider></v-divider>
          <v-data-table
            v-model:search="search"
            :headers="headers"
            :items="dados"
            :loading="loading"
            items-per-page-text="Items por Página"
          >
            <template v-slot:[`item.actions`]="{ item }">
              <v-row class="d-flex justify-end align-end" no-gutters>
                <v-col cols="4">
                  <v-btn
                    v-tooltip:bottom="'Alterar Categoria'"
                    variant="flat"
                    icon="mdi-pencil"
                    density="comfortable"
                    @click="edit(item)"
                  />
                </v-col>
                <v-col cols="4">
                  <v-dialog max-width="500">
                    <template v-slot:activator="{ props: activatorProps }">
                      <v-btn
                        v-bind="activatorProps"
                        v-tooltip:bottom="'Excluir Categoria'"
                        variant="flat"
                        icon="mdi-delete"
                        density="comfortable"
                      />
                    </template>
                    <template v-slot:default="{ isActive }">
                      <v-card title="Excluir">
                        <v-card-text>
                          Deseja realmente excluir a Categoria?
                        </v-card-text>
                        <v-card-actions>
                          <v-btn
                            text="Não"
                            @click="isActive.value = false"
                            color="error"
                          ></v-btn>
                          <v-btn
                            text="Sim"
                            @click="deleteItem(item), (isActive.value = false)"
                            color="success"
                          ></v-btn>
                        </v-card-actions>
                      </v-card>
                    </template>
                  </v-dialog>
                </v-col>
                <!--<v-col 
          v-else
            cols="4">
            <ButtonInactiveList
              v-if="item.status == 'ativo' ? true : false"
              @click="inactivate(item)"
              v-tooltip:bottom="'Inativar Categoria'"
            />
            <ButtonActiveList
              v-else
              @click="activate(item)"
              v-tooltip:bottom="'Ativar Categoria'"
            />
          </v-col>-->
              </v-row>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>

  <!--<v-container>
    <v-col>
      <AlertSucess v-model="alteracao_valida" :text="mensagem" />
    </v-col>
    <v-col>
      <AlertError v-model="alteracao_invalida" :text="mensagem" />
    </v-col>
  </v-container>-->
</template>

<script>
import api from "@/plugins/api";

export default {
  name: "ListUser",
  components: {
  },
  data() {
    return {
      headers: [
        {
          title: "Nome Completo",
          text: "Nome Completo",
          value: "fullName",
          align: "start",
        },
        {
          title: "E-mail",
          text: "E-mail",
          value: "email",
          align: "end",
        },
        {
          title: "Ações",
          text: "Ações",
          value: "actions",
          align: "end",
          width: "15%",
          sortable: false,
        },
      ],
      dados: [],
      loading: false,
      alteracao_valida: false,
      alteracao_invalida: false,
      mensagem: "",
      search: "",
      alter: false,
    };
  },
  created() {
    this.findAll();
  },
  methods: {
    async findAll() {
      console.log("1")
      try {
          console.log("2")
          const response = await api.get("/user");
          console.log("3")
          console.log("response.data", response.data)
          this.dados = response.data;
        } catch (error) {
            this.text = "Não foi possível buscar!";
            this.snackbar = true;
        }
    },
    edit(item) {
      this.$router.push( { name: "register_user", params: { dados: item } } );
    },
    /*edit(item) {
      this.$router.push({ name: "register_category", params: { id: item.id } });
    },
    async deleteItem(item) {
      try {
        const response = await axios.delete(`/category/${item.id}`);
        this.alteracao_valida = true;
        this.mensagem = "Excluído com Sucesso!";
        this.findAll();
        setTimeout(() => {
          this.alteracao_valida = false;
        }, this.$tempoDaMensagem);
      } catch (error) {
        console.error(error);
        this.alteracao_invalida = true;
        this.mensagem = "Não foi possivel excluir.";
      }
    },
    async validateAlterTicket(id) {
      const response = await axios.get(
        `/Ticket/exists_category/${id}`
      );
      return response.data;
    },
    async validateAlterTicketIntern(id) {
      const response = await axios.get(
        `/TicketIntern/exists_category/${id}`
      );
      return response.data;
    },
    async inactivate(item) {
      try {
        const response = await axios.patch(
          `/Category/status/${item.id}`,
          "inativo",
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        this.mensagem = "Categoria inativada com sucesso.";
        this.alteracao_valida = true;
        this.findAll();
        setTimeout(() => {
          this.alteracao_valida = false;
        }, this.$tempoDaMensagem);
      } catch (error) {
        console.error("Erro ao inativar categoria:", error);
        this.mensagem = "Erro ao inativar categoria.";
        this.alteracao_valida = true;
      }
    },
    async activate(item) {
      try {
        const response = await axios.patch(
          `/Category/status/${item.id}`,
          "ativo",
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        this.mensagem = "Categoria ativada com sucesso.";
        this.alteracao_valida = true;
        this.findAll();
        setTimeout(() => {
          this.alteracao_valida = false;
        }, this.$tempoDaMensagem);
      } catch (error) {
        console.error("Erro ao ativar categoria:", error);
        this.mensagem = "Erro ao ativar categoria.";
        this.alteracao_valida = true;
      }
    },*/
  },
};
</script>
