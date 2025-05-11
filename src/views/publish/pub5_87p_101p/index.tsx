import { defineComponent } from 'vue'
import styles from './index.module.scss';
import CreateInstanceModal from './components/createinstance-modal'
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
                        <div class="title">알람 인스턴스 관리</div>                        
                        <div className="h-flex">
                            <div class={styles.btnGrp}>
                                <button class="btnType2">Create Alarm Instance</button>
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
                                    <th>Alert Instance Name</th>
                                    <th>Alarm Instance Type</th>
                                    <th>Alarm Plugin name</th>
                                    <th>Create Time</th>
                                    <th>Update Time</th>            
                                    <th>Operation</th>            
                                </tr>
                            </thead>
                            <tbody class="table-body">
                                <tr>
                                    <td>1</td>
                                    <td>test</td>
                                    <td>NORMAL</td>
                                    <td>WeChat</td>
                                    <td>2025-04-09 14:58:46</td>
                                    <td>2025-04-09 14:58:46</td>
                                    <td>
                                        <div class="btn-grp">
                                            <button class="btn-ic-edit"></button>
                                            <button class="btn-ic-trash"></button>
                                        </div>
                                    </td>
                                </tr>                                                                                        
                            </tbody>
                        </table>

                        <Pagination></Pagination>
                    </div>
                </div>

                

                {isModal &&
                    <div className="modalBg">

                        {modal1 && 
                            <CreateInstanceModal></CreateInstanceModal>
                        }
                       
                        

                    </div>
                }
            </div>
        )
    }
});

export default publish5