import { defineComponent } from 'vue'
import styles from './index.module.scss';
import Pagination from '../components/pagination'

const publish1 = defineComponent({
    name: 'publish-pub1',
    render() {
        return (
            <div class={styles.container}>
                <div class={[styles.searchBox,"contentBox"]}>
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
                        <button class="btn-ic-search"></button>
                    </div>
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
                            <div className="title">평균실행시간(상위10)</div>
                        </div>
                        <div class={styles.graphBox}>  
                        </div>
                    </div>  
                    <div class={[styles.graphWrap,"contentBox"]}>                    
                        <div className="titleWrap">
                            <div className="title">최대실행시간(상위10)</div>
                        </div>
                        <div class={styles.graphBox}>  
                        </div>
                    </div>  
                </div>

            </div>
        )
    }
});

export default publish1