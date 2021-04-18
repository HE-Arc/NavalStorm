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
      <td v-for="y in $store.getters.getBoardHeader" :key="y" :id="prefixID+y+x" @click="onClickSendMissile($event)"></td>
    </tr>
  </table>
</v-app>
</div>
</template>

<!-- SCRIPT -->
<script>
import Vue from "vue";

export default Vue.extend({
    name: "BoardGame2Enemy",
    data ()  { 
    return  {
       prefixID : this.$options.name,
      }    
    },
    created() {
      // this make a global ref, nice to call methode from other component
      this.$root.$refs.BoardGame2Enemy = this;
    },
    mounted(){

    },
    methods: {
      //webpack don't interpret images correctly without going through this solution
      getImgUrl(img) {
        return require(`../assets/${img}`) 
      },
      //send the miss to coord 
      onClickSendMissile(event) { 
        //send missile to coord
        //var id = event.target.id.replace(this.prefixID, ""); 
        
        //id =  D4 par exemple


        //refresh board ennemy

        //find attribut html
        var currentId = event.target.id
        var coordId = event.target.id.replace(this.prefixID, ""); 
        var td = document.getElementById(currentId)
        if (td.childElementCount != 0 && td != null) //allow attaque only if it's the first time
          return;

        var img = document.createElement('img');
        
        var area = this.$store.getters.getBoardAreaById(coordId)
        if(area.isBusy) //if something is in area ... 
        {
          img.src = this.getImgUrl("explosions/explosion-ico.png")
          let ship = this.$store.getters.getShipById(area.whoIsThere)
          td.style.backgroundColor = ship.color
        }
        else
          img.src = this.getImgUrl("explosions/wather-splash-ico.png")

        //style the img
        img.style.height = "20px"
        img.style.width = "20px"
        img.style.padding = "0px"
        img.style.margin = "0px"
        img.style.display = "block"
        td.insertAdjacentElement("beforeend", img);
      }
    },
});
</script>