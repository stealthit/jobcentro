import { defineComponent } from 'vue'
import styles from './index.module.scss';
import Pagination from '../components/pagination'

const publish1 = defineComponent({
    name: 'publish-pub1',
    render() {
        return (
            <div class={styles.container}>
                <div class={[styles.infoBox,"contentBox"]}>
                    <div class="titleWrap"> 
                        <div class="title">프로필</div>     
                    </div>   
                    <div class={styles.userInfo1}>
                        <img src="" alt="" className="ic-profile-76" />
                        <ul class={styles.textBox}>
                            <li>admin</li>
                            <li>xxx@qq.com</li>
                        </ul>
                    </div>  

                    <div class="h-divider"></div>  

                    <div class={styles.userInfo2}>
                        <ul class={styles.item}>
                            <li>전화번호</li>
                            <li>010-0000-0000</li>
                        </ul>
                        <ul class={styles.item}>
                            <li>권한</li>
                            <li>관리자</li>
                        </ul>
                        <ul class={styles.item}>
                            <li>생성 시간</li>
                            <li>2025-04-10 14:14:19</li>
                        </ul>
                        <ul class={styles.item}>
                            <li>수정 시간</li>
                            <li>2025-04-10 14:14:19</li>
                        </ul>                        
                    </div>  
                </div>
            </div>
        )
    }
});

export default publish1