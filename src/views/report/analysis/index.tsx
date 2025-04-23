import { defineComponent } from 'vue'
import styles from './index.module.scss';

const topNAnalysis = defineComponent({
    name: 'top-n-analysis',
    render() {
        return (
            <div className={styles.container}>
                Top N 분석
                <div className={styles.graph}>
                    {/* 그래프 컴포넌트 */}
                    <h2>그래프1</h2>
                </div>
                <div className={styles.graph}>
                    {/* 그래프 컴포넌트 */}
                    <h2>그래프2</h2>
                </div>
                <div className={styles.graph}>
                    {/* 그래프 컴포넌트 */}
                    <h2>그래프3</h2>
                </div>
            </div>
        )
    }
});

export default topNAnalysis