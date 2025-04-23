import { defineComponent, onMounted, ref, toRefs } from 'vue'
import { NGrid, NGi, NCard, NNumberAnimation, NSpace, NTag } from 'naive-ui'
import { useServerNode } from './use-server-node'
import styles from './index.module.scss'
import Card from '@/components/card'
import Result from '@/components/result'
import Gauge from '@/components/chart/modules/Gauge'
import NodeModal from './node-modal'
import type { Ref } from 'vue'
import type { RowData } from 'naive-ui/es/data-table/src/interface'
import type { AlertNode } from '@/service/modules/monitor/types'
import { capitalize } from 'lodash'

const alertServer = defineComponent({
  name: 'alertServer',
  setup() {
    const showModalRef = ref(false)
    const { variables, getTableData } = useServerNode()
    const zkDirectoryRef: Ref<Array<RowData>> = ref([])

    const clickDetails = (zkDirectories: string) => {
      zkDirectoryRef.value = [{ directory: zkDirectories, index: 1 }]
      showModalRef.value = true
    }

    const onConfirmModal = () => {
      showModalRef.value = false
    }

    onMounted(() => {
      getTableData()
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

    const renderNodeServerStatusTag = (item: AlertNode) => {
      const serverStatus = JSON.parse(item.resInfo)?.serverStatus

      if (!serverStatus) return ''

      return (
        <NTag type={serverStatus === 'NORMAL' ? 'info' : 'warning'}>
          {capitalize(serverStatus)}
        </NTag>
      )
    }

    return this.data.length < 1 ? (
      <Result
        title='알람서버 노드가 존재하지 않습니다.'
        description='현재 알람서버 노드가 존재하지 않습니다. 알람서버 노드를 생성한 후 이 페이지를 새로고침하세요.'
        status={'info'}
        size={'medium'}
      />
    ) : (
      <>
        <NSpace vertical size={25}>
          {this.data.map((item: AlertNode) => {
            return (
              <NSpace vertical>
                <NCard>
                  <NSpace
                    justify='space-between'
                    style={{
                      'line-height': '28px'
                    }}
                  >
                    <NSpace>
                      {renderNodeServerStatusTag(item)}

                      <span>{`${'Host'}: ${
                        item ? item.host : ' - '
                      }`}</span>
                      <span
                        class={styles['link-btn']}
                        onClick={() => clickDetails(item.zkDirectory)}
                      >
                        {'Directory Detail'}
                      </span>
                    </NSpace>
                    <NSpace>
                      <span>{`${'Create Time'}: ${
                        item ? item.createTime : ' - '
                      }`}</span>
                      <span>{`${'Last Heartbeat Time'}: ${
                        item ? item.lastHeartbeatTime : ' - '
                      }`}</span>
                    </NSpace>
                  </NSpace>
                </NCard>
                <NGrid x-gap='12' cols='4'>
                  <NGi>
                    <Card title='CPU 사용률'>
                      <div class={styles.card}>
                        {item && (
                          <Gauge
                            data={(
                              JSON.parse(item.resInfo).cpuUsage * 100
                            ).toFixed(2)}
                          />
                        )}
                      </div>
                    </Card>
                  </NGi>
                  <NGi>
                    <Card title='Memory 사용률'>
                      <div class={styles.card}>
                        {item && (
                          <Gauge
                            data={(
                              JSON.parse(item.resInfo).memoryUsage * 100
                            ).toFixed(2)}
                          />
                        )}
                      </div>
                    </Card>
                  </NGi>
                  <NGi>
                    <Card title='디스크 가용'>
                      <div class={[styles.card, styles['load-average']]}>
                        {item && (
                          <NNumberAnimation
                            precision={2}
                            from={0}
                            to={JSON.parse(item.resInfo).diskAvailable}
                          />
                        )}
                      </div>
                    </Card>
                  </NGi>
                  <NGi>
                    <Card title='평균 부하'>
                      <div class={[styles.card, styles['load-average']]}>
                        {item && (
                          <NNumberAnimation
                            precision={2}
                            from={0}
                            to={JSON.parse(item.resInfo).loadAverage}
                          />
                        )}
                      </div>
                    </Card>
                  </NGi>
                </NGrid>
              </NSpace>
            )
          })}
        </NSpace>
        <NodeModal
          showModal={showModalRef}
          data={zkDirectoryRef}
          onConfirmModal={onConfirmModal}
        ></NodeModal>
      </>
    )
  }
})

export default alertServer
