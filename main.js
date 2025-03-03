import { app, BrowserWindow } from "electron";
import sqlite3 from "sqlite3";
import { ipcMain } from "electron";
import { fileURLToPath } from "url";
import path from "path";

// Get the current file path from import.meta.url
const __filename = fileURLToPath(import.meta.url);

// Get the directory name
const __dirname = path.dirname(__filename);

// Example of handling IPC call
let mainWindow;

app.whenReady().then(() => {
  const db = new sqlite3.Database("db.sqlite", (err) => {
    if (err) {
      console.error("Error opening database:", err.message);
    } else {
      console.log("Connected to the SQLite database.");
    }
  });
  // Create the 'pages' table if it doesn't already exist
  const createTableSQL = `
  CREATE TABLE IF NOT EXISTS pages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    text TEXT NOT NULL
    );
    `;

  db.run(createTableSQL, function (err) {
    if (err) {
      console.error("Error creating table:", err.message);
    } else {
      console.log("Pages table is ready (or already exists).");
    }
  });

  ipcMain.handle("get-pages", async () => {
    return new Promise((resolve, reject) => {
      db.all("SELECT * FROM pages", (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  });

  ipcMain.handle("add-page", async () => {
    return new Promise((resolve, reject) => {
      db.run(
        "INSERT INTO pages (title, text) VALUES (?, ?)",
        "New Page",
        "This is a new page"
      );
      resolve();
    });
  });
  ipcMain.handle("delete-page", async (_, id) => {
    console.log(_, id);
    return new Promise((resolve, reject) => {
      db.run("DELETE FROM pages WHERE id = ?", id);
      resolve();
    });
  });
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    backgroundColor: "#000000",
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });
  mainWindow.webContents.openDevTools();

  if (process.env.NODE_ENV === "development") {
    mainWindow.loadURL("http://localhost:5173");
  } else {
    mainWindow.loadFile("./dist/index.html");
  }
});
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
