import styles from './Taskbar.module.css'
import Clock from './Clock'
import { useAppState } from '../../store'
import App from './App'

export default function Taskbar (): JSX.Element {
  const activeApps = useAppState(state => state.activeApps)
  return (
    <>
      <div className={styles.taskbar}>
        <div className={styles.left}>
        {activeApps.map(app => (
            <App
              key={app.id}
              id={app.id}
              title={app.title}
              minimized={app.minimized}
              icon={app.icon}
            />
        ))}
        </div>
        <div className='right'>
          <Clock />
        </div>
      </div>
    </>
  )
}
