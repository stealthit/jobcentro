import { defineComponent, onMounted, ref, toRefs } from 'vue'
import { NNumberAnimation, NTag } from 'naive-ui'
import { useMaster } from './use-master'
import styles from './index.module.scss'
import Result from '@/components/result'
import MasterModal from './master-modal'
import type { Ref } from 'vue'
import type { RowData } from 'naive-ui/es/data-table/src/interface'
import type { MasterNode } from '@/service/modules/monitor/types'
import { capitalize } from 'lodash'
import GaugeChart from '@/components/chart/modules/GaugeChart'

const master = defineComponent({
  name: 'master',
  setup() {
    const showModalRef = ref(false)
    const { variables, getTableMaster } = useMaster()
    const zkDirectoryRef: Ref<Array<RowData>> = ref([])

    const clickDetails = (zkDirectories: string) => {
      zkDirectoryRef.value = [{ directory: zkDirectories, index: 1 }]
      showModalRef.value = true
    }

    const onConfirmModal = () => {
      showModalRef.value = false
    }

    onMounted(() => {
      getTableMaster()
    })

    return {
      ...toRefs(variables),
      clickDetails,
      onConfirmModal,
      showModalRef,
      zkDirectoryRef
    }
  },
  render() {
    const { clickDetails, onConfirmModal, showModalRef, zkDirectoryRef } =
      this

    const renderNodeServerStatusTag = (response: { serverStatus: string }) => {
      const serverStatus = response?.serverStatus

      if (!serverStatus) return ''

      return (
        <NTag type={serverStatus === 'NORMAL' ? 'info' : 'warning'}>
          {capitalize(serverStatus)}
        </NTag>
      )
    }
    
    const response = this.data.map((item: MasterNode) => {
      return JSON.parse(item.resInfo)
    })[0]

    return this.data.length < 1 ? (
      <div class={styles.container}>
        <div class="h-flex">
          <div class={[styles.graphBoxNoData,"contentBox"]}>
            <Result
              title='마스터 노드가 존재하지 않습니다.'
              description='현재 마스터 노드가 존재하지 않습니다. 마스터 노드를 생성한 후 이 페이지를 새로고침하세요.'
              status={'info'}
              size={'medium'}
            />
          </div>
        </div>
      </div>
    ) : (
      <>
        <div class={styles.container}>
          <div class="h-flex">
            <div class={[styles.statehBox,"contentBox"]}>
              {renderNodeServerStatusTag(response)}
              <span>{`${'Host'}: ${
                response ? response.host : ' - '
              }`}</span>
              <span
                class={styles['link-btn']}
                onClick={() => clickDetails(this.data[0]?.zkDirectory)}
              >
                {'Directory Detail'}
              </span>
              <div class={styles['timeWrap']}>
                <span>{`${'Create Time'}: ${
                  this.data ? this.data[0]?.createTime : ' - '
                }`}</span>
                <span>{`${'Last Heartbeat Time'}: ${
                  this.data ? this.data[0]?.lastHeartbeatTime : ' - '
                }`}</span>
              </div>
            </div>
          </div>
          <div class="h-flex">
            <div class={[styles.graphBox,"contentBox"]}>
              <div class="titleWrap">
                <div class="title">CPU 사용률</div>
              </div>
              <div class="chartWrap">
                <div class={styles.card}>
                  <GaugeChart
                    value={(
                    response.cpuUsage * 100
                    ).toFixed(2)}
                  />
                </div>
              </div>
            </div>
            <div class={[styles.graphBox,"contentBox"]}>
              <div class="titleWrap">
                <div class="title">Memory 사용률</div>
              </div>
              <div class="chartWrap">
                <div class={styles.card}>
                  <GaugeChart
                    value={(
                    response.memoryUsage * 100
                    ).toFixed(2)}
                  />
                </div>
              </div>
            </div>
            <div class={[styles.graphBox,"contentBox"]}>
              <div class="titleWrap">
                <div class="title">디스크 가용</div>
              </div>
              <div class="chartWrap">
                <div class={styles.card}>
                  <div class={[styles.card, styles['load-average']]}>
                    <NNumberAnimation
                      precision={2}
                      from={0}
                      to={response.diskAvailable}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class={[styles.graphBox,"contentBox"]}>
              <div class="titleWrap">
                <div class="title">평균 부하</div>
              </div>
              <div class="chartWrap">
                <div class={styles.card}>
                  <NNumberAnimation
                    precision={2}
                    from={0}
                    to={response.loadAverage}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <MasterModal
          showModal={showModalRef}
          data={zkDirectoryRef}
          onConfirmModal={onConfirmModal}
        ></MasterModal>
      </>
    )
  }
})

export default master
