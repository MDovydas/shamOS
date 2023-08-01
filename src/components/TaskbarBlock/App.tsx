import styles from './App.module.css'
import { useAppState, useZIndexState } from '../../store'

const App = ({
  icon,
  title,
  id,
  minimized
}: {
  icon: string
  title: string
  id: number
  minimized: boolean
}): JSX.Element => {
  const zIndex = useZIndexState(state => state.zIndex)
  const toggleMinimize = useAppState(state => state.toggleMinimize)
  const toggle = (): void => {
    if (minimized) {
      const window = document.getElementById(String(id))
      if (window != null) {
        window.style.zIndex = String(zIndex)
        toggleMinimize(id)
      }
    } else {
      toggleMinimize(id)
    }
  }

  return (
    <>
      <div className={styles.app} onClick={() => { toggle() }}>
        <img src={icon} className='taskbar-icon' />
        <span>{title}</span>
      </div>
    </>
  )
}

export default App
