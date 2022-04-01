import { app, BrowserWindow,ipcMain } from 'electron'
import '../renderer/store'

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 800,
    useContentSize: true,
    width: 1500,

    resizable: false,
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      webSecurity: true // 允许跨域
    }
  })

  mainWindow.loadURL(winURL)

  mainWindow.on('close', () => {
    mainWindow = null
  })
  mainWindow.on("close", () => {
    mainWindow = null;
    app.quit();
  });

  ipcMain.on('min',function(){ // 收到渲染进程的窗口最小化操作的通知，并调用窗口最小化函数，执行该操作
    mainWindow.minimize();
  })

  ipcMain.on('max',function () {
    if(mainWindow.isMaximized()){
      mainWindow.minimize();
    }else{
      mainWindow.maximize();
    }
  })

  ipcMain.on("close", function(_event) {
    // ToDo 关闭前差一个弹窗，询问是否退出程序 *************；
    mainWindow.close();// 停止后台服务
  });
  if (process.env.NODE_ENV === 'development') {
           BrowserWindow.addDevToolsExtension("/Users/zhang/Library/Application Support/Google/Chrome/Default/Extensions/nhdogjmejiglipccpnnnanhbledajbpd/3.1.2_0");
        }

}




app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})


app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
