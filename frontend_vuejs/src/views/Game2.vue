<template>
<v-container class="marginTop">
  <div>
    <div class="container">
      <div class="row">
        <div class="col-xs-3">
          <BoardGame2Owner />
        </div>
        <div class="col-xs-3">
          <BoardGame2Enemy />
        </div>
      </div>
    </div>

     <v-dialog
        v-model="dialog"
        width="500"
      >
  <v-card>
    <v-card-title class="headline grey lighten-2">
      Result
    </v-card-title>

    <v-card-text>
      {{ message }}
    </v-card-text>

    <v-divider></v-divider>

    <v-card-actions>
    <v-spacer></v-spacer>
    <v-btn
      color="primary"
      text
      @click="dialog = false"
    >
      Go home
    </v-btn>
  </v-card-actions>
</v-card>

     </v-dialog>


  </div>
</v-container>
</template>

<script>
import BoardGame2Owner from '@/components/BoardGame2Owner.vue'
import BoardGame2Enemy from '@/components/BoardGame2Enemy.vue'

export default {
  name: 'Game2View',
  components: {
    BoardGame2Owner,
    BoardGame2Enemy,
  },
  data () {
    return {
      dialog: true,
      message : "you win, you are unstoppable",
    }
  },
}
</script>
