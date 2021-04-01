<template>
<div id="app">
<v-app>

  Selected: {{ selected }}

  <!-- BOARD -->
<table >
    <!-- header board -->
  <tr >
    <td rowspan="2"></td>
  </tr>
  <tr color="red">
    <th v-for="y in boardHeader" :key="y">{{y}}</th>
  </tr>
  <!-- real board -->
  <tr  v-for="x in boardSize" :key="x" >
    <th>{{x}}</th>
    <td v-for="y in boardHeader" :key="y" :id="y+x"  @click="selectValue($event)"></td>
  </tr>
</table>
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
        }    
    }, 
    mounted(){
      const n = this.boardSize * this.boardSize;
       for (let i = 65; i < 65+this.boardSize; i++) {
         this.boardHeader += String.fromCharCode(i); 
      }
      for (let i = 1; i <= n; i++) {
         this.$store.dispatch('pushBoardValue', i);
      }
     
    },
    methods: {
        selectValue (event) {
        this.selected = event.target.id;
        event.target.style.backgroundColor = 'green';
        },
      },
    computed: {
    },
});
</script>