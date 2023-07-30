import styles from './DesktopShortcutsGrid.module.css'
import DesktopShortcut from './DesktopShortcut'
import blank from '../../assets/blank.svg'

class App {
  image!: string
  title!: string
  content!: JSX.Element
}
const someApp = new App()
someApp.image = blank
someApp.title = 'Shortcut to Some App'
someApp.content = <><div>Some APP</div></>

const connectApp = new App()
connectApp.image = blank
connectApp.title = 'shortcut to Connect'
connectApp.content = <><div>CONNECT APP</div></>

const socialsApp = new App()
socialsApp.image = blank
socialsApp.title = 'shortcut to Socials'
socialsApp.content = <><div>SOCIALS APP</div></>

const desktopShortcuts = [someApp, connectApp, socialsApp]

export default function DesktopShortcutsGrid (): JSX.Element {
  const grid = desktopShortcuts.map((item, index): JSX.Element => {
    return <DesktopShortcut image={item.image} title={item.title}
    key={index} id={index} content={item.content} />
  })

  return (
    <div className={styles.shortcutsGrid}>
      {grid}
    </div>
  )
}
