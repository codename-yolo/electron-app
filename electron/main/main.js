"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const path = require("path");
require('electron-reload')(path.join(__dirname, '../..', 'src', 'main'), {
    electron: path.resolve(__dirname, '../..', 'node_modules', '.bin', 'electron'),
});
let mainWindow = null;
function createWindow() {
    mainWindow = new electron_1.BrowserWindow({
        autoHideMenuBar: true,
        webPreferences: {
            preload: path.join(__dirname, "../preload/preload.js"),
        },
    });
    mainWindow.webContents.openDevTools();
    // Vite dev server URL
    mainWindow.loadURL("http://localhost:5173");
    mainWindow.on("closed", () => (mainWindow = null));
}
electron_1.app.whenReady().then(() => {
    createWindow();
    electron_1.ipcMain.on("message", (_, message) => {
        console.log(message);
    });
    electron_1.ipcMain.on("show-notification", (_, message) => {
        new electron_1.Notification({ title: "Notification", body: message }).show();
    });
    electron_1.app.on('activate', function () {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (electron_1.BrowserWindow.getAllWindows().length === 0)
            createWindow();
    });
});
electron_1.app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        electron_1.app.quit();
    }
});
