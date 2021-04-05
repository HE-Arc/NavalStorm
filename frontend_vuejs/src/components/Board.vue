<template>
<div id="app">
<v-app>

<h3 v-if="currentShip == null">
  Please Selecte a ship
</h3>
<h3 v-else>
  Selected: {{ currentShip.type }} 
</h3>
 
  <div class="container">
    <div class="row">
      <div class="col-xs-3">
          <!-- BOARD -->
        <table :background="getImgUrl('lands/sea.gif')">
            <!-- header board -->
          <tr >
            <td rowspan="2"></td>
          </tr>
          <tr>
            <th v-for="y in boardHeader" :key="y">{{y}}</th>
          </tr>
          <!-- BATTLEFIELD board -->
           <tr  v-for="x in boardSize" :key="x" >
            <th>{{x}}</th>
            <td v-for="y in boardHeader" :key="y" :id="y+x" @click="putShipInBattleField($event)" @mouseleave="onAreaMouseLeave($event)" @mouseover="onAreaMouseOver($event)"></td>
          </tr>
        </table>
      </div>
        <div></div>
        <!-- SHIPS in Harbor -->
        <div class="col-xs-3">
             <table>
            <tr v-for="ship in this.$store.getters.getShips" :key="ship" @click="selectShip(ship)">
              <th >{{ship.type}}</th>
              <td>
                <img :src="getImgUrl(ship.imgFront)" alt="" width="200" height="40">
              </td>
              <td>
                <label>
                  <input type="checkbox" v-if="ship.isPlaced" disabled="true"/>
                  <input type="checkbox" v-else @click="onClickToggleVertical(ship)" v-model="ship.isVertical"/>
                  Vertical
                </label>
              <td :id="ship.id">
               <label>
                  <input type="checkbox" v-if="!ship.isPlaced" disabled="true" />
                  <input type="checkbox" v-else @click="onClickTogglePlaced(ship)" v-model="ship.isPlaced"/>
                  Placed
               </label>
              </td>
            </tr>
          </table>
        </div>
    </div>
</div>
</v-app>
</div>
</template>



<!-- SCRIPT -->
<script>
import Vue from "vue";

export default Vue.extend({
    name: "Board",
    data ()  { 
    return  {
        boardSize : 10,
        boardHeader : "",
        currentShip : null,
      }    
    }, 
    mounted(){
      //init board
      for (let i = 65; i < 65+this.boardSize; i++) {
        this.boardHeader += String.fromCharCode(i); 

        for (let j = 1; j <=this.boardSize; j++) {
          let area = { 
            id : String.fromCharCode(i) + j.toString(),
            isTouch : false,
            isBusy : false,
            whoIsThere : null,
          }
          this.$store.dispatch('pushAreaInBoard', area);
        }
      }
    },
    methods: {
      //webpack don't interpret images correctly without going through this solution
      getImgUrl(img) {
        return require(`../assets/${img}`) 
      },
      putShipInBattleField(event) {
        //controle if current ship is valide
        if(this.currentShip === null) {
          let h3 = document.getElementsByTagName("h3")[0]
          h3.style.background = 'pink'
          setTimeout(()=>{
            h3.style.background = 'white'
          },1000)
          return null;
        }
          
        //controle if the current ship already in the battelfield
        if(this.currentShip.isPlaced) {
         // alert(this.currentShip.type+" already on the battlefield")
         let el = document.getElementById(this.currentShip.id)
          el.style.background = 'pink'
          setTimeout(()=>{
            el.style.background = 'white'
          },1000)
          this.currentShip = null
          return null
        }

        //parse id
        var currentId = event.target.id;
        var chars = currentId.slice(0, currentId.search(/\d/));
        var numbs = currentId.replace(chars, '');
        var l = parseInt(this.currentShip.length)

        if(this.currentShip.isVertical)
        { 
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
            this.currentShip.coord.push(coord)
            let area = { 
              id : coord,
              isTouch : false,
              isBusy : true,
              whoIsThere : this.currentShip.id,
            }
            this.$store.dispatch('updateAreaInBoard', area);
            let el = document.getElementById(coord)
            el.style.backgroundColor = this.currentShip.color
          }
        }
        else
        {
          var c = chars.charCodeAt(0)
          for (let i = c; i < (c + l); i++) {
            let coord = String.fromCharCode(i) + numbs;
            if(this.$store.getters.getBoardAreaById(coord).isBusy) {
              return null;
            }
          }
          for (let i = c; i < (c + l); i++) {
            let coord = String.fromCharCode(i) + numbs;
            this.currentShip.coord.push(coord)
            let area = { 
              id : coord,
              isTouch : false,
              isBusy : true,
              whoIsThere : this.currentShip.id,
            }
            this.$store.dispatch('updateAreaInBoard', area);
            let el = document.getElementById(coord)
            el.style.backgroundColor = this.currentShip.color
          }
        }
        this.currentShip.isPlaced = true;
        this.$store.dispatch('updateShipInShips', this.currentShip)
        this.currentShip = null
      },
      selectShip (ship) {
        this.currentShip = this.$store.getters.getShipById(ship.id);
      },
      onClickTogglePlaced(ship){
        ship.isPlaced = !ship.isPlaced
        if(!ship.isPlaced)
        {
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
        if(this.currentShip === null)
          return null;
        
        if(this.currentShip.isPlaced)
          return null;

        var currentId = event.target.id;
        var chars = currentId.slice(0, currentId.search(/\d/));
        var numbs = currentId.replace(chars, '');
        var l = parseInt(this.currentShip.length)
        if(this.currentShip.isVertical)
        { 
          var n = parseInt(numbs)
          if((l + n) > (this.boardSize+1))
            return null;
         
          for (let i = n; i < (n + l); i++) {
            let coord = chars + i.toString();
            let el = document.getElementById(coord)
            el.style.backgroundColor = "green"
          }
        }
        else
        {
          var c = chars.charCodeAt(0)
          if((c-65 +1 +l) > (this.boardSize +1))
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