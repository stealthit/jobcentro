import { defineComponent } from 'vue'
import styles from './index.module.scss';

const publish2 = defineComponent({
    name: 'publish-pub2',
    render() {
        return (
            <div className={styles.container}>
                pub2
            </div>
        )
    }
});

export default publish2