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
                                <button class="btnType2">폴더 생성</button>
                                <button class="btnType2">파일 생성</button>
                                <button class="btnType2">파일 업로드</button>
                                <button class="btnType1 btn-active">활성화</button>
                                <button class="btnType1 btn-inactive">비활성화</button>
                                <button class="btnType1 btn-modify">수정</button>
                                <button class="btnType1 btn-save">작업그룹 대기열</button>
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
                                    <th>폴더/파일명</th>
                                    <th>테넌트명</th>
                                    <th>폴더 여부</th>
                                    <th>파일명</th>
                                    <th>크기</th>
                                    <th>생성일</th>
                                    <th>최종수정일</th>
                                </tr>
                            </thead>
                            <tbody class="table-body">
                                <tr>
                                    <td><input type="checkbox" name="" id="" /></td>
                                    <td>1</td>
                                    <td><a href="">Resource.sh</a></td>
                                    <td>tenant01</td>
                                    <td>No</td>
                                    <td>Resource.sh</td>
                                    <td>36.8 KB</td>
                                    <td>2025-04-09 14:58:46</td>
                                    <td>2025-04-09 14:58:46</td>                                    
                                </tr>                                                                                        
                                <tr>
                                    <td><input type="checkbox" name="" id="" /></td>
                                    <td>2</td>
                                    <td><a href="">ScriptAlarmFile.sh</a></td>
                                    <td>tenant01</td>
                                    <td>No</td>
                                    <td>ScriptAlarmFile.sh</td>
                                    <td>25 KB</td>
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