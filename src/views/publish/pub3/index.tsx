import { defineComponent } from 'vue'
import styles from './index.module.scss';

const publish3 = defineComponent({
    name: 'publish-pub3',
    render() {
        return (
            <div className={styles.container}>
                pub3
            </div>
        )
    }
});

export default publish3