import styles from './Desktop.module.css'
import Taskbar from '../components/TaskbarBlock/Taskbar'

export default function Desktop (): JSX.Element {
  return (
    <>
      <div className={styles.desktop}>
          <div className={styles.workspace}>
          </div>
          <Taskbar />
      </div>
    </>
  )
}
