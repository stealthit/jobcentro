import { defineComponent } from 'vue'
import styles from './index.module.scss'
import VersionModal from './components/version-modal'
import BasicInfoModal from './components/basicInfo-modal'

const publish3 = defineComponent({
    name: 'publish-pub3',
    render() {
        const modal1 = false
        const modal2 = true
        return (
            <div class={styles.container}>
                <div class={[styles.nodeBox,"contentBox"]}>
                </div>

                {/* Version info */}
                <div className="modalBg">
                    {modal1 && 
                        <VersionModal></VersionModal>
                    }
                    {modal2 && 
                        <BasicInfoModal></BasicInfoModal>
                    }
                </div>
            </div>
        )
    }
});

export default publish3