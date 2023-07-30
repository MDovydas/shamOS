import styles from './Desktop.module.css'
import Taskbar from '../components/TaskbarBlock/Taskbar'
import DesktopShortcutsGrid from '../components/DesktopGrid/DesktopShortcutsGrid'
import AppWindow from '../components/AppWindow/AppWindow'
import { useAppState } from '../store'

export default function Desktop (): JSX.Element {
  const activeApps = useAppState(state => state.activeApps)
  return (
    <>
      <div className={styles.desktop}>
        <div className={styles.workspace}>
          <DesktopShortcutsGrid />
          {activeApps.map(app => (
            <AppWindow
              key={app.id}
              id={app.id}
              title={app.title}
              content={app.content}
              minimized={app.minimized}
            />
          ))}
        </div>
        <Taskbar />
      </div>
    </>
  )
}
