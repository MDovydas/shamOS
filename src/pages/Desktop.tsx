import styles from './Desktop.module.css'
import Taskbar from '../components/TaskbarBlock/Taskbar'
import DesktopShortcutsGrid from '../components/DesktopGrid/DesktopShortcutsGrid'
import AppWindow from '../components/AppWindow/AppWindow'

export default function Desktop (): JSX.Element {
  return (
    <>
      <div className={styles.desktop}>
          <div className={styles.workspace}>
            <DesktopShortcutsGrid />
            <AppWindow />
          </div>
          <Taskbar />
      </div>
    </>
  )
}
