import { defineComponent } from 'vue'
import styles from './index.module.scss';

const publish2 = defineComponent({
    name: 'publish-pub2',
    render() {
        return (
            <div class={styles.container}>
                <div class={[styles.tableBox,"contentBox"]}>
                    <div class="titleWrap"> 
                        <div class="title">워크플로우</div>
                        <div class={styles.btnGrp}>
                            <button class="btnType1 btn-modify">수정</button>
                            <button class="btnType1 btn-start">시작</button>
                            <button class="btnType1 btn-active">활성화</button>
                            <button class="btnType1 btn-inactive">비활성화</button>
                            <button class="btnType1 btn-schedule">스케줄</button>
                            <button class="btnType1 btn-copy">복사</button>
                            <button class="btnType1 btn-delete">삭제</button>
                            <button class="btnType1 btn-treeview">트리뷰</button>
                            <button class="btnType1 btn-export">내보내기</button>
                            <button class="btnType1 btn-version">버전</button>
                        </div>
                    </div>
                    <div class="tableWrap">
                        <table class={[styles.table1,"job-table"]}>                            
                            <thead>               
                                <tr>
                                    <th> <input type="checkbox" name="" id="" /> </th>
                                    <th>워크플로우</th>
                                    <th>상태</th>
                                    <th>시작시간</th>
                                    <th>종류시간</th>                                   
                                    <th>일정</th>                                   
                                    <th>실패 정책</th>                                   
                                    <th>워커 그룹</th>                                   
                                    <th>테넌트</th>                                   
                                </tr>
                            </thead>
                            <tbody class="table-body">
                                <tr>
                                    <td><input type="checkbox" name="" id="" /></td>
                                    <td>입점사 데이터 수집</td>
                                    <td><div class="status on">Online</div></td>
                                    <td>2025-03-20 09:25</td>
                                    <td>2125-03-17 0:00</td>   
                                    <td>0 0 * * * ? *</td>    
                                    <td>Continue</td>                         
                                    <td>default</td>                         
                                    <td>tenant1</td>                         
                                </tr>
                                <tr>
                                    <td><input type="checkbox" name="" id="" /></td>
                                    <td>PG사 데이터 수집</td>
                                    <td><div class="status off">Offline</div></td>
                                    <td>2025-03-20 09:25</td>
                                    <td>2125-03-17 0:00</td>   
                                    <td>0 0 * * * ? *</td>    
                                    <td>Continue</td>                         
                                    <td>default</td>                         
                                    <td>tenant1</td>                         
                                </tr>
                                
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class={[styles.tableBox,"contentBox"]}>
                    <div class="titleWrap"> 
                        <div class="title">워크플로우</div>
                        <div class={styles.btnGrp}>
                            <button class="btnType1 btn-restart">재시작</button>
                            <button class="btnType1 btn-recover">복구</button>
                            <button class="btnType1 btn-pause">중지</button>
                            <button class="btnType1 btn-stop">정지</button>
                            <button class="btnType1 btn-delete">삭제</button>
                        </div>
                    </div>
                    <div class="tableWrap">
                        <table class={[styles.table2,"job-table"]}>                            
                            <thead>               
                                <tr>
                                    <th> <input type="checkbox" name="" id="" /> </th>
                                    <th>워크플로우</th>
                                    <th>상태</th>
                                    <th>반환 타입</th>
                                    <th>스케줄 시간</th>                                   
                                    <th>시작시간</th>                                   
                                    <th>종류시간</th>                                   
                                    <th>소요시간</th>                                   
                                </tr>
                            </thead>
                            <tbody class="table-body">
                                <tr>
                                    <td><input type="checkbox" name="" id="" /></td>
                                    <td>입점사 데이터 수집</td>
                                    <td><div class="status on">성공</div></td>
                                    <td>Start Press</td>    
                                    <td>-</td>                         
                                    <td>2025-03-20 09:25</td>
                                    <td>2125-03-17 0:00</td>   
                                    <td>2m 1s</td>                         
                                </tr>                                
                                <tr>
                                    <td><input type="checkbox" name="" id="" /></td>
                                    <td>입점사 데이터 수집</td>
                                    <td><div class="status fail"> 실패</div></td>
                                    <td>Start Press</td>    
                                    <td>-</td>                         
                                    <td>2025-03-20 09:25</td>
                                    <td>2125-03-17 0:00</td>   
                                    <td>2m 1s</td>                         
                                </tr>                                
                                
                            </tbody>
                        </table>

                    </div>
                </div>
            </div>
        )
    }
});

export default publish2