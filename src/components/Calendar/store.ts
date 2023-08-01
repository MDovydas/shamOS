import { create } from 'zustand'

interface CalendarData {
  data: Record<string, string>
  addRecord: (date: string, record: string) => void
}

export const useCalendarData = create<CalendarData>()(set => ({
  data: {},
  addRecord: (date, record) => {
    set(state => ({
      data: {
        ...state.data, [date]: record
      }
    }))
  }
}))
