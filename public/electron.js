const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const path = require('path');
const url = require('url');
const isDev = require('electron-is-dev');

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1280,
        height: 760,
        // fullscreen: true, // 窗口是否可以全屏.
        // skipTaskbar: true, // 是否在任务栏中显示窗口.
        show: false, // 窗口创建的时候是否显示.
        backgroundColor: '#2e2c29'
    });
    // mainWindow.openDevTools(); // 打开开发者模式(调试).
    mainWindow.loadURL(isDev ? 'http://localhost:8000' : `file://${path.join(__dirname, '../dist/index.html')}`);
    mainWindow.on('closed', () => mainWindow = null);

    // mainWindow.setFullScreen(true); // 设置窗口是否应处于全屏模式.
    mainWindow.maximize(); // 最大化窗口。如果窗口尚未显示, 这也将会显示 (但不会聚焦).

    /*
     * 使用ready-to-show事件.
     * 在加载页面时，渲染进程第一次完成绘制时，会发出 ready-to-show 事件。 在此事件后显示窗口将没有视觉闪烁:
     * new BrowserWindow({show: false})
     */
    mainWindow.once('ready-to-show', () => {
        mainWindow.show();
    });

    /*
     * 设置 backgroundColor.
     * 对于一个复杂的应用，ready-to-show 可能发出的太晚，会让应用感觉缓慢。 在这种情况下，建议立刻显示窗口，并使用接近应用程序背景的 backgroundColor
     * new BrowserWindow({backgroundColor: '#2e2c29'})
     * 请注意，即使是使用 ready-to-show 事件的应用程序，仍建议使用设置 backgroundColor 使应用程序感觉更原生。
     */
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
