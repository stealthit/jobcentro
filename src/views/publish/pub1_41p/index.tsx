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
                                    <th>1</th>
                                    <th>2</th>
                                    <th>3</th>
                                    <th>4</th>                                   
                                    <th>5</th>                                   
                                    <th>6</th>                                   
                                    <th>7</th>                                   
                                    <th>8</th>                                   
                                    <th>9</th>                                   
                                    <th>10</th>                                   
                                    <th>11</th>
                                    <th>12</th>
                                    <th>13</th>
                                    <th>14</th>                                   
                                    <th>15</th>                                   
                                    <th>16</th>                                   
                                    <th>17</th>                                   
                                    <th>18</th>                                   
                                    <th>19</th>                                   
                                    <th>20</th>                                   
                                    <th>21</th>                                   
                                    <th>22</th>                                   
                                    <th>23</th>                                   
                                    <th>24</th>                                   
                                    <th>25</th>                                   
                                    <th>26</th>                                   
                                    <th>27</th>                                   
                                    <th>28</th>                                   
                                    <th>29</th>                                   
                                    <th>30</th>                                   
                                    <th>31</th>                                   
                                </tr>
                            </thead>
                            <tbody class="table-body">
                                <tr>
                                    <td>1</td>
                                    <td>판매 프로젝트 &gt; Group1</td>
                                    <td>입점사 데이터 수집</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td class={styles.on}>●</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td class={styles.off}>●</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td class={styles.off}>●</td>
                                    <td></td>                               
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>판매 프로젝트 &gt; Group1</td>
                                    <td>PG사 데이터 수집</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td class={styles.fail}>●</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td class={styles.on}>●</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td class={styles.off}>●</td>
                                    <td></td>
                                    <td></td>                          
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>판매 프로젝트 &gt; Group1</td>
                                    <td>청구서 발송</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td class={styles.on}>●</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td class={styles.fail}>●</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td class={styles.off}>●</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>                           
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