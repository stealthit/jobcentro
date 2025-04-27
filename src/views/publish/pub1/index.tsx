import { defineComponent } from 'vue'
import styles from './index.module.scss';
import Pagination from '../components/pagination'

const publish1 = defineComponent({
    name: 'publish-pub1',
    render() {
        return (
            <div class={styles.container}>
                <div class="h-flex">
                    <div class={[styles.graphBox,"contentBox"]}>
                        <div class="titleWrap">
                            <div class="title">그래프</div>
                        </div>
                        <div class="chartWrap">
                            {/* chart */}
                        </div>
                    </div>
                    
                    <div class={[styles.graphBox,"contentBox"]}>
                        <div class="titleWrap">
                            <div class="title">평균실행시간 (상위 10)</div>
                        </div>
                        <div class="chartWrap">
                            {/* chart 영역 */}
                        </div>
                    </div>
                </div>
                <div class={[styles.tableBox,"contentBox"]}>
                    <div class="titleWrap"> 
                        <div class="title">리스트</div>
                        <div class={styles.btnGrp}>
                            <button class="btnType1 btn-active">활성</button>
                            <button class="btnType1 btn-inactive">비활성</button>
                            <button class="btnType1 btn-modify">수정</button>
                            <button class="btnType1 btn-delete">삭제</button>
                            <button class="btnType1 btn-change">워커 그룹 변경</button>
                        </div>
                    </div>
                    <div class="tableWrap">
                        <table class="job-table">                            
                            <thead>              
                                <tr>
                                    <th>#</th>
                                    <th>구분</th>
                                    <th>그룹/작업명</th>
                                    <th>생성일</th>
                                    <th>최근 수정일</th>                                   
                                </tr>
                            </thead>
                            <tbody class="table-body">
                                <tr>
                                    <td>1</td>
                                    <td>그룹</td>
                                    <td>Group1</td>
                                    <td>2025-03-20 09:25</td>
                                    <td>2025-03-20 09:25</td>                                
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>그룹</td>
                                    <td>Group1</td>
                                    <td>2025-03-20 09:25</td>
                                    <td>2025-03-20 09:25</td>                                
                                </tr>
                                <tr>
                                    <td>3</td>
                                    <td>그룹</td>
                                    <td>Group1</td>
                                    <td>2025-03-20 09:25</td>
                                    <td>2025-03-20 09:25</td>                                
                                </tr>
                                <tr>
                                    <td>4</td>
                                    <td>그룹</td>
                                    <td>Group1</td>
                                    <td>2025-03-20 09:25</td>
                                    <td>2025-03-20 09:25</td>                                
                                </tr>
                                <tr>
                                    <td>5</td>
                                    <td>그룹</td>
                                    <td>Group1</td>
                                    <td>2025-03-20 09:25</td>
                                    <td>2025-03-20 09:25</td>                                
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

export default publish1