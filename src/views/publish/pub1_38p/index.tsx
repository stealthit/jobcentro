import { defineComponent } from 'vue'
import styles from './index.module.scss';
import Pagination from '../components/pagination'

const publish1 = defineComponent({
    name: 'publish-pub1',
    render() {
        return (
            <div class={styles.container}>
                <div class={[styles.calendarBox,"contentBox"]}>
                    캘린더 영역
                </div>
                <div class={[styles.tableBox,"contentBox"]}>
                    <div class="titleWrap jistify-end"> 
                        <div class={styles.btnGrp}>
                            <select class="selectBox" required>
                                <option value="" selected disabled hidden>프로젝트 선택</option>
                                <option value="">val1</option>
                                <option value="">val2</option>
                                <option value="">val3</option>
                                <option value="">val4</option>
                            </select>
                            <select class="selectBox" required>
                                <option value="" selected disabled hidden>그룹 선택</option>
                                <option value="">val1</option>
                                <option value="">val2</option>
                                <option value="">val3</option>
                                <option value="">val4</option>
                            </select>
                            <input type="text" name="" id="" placeholder="워크플로우" />
                            <select class="selectBox" required>
                                <option value="" selected disabled hidden>실행결과 선택</option>
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
                                    <th>프로젝트/그룹</th>
                                    <th>워크플로우</th>
                                    <th>실행결과</th>
                                    <th>스케줄일시</th>
                                    <th>시작일시</th>
                                    <th>종료일시</th>                                   
                                </tr>
                            </thead>
                            <tbody class="table-body">
                                <tr>
                                    <td>1</td>
                                    <td>판매 프로젝트 &gt; Group1</td>
                                    <td>입점사 데이터 수집</td>
                                    <td><div class="status on">실행완료</div></td>
                                    <td>2025/03/24 13:00:00<br/> -2025/03/28 13:00:00</td>
                                    <td>2025-03-20 09:25</td>
                                    <td>2025-03-20 09:25</td>                                
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>판매 프로젝트 &gt; Group1</td>
                                    <td>PG사 데이터 수집</td>
                                    <td><div class="status off">실행예정</div></td>
                                    <td>2025/03/24 13:00:00<br/> -2025/03/28 13:00:00</td>
                                    <td>2025-03-20 09:25</td>
                                    <td>2025-03-20 09:25</td>                                
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>판매 프로젝트 &gt; Group1</td>
                                    <td>청구서 발송</td>
                                    <td><div class="status off">실행예정</div></td>
                                    <td>2025/03/24 13:00:00<br/> -2025/03/28 13:00:00</td>
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