<template>
  <Base-modify>
    <template v-slot:header>
      <h1>Edit listing</h1>
    </template>
    <template v-slot:button> SAVE </template>
  </Base-modify>
</template>

<script>
import BaseModify from "./../components/houses/BaseModify.vue";

export default {
  components: {
    BaseModify,
  },
};
</script>
