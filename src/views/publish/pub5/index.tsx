import { defineComponent } from 'vue'
import styles from './index.module.scss';
// import CreateInstanceModal from './components/createinstance-modal'
import Pagination from '../components/pagination'

const publish5 = defineComponent({
    name: 'publish-pub5',
    render() {
        const isModal = false 
        const modal1 = true   //85p_알림 그룹 생성

        return (
            <div className={styles.container}>
                <div class={[styles.tableBox,"contentBox"]}>
                    <div class="titleWrap"> 
                        <div class="title">워커그룹관리</div>                        
                        <div className="h-flex">
                            <div class={styles.btnGrp}>
                                <button class="btnType2">Create Worker Group</button>
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
                                    <th>Group Name</th>
                                    <th>Worker Addresses</th>
                                    <th>생성일시</th>            
                                    <th>수정일시</th>            
                                </tr>
                            </thead>
                            <tbody class="table-body">
                                <tr>
                                    <td>1</td>
                                    <td>group01</td>
                                    <td>172.20.0.7:1234</td>
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
                            <CreateInstanceModal></CreateInstanceModal>
                        }
                       
                        

                    </div>
                }
            </div>
        )
    }
});

export default publish5