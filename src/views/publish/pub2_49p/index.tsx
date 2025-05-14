import { defineComponent } from 'vue'
import styles from './index.module.scss';
import Pagination from '../components/pagination'

const publish2 = defineComponent({
    name: 'publish-pub2',
    render() {
        return (
            <div class={styles.container}>
                <div class={[styles.tableBox,"contentBox"]}>   
                    <div class="titleWrap"> 
                        <div class="title">Audit Log</div>                        
                        <div class={styles.btnGrp}>
                            <input type="text" name="" id="" placeholder="User Name" />
                            <input type="text" name="" id="" placeholder="Model Name" />
                            <select class="selectBox" required>
                                <option value="" selected disabled hidden>Model Type</option>
                                <option value="">val1</option>
                                <option value="">val2</option>
                                <option value="">val3</option>
                                <option value="">val4</option>
                            </select>
                            <select class="selectBox" required>
                                <option value="" selected disabled hidden>Operation Type</option>
                                <option value="">val1</option>
                                <option value="">val2</option>
                                <option value="">val3</option>
                                <option value="">val4</option>
                            </select>                            
                            <div className="mul-calendar-group">
                                <div className="data-box">
                                    <input type="datetime-local" name="" id="" value="2025-03-24 00:00:00" />
                                    <span>~</span>
                                    <input type="datetime-local" name="" id="" value="2025-03-24 00:00:00"/>
                                </div>
                            </div>
                            <button class="btn-ic-search"></button>
                        </div>
                    </div>                 
                    <div class="tableWrap">
                        <table class="job-table">                            
                            <thead>              
                                <tr>
                                    <th>#</th>
                                    <th>User Name</th>
                                    <th>Model Type</th>
                                    <th>Model Name</th>
                                    <th>Operation Type</th>
                                    <th>Description</th>
                                    <th>Latency (ms)</th>
                                </tr>
                            </thead>
                            <tbody class="table-body">
                                <tr>
                                    <td>1</td>
                                    <td>admin</td>
                                    <td>Datasource</td>
                                    <td>member</td>
                                    <td>Create</td>
                                    <td>CREATE_DATA_SOURCE_NOTES</td>
                                    <td>10</td>
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