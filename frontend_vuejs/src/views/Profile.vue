<template>
<v-container class="marginTop">
   <div>
    <Profile />
  </div>
</v-container>
</template>

<script>
import Profile from '@/components/Profile.vue'

export default {
  name: 'ProfileView',
  components: {
    Profile,
  }
}
</script>
