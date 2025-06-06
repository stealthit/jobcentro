import { defineComponent } from 'vue'
import styles from './index.module.scss';

const timeStatus = defineComponent({
    name: 'time-status',
    render() {
        return (
            <div className={styles.container}>
                <div className={styles.calendar}>
                    {/* 일간 달력 컴포넌트 */}
                    <h2>일간 달력</h2>
                </div>
                <div className={styles.comboGroup}>
                    {/* 콤보 그룹 컴포넌트 */}
                    <h2>콤보 그룹</h2>
                </div>
                <div className={styles.graph}>
                    {/* 그래프 컴포넌트 */}
                    <h2>그래프</h2>
                </div>
            </div>
        )
    }
});

export default timeStatus