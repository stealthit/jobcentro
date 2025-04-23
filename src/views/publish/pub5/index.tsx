import { defineComponent } from 'vue'
import styles from './index.module.scss';

const publish5 = defineComponent({
    name: 'publish-pub5',
    render() {
        return (
            <div className={styles.container}>
                pub5
            </div>
        )
    }
});

export default publish5