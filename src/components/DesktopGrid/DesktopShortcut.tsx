import { useState } from 'react'
import styles from './DesktopShortcut.module.css'

interface DesktopShortcutProps {
  image: string
  shortcutText: string
  id: number
}

export default function DesktopShortcut ({
  image,
  shortcutText,
  id
}: DesktopShortcutProps): JSX.Element {
  const [clickCount, setClickCount] = useState(0)

  const handleClick = (): void => {
    if (clickCount === 0) {
      setClickCount(1)
    } else {
      setClickCount(0)
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
        <span className={styles.shortcutLabel}>{shortcutText}</span>
      </div>
    </>
  )
}
