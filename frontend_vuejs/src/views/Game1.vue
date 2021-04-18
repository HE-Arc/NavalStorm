<template>
<v-container class="marginTop">
  <div>
    <div class="container">
      <div class="row">
        <div class="col-xs-3">
          <Board />
        </div>
        <div class="col-xs-3">
          <Harbor />
        </div>
        <v-btn
            color="primary"
            elevation="4"
            outlined
            plain
            raised
            rounded
            x-large 
            v-on:click="savePlacement">
            Save
          </v-btn>
        
      </div>
    </div>
  </div>
</v-container>
</template>

<script>
import Board from '@/components/Board.vue'
import Harbor from '@/components/Harbor.vue'
import Api from "@/api/ApiRequester";

export default {
  name: 'Game1View',
  components: {
    Board,
    Harbor,
  },
   methods: {
      savePlacement : async function () {
      this.loading = true;
      console.log('tic');
      console.log(this.$store.getters.getBoard);
      console.log('tac');
      try {
        await Api.gamePhase1({
          board: this.$store.getters.getBoard(),
          username: this.username,
          password: this.password,
        });
        this.errorPost = "";

        this.$router.push({ name: "Game2" });
        this.loading = false;
      } catch (e) {
        this.errorPost = e.message;
      } finally {
        this.loading = false;
      }
    },
    },
}
</script>
