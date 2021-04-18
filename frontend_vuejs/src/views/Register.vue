<template>
<v-container class="marginTop">
  <div>
    <Register />
  </div>
</v-container>
</template>

<script>
// @ is an alias to /src
import Register from '@/components/Register.vue'

export default {
  name: 'RegisterView',
  title:"Register",
  components: {
    Register
  }
}
</script>
