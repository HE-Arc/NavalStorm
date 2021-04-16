<!-- TEMPLATE -->
<template>
<div id="app">
<v-app>
    <h3 v-if="this.$store.getters.getCurrentShip === null">
        Please Selecte a ship
    </h3>
    <h3 v-else>
        Selected: {{ this.$store.getters.getCurrentShip.type }} 
    </h3>
    <!-- SHIPS in Harbor -->
    <table>
        <tr v-for="ship in this.$store.getters.getShips" :key="ship" @click="selectShip(ship)">
        <th >{{ship.type}}</th>
        <td>
            <img :src="getImgUrl(ship.img)" alt="" width="200" height="40">
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
</v-app>
</div>
</template>

<!-- SCRIPT -->
<script>
import Vue from "vue";

export default Vue.extend({
    name: "Harbor", 
    methods: {
      //webpack don't interpret images correctly without going through this solution
      getImgUrl(img) {
        return require(`../assets/${img}`) 
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
          this.$root.$refs.BoardGame1.updateBoardHTML()
        }
      },
      onClickToggleVertical(ship){
        ship.isVertical = !ship.isVertical;
      },
    },
});
</script>