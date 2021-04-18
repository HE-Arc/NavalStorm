<template>
<v-container class="marginTop">
  <div>
    <div class="container">
      <div class="row">
        <div class="col-xs-3">
          <BoardGame1 />
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
import BoardGame1 from '@/components/BoardGame1.vue'
import Harbor from '@/components/Harbor.vue'
import Api from "@/api/ApiRequester";



export default {
  name: 'Game1View',
  components: {
    BoardGame1,
    Harbor,
  },
   methods: {
      
       checkBoard(){
        var boats = this.$store.getters.getShips;
        boats.forEach(boat => {
          if(!boat.isPlaced)
            return false;
        });
        return true;
      },
      savePlacement : async function () {
        var status=true;
        var boats = this.$store.getters.getShips;
        boats.forEach(boat => {
          if(!boat.isPlaced){
            status= false;
            }
          console.log('tic');
        });
        
        if(status){
          this.loading = true;
          try {
            await Api.gamePhase1({
              board: this.$store.getters.getBoard,
              username: this.$store.username,
              password: this.$store.password,
              userid : this.$store.state.user.id,
            });
            this.errorPost = "";
            this.$router.push({ name: "Game2" });
            this.loading = false;
            this.$fire({
            title: "Ships Placement Validated ! ",
            text: "",
            type: "success",
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500
          }).then(r => {
          console.log(r.value);
          });
          } catch (e) {
            this.errorPost = e.message;
          } finally {
            this.loading = false;
          }
        }else{
          this.$fire({
            title: "Hum...You haven't placed every ships !",
            text: "You need to place all of the ships.",
            type: "error",
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000
          }).then(r => {
          console.log(r.value);
          });
        }
    },
    },
}
</script>
