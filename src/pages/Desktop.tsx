import styles from './Desktop.module.css'
import Taskbar from '../components/TaskbarBlock/Taskbar'
import DesktopShortcutsGrid from '../components/DesktopGrid/DesktopShortcutsGrid'

export default function Desktop (): JSX.Element {
  return (
    <>
      <div className={styles.desktop}>
          <div className={styles.workspace}>
            <DesktopShortcutsGrid />
          </div>
          <Taskbar />
      </div>
    </>
  )
}
