import styles from './DesktopShortcutsGrid.module.css'
import DesktopShortcut from './DesktopShortcut'
import blankIcon from '../../assets/blank.svg'
import gameIcon from '../../assets/game.svg'
import LeDodge from '../LeDodge/LeDodge'
import Calendar from '../Calendar/Calendar'

class App {
  image!: string
  title!: string
  content!: JSX.Element
}
const game = new App()
game.image = gameIcon
game.title = 'Le Dodge'
game.content = <LeDodge />

const connectApp = new App()
connectApp.image = blankIcon
connectApp.title = 'Calendar'
connectApp.content = <Calendar />

const socialsApp = new App()
socialsApp.image = blankIcon
socialsApp.title = 'shortcut to Socials'
socialsApp.content = <><div>SOCIALS APP</div></>

const desktopShortcuts = [game, connectApp, socialsApp]

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
