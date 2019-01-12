// LocalStorage plugin.
const LocalStoragePlugin = ({
  storageKey = 'paradise-soft',
  vuexModule, // [moduleName, module]
  clearActionType = 'clear'
}) => {
  if (!vuexModule) return console.error('vuexModule is required')

  // Sync with local storage.
  if (localStorage.getItem(storageKey)) {
    const syncedState = JSON.parse(localStorage.getItem(storageKey))
    vuexModule[1].state = Object.assign(vuexModule[1].state, syncedState[vuexModule[0]])
  }

  return (store) => {
    store.subscribe((mutation, state) => {
      const syncedData = {[vuexModule[0]]: state[vuexModule[0]]}
      localStorage.setItem(storageKey, JSON.stringify(syncedData))
    })

    store.subscribeAction((action, state) => {
      if (action.type === clearActionType) {
        localStorage.removeItem(storageKey)
      }
    })
  }
}

export default LocalStoragePlugin
