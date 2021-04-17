<!-- SCRIPT -->
<script>
 import { Doughnut } from 'vue-chartjs'
 import Chart from 'chart.js'

export default {
  extends: Doughnut,
  data () {
    return {
      chartData: {
        labels: ["Lost", "Win",],
        datasets: [{
            borderWidth: 1,
            borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            ],
            backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            ],
            data: [parseInt(this.$store.state.user.playedGameNumber) - parseInt(this.$store.state.user.winNumber),parseInt(this.$store.state.user.winNumber)],
          }],
      },
      options: {
        legend: {
          display: true
        },
        responsive: true,
        maintainAspectRatio: false
      }
    }
  },
  mounted () {
    this.renderChart(this.chartData, this.options)
    let lost = this.chartData.datasets[0].data[0]
    let win = this.chartData.datasets[0].data[1]
    let total = lost + win
    let winRate = (win/total)*100;
    this.textCenter(winRate)
  },
  methods: {
    textCenter(winRate) {
      Chart.pluginService.register({
        beforeDraw: function(chart) {
          var width = chart.chart.width;
          var height = chart.chart.height;
          var ctx = chart.chart.ctx;
          
          ctx.clearRect(0, 0, width, height);
          ctx.restore();
          var fontSize = (height / 300).toFixed(2);
          ctx.font = fontSize + "em arial";
          ctx.textBaseline = "middle";

          var text = "Win Rate : " + winRate.toFixed(2).toString() + "%";
          var textX = Math.round((width - ctx.measureText(text).width) / 2);
          var textY = height / 2;

          ctx.fillStyle = '#FF0000'
          ctx.fillText(text, textX, textY);
          ctx.save();
        }
      });
      Chart.plugins.unregister(this.chartdata);
    }
  }
}
</script>
