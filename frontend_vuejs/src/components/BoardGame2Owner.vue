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
      <td v-for="y in $store.getters.getBoardHeader" :key="y" :id="prefixID+y+x">

      </td>
    </tr>
  </table>
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
      prefixID : this.$options.name,
      }    
    },
    created() {
      // this make a global ref, nice to call methode from other component
      this.$root.$refs.BoardGame2Owner = this;
    },
    mounted(){
      this.updateBoardHTML()
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
          var el = document.getElementById(this.prefixID+currentArea.id)
          var img;
          if(currentArea.isBusy){ 
            let ship = this.$store.getters.getShipById(currentArea.whoIsThere)
            el.style.backgroundColor = ship.color
            if(currentArea.isTouch){//busy & hit ! 
              img = document.createElement('img');
              img.src = this.getImgUrl("explosions/explosion-ico.png")
              img.style.height = "2em";
              img.style.width = "2em";
              img.style.paddingLeft = "0.5em";
              img.style.margin = "0px";
              img.style.display = "block";
              el.insertAdjacentElement("beforeend", img);
            }
          }
          else if(currentArea.isTouch){//not busy
              img = document.createElement('img');
              img.src = this.getImgUrl("explosions/wather-splash-ico.png")
              img.style.height = "2em";
              img.style.width = "2em";
              img.style.paddingLeft = "0.5em";
              img.style.margin = "0px";
              img.style.display = "block";
              el.insertAdjacentElement("beforeend", img);
          }
          else{
            el.style.backgroundColor = "#1e8fff21"
          }
        }
      },
    },
});
</script>