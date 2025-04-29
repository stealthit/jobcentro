import { defineComponent } from 'vue'
import styles from './index.module.scss'
import VersionModal from './components/version-modal'
import BasicInfoModal from './components/basicInfo-modal'
import AlertModal from './components/alert-modal'
import RunPrgModal from './components/runprg-modal'

const publish3 = defineComponent({
    name: 'publish-pub3',
    render() {
        const isModal = true 
        const modal1 = false   //15p_버전정보
        const modal2 = false   //16p_Basic Infomation 
        const modal3 = false    //Alert 팝업 
        const modal4 = true    //22p_WorkFlow 실행
        
        
        const menu1 = false
        const menu2 = false
        const menu3 = false
        return (
            <div class={styles.container}>
                <div class={[styles.nodeBox,"contentBox"]}>
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
                </div>
                }
            </div>
        )
    }
});

export default publish3