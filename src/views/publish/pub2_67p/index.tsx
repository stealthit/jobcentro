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
                        <div class="title">Task group option</div>                     
                        <div className="h-flex">
                            <div class={styles.btnGrp}>
                                <button class="btnType2">Create task group</button>
                                <button class="btnType1 btn-active">활성화</button>
                                <button class="btnType1 btn-inactive">비활성화</button>
                                <button class="btnType1 btn-modify">수정</button>
                                <button class="btnType1 btn-format">작업그룹 대기열</button>
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
                                    <th><input type="checkbox" name="" id="" /></th>
                                    <th>#</th>
                                    <th>Task group option</th>
                                    <th>Project name</th>
                                    <th>Resource pool size</th>
                                    <th>Used resource</th>
                                    <th>Task group desc</th>
                                    <th>Create time</th>
                                    <th>Update time</th>
                                </tr>
                            </thead>
                            <tbody class="table-body">
                                <tr>
                                    <td><input type="checkbox" name="" id="" /></td>
                                    <td>1</td>
                                    <td>TaskGroup3Edit</td>
                                    <td>test</td>
                                    <td>12</td>
                                    <td>0</td>
                                    <td>groupdesc</td>
                                    <td>2025-04-09 14:58:46</td>
                                    <td>2025-04-09 14:58:46</td>                                    
                                </tr>                                                                                        
                                <tr>
                                    <td><input type="checkbox" name="" id="" /></td>
                                    <td>2</td>
                                    <td>TaskGroup02</td>
                                    <td>test</td>
                                    <td>10</td>
                                    <td>0</td>
                                    <td>test</td>
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