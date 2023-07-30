import { Rnd } from 'react-rnd'
import styles from './AppWindow.module.css'
import minimize from '../../assets/minimize.svg'
import maximize from '../../assets/maximize.svg'
import close from '../../assets/close.svg'
import { useAppState, useZIndexState } from '../../store'
import { useState } from 'react'

interface AppWindowProps {
  id: number
  title: string
  content: JSX.Element
  minimized: boolean
}

export default function AppWindow ({
  id,
  title,
  content,
  minimized
}: AppWindowProps): JSX.Element {
  const zIndex = useZIndexState(state => state.zIndex)
  const increaseZIndex = useZIndexState(state => state.increaseZIndex)
  const minimizeApp = useAppState(state => state.minimizeApp)
  const closeApp = useAppState(state => state.closeApp)
  const [topIndex, setTopIndex] = useState(zIndex - 1)
  const moveToTop = (): void => {
    setTopIndex(zIndex)
    increaseZIndex()
  }
  const [oldStyles, setOldStyles] = useState<{
    height: string
    width: string
    transform: string
  }>({
    height: '',
    width: '',
    transform: ''
  })
  const [isMaximized, setIsMaximized] = useState(false)

  const maximizeWindow = (id: number): void => {
    const windowElement = document.getElementById(String(id))

    if (windowElement != null && !isMaximized) {
      setOldStyles({
        height: windowElement.style.height,
        width: windowElement.style.width,
        transform: windowElement.style.transform
      })
      windowElement.style.height = '100%'
      windowElement.style.width = '100%'
      windowElement.style.transform = 'none'
      setIsMaximized(true)
    }

    if (windowElement != null && isMaximized) {
      windowElement.style.height = oldStyles.height
      windowElement.style.width = oldStyles.width
      windowElement.style.transform = oldStyles.transform
      setIsMaximized(false)
    }
  }
  return (
    <Rnd
      default={{
        x: 200 + id * 25,
        y: 200 + id * 25,
        width: 1000,
        height: 500
      }}
      dragHandleClassName='title'
      id={id}
      onClick={() => {
        moveToTop()
      }}
      style={{
        zIndex: topIndex,
        display: minimized ? 'none' : 'inline-block'
      }}
    >
      <div className={styles.window}>
        <div className={styles.titleBar}>
          <span className='title'>{title}</span>
          <div className={styles.controls}>
            <img
              className='window-control'
              src={minimize}
              alt='Minimize'
              onClick={() => {
                minimizeApp(id)
              }}
            ></img>
            <img
              className='window-control'
              src={maximize}
              alt='Maximize'
              onClick={() => {
                maximizeWindow(id)
              }}
            ></img>
            <img
              className='window-control'
              src={close}
              alt='Close'
              onClick={() => {
                closeApp(id)
              }}
            ></img>
          </div>
        </div>
        {content}
      </div>
    </Rnd>
  )
}
