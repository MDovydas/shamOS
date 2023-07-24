import styles from './Taskbar.module.css'
import Clock from './Clock'

export default function Taskbar (): JSX.Element {
  return (
    <>
      <div className={styles.taskbar}>
        <div className='left'></div>
        <div className='right'>
          <Clock />
        </div>
      </div>
    </>
  )
}
