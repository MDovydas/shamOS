import React, { useState, useEffect } from 'react'
import styles from './Clock.module.css'

export default function Clock (): JSX.Element {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const refresher = setInterval(() => {
      setTime(new Date())
    }, 1000)
    return () => {
      clearInterval(refresher)
    }
  }, [])

  return <div className={styles.clock}>
    {time.toLocaleTimeString('lt-LT')}
  </div>
}
