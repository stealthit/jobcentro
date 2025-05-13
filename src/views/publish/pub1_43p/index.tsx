import { defineComponent } from 'vue'
import styles from './index.module.scss';
import Pagination from '../components/pagination'

const publish1 = defineComponent({
    name: 'publish-pub1',
    render() {
        return (
            <div class={styles.container}>
                <div class={[styles.searchBox,"contentBox"]}>
                        <div className="mul-calendar-group">
                            <div className="data-box">
                                <input type="datetime-local" name="" id="" value="2025-03-24 00:00:00" />
                                <span>~</span>
                               <input type="datetime-local" name="" id="" value="2025-03-24 00:00:00"/>
                            </div>
                        </div>                           
                        <div className="btn-input-box">
                            <input type="text" name="" id="" />
                            <button className="btn-input"></button>
                        </div>
                        <button class="btn-ic-search"></button>
                    {/* <div class={styles.btnGrp}> */}
                    {/* </div> */}
                </div>
                <div class={[styles.graphWrap,"contentBox"]}>                    
                    <div className="titleWrap">
                        <div className="title">결과별</div>
                    </div>
                    <div class={styles.graphBox}>  
                    </div>
                </div>
                <div className="h-flex flex-1">
                    <div class={[styles.graphWrap,"contentBox"]}>                    
                        <div className="titleWrap">
                            <div className="title">실행구분별</div>
                        </div>
                        <div class={styles.graphBox}>  
                        </div>
                    </div>  
                    <div class={[styles.graphWrap,"contentBox"]}>                    
                        <div className="titleWrap">
                            <div className="title">미실행</div>
                        </div>
                        <div class={styles.graphBox}>  
                        </div>
                    </div>  
                </div>
                <div class={[styles.graphWrap,"contentBox"]}>                    
                    <div className="titleWrap">
                        <div className="title">시간대별 현황</div>
                    </div>
                    <div class={styles.graphBox}>  
                    </div>
                </div>
            </div>
        )
    }
});

export default publish1