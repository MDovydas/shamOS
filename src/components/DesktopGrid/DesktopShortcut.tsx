import { useState } from 'react'
import styles from './DesktopShortcut.module.css'
import { useAppState } from '../../store'

interface DesktopShortcutProps {
  image: string
  title: string
  id: number
  content: JSX.Element
}
class App {
  id!: number
  title!: string
  content!: JSX.Element
  minimized!: boolean
  icon!: string
}

export default function DesktopShortcut ({
  image,
  title,
  content
}: DesktopShortcutProps): JSX.Element {
  const app = new App()
  app.title = title
  app.content = content
  app.minimized = false
  app.icon = image
  const [clickCount, setClickCount] = useState(0)
  const addActiveApp = useAppState(state => state.addActiveApp)
  const handleClick = (): void => {
    if (clickCount === 0) {
      setClickCount(1)
    } else {
      setClickCount(0)
      addActiveApp(app)
    }
  }

  return (
    <>
      <div
        className={`${styles.desktopShortcut} ${
          clickCount === 1 ? styles.clickedOnce : ''
        }`}
        onClick={handleClick}
      >
        <img
          className={`${styles.shortcutIcon} desktop-shortcut`}
          src={image}
          alt='shortcut'
          draggable='false'
        ></img>
        <span className={styles.shortcutLabel}>{title}</span>
      </div>
    </>
  )
}
