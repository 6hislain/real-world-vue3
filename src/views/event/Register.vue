<template>
  <p>Register for the event there</p>
  <button @click="register">Register Me</button>
</template>
<script>
export default {
  name: "EventRegister",
  props: ["event"],
  inject: ["GStore"],
  methods: {
    register() {
      // Call to API, if registered then redirect to event details
      this.GStore.flashMessage =
        "You are successfully registered for " + this.event.title;
      setTimeout(() => {
        this.GStore.flashMessage = "";
      }, 3000);

      this.$router.push({
        name: "EventDetails",
        params: { id: this.event.id },
      });
    },
  },
};
</script>
