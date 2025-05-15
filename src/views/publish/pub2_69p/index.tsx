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
                        <div class="title">Task group queue</div>                     
                        <div className="h-flex">
                            <div class={styles.btnGrp}>
                                <button class="btnType2">우선순위 수정</button>
                                <button class="btnType1 btn-restart">실행</button>
                                <select class="selectBox" required>
                                    <option value="" selected disabled hidden>Task group name</option>
                                    <option value="">val1</option>
                                    <option value="">val2</option>
                                    <option value="">val3</option>
                                    <option value="">val4</option>
                                </select>
                                <input type="text" name="" id="" placeholder="Workflow instance"/>
                                <input type="text" name="" id="" placeholder="Task instance" />
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
                                    <th>Project name</th>
                                    <th>Task name</th>
                                    <th>Workflow instance</th>
                                    <th>Task group name</th>
                                    <th>Priority</th>
                                    <th>Starting status</th>
                                    <th>In queue</th>
                                    <th>Task status</th>
                                    <th>Create time</th>
                                    <th>Update time</th>
                                </tr>
                            </thead>
                            <tbody class="table-body">
                                <tr>
                                    <td><input type="checkbox" name="" id="" /></td>
                                    <td>1</td>
                                    <td>WorkflowTest</td>
                                    <td>Shell2</td>
                                    <td>ShellWorkflow-3-20250318000000</td>
                                    <td>TaskGroup1</td>
                                    <td>1</td>
                                    <td>0</td>
                                    <td>0</td>
                                    <td>RELEASE</td>
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