import { defineComponent } from 'vue'
import styles from './index.module.scss';
import Pagination from '../components/pagination'

const publish2 = defineComponent({
    name: 'publish-pub2',
    render() {
        return (
            <div className={styles.container}>
                <div class={[styles.tableBox,"contentBox"]}>
                    <ul class="tabWrap"> 
                        <li class="cur">Command Statistics List</li>
                        <li>Failure Command Statistics List</li>
                    </ul>
                    <div class="tableWrap"> 
                        <table class="job-table">                            
                            <thead>              
                                <tr>
                                    <th>ID</th>
                                    <th>Command Type</th>
                                    <th>Command Param</th>
                                    <th>Task Info</th>            
                                    <th>Task Params</th>    
                                    <th>Worker Info</th>
                                    <th>Warning Info</th>
                                    <th>Executor Id</th>
                                    <th>Time</th>        
                                </tr>
                            </thead>
                            <tbody class="table-body">
                                <tr>
                                    {/* 데이터가 없을때 */}
                                    <td colspan='9'>
                                        <div class="no-data">
                                            <img src="" alt="" className="ic-nodata-36" />
                                            데이타없음
                                        </div>
                                    </td>
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