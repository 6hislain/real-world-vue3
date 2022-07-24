<template>
  <p>{{ event.time }} on {{ event.date }} @ {{ event.location }}</p>
  <p>{{ event.description }}</p>
</template>
<script>
export default {
  name: "EventDetails",
  props: ["event"],
  // props: ["id"],
  // created() {
  //   this.$store.dispatch("fetchEvent", this.id);
  // },
  // computed: {
  //   event() {
  //     return this.$store.state.event
  //   }
  // }
};
</script>
