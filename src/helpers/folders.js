import { getLocal, setLocal } from "./local";

// 获取当前（本地存储）窗口
export const getFolders = () => {
  if (getLocal("windows-folders")) return getLocal("windows-folders");
  return [];
};

//新建（记录当前）窗口
export const setFolder = (title, icon, path) => {
  if (getLocal("windows-folders")) {
    const folders = getLocal("windows-folders");
    const result = folders.find((item) => item.title === title);

    if (result) {
      updateShowFolder(result.path);
      return false;
    }
    folders.push({
      title,
      icon,
      path,
      fullScreen: false,
      show: true,
    });
    setLocal("windows-folders", folders);
    return true;
  } else {
    const folders = [];
    folders.push({
      title,
      icon,
      path,
      fullScreen: false,
      show: true,
    });
    setLocal("windows-folders", folders);
    return true;
  }
};

//删除窗口
export const closeFolder = (folderName) => {
  if (getLocal("windows-folders")) {
    const folders = getLocal("windows-folders").filter(
      (folder) => folder.path !== folderName
    );
    setLocal("windows-folders", folders);
  }
};

//最小化或展示窗口
export const updateShowFolder = (folderName) => {
  if (getLocal("windows-folders")) {
    const lastFolders = getLocal("windows-folders");
    const folders = [];
    lastFolders.map((folder) => {
      if (folder.path === folderName) {
        folders.push({
          title: folder.title,
          icon: folder.icon,
          path: folder.path,
          fullScreen: folder.fullScreen,
          show: !folder.show,
        });
      } else {
        folders.push(folder);
      }
    });
    setLocal("windows-folders", folders);
  }
};

//窗口是否全屏
export const updateFullScreen = (folderName) => {
  if (getLocal("windows-folders")) {
    const lastFolders = getLocal("windows-folders");
    const folders = [];
    lastFolders.map((folder) => {
      if (folder.path === folderName) {
        folders.push({
          title: folder.title,
          icon: folder.icon,
          path: folder.path,
          show: folder.show,
          fullScreen: !folder.fullScreen,
        });
      } else {
        folders.push(folder);
      }
    });
    setLocal("windows-folders", folders);
  }
};
