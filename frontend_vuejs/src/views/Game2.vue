<template>
<v-container class="marginTop">
  <div>
    <div class="container">
      <div class="row">
        <div class="col-xs-3">
          <BoardGame2Owner />
        </div>
        <div class="col-xs-3">
          <BoardGame2Enemy />
        </div>
      </div>
    </div>
  </div>
</v-container>
</template>

<script>
import BoardGame2Owner from '@/components/BoardGame2Owner.vue'
import BoardGame2Enemy from '@/components/BoardGame2Enemy.vue'

export default {
  name: 'Game2View',
  components: {
    BoardGame2Owner,
    BoardGame2Enemy,
  }
}
</script>
