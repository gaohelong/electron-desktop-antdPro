### electron desktop

```javascript
中文资料站 -> https://electronjs.org/

下例子资料站 -> https://medium.com/@kitze/%EF%B8%8F-from-react-to-an-electron-app-ready-for-production-a0468ecb1da3

/* install */
yarn add electron electron-builder wait-on concurrently --dev
yarn add electron-is-dev

/* create public/electron.js */
const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const path = require('path');
const url = require('url');
const isDev = require('electron-is-dev');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({width: 900, height: 680});
  mainWindow.openDevTools();
  mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../eleBuild/index.html')}`);
  mainWindow.on('closed', () => mainWindow = null);
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

/* package.json */
"main": "public/electron.js",
"homepage": "./",
"author": "electron",
"script": {
	"electron-dev": "concurrently \"BROWSER=none yarn start\" \"wait-on http://localhost:3000 && electron .\"",
	"electron-pack": "build --em.main=eleBuild/electron.js",
	"preelectron-pack": "yarn build"
},
"build": {
  "appId": "com.example.electron-cra",
  "files": [
    "eleBuild/**/*",
    "node_modules/**/*"
  ],
  "directories":{
    "buildResources": "assets"
  }
}
```
