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
                        <div class="title">데이터소스</div>                        
                        <div className="h-flex">
                            <div class={styles.btnGrp}>
                                <button class="btnType2">데이터소스 생성</button>
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
                                    <th>데이터소스명</th>
                                    <th>관리자</th>
                                    <th>데이터소스 타입</th>            
                                    <th>데이터소스 매개변수</th>            
                                    <th>설명</th>            
                                    <th>생성일시</th>            
                                    <th>수정일시</th>            
                                </tr>
                            </thead>
                            <tbody class="table-body">
                                <tr>
                                    <td>1</td>
                                    <td>member</td>
                                    <td>admin</td>
                                    <td>POSTGRESQL</td>
                                    <td><a href="">Click to view</a></td>
                                    <td>회원정보</td>
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