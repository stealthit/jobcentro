import { defineComponent } from 'vue'
import styles from './index.module.scss';

const monthSchedule = defineComponent({
    name: 'month-schedule',
    render() {
        return (
            <div className={styles.container}>
                <div className={styles.calendar}>
                    {/* 일간 달력 컴포넌트 */}
                    <h2>월간 달력</h2>
                </div>
            </div>
        )
    }
});

export default monthSchedule