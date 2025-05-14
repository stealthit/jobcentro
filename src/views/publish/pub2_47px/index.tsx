import { defineComponent } from 'vue'
import styles from './index.module.scss';

const publish2 = defineComponent({
    name: 'publish-pub2',
    render() {
        return (
            <div class={styles.container}>
                <div class={[styles.titleBox,"contentBox"]}>
                    <div class={styles.conWrap}>  
                        <div class={styles.state}>Normal</div>
                        <div class={styles.host}>Host: 192.168.56.1</div>
                        <a href="">Directory Detail</a>
                    </div>     
                    <div class={styles.conWrap}>
                        <div class={styles.time}>Create Time : <span>2025-04-10 11:18:24</span></div>  
                        <div class="v-divider"></div>
                        <div class={styles.time}>Last Time : <span>2025-04-10 11:18:24</span></div>  
                    </div>     
                    
                </div>
                <div class="h-flex flex-1">
                    <div class={[styles.graphWrap,"contentBox"]}>                    
                        <div class="titleWrap">
                            <div class="title">동작 상태</div>
                        </div>
                        <div class={styles.statusBox}> 
                            <img src="" alt="" className="ic-check-110" />
                        </div>
                    </div>
                    <div class={[styles.graphWrap,"contentBox"]}>                    
                        <div class="titleWrap">
                            <div class="title">최대 연결수 - 2025-04-10 12:06:07</div>
                        </div>
                        <div class={styles.valBox}>
                            <div class={styles.val}>100</div>  
                        </div>
                    </div>
                </div>
                <div class="h-flex flex-1">
                    <div class={[styles.graphWrap,"contentBox"]}>                    
                        <div class="titleWrap">
                            <div class="title">스레드 연결 수</div>
                        </div>
                        <div class={styles.valBox}>
                            <div class={styles.val}>15</div>  
                        </div>
                    </div>
                    <div class={[styles.graphWrap,"contentBox"]}>                    
                        <div class="titleWrap">
                            <div class="title">실행 중인 스레드 연결 수</div>
                        </div>
                        <div class={styles.valBox}>  
                            <div class={styles.val}>1</div>  
                        </div>
                    </div>                    
                </div>
                
            </div>
        )
    }
});

export default publish2