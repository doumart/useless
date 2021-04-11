import type { MenuItemConstructorOptions } from "electron";
import { app, BrowserWindow, dialog, Menu } from "electron";
import windowStateKeeper from "electron-window-state";
import path from "path";

import { version } from "../package.json";

app.getVersion = () => version;
import { autoUpdater } from "electron-updater";

const template: MenuItemConstructorOptions[] = [{
  label: app.getName(),
  submenu: [
    { role: "about" },
    { label: `Version ${app.getVersion()}`, enabled: false },
    ...[!process.windowsStore && { label: "Check for updates", enabled: true, click: () => checkForUpdates() }],
    { type: "separator" },
    { role: "reload" },
    { role: "toggleDevTools" },
    { role: "forceReload" },
    { role: "quit" },
  ],
}];

autoUpdater.on("update-downloaded", () => {
  autoUpdater.quitAndInstall();
});

const checkForUpdates = async () => {
  autoUpdater.checkForUpdatesAndNotify();
};

const createWindow = (): void => {
  // Create the browser window.
  const mainWindowState = windowStateKeeper({
    defaultWidth: 1000,
    defaultHeight: 800,
  });

  const mainWindow = new BrowserWindow({
    backgroundColor: "#FFF",
    width: mainWindowState.width,
    height: mainWindowState.height,
    minWidth: 650,
    minHeight: 560,
    x: mainWindowState.x,
    y: mainWindowState.y,
  });

  autoUpdater.on("error", (error) => {
    dialog.showErrorBox("Error during the update", error);
  });

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);

  // and load the index.html of the app.
  mainWindow.loadURL(
    app.isPackaged
      ? `file://${path.resolve(__dirname, "../renderer/index.html")}`
      : "http://localhost:8080",
  );

  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  mainWindowState.manage(mainWindow);
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.

app.on("ready", createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
