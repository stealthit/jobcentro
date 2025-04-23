import { defineComponent } from 'vue'
import styles from './index.module.scss';

const detailHistory = defineComponent({
    name: 'detail-history',
    render() {
        return (
            <div className={styles.container}>
                상세 이력
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

export default detailHistory