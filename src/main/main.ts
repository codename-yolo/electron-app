import { app, BrowserWindow, ipcMain, Notification } from "electron";
import * as path from "path";

require('electron-reload')(path.join(__dirname, '../..', 'src', 'main'), {
  electron: path.resolve(__dirname,'../..', 'node_modules', '.bin','electron'),
});


let mainWindow: BrowserWindow | null = null;

function createWindow() {
  mainWindow = new BrowserWindow({
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

app.whenReady().then(() => {
  createWindow();

  ipcMain.on("message", (_, message) => {
    console.log(message);
  });

  ipcMain.on("show-notification", (_, message) => {
    new Notification({ title: "Notification", body: message }).show();
  });

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

