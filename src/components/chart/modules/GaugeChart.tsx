import { defineComponent, ref, onMounted, onBeforeUnmount, watch } from 'vue'
import { Chart, DoughnutController, ArcElement, Tooltip, Legend } from 'chart.js'

Chart.register(DoughnutController, ArcElement, Tooltip, Legend)

export default defineComponent({
  name: 'GaugeChart',
  props: {
    value: {
      type: String,
      required: true,
      default: 0
    },
    size: {
      type: Number,
      default: 400
    }
  },
  setup(props) {
    const canvasRef = ref<HTMLCanvasElement | null>(null)
    let chart: Chart | null = null

    const chartColor = '#2271D9' // JobCentro 색상
    const chartBgColor = '#e0e0e0' // 회색 배경색

    const renderChart = () => {
      if (!canvasRef.value) return

      const ctx = canvasRef.value.getContext('2d')
      if (!ctx) return

      chart = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ['Value', 'Rest'],
          datasets: [
            {
              data: [props.value, 100 - props.value],
              backgroundColor: [chartColor, chartBgColor],
              borderWidth: 0
            }
          ]
        },
        options: {
          rotation: -105,
          circumference: 210,
          cutout: '50%',
          responsive: false,
          plugins: {
            legend: { display: false },
            tooltip: {
                displayColors: false,
                callbacks: {
                  title: () => {
                    return '' // Tooltip 타이틀 숨기기
                  },
                  label: function(context) {
                    const value = context.parsed;
                    return `${value}%`;
                  }
                }
              }
          }
        }
      })
    }

    const updateChart = () => {
      if (chart) {
        chart.data.datasets[0].data = [props.value, 100 - props.value]
        chart.update()
      }
    }

    watch(
      () => [props.value],
      () => {
        updateChart()
      }
    )

    onMounted(() => {
      renderChart()
    })

    onBeforeUnmount(() => {
      if (chart) {
        chart.destroy()
      }
    })

    return () => (
      <div style={{
        width: `${props.size}px`,
        height: `${props.size / 2}px`,
        position: 'relative'
      }}>
        <canvas ref={canvasRef} width={props.size} height={props.size / 2}></canvas>
        <div style={{
          position: 'absolute',
          top: '80%',
          left: '50%',
          transform: 'translate(-40%, 30%)', // 자신의 크기의 40%만큼 왼쪽, 30%만큼 아래로 이동
          fontSize: `${props.size / 8}px`,
          fontWeight: 'bold'
        }}>
          {props.value}%
        </div>
      </div>
    )
  }
})
