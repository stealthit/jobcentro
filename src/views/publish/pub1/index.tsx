import { defineComponent } from 'vue'
import styles from './index.module.scss';

const publish1 = defineComponent({
    name: 'publish-pub1',
    render() {
        return (
            <div className={styles.container}>
                pub1
            </div>
        )
    }
});

export default publish1