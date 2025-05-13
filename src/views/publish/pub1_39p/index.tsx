import { defineComponent } from 'vue'
import styles from './index.module.scss';
import Pagination from '../components/pagination'

const publish1 = defineComponent({
    name: 'publish-pub1',
    render() {
        return (
            <div class={styles.container}>
                <div class={[styles.calendarBox,"contentBox"]}>
                    캘린더 영역
                </div>
                <div class={[styles.chartWrap,"contentBox"]}>
                    <div class="titleWrap jistify-end"> 
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
                            <select class="selectBox" required>
                                <option value="" selected disabled hidden>실행결과 선택</option>
                                <option value="">val1</option>
                                <option value="">val2</option>
                                <option value="">val3</option>
                                <option value="">val4</option>
                            </select>
                            <div className="mul-calendar-group">
                                <div className="data-box">
                                    <input type="datetime-local" name="" id="" value="2025-03-24 00:00:00" />
                                    <span>~</span>
                                    <input type="datetime-local" name="" id="" value="2025-03-24 00:00:00"/>
                                </div>
                            </div>
                            <button class="btn-ic-search"></button>
                        </div>
                    </div>
                    <div class={styles.chartBox}>
                        그래프영역
                    </div>
                </div>
            </div>
        )
    }
});

export default publish1