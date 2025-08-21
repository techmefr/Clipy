chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "clipy-config",
    title: "⚙️ Configurer Clipy",
    contexts: ["page"],
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "clipy-config") {
    chrome.action.openPopup();
  }
});
