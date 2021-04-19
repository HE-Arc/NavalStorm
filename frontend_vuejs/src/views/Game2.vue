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
  </div>
</v-container>
</template>

<script>
import BoardGame2Owner from '@/components/BoardGame2Owner.vue'
import BoardGame2Enemy from '@/components/BoardGame2Enemy.vue'
import Api from "@/api/ApiRequester";


export default {
  name: 'Game2View',
  title:'Game',
  components: {
    BoardGame2Owner,
    BoardGame2Enemy,
  },
  created: function(){
    this.interval=setInterval(async function () {
        Api.getBoardEnemy();
        Api.getBoard();
        var boardOwn=this.$store.getters.getBoard;
        var countDestroyOwn=0;
        boardOwn.forEach(area => {
          if(area['isBusy'] && area['isTouch']){
            countDestroyOwn=countDestroyOwn+1;
          }          
        });
        var boardEnnemy=this.$store.getters.getBoardEnnemy;
        var countDestroyEnnemy=0;
        boardEnnemy.forEach(area => {
          if(area['isBusy'] && area['isTouch']){
            countDestroyEnnemy=countDestroyEnnemy+1;
          }          
        });
        if(countDestroyOwn == 17){
          try {
              await Api.updateUserInformationsWinLoose(false);
              this.errorPost = "";
        
              this.$router.push({ name: "Profile" });
              this.$fire({
                  title: "You Loosed ! ",
                  text: "",
                  type: "info",
                  position: 'top-end',
                  showConfirmButton: false,
                  timer: 5000
                }).then();
            } catch (e) {
                this.errorPost = e.message;
                this.errorMsg = e.error_description;
            } finally {
              clearInterval(this.interval);
            }
        } 
        if (countDestroyEnnemy==17){
            try {
              await Api.updateUserInformationsWinLoose(true);
              this.errorPost = "";
        
              this.$router.push({ name: "Profile" });
              this.$fire({
                  title: "You Win ! ",
                  text: "",
                  type: "success",
                  position: 'top-end',
                  showConfirmButton: false,
                  timer: 5000
                }).then();
            } catch (e) {
                this.errorPost = e.message;
                this.errorMsg = e.error_description;
            } finally {
              clearInterval(this.interval);
            }
        }
    }.bind(this),5000); 
  },
  data () {
    
  },
}
</script>
