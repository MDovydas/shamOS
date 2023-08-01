import styles from './DesktopShortcutsGrid.module.css'
import DesktopShortcut from './DesktopShortcut'
import blankIcon from '../../assets/blank.svg'
import gameIcon from '../../assets/game.svg'
import calendarIcon from '../../assets/calendar.svg'
import LeDodge from '../LeDodge/LeDodge'
import Calendar from '../Calendar/Calendar'
import About from '../AboutApp/About'

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
connectApp.image = calendarIcon
connectApp.title = 'Calendar'
connectApp.content = <Calendar/>

const aboutApp = new App()
aboutApp.image = blankIcon
aboutApp.title = 'About'
aboutApp.content = <About/>

const desktopShortcuts = [game, connectApp, aboutApp]

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
