import { defineComponent } from 'vue'
import styles from './index.module.scss'
import Pagination from '../components/pagination'
import CreateUserModal from './components/createuser-modal'
import PrjAuthModal from './components/prjauth-modal'
import ResAuthModal from './components/resauth-modal'
import AuthModal from './components/auth-modal'

const publish4 = defineComponent({
    name: 'publish-pub4',
    render() {
        const isModal = true 
        const modal1 = false   //75p_사용자생성/수정
        const modal2 = false   //78p_사용자 권한 프로젝트
        const modal3 = false   //79p_사용자 권한 리소스
        const modal4 = true   //81p_ 사용자 권한 데이터 소스(Datasource,UDF Function,Namespace)

        const menu = false
        return (
            <div className={styles.container}>
                <div class={[styles.tableBox,"contentBox"]}>
                    <div class="titleWrap"> 
                        <div class="title">사용자 관리</div>                        
                        <div className="h-flex">
                            <div class={styles.btnGrp}>
                                <button class="btnType2">Create User</button>
                                <button class="btnType1 btn-modify">수정</button>
                                <button class="btnType1 btn-auth">권한</button>
                                <button class="btnType1 btn-format">초기화</button>
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
                                    <th>Username</th>
                                    <th>User Type</th>
                                    <th>Tenant</th>
                                    <th>Queue</th>            
                                    <th>Email</th>                       
                                    <th>Phone</th>                       
                                    <th>State</th>                       
                                    <th>Create Time</th>                       
                                </tr>
                            </thead>
                            <tbody class="table-body">
                                <tr>
                                    <td>1</td>
                                    <td>admin</td>
                                    <td>Administrator</td>
                                    <td>default</td>
                                    <td>default</td>
                                    <td>xxx@qq.com</td>
                                    <td>010-1111-1111</td>
                                    <td><div class="status on">Enabled</div></td>
                                    <td>2025-04-09 14:58:46</td>
                                </tr>                                
                            </tbody>
                        </table>

                        <Pagination></Pagination>
                    </div>
                </div>

                {/* 메뉴리스트  */}
                {menu && 
                    <ul class={[styles.menuBox,"contentBox"]}>
                        <li>Project</li>
                        <li>Resource</li>
                        <li>Datasource</li>
                        <li>UDF Function</li>
                        <li>Namespace</li>
                    </ul>
                }

                {isModal &&
                    <div className="modalBg">

                        {modal1 && 
                            <CreateUserModal></CreateUserModal>
                        }
                        {modal2 && 
                            <PrjAuthModal></PrjAuthModal>
                        }
                        {modal3 && 
                            <ResAuthModal></ResAuthModal>
                        }
                        {modal4 && 
                            <AuthModal></AuthModal>
                        }
                        

                    </div>
                }
            </div>
        )
    }
});

export default publish4