import styles from './DesktopShortcutsGrid.module.css'
import DesktopShortcut from './DesktopShortcut'
import blank from '../../assets/blank.svg'

class App {
  image!: string
  shortcutText!: string
}
const someApp = new App()
someApp.image = blank
someApp.shortcutText = 'Shortcut to Some App'

const connectApp = new App()
connectApp.image = blank
connectApp.shortcutText = 'shortcut to Connect'

const socialsApp = new App()
socialsApp.image = blank
socialsApp.shortcutText = 'shortcut to Socials'

const desktopShortcuts = [someApp, connectApp, socialsApp]

export default function DesktopShortcutsGrid (): JSX.Element {
  const grid = desktopShortcuts.map((item, index): JSX.Element => {
    return <DesktopShortcut image={item.image} shortcutText={item.shortcutText}
    key={index} id={index} />
  })

  return (
    <div className={styles.shortcutsGrid}>
      {grid}
    </div>
  )
}
