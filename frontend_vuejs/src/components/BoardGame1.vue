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
      <td v-for="y in $store.getters.getBoardHeader" :key="y" :id="y+x" @click="putShipInBattleField($event)" @mouseleave="onAreaMouseLeave($event)" @mouseover="onAreaMouseOver($event)"></td>
    </tr>
  </table>
</v-app>
</div>
</template>

<!-- SCRIPT -->
<script>
import Vue from "vue";

export default Vue.extend({
    name: "BoardGame1",
    data ()  { 
    return  {
      }    
    },
    created() {
      this.$store.dispatch('initBoard')
      this.$root.$refs.BoardGame1 = this;
    },
    mounted(){
     this.updateBoardHTML()
    },
    methods: {
      //webpack don't interpret images correctly without going through this solution
      getImgUrl(img) {
        return require(`../assets/${img}`) 
      },
      putShipInBattleField(event) {
        //controle if current ship is valide
        if(this.$store.getters.getCurrentShip === null) {
          let h3 = document.getElementsByTagName("h3")[0]
          h3.style.background = 'pink'
          setTimeout(()=>{
            h3.style.background = 'white'
          },1000)
          return null;
        }
          
        //controle if the current ship already in the battelfield
        if(this.$store.getters.getCurrentShip.isPlaced) {
          let el = document.getElementById(this.$store.getters.getCurrentShip.id)
          el.style.background = 'pink'
          setTimeout(()=>{
            el.style.background = 'white'
          },1000)
         this.$store.dispatch('updateCurrentShip', null);
          return null
        }

        //parse id
        var currentId = event.target.id;
        var chars = currentId.slice(0, currentId.search(/\d/));
        var numbs = currentId.replace(chars, '');
        var l = parseInt(this.$store.getters.getCurrentShip.length)

        if(this.$store.getters.getCurrentShip.isVertical){ 
          var n = parseInt(numbs)
          //controle if one of them is busy
          for (let i = n; i < (n + l); i++) {
            let coord = chars + i.toString();    
            if(this.$store.getters.getBoardAreaById(coord).isBusy) {
              return null;
            }
          }
          //update Area + ship
          for (let i = n; i < (n + l); i++) {
            let coord = chars + i.toString();
            this.$store.getters.getCurrentShip.coord.push(coord)
            let area = { 
              id : coord,
              isTouch : false,
              isBusy : true,
              whoIsThere : this.$store.getters.getCurrentShip.id,
            }
            this.$store.dispatch('updateAreaInBoard', area);
            let el = document.getElementById(coord)
            el.style.backgroundColor = this.$store.getters.getCurrentShip.color
          }
        }
        else{
          var c = chars.charCodeAt(0)
          for (let i = c; i < (c + l); i++) {
            let coord = String.fromCharCode(i) + numbs;
            if(this.$store.getters.getBoardAreaById(coord).isBusy) {
              return null;
            }
          }
          for (let i = c; i < (c + l); i++) {
            let coord = String.fromCharCode(i) + numbs;
            this.$store.getters.getCurrentShip.coord.push(coord)
            let area = { 
              id : coord,
              isTouch : false,
              isBusy : true,
              whoIsThere : this.$store.getters.getCurrentShip.id,
            }
            this.$store.dispatch('updateAreaInBoard', area);
            let el = document.getElementById(coord)
            el.style.backgroundColor = this.$store.getters.getCurrentShip.color
          }
        }
        let currentShip = this.$store.getters.getCurrentShip
        currentShip.isPlaced = true;
        this.$store.dispatch('updateShipInShips', currentShip)
        this.$store.dispatch('updateCurrentShip', null);
      },
      selectShip (ship) {
        let currentShip = this.$store.getters.getShipById(ship.id);
        this.$store.dispatch('updateCurrentShip', currentShip);
      },
      onClickTogglePlaced(ship){
        ship.isPlaced = !ship.isPlaced
        if(!ship.isPlaced){
          ship.coord.forEach((co) => { 
            let currentArea = this.$store.getters.getBoardAreaById(co)
            currentArea.isBusy = false
            currentArea.whoIsThere = null
            this.$store.dispatch('updateAreaInBoard', currentArea)
          })
          ship.coord = []
          this.$store.dispatch('updateShipInShips', ship)
          this.updateBoardHTML()
        }
      },
      onClickToggleVertical(ship){
        ship.isVertical = !ship.isVertical;
      },
      onAreaMouseOver(event) {
         //controle if current ship is valide
        if(this.$store.getters.getCurrentShip === null)
          return null;
        
        if(this.$store.getters.getCurrentShip.isPlaced)
          return null;

        var currentId = event.target.id;
        var chars = currentId.slice(0, currentId.search(/\d/));
        var numbs = currentId.replace(chars, '');
        var l = parseInt(this.$store.getters.getCurrentShip.length)
        if(this.$store.getters.getCurrentShip.isVertical){ 
          var n = parseInt(numbs)
          if((l + n) > (this.$store.getters.getBoardSize+1))
            return null;
         
          for (let i = n; i < (n + l); i++) {
            let coord = chars + i.toString();
            let el = document.getElementById(coord)
            el.style.backgroundColor = "green"
          }
        }
        else{
          var c = chars.charCodeAt(0)
          if((c-65 +1 +l) > (this.$store.getters.getBoardSize +1))
            return null;

          for (let i = c; i < (c + l); i++) {
            let coord = String.fromCharCode(i) + numbs;
            let el = document.getElementById(coord)
            el.style.backgroundColor = "green"
          }
        }
      },
      onAreaMouseLeave(event) {
        event.target.id
        this.updateBoardHTML()
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
    },
    computed: {
    },
});
</script>