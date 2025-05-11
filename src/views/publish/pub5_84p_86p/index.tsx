import { defineComponent } from 'vue'
import styles from './index.module.scss';
import CreateAlarmModal from './components/createalarm-modal'
import Pagination from '../components/pagination'

const publish5 = defineComponent({
    name: 'publish-pub5',
    render() {
        const isModal = true 
        const modal1 = true   //85p_알림 그룹 생성

        return (
            <div className={styles.container}>
                <div class={[styles.tableBox,"contentBox"]}>
                    <div class="titleWrap"> 
                        <div class="title">알람 그룹 관리</div>                        
                        <div className="h-flex">
                            <div class={styles.btnGrp}>
                                <button class="btnType2">Create Alarm Group</button>
                                <button class="btnType1 btn-modify">수정</button>
                                <button class="btnType1 btn-delete">삭제</button>
                            </div>
                            <div class="searchBox">
                                <input type="text" name="" id="" placeholder="키워드 입력" />
                                <button class="btn-ic-search"></button>
                            </div>
                        </div>
                    </div>
                    <div class="tableWrap"> 
                        <table class="job-table">                            
                            <thead>              
                                <tr>
                                    <th>#</th>
                                    <th>Alert Group Name</th>
                                    <th>Alarm Group Description</th>
                                    <th>Create Time</th>
                                    <th>Update Time</th>            
                                </tr>
                            </thead>
                            <tbody class="table-body">
                                <tr>
                                    <td>1</td>
                                    <td>default admin warning group</td>
                                    <td>default admin warning group</td>
                                    <td>2025-04-09 14:58:46</td>
                                    <td>2025-04-09 14:58:46</td>
                                </tr>                                
                                <tr>
                                    <td>2</td>
                                    <td>global alert group</td>
                                    <td>global alert group</td>
                                    <td>2025-04-09 14:58:46</td>
                                    <td>2025-04-09 14:58:46</td>
                                </tr>                                
                            </tbody>
                        </table>

                        <Pagination></Pagination>
                    </div>
                </div>

                

                {isModal &&
                    <div className="modalBg">

                        {modal1 && 
                            <CreateAlarmModal></CreateAlarmModal>
                        }
                       
                        

                    </div>
                }
            </div>
        )
    }
});

export default publish5