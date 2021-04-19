<template>
  <div class="log">
  </div>
</template>

<script>
  export default {
    created () {
      this.$store.dispatch('logout')
        .then(() => {
          this.$router.push({ name: 'login' })
        })
    }
  }
</script>

<style scoped>
</style>