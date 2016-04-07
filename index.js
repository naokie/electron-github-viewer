'use strict';

const fs = require('fs');
const hoxy = require('hoxy');
const proxy = hoxy.createServer({
  certAuthority: {
    key: fs.readFileSync(`${__dirname}/.ssh/localhost-ca.key.pem`),
    cert: fs.readFileSync(`${__dirname}/.ssh/localhost-ca.cert.pem`),
  },
}).listen(8080);

proxy.intercept({
  phase: 'response',
  mimeType: 'text/css',
}, function (req, res) {
  console.log(res);
});

const electron = require('electron');
const app = electron.app;
app.commandLine.appendSwitch('proxy-server', 'localhost:8080');
app.commandLine.appendSwitch('proxy-bypass-list', ['<local>', '*.github.com'].join(';'));
const BrowserWindow = electron.BrowserWindow;

electron.crashReporter.start();

var mainWindow = null;

app.on('window-all-closed', () => {
  app.quit();
});

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
  });

  mainWindow.loadURL(`file://${__dirname}/index.html`);

  // mainWindow.webContents.openDevTools();

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
});
