// Imports

const {app, BrowserWindow, ipcMain} = require('electron');
const path = require('path');
const dataBase = require('./database/sqlite.js')

// Functions

const createWindow = () => {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        },
        nodeIntegration: false
    })
    mainWindow.loadFile(path.join(__dirname, '..', 'front-end', 'index.html'))
}

// Instance

app.on('ready', async () => {

    await createWindow()

    // Database
    ipcMain.handle('add', (event, name, data) => {return dataBase.dbAdd(name, data)})
    ipcMain.handle('delete', (event, id) => {return dataBase.dbDelete(id)})
    ipcMain.handle('display', () => {return dataBase.dbDisplay(dataBase.myDatabase)})
    //
    
})


// MacOS Compatibility.

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})