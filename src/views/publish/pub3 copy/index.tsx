import { defineComponent } from 'vue'
import styles from './index.module.scss'
import VersionModal from './components/version-modal'
import BasicInfoModal from './components/basicInfo-modal'
import AlertModal from './components/alert-modal'
import RunPrgModal from './components/runprg-modal'
import ScheduleModal from './components/schedule-modal'
import ScheDateModal from './components/schedate-modal'
import ScheTimeModal from './components/schetime-modal'
import SetAlarmModal from './components/setalarm-modal'
import RegGroupModal from './components/reggroup-modal'
import TaskCommonModal from './components/taskcommon-modal'
import TaskSQLModal from './components/tasksql-modal'
import TaskSSHModal from './components/taskssh-modal'
import TaskHTTPModal from './components/taskhttp-modal'
import TaskJavaModal from './components/taskjava-modal'
import TaskPythonModal from './components/taskpython-modal'
import TaskSubProcessModal from './components/tasksubprocess-modal'
import TaskSwitchModal from './components/taskswitch-modal'

const publish3 = defineComponent({
    name: 'publish-pub3',
    render() {
        const isModal = true 
        const modal1 = false   //15p_버전정보
        const modal2 = false   //16p_Basic Infomation 
        const modal3 = false    //Alert 팝업 
        const modal4 = false    //22p_WorkFlow 실행
        const modal5 = false     //24p 스케쥴 추가
        const modal6 = false     //24p_스케줄 추가 > 스케줄 일자
        const modal7 = false     //24p_스케줄 추가 > 스케줄 시간
        const modal8 = false     //26p_알림 설정
        const modal9 = false     //27p_그룹추가/수정
        const modal10 = false     //29p_워크플로우 Task -공통
        const modal11 = false     //30p_워크플로우 Task -SQL
        const modal12 = false     //31p_워크플로우 Task – Shell Script 실행
        const modal13 = false     //32p_워크플로우 Task – HTTP
        const modal14 = false     //33p_워크플로우 Task – Java
        const modal15 = false     //34p_워크플로우 Task – Python
        const modal16 = false     //35p_워크플로우 Task – SubProcess
        const modal17 = false     //36p_워크플로우 Task – Conditions - 퍼블 작업 대기중
        const modal18 = true     //37p_워크플로우 Task – Switch
       
        
        const menu1 = false
        const menu2 = false
        const menu3 = false
        return (
            <div class={styles.container}>
                <div class={[styles.nodeBox,"contentBox"]}>
                    <div class="titleWrap"> 
                        <div className="h-flex">
                            <div class="title">Switch</div>
                            <div class={styles.btnGrp}>
                                <button className="btn-ic-switch1"></button>
                                <button className="btn-ic-switch2"></button>
                            </div>
                        </div>
                        <div className="h-flex">
                            <div class={styles.btnGrp}>
                                <button class="btnType1 btn-search">노드찾기</button>
                                <button class="btnType1 btn-saved">이미지로 저장</button>
                                <button class="btnType1 btn-delete">노드삭제</button>
                                <button class="btnType1 btn-inactive">전체화면</button>
                                <button class="btnType1 btn-format">포맷</button>
                                <button class="btnType1 btn-version">버전정보</button>
                                <button class="btnType1 btn-save">저장</button>
                                <button class="btnType1 btn-close2">닫기</button>
                            </div>
                            <div class="searchBox">
                                <select class="selectBox">
                                    <option value="">고객사용금액정보 개더링</option>
                                    <option value="">val1</option>
                                    <option value="">val2</option>
                                    <option value="">val3</option>
                                    <option value="">val4</option>
                                </select>
                                <button class="btn-ic-search"></button>
                            </div>
                        </div>
                    </div>
                    <div class={styles.workflowBox}>
                        워크플로우 영역
                    </div>
                </div>

                {/* 메뉴리스트  */}
                {menu1 && 
                    <ul class={[styles.menuBox,"contentBox"]}>
                            <li> <img class="ic-add-group-16" />그룹추가</li>
                    </ul>
                }
                {menu2 &&
                    <ul class={[styles.menuBox,"contentBox"]}>
                        <li> <img class="ic-add-work-16" />워크플로우추가</li>
                        <li class={styles.cur}> <img class="ic-modify-group-16" />그룹수정</li>
                        <li> <img class="ic-delete-group-16" />그삭제</li>
                        <li> 
                            <img class="ic-setting-group-16" />
                            그룹관리
                            {/* 하위메뉴가 있을때 arrSub tag 추가 */}
                            <div class={styles.arrSub}></div>
                        </li>
                        <li> <img class="ic-active-all-16" />하위모두활성화</li>
                        <li> <img class="ic-inactive-all-16" />하위모두비활성화</li>
                        <li> <img class="ic-add-sche-16" />스케줄추가</li>
                        <li> <img class="ic-setting-alarm-16" />알림설정</li>
                    </ul>
                }
                {menu3 &&
                    <ul class={[styles.menuBox,"contentBox"]}>
                        <li> <img class="ic-open-work-16" />워크플로우열기</li>
                        <li class={styles.cur}> <img class="ic-delete-work-16" />워크플로우삭제</li>
                        <li> <img class="ic-copy-work-16" />워크플로우복사</li>
                        <li> <img class="ic-inactive-all-16" />비활성화</li>
                        <li> <img class="ic-run-work-16" />워크플로우실행</li>
                        <li> <img class="ic-run-history-16" />실행이력</li>
                        <li> <img class="ic-add-sche-16" />스케줄추가</li>
                        <li> <img class="ic-search-sche-16" />연간스케줄조회</li>
                        <li> <img class="ic-setting-alarm-16" />알림설정</li>
                    </ul>
                }


                {isModal &&
                <div className="modalBg">
                {/* Version info */}
                    {modal1 && 
                        <VersionModal></VersionModal>
                    }
                    {modal2 && 
                        <BasicInfoModal></BasicInfoModal>
                    }
                    {modal3 && 
                        <AlertModal></AlertModal>
                    }
                    {modal4 &&
                        <RunPrgModal></RunPrgModal>
                    }
                    {modal5 &&
                        <ScheduleModal></ScheduleModal>
                    }
                    {modal6 &&
                        <ScheDateModal></ScheDateModal>
                    }
                    {modal7 &&
                        <ScheTimeModal></ScheTimeModal>
                    }
                    {modal8 &&
                        <SetAlarmModal></SetAlarmModal>
                    }
                    {modal9 &&
                        <RegGroupModal></RegGroupModal>
                    }
                    {modal10 &&
                        <TaskCommonModal></TaskCommonModal>
                    }
                    {modal11 &&
                        <TaskSQLModal></TaskSQLModal>
                    }
                    {modal12 &&
                        <TaskSSHModal></TaskSSHModal>
                    }
                    {modal13 &&
                        <TaskHTTPModal></TaskHTTPModal>
                    }
                    {modal14 &&
                        <TaskJavaModal></TaskJavaModal>
                    }
                    {modal15 &&
                        <TaskPythonModal></TaskPythonModal>
                    }
                    {modal16 &&
                        <TaskSubProcessModal></TaskSubProcessModal>
                    }
                    {modal18 &&
                        <TaskSwitchModal></TaskSwitchModal>
                    }

                </div>
                }
            </div>
        )
    }
});

export default publish3