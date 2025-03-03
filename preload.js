const { contextBridge, ipcRenderer } = require("electron");
contextBridge.exposeInMainWorld("electron", {
  getPages: () => ipcRenderer.invoke("get-pages"),
  addPage: () => ipcRenderer.invoke("add-page"),
  deletePage: (id) => ipcRenderer.invoke("delete-page", id),
});
