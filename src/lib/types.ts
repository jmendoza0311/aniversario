export interface User {
  id: string
  name: string
  email: string
}

export interface AppState {
  theme: 'light' | 'dark'
  currentStep: number
}