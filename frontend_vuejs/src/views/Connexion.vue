<template>
    <v-container class="marginTop">
        <div>
            <ConnexionForm />
        </div>
    </v-container>
</template>

<script>
import ConnexionForm from '@/components/ConnexionForm.vue'

export default {
  name: 'ConnexionView',
  components: {
    ConnexionForm,
  }
}
</script>