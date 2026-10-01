const {contextBridge, ipcRenderer} = require('electron');

contextBridge.exposeInMainWorld('system', {
    node: () => process.versions.node,
    electron: () => process.versions.electron,
    chrome: () => process.versions.chrome,
})

contextBridge.exposeInMainWorld('list_database', {
    add: (name, data) => ipcRenderer.invoke('add', name, data),
    delete: (id) => ipcRenderer.invoke('delete', id),
    display: () => ipcRenderer.invoke('display')
})