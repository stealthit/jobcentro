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
                            <div class="title">CPU 사용률</div>
                        </div>
                        <div class={styles.graphBox}>  
                        </div>
                    </div>
                    <div class={[styles.graphWrap,"contentBox"]}>                    
                        <div class="titleWrap">
                            <div class="title">Memory 사용률</div>
                        </div>
                        <div class={styles.graphBox}>  
                        </div>
                    </div>
                </div>
                <div class="h-flex flex-1">
                    <div class={[styles.graphWrap,"contentBox"]}>                    
                        <div class="titleWrap">
                            <div class="title">디스크 가용</div>
                        </div>
                        <div class={styles.valBox}>
                            <div class={styles.val}>0.00</div>  
                        </div>
                    </div>
                    <div class={[styles.graphWrap,"contentBox"]}>                    
                        <div class="titleWrap">
                            <div class="title">평균 부하</div>
                        </div>
                        <div class={styles.valBox}>  
                            <div class={styles.val}>0.00</div>  
                        </div>
                    </div>
                    <div class={[styles.graphWrap,"contentBox"]}>                    
                        <div class="titleWrap">
                            <div class="title">스프레드 풀 가용률</div>
                        </div>
                        <div class={styles.valBox}>  
                            <div class={styles.val}>0/100</div>  
                        </div>
                    </div>
                </div>
                
            </div>
        )
    }
});

export default publish2