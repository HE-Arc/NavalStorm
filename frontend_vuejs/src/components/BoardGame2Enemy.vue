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
import Api from "@/api/ApiRequester";
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
        var id = event.target.id.replace(this.prefixID, ""); 

        //id =  D4 par exemple
        //find attribut html
        var currentId = event.target.id //Board2EnnemyG10 en exemple
        var td = document.getElementById(currentId)

         //allow attaque only if it's the first time
        if (td.childElementCount != 0 && td != null)
          return;

        var eBoard=this.$store.getters.getBoard;
        //refresh board ennemy
        eBoard.forEach(area => {
          if(area['id']==id){
            area['isTouch']=true;
          }
        });
        

        //display
        var img = document.createElement('img');
        
        eBoard.forEach(area => {
          if(area['id']==id){
            if(area['isTouch']==true){
              if(area['isBusy']==true){
                img.src = this.getImgUrl("explosions/explosion-ico.png");
              }else{
                img.src = this.getImgUrl("explosions/wather-splash-ico.png");
              }
                //style the img
              img.style.height = "2em";
              img.style.width = "2em";
              img.style.paddingLeft = "0.5em";
              img.style.margin = "0px";
              img.style.display = "block";
              td.insertAdjacentElement("beforeend", img);
              td.style.backgroundColor="Grey";
            }
          }
        });         

       this.updateEnnemyBoard(eBoard);
      },
      updateEnnemyBoard : async function (eBoard) {
          this.loading = true;
          try {
            await Api.updateEnnemyBoard({
              boardId:1,//TODO TO get right board ID !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
              board:eBoard,
            
            });
            this.errorPost = "";
            this.loading = false;
          } catch (e) {
            this.errorPost = e.message;
          } finally {
            this.loading = false;
            this.$fire({
            title: "Shot Validated",
            text: "",
            type: "success",
            position: 'top-end',
            showConfirmButton: false,
            timer: 1000
          }).then();
          }
        }
    
    },
});
</script>