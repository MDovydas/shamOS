import React, { useState } from 'react'
import styles from './Calendar.module.css'
import forwardArrow from '../../assets/ForwArrow.svg'
import previousArrow from '../../assets/PrevArrow.svg'
import { type JSX } from 'react/jsx-runtime'
import { useCalendarData } from './store'

const Calendar: React.FC = () => {
  const [showEditWindow, setShowEditWindow] = useState(false)
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth())
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())
  const [passedDay, setPassedDay] = useState<Date | undefined>()
  const [inputValue, setInputValue] = useState('')
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ]
  const calendarData = useCalendarData(state => state.data)
  const addRecord = useCalendarData(state => state.addRecord)

  const displayEditWindow = (
    date: React.SetStateAction<Date | undefined>
  ): void => {
    setPassedDay(date)
    setShowEditWindow(true)
  }

  const daysInMonth = (month: number, year: number): number => {
    return new Date(year, month + 1, 0).getDate()
  }

  const renderCalendar = (): JSX.Element => {
    const today = new Date()
    const currentYear = today.getFullYear()
    const currentMonth = today.getMonth()
    const currentDay = today.getDate()

    const daysCount = daysInMonth(selectedMonth, selectedYear)
    const firstDayOfMonth = new Date(selectedYear, selectedMonth, 1).getDay()

    const weekdays = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN']

    let calendar: JSX.Element[] = []
    const preDays = []
    for (
      let i = 0;
      i < (firstDayOfMonth !== 0 ? firstDayOfMonth - 1 : 7 - 1);
      i++
    ) {
      const weekdayIndex =
        firstDayOfMonth !== 0 ? firstDayOfMonth - i - 2 : 7 - i - 2
      const weekday = weekdays[weekdayIndex]
      preDays[i] = (
        <div
          className={`${styles.emptyDay} ${styles.previousDay}`}
          key={`empty-day-${i + 1}`}
        >
          <div className={styles.weekday}>{weekday}</div>
        </div>
      )
      calendar = preDays
        .slice(0)
        .reverse()
        .map(element => {
          return element
        })
    }

    for (let day = 1; day <= daysCount; day++) {
      const currentDate = new Date(selectedYear, selectedMonth, day + 1)
      const dayData = calendarData[currentDate.toISOString().split('T')[0]]
      const isToday =
        selectedYear === currentYear &&
        selectedMonth === currentMonth &&
        day === currentDay

      const isPreviousDay =
        (selectedMonth === currentMonth &&
          selectedYear === currentYear &&
          day < currentDay) ||
        selectedMonth < currentMonth ||
        selectedYear < currentYear

      calendar.push(
        <div
          className={`${styles.calendarDay} ${isToday ? styles.today : ''} ${
            isPreviousDay ? styles.previousDay : ''
          }`}
          key={`calendar-day-${day}`}
          onClick={() => {
            displayEditWindow(currentDate)
            setInputValue('')
          }}
        >
          <div className={styles.weekday}>
            {
              weekdays[
                (firstDayOfMonth + day - 2) % 7 !== -1
                  ? (firstDayOfMonth + day - 2) % 7
                  : (7 + day - 2) % 7
              ]
            }
            {isToday && <div className={styles.today}>TODAY</div>}
            <span className={styles.totalHours}></span>
          </div>
          <div className={styles.dayNumber}>{day}</div>
          <div className={styles.dayData}>{dayData}</div>
        </div>
      )
    }

    const lastDayOfMonth = new Date(
      selectedYear,
      selectedMonth,
      daysCount
    ).getDay()
    if (lastDayOfMonth !== 0) {
      for (let i = 1; i <= 6 - lastDayOfMonth + 1; i++) {
        const weekday = weekdays[(lastDayOfMonth + i - 1) % 7]

        calendar.push(
          <div
            className={`${styles.emptyDay} ${styles.previousDay}`}
            key={`empty-day-after-${i}`}
          >
            <div className={styles.weekday}>{weekday}</div>
          </div>
        )
      }
    }

    return <div className={styles.calendarGrid}>{calendar}</div>
  }

  const handlePrevMonth = (): void => {
    if (selectedMonth === 0) {
      setSelectedYear(prevYear => prevYear - 1)
      setSelectedMonth(11)
    } else {
      setSelectedMonth(prevMonth => prevMonth - 1)
    }
  }

  const handleNextMonth = (): void => {
    if (selectedMonth === 11) {
      setSelectedMonth(0)
      setSelectedYear(prevYear => prevYear + 1)
    } else {
      setSelectedMonth(prevMonth => prevMonth + 1)
    }
  }
  return (
    <>
      <div className={styles.mainContainer}>
        <div className={styles.calendarContainer}>
          <div className={styles.calendarHeader}>
            <div className={styles.arrow} onClick={handlePrevMonth}>
              <img
                className='calendarArrow'
                src={previousArrow}
                alt='Previous'
              />
            </div>
            <div className={styles.month}>{months[selectedMonth]}</div>
            <div className={styles.arrow} onClick={handleNextMonth}>
              <img className='calendarArrow' src={forwardArrow} alt='Next' />
            </div>
          </div>
          <div className={styles.fakeBorder}>{renderCalendar()}</div>
        </div>
        {showEditWindow && (
          <div className={styles.inputRow}>
            <label>Record for {passedDay?.toISOString().split('T')[0]}</label>
            <input
              value={inputValue}
              onChange={event => {
                setInputValue(event.target.value)
              }}
            ></input>
            <button
              onClick={() => {
                addRecord(
                  String(passedDay?.toISOString().split('T')[0]),
                  inputValue
                )
                setShowEditWindow(false)
                setInputValue('')
              }}
            >
              Confirm
            </button>
          </div>
        )}
      </div>
    </>
  )
}

export default Calendar
