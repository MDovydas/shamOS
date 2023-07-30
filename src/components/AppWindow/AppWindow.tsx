import { Rnd } from 'react-rnd'
import styles from './AppWindow.module.css'
import minimize from '../../assets/minimize.svg'
import maximize from '../../assets/maximize.svg'
import close from '../../assets/close.svg'
import LeDodge from '../LeDodge/LeDodge'
export default function AppWindow (): JSX.Element {
  return (
    <Rnd
      default={{
        x: 200,
        y: 200,
        width: 1000,
        height: 500
      }}
      dragHandleClassName='title'
    >
      <div className={styles.window}>
        <div className={styles.titleBar}>
            <span className='title'>Title</span>
            <div className={styles.controls}>
                <img className='window-control' src={minimize}></img>
                <img className='window-control' src={maximize}></img>
                <img className='window-control' src={close}></img>
            </div>
        </div>
        <LeDodge />
      </div>
    </Rnd>
  )
}
