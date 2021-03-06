var path = require('path'),
    shortcut = require('electron-localshortcut'),
    {app, BrowserWindow, dialog} = require('electron'),
    settings = require('./settings'),
    address = typeof settings.read('guiOnly')=='string'? 'http://' + settings.read('guiOnly') : settings.read('appAddresses')[0]

dialog.showErrorBox = function(title,err) {
    console.log(title + ': ' + err)
}

app.commandLine.appendSwitch('--enable-touch-events')

app.on('window-all-closed', function() {
    if (process.platform != 'darwin') {
        app.quit()
    }
})

app.on('ready',function(){
    window = new BrowserWindow({
        width: 800,
        height: 600,
        title:settings.read('appName'),
        backgroundColor:'#1a1d22'
    })

    window.loadURL(address)

    window.on('closed', function() {
        window = null
    })

    window.setMenuBarVisibility(false)

    shortcut.register(window,'CmdOrCtrl+R',function(){
        window.reload()
    })

    shortcut.register(window,'F11',function(){
        window.setFullScreen(!window.isFullScreen())
    })

    shortcut.register(window,'F12',function(){
        window.toggleDevTools();
    })

})
