<template>
  <v-col class="foreground" cols="12">
    <v-alert
      dense
      :type="type"
      :value="activated"
      dismissible
      @display-alert="activate"
      @click="activated = false"
    >
      {{ message }}
    </v-alert>
  </v-col>
</template>

<script>
import Api from "@/api/ApiRequester";

export default {
  Level: {
    Warning: "warning",
    Success: "success",
    Info: "info",
    Error: "error",
  },
  beforeMount() {
    let eventBus = Api.getEventBus();
    eventBus.$on("alert-event", this.activate);
  },
  data() {
    return {
      type: "success",
      message: "placeholder",
      activated: false,
      timeOut: null,
    };
  },
  methods: {
    activate(level, message) {
      this.type = level;
      this.message = message;
      this.activated = true;
      this.timeOut = setTimeout(() => {
        this.activated = false;
      }, 10000);
    },
    deactivate() {
      if (this.timeOut != null) {
        clearTimeout(this.timeOut);
        this.timeOut = null;
      }
      this.activated = false;
    },
  },
};
</script>

<style>
.foreground {
  position: fixed;
  z-index: 100;
}
</style>