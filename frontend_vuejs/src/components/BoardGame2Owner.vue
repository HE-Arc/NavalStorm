<!-- TEMPLATE -->
<template>
<div id="app">
<v-app>
  <!-- BOARD -->
  <table :background="getImgUrl('lands/sea.gif')">
    <!-- header board -->
    <tr >
      <td rowspan="2"></td>
    </tr>
    <tr>
      <th v-for="y in $store.getters.getBoardHeader" :key="y">{{y}}</th>
    </tr>
    <!-- BATTLEFIELD board -->
    <tr  v-for="x in $store.getters.getBoardSize" :key="x" >
      <th>{{x}}</th>
      <td v-for="y in $store.getters.getBoardHeader" :key="y" :id="y+x"></td>
    </tr>
  </table>
 <div id="sprite-image">
  </div>
</v-app>
</div>
</template>

<!-- SCRIPT -->
<script>
import Vue from "vue";

export default Vue.extend({
    name: "BoardGame2Owner",
    data ()  { 
    return  {
      animationInterval: null,
      spriteSheet: null,
      widthOfSpriteSheet: 1800,
      widthOfEachSprite: 40,
      heightOfSpriteSheet: 100,
      heightOfEachSprite: 100,

      }    
    },
    created() {
      

    },
    mounted(){
      this.updateBoardHTML()
      this.startAnimation()
      this.spriteSheet = document.getElementById("sprite-image")
    },
    methods: {
      //webpack don't interpret images correctly without going through this solution
      getImgUrl(img) {
        return require(`../assets/${img}`) 
      },
      updateBoardHTML() {
        var currentBoard = this.$store.getters.getBoard
        for (var i = 0; i < currentBoard.length; i++) {
          var currentArea = currentBoard[i]
          var el = document.getElementById(currentArea.id)

          if(currentArea.isBusy){ 
            let ship = this.$store.getters.getShipById(currentArea.whoIsThere)
            el.style.backgroundColor = ship.color
          }
          else{
            el.style.backgroundColor = "#1e8fff21"
          }
        }
      },
      //Animation
      stopAnimation() {
        clearInterval(this.animationInterval)
      },
      startAnimation() {
        var position = this.widthOfEachSprite; //start position for the image
        const speed = 100; //in millisecond(ms)
        const diff = this.widthOfEachSprite; //difference between two sprites
       
        
        this.animationInterval = setInterval(() => {
          this.spriteSheet.style.backgroundPosition = `-${position}px 0px`;

          if (position < this.widthOfSpriteSheet) 
          {
            position = position + diff;
          } 
          else 
          {
            //increment the position by the width of each sprite each time
            position = this.widthOfEachSprite;
          }
        //reset the position to show first sprite after the last one
        }, speed);
    },
    },
});
</script>