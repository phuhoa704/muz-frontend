const prefix = 'muz_'

export const session = {
  get: (key: string) => {
    const value = sessionStorage.getItem(prefix + key)
    if (value) {
      return JSON.parse(value)
    }
  },

  set: (key: string, value: any) => {
    sessionStorage.setItem(prefix + key, JSON.stringify(value))
  },

  remove: (key: string) => {
    sessionStorage.removeItem(prefix + key)
  },
}
