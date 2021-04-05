<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-xs-3">
          <Board />
        </div>
        <div class="col-xs-3">
          <Harbor />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Board from '@/components/Board.vue'
import Harbor from '@/components/Harbor.vue'

export default {
  name: 'Game1View',
  components: {
    Board,
    Harbor,
  }
}
</script>
