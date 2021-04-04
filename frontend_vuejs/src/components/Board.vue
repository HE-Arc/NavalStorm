<template>
<div id="app">
<v-app>


 <h3>Selected: {{ selected }}</h3>


  <div class="container">
    <div class="row">
      <div class="col-xs-3">
          <!-- BOARD -->
        <table background="https://cdn.hipwallpaper.com/i/67/75/zxPV0f.gif">
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
            <tr v-for="ship in shipsInHarbor" :key="ship" @click="selectShip(ship)">
              <th >{{ship.type}}</th>
              <td  :id="ship.id" @drop="onDropShipsInHarbor($event)" @dragenter.prevent @dragover.prevent>
                <img  @dragstart="startDrag($event, ship)" :src="getImgUrl(ship.imgFront)" alt="" width="200" height="40">
              </td>
              <td>
                <v-switch
                :v-model="ship.isVertical"
                :label="`is Vertical: ${ship.isVertical}`"
                @click="onClickToggleVertical(ship)"
              ></v-switch>
              </td>
            </tr>
          </table>
        </div>
    </div>
</div>

    

  <!--
<div class="drop-zone" @drop="onDropShipsInHarbor($event)" @dragenter.prevent @dragover.prevent>
  <div v-for="ship in shipsInHarbor" :key="ship.id" class="drag-el" draggable="true" @dragstart="startDrag($event, ship)" > {{ ship.type }}</div>
</div>
<div class="drop-zone" @drop="onDropShipsInFleet($event)" @dragenter.prevent @dragover.prevent>
  <div v-for="ship in shipsInFleet" :key="ship.id" class="drag-el" draggable="true" @dragstart="startDrag($event, ship)" > {{ ship.type }}</div>
</div>

-->

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
        selected: null,
        boardSize : 10,
        boardHeader : "",
        currentShip : null,
        shipsInFleet : [],
        shipsInHarbor : [
          {
            id : 1,
            isPlaced : false,
            isVertical : false,
            type : "carrier",
            length : 5,
            coord : ["A2", "A3", "A4", "A5", "A6"],
            imgFront : "ships/carrier/Carrier_FrontView_2.png",
            img : "ships/carrier/ShipCarrierHull.png",
            imgV : "ships/carrier/ShipCarrierHull_V.png",
          },
          {
            id : 2,
            isPlaced : false,
            isVertical : false,
            type : "battleship ",
            length : 4,
            coord : ["I5", "I6", "I7", "I8"],
            imgFront : "ships/battleship/Battleship_FrontView_2.png",
            img : "ships/battleship/ShipBattleshipHull.png",
            imgV : "ships/battleship/ShipBattleshipHull_V.png",
          },
          {
            id : 3,
            isPlaced : false,
            isVertical : false,
            type : "destroyer ",
            length : 3,
            coord : ["C7", "C8", "C9"],
            imgFront : "ships/destroyer/Destroyer_FrontView_2.png",
            img : "ships/destroyer/ShipDestroyerHull.png",
            imgV : "ships/destroyer/ShipDestroyerHull_V.png",
          },
          {
            id : 4,
            isPlaced : false,
            isVertical : false,
            type : "submarine",
            length : 3,
            coord : ["D2", "E2", "F2"],
            imgFront : "ships/submarine/Submarine_FrontView_2.png",
            img : "ships/submarine/ShipSubMarineHull.png",
            imgV : "ships/submarine/ShipSubMarineHull_V.png",
          },
          {
            id : 5,
            isPlaced : false,
            isVertical : false,
            type : "patrolboat",
            length : 2,
            coord : ["E5", "F5"],
            imgFront : "ships/patrolBoat/PatrolBoat_FrontView_2.png",
            img : "ships/patrolBoat/ShipPatrolHull.png",
            imgV : "ships/patrolBoat/ShipPatrolHull_V.png",
          },
        ],
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
          this.$store.dispatch('pushBoardValue', area);
        }
      }
    },
    methods: {
      getImgUrl(img) {
        return require(`../assets/${img}`) //i do not any chose to do that, else webpack don't interprete correctly the images
      },
      putShipInBattleField(event) {

        if(this.currentShip === null)
          return null;

        var currentId = event.target.id;
        var chars = currentId.slice(0, currentId.search(/\d/));
        var numbs = currentId.replace(chars, '');
        var l = parseInt(this.currentShip.length)
        if(this.currentShip.isVertical)
        { 
          var n = parseInt(numbs)
          for (let i = n; i < (n + l); i++) {
            let coord = chars + i.toString();
            let el = document.getElementById(coord)
            el.style.backgroundColor = "green"
          }
        }
        else
        {
          var c = chars.charCodeAt(0)
          for (let i = c; i < (c + l); i++) {
            let coord = String.fromCharCode(i) + numbs;
            let el = document.getElementById(coord)
            el.style.backgroundColor = "green"
          }
        }


      },
      selectValue (event) {
        this.selected = event.target.id;
        event.target.style.backgroundColor = 'green';
      },
      selectShip (ship) {
        this.currentShip = ship;
        this.selected = ship.type;
      },
      startDrag (event, ship) {
        event.dataTransfer.dropEffect = 'move';
        event.dataTransfer.effectAllowed = 'move';
        event.dataTransfer.setData('shipID', ship.id);
        var img = document.createElement("img");
        img.src = this.getImgUrl(ship.img);//ship.img;//"https://people.he-arc.ch/photos/GrunenwaldDavid.jpg";
        event.dataTransfer.setDragImage(img, 0, 0);
      },
      onDropShipsInFleet (event) {
        const shipID = event.dataTransfer.getData('shipID');
        const ship = this.shipsInHarbor.find((ship) => ship.id == shipID);
        if (typeof ship !== 'undefined') {
          const shipIndex = this.shipsInHarbor.indexOf(ship);
          this.shipsInHarbor.splice(shipIndex, 1);
          this.shipsInFleet.push(ship);
        }          
      },
      onDropShipsInHarbor (event) {
        const shipID = event.dataTransfer.getData('shipID');
        const ship = this.shipsInFleet.find((ship) => ship.id == shipID);
        if (typeof ship !== 'undefined') {
          const shipIndex = this.shipsInFleet.indexOf(ship);
          this.shipsInFleet.splice(shipIndex, 1);
          this.shipsInHarbor.push(ship);
        }
      },
      onClickToggleVertical(ship){
        ship.isVertical = !ship.isVertical;
      },
      onAreaMouseOver(event) {
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
        var currentId = event.target.id;
        var chars = currentId.slice(0, currentId.search(/\d/));
        var numbs = currentId.replace(chars, '');
        var l = parseInt(this.currentShip.length)
        if(this.currentShip.isVertical)
        { 
          var n = parseInt(numbs)
          for (let i = n; i < (n + l); i++) {
            let coord = chars + i.toString();
            let el = document.getElementById(coord)
            el.style.backgroundColor = "#1e8fff21"
          }
        }
        else
        {
          var c = chars.charCodeAt(0)
          for (let i = c; i < (c + l); i++) {
            let coord = String.fromCharCode(i) + numbs;
            let el = document.getElementById(coord)
            el.style.backgroundColor ="#1e8fff21"
          }
        }
      },
    },
    computed: {
    },
});
</script>