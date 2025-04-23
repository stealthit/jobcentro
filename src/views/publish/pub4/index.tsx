import { defineComponent } from 'vue'
import styles from './index.module.scss';

const publish4 = defineComponent({
    name: 'publish-pub4',
    render() {
        return (
            <div className={styles.container}>
                pub4
            </div>
        )
    }
});

export default publish4