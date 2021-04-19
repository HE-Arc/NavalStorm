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
  title:'Game',
  components: {
    BoardGame1,
    Harbor,
  },
  methods: {
      savePlacement : async function () {
        var status=true;
        var boats = this.$store.getters.getShips;
        boats.forEach(boat => {
          if(!boat.isPlaced){
            status= false;
            }
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
            
            this.loading = false;
            const response = await Api.getEnemyUser();
            var text = response == true?"":"You will wait until a second player join"
            this.$fire({
              title: "Ships Placement Validated ! ",
              text: text,
              type: "success",
              position: 'top-end',
              showConfirmButton: false,
              timer: text==""?1500:5000
          }).then();
           var interval = setInterval(async function (){
              var response = await Api.getEnemyUser();
              console.log(response)
              if(response == true){
                clearInterval(interval);
                this.$router.push({ name: "Game2" });
              }
          }.bind(this), 3000)
          } catch (e) {
            this.errorPost = e.message;
          } 
        }else{
          this.$fire({
            title: "Hum...You haven't placed every ships !",
            text: "You need to place all of the ships.",
            type: "error",
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000
          }).then();
        }
    },
    },
}
</script>
