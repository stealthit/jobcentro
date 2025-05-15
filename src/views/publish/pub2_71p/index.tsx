import { defineComponent } from 'vue'
import styles from './index.module.scss';
import Pagination from '../components/pagination'

const publish2 = defineComponent({
    name: 'publish-pub2',
    render() {
        return (
            <div className={styles.container}>
                <div class={[styles.tableBox,"contentBox"]}>
                    <div class="titleWrap"> 
                        <div class="title">Tenant Manage</div>                     
                        <div className="h-flex">
                            <div class={styles.btnGrp}>
                                <button class="btnType2">Create Tenant</button>
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
                                    <th>Operating System Tenant</th>
                                    <th>Description</th>
                                    <th>QueueName</th>
                                    <th>Create time</th>
                                    <th>Update time</th>
                                </tr>
                            </thead>
                            <tbody class="table-body">
                                <tr>
                                    <td>1</td>
                                    <td>default</td>
                                    <td>default tenant</td>
                                    <td>default</td>
                                    <td>2025-04-09 14:58:46</td>
                                    <td>2025-04-09 14:58:46</td>                                    
                                </tr>                                                                                                                                                                                                          
                                                                                                                     
                            </tbody>
                        </table>

                        <Pagination></Pagination>
                    </div>
                </div>                                
            </div>
        )
    }
});

export default publish2