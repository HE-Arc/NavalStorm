<template>
<v-container class="marginTop">
    <div class="container">
        <div class="">
          <ConnexionForm />
        </div>
    </div>
</v-container>
</template>

<script>
import ConnexionForm from '@/components/ConnexionForm.vue'

export default {
  name: 'Connexion',
  components: {
    ConnexionForm,
  }
}
</script>