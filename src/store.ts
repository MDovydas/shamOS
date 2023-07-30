import { create } from 'zustand'

interface App {
  id: number
  title: string
  content: JSX.Element
  minimized: boolean
}

interface AppState {
  activeApps: App[]
  addActiveApp: (app: App) => void
  closeApp: (id: number) => void
  minimizeApp: (id: number) => void
}

interface ZIndexState {
  zIndex: number
  increaseZIndex: () => void
}

export const useAppState = create<AppState>()(set => ({
  activeApps: [],
  addActiveApp: app => {
    set(state => ({
      activeApps: [
        ...state.activeApps,
        { ...app, id: state.activeApps.length, minimized: false }
      ]
    }))
  },
  closeApp: id => {
    set(state => ({
      activeApps: state.activeApps.filter(app => app.id !== id)
    }))
  },
  minimizeApp: (id) => {
    set((state) => ({
      activeApps: state.activeApps.map((app) =>
        app.id === id ? { ...app, minimized: true } : app
      )
    }))
  }
}))

export const useZIndexState = create<ZIndexState>()(set => ({
  zIndex: 5,
  increaseZIndex: () => { set(state => ({ zIndex: state.zIndex + 1 })) }
}))
