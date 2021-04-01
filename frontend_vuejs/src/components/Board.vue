<template>
<div id="app">
<v-app>

        



  Selected: {{ selected }}


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
          <!-- battlefield board -->
          <tr  v-for="x in boardSize" :key="x" >
            <th>{{x}}</th>
            <td v-for="y in boardHeader" :key="y" :id="y+x"  @click="selectValue($event)"></td>
          </tr>
        </table>
      </div>
        <div></div>
        <!-- SHIPS in Harbor -->
        <div class="col-xs-3">
             <table>
            <tr  v-for="ship in shipsInHarbor" :key="ship" >
              <th>{{ship.type}}</th>
              <td  :id="ship.id"  @click="selectValue($event)"><img :src="getImgUrl(ship.img)" alt="" width="200" height="40"></td>
            </tr>
          </table>
        </div>
    </div>
</div>




<div class="drop-zone" @drop="onDropShipsInHarbor($event)" @dragenter.prevent @dragover.prevent>
  <div v-for="ship in shipsInHarbor" :key="ship.id" class="drag-el" draggable="true" @dragstart="startDrag($event, ship)" > {{ ship.type }}</div>
</div>
<div class="drop-zone" @drop="onDropShipsInFleet($event)" @dragenter.prevent @dragover.prevent>
  <div v-for="ship in shipsInFleet" :key="ship.id" class="drag-el" draggable="true" @dragstart="startDrag($event, ship)" > {{ ship.type }}</div>
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
        selected: null,
        boardSize : 10,
        boardHeader : "",
        board : [],
        shipsInFleet : [],
        shipsInHarbor : [
          {
            id : 1,
            isPlaced : false,
            type : "carrier",
            length : 5,
            coord : ["A2", "A3", "A4", "A5", "A6"],
            img : "ships/carrier/Carrier_FrontView_2.png",
          },
          {
            id : 2,
            isPlaced : false,
            type : "battleship ",
            lenght : 4,
            coord : ["I5", "I6", "I7", "I8"],
            img : "ships/battleship/Battleship_FrontView_2.png"
          },
          {
            id : 3,
            isPlaced : false,
            type : "destroyer ",
            lenght : 3,
            coord : ["C7", "C8", "C9"],
            img : "ships/destroyer/Destroyer_FrontView_2.png",
          },
          {
            id : 4,
            isPlaced : false,
            type : "submarine",
            lenght : 3,
            coord : ["D2", "E2", "F2"],
            img : "ships/submarine/Submarine_FrontView_2.png",
          },
          {
            id : 5,
            isPlaced : false,
            type : "patrolboat",
            lenght : 2,
            coord : ["E5", "F5"],
            img : "ships/patrolBoat/PatrolBoat_FrontView_2.png",
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
          }
          this.$store.dispatch('pushBoardValue', area);
        }
      }
      console.log(this.$store.getters.getBoard);
    },
    methods: {
      getImgUrl(img) {
           return require(`../assets/${img}`)
      
      },
        selectValue (event) {
        this.selected = event.target.id;
        event.target.style.backgroundColor = 'green';
        },
        startDrag (event, ship) {
          console.log(ship);
          event.dataTransfer.dropEffect = 'move';
          event.dataTransfer.effectAllowed = 'move';
          event.dataTransfer.setData('shipID', ship.id);
          event.target.style.backgroundColor = "red";
          var img = document.createElement("img");
          img.src = "https://people.he-arc.ch/photos/GrunenwaldDavid.jpg";
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
        }
      },
    computed: {
    },
});
</script>