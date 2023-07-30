import React, { useState, useEffect } from 'react'
import styles from './Calendar.module.css'
import forwardArrow from '../../assets/ForwArrow.svg'
import previousArrow from '../../assets/PrevArrow.svg'
import editIcon from '../../assets/item_edit.svg'

const Calendar = props => {
  const [showEditWindow, setShowEditWindow] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState(null)
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth())
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())
  const [calendarData, setCalendarData] = useState({})
  const [passedDay, setPassedDay] = useState()
  const [timetableBranch, setTimetableBranch] = useState(1)
  const [branches, setBranches] = useState([1, 2])
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

  const displayEditWindow = date => {
    setPassedDay(date)
    setShowEditWindow(true)
  }

  const daysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate()
  }
  function decrementDate (date) {
    const decrementedDate = new Date(date)
    decrementedDate.setDate(decrementedDate.getDate() - 1)
    return decrementedDate
  }

  const renderCalendar = () => {
    const today = new Date()
    const currentYear = today.getFullYear()
    const currentMonth = today.getMonth()
    const currentDay = today.getDate()

    const daysCount = daysInMonth(selectedMonth, selectedYear)
    const firstDayOfMonth = new Date(selectedYear, selectedMonth, 1).getDay()

    const weekdays = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN']

    let calendar = []
    const preDays = []
    for (
      let i = 0;
      i < (firstDayOfMonth !== 0 ? firstDayOfMonth - 1 : 7 - 1);
      i++
    ) {
      const prevMonth = selectedMonth === 0 ? 11 : selectedMonth - 1
      const prevMonthDays = daysInMonth(prevMonth, selectedYear)
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
      const dayData =
        calendarData[currentDate.toISOString().split('T')[0]] || ''
      const isToday =
        selectedYear === currentYear &&
        selectedMonth === currentMonth &&
        day === currentDay

      const userData =
        dayData.length > 0
          ? dayData
            .sort((a, b) => {
              // Extract the start times from the time strings
              const startTimeA = parseInt(
                a.time.split(' - ')[0].split(':')[0],
                10
              )
              const startTimeB = parseInt(
                b.time.split(' - ')[0].split(':')[0],
                10
              )
              return startTimeA - startTimeB // Compare the start times
            })
            .map(item => (
                <div
                  className={styles.workingInfo}
                  key={`${item.user}-${item.time}`}
                >
                  <span className={styles.name}>{item.user}</span>
                  <span>{item.time}</span>
                </div>
            ))
          : null

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
          onMouseEnter={() => {
            setHoveredIndex(day)
          }}
          onMouseLeave={() => {
            setHoveredIndex(null)
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
            <span className={styles.totalHours}>
              {calculateTotalHours(dayData)}
            </span>
          </div>
          <div className={styles.dayNumber}>
            {day}
            {1 === 1 && hoveredIndex === day && (
              <div
                className={styles.editIcon}
                onClick={() => {
                  displayEditWindow(decrementDate(currentDate))
                }}
              >
                <img className={styles.editIcon} src={editIcon}></img>
              </div>
            )}
          </div>
          <div className={styles.dayData}>{userData}</div>
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
        const nextMonth = selectedMonth === 11 ? 0 : selectedMonth + 1
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

  const calculateTotalHours = dayData => {
    if (!Array.isArray(dayData)) {
      return null
    }

    let totalHours = 0
    dayData.forEach(item => {
      const startTime = item.time.split(' - ')[0]
      const endTime = item.time.split(' - ')[1]
      const startHours = parseInt(startTime.split(':')[0])
      const startMinutes = parseInt(startTime.split(':')[1])
      const endHours = parseInt(endTime.split(':')[0])
      const endMinutes = parseInt(endTime.split(':')[1])

      const diffHours = endHours - startHours
      const diffMinutes = endMinutes - startMinutes
      const hours = diffHours + diffMinutes / 60
      totalHours += hours
    })

    return totalHours.toFixed(0) + 'h'
  }

  const handlePrevMonth = () => {
    if (selectedMonth === 0) {
      setSelectedMonth(11)
      setSelectedYear(prevYear => prevYear - 1)
    } else {
      setSelectedMonth(prevMonth => prevMonth - 1)
    }
  }

  const handleNextMonth = () => {
    if (selectedMonth === 11) {
      setSelectedMonth(0)
      setSelectedYear(prevYear => prevYear + 1)
    } else {
      setSelectedMonth(prevMonth => prevMonth + 1)
    }
  }

  const handleHide = () => {
    setShowEditWindow(false)
  }
  return (
    <>
      <div className={styles.mainContainer}>
        <div className={styles.calendarContainer}>
          <div className={styles.calendarHeader}>
            <div className={styles.month}>{months[selectedMonth]}</div>
            <div className={styles.arrow} onClick={handlePrevMonth}>
              <img src={previousArrow} alt='Previous' />
            </div>
            <div className={styles.arrow} onClick={handleNextMonth}>
              <img src={forwardArrow} alt='Next' />
            </div>
            {1 === 1 && (
              <div className={styles.branchSelector}>
                {branches.map(branch => (
                  <div
                    key={branch.id}
                    className={
                      branch.id === timetableBranch ? styles.activeBranch : null
                    }
                    onClick={() => {
                      setTimetableBranch(branch.id)
                    }}
                  >
                    {branch.short_name}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className={styles.fakeBorder}>{renderCalendar()}</div>
        </div>
      </div>
      {/* {showEditWindow && (
        <WorkTimeEditWindow hide={() => { handleHide() }} passedDate={passedDay} />
      )} */}
    </>
  )
}

export default Calendar
