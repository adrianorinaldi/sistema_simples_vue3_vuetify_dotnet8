<template>
  <v-container>
    <v-card>
        <v-data-iterator :items="[1, 2, 3, 4, 5]">
  <template v-slot:default="{ items }">
    <v-list-item
      v-for="(item, i) in items"
      :key="i"
      :title="`Item ${i}`"
    ></v-list-item>
  </template>
</v-data-iterator>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
        search: '',
        users: [
        {
          fullName: 'Adriano Margheti Rinaldi',
          email: 'adriano-rinaldi@hotmail.com',
        },
    ]
    };
  },
  methods: {
    async register() {},
  },
};
</script>
