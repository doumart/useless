import type { MenuItemConstructorOptions } from "electron";
import { app, BrowserWindow, dialog, Menu } from "electron";
import { autoUpdater } from "electron-updater";
import windowStateKeeper from "electron-window-state";
import path from "path";

import { version } from "../package.json";

if (!app.isPackaged) {
  app.getVersion = () => version;
}

let checkForUpdates = (): Promise<void> => null;

if (!process.windowsStore) {
  autoUpdater.on("error", (error) => {
    dialog.showErrorBox("Error during the update", error);
  });

  autoUpdater.on("update-downloaded", () => {
    autoUpdater.quitAndInstall();
  });

  checkForUpdates = async () => {
    autoUpdater.checkForUpdatesAndNotify();
  };
}

const template: MenuItemConstructorOptions[] = [{
  label: app.getName(),
  submenu: [
    { role: "about" },
    { label: `Version ${app.getVersion()}`, enabled: false },
    ...[process.windowsStore ? { label: "Check for updates", enabled: true, click: () => checkForUpdates() } : undefined],
    { type: "separator" },
    { role: "reload" },
    ...[!app.isPackaged ? { role: "toggleDevTools" } : undefined],
    { role: "forceReload" },
    { role: "quit" },
  ].filter(Boolean) as MenuItemConstructorOptions[],
}];

const createWindow = (): void => {
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

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);

  mainWindow.loadURL(
    app.isPackaged
      ? `file://${path.resolve(__dirname, "../renderer/index.html")}`
      : "http://localhost:8080",
  );

  !app.isPackaged && mainWindow.webContents.openDevTools();

  mainWindowState.manage(mainWindow);
};

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
