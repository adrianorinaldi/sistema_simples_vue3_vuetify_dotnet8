<template>
  <HelloWorld />
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue';

  export default {
    components: {
      HelloWorld,
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
