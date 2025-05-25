import { defineComponent } from 'vue'
import styles from './index.module.scss';
import Pagination from '../components/pagination'

const publish1 = defineComponent({
    name: 'publish-pub1',
    render() {
        return (
            <div class={styles.container}>
                <div class={[styles.inputBox,"contentBox"]}>
                    <div class="titleWrap"> 
                        <div class="title">비밀번호 수정</div>     
                    </div>   
                    <div class={styles.inputGroup}>
                        <div className="input-label ic-tit-nece">비밀번호</div>
                        <input type='password' placeholder="비밀번호를 입력해주세요" />
                    </div>
                    <div class={styles.inputGroup}>
                        <div className="input-label ic-tit-nece">비밀번호 확인</div>
                        <input type='password' placeholder="비밀번호 확인을 입력해주세요" />
                    </div>
                    <div class={styles.btnGroup}>
                        <button className="btn-confirm">확인</button>
                    </div>
                </div>
            </div>
        )
    }
});

export default publish1