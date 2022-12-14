import Vue from "vue";
import Vuex from "vuex";
import { getFolders } from "../helpers/folders";
import { getShowFolders, setShowFolders } from "../helpers/showFolders";
import { getFolderSize, setFolderSize } from "../helpers/folderSize";
import { getFolderSort, setFolderSort } from "../helpers/folderSort";
import { getTheme, setTheme } from "../helpers/theme";
import { getLocal, setLocal } from "../helpers/local";
import Folders from "../database/folders.json";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    theme: getTheme(), //当前模式(浅色/深色)
    folders: getFolders(), //当前窗口
    folderSortType: getFolderSort(), //当前图标排序
    showDesktopIcons: getShowFolders(), //当前是否显示桌面图标
    folderSize: getFolderSize(), //当前图标大小
    apps: getLocal("apps") || Folders, //当前显示图标
    notifications: [],
    showDesktopNotifications: false,
    folderSizeList: [
      {
        name: "Large",
        shortName: "lg",
        size: "45px",
      },
      {
        name: "Medium",
        shortName: "md",
        size: "35px",
      },
      {
        name: "Small",
        shortName: "sm",
        size: "25px",
      },
    ],
  },
  mutations: {
    setFolders(state, data) {
      state.folders = data;
    },
    setFolderSortType(state, type) {
      state.folderSortType = type;
      if (type == "Name" && state.apps.length) {
        state.apps = state.apps.sort(function (a, b) {
          var nameA = a.title.toUpperCase();
          var nameB = b.title.toUpperCase();
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
          return 0;
        });
      } else {
        state.apps = state.apps.sort(function (a, b) {
          return a.id - b.id;
        });
      }
    },
  },
  actions: {
    fetchFolders(context, folders) {
      context.commit("setFolders", folders);
    },
    setFolderSort(context, type) {
      setFolderSort(type);
      context.commit("setFolderSortType", type);
      context.state.folderSortType = getFolderSort();
    },
    setShowFolders(context, value) {
      setShowFolders(value);
      context.state.showDesktopIcons = getShowFolders();
    },
    setFoldersSize(context, value) {
      setFolderSize(value);
      context.state.folderSize = getFolderSize();
    },
    setTheme(context, value) {
      setTheme(value);
      context.state.theme = getTheme();
    },
    updateApps(context, value) {
      context.state.apps = value;
    },
    setNotifications(context) {
      setTimeout(() => {
        context.state.notifications = getLocal("notifications") || [];
        context.state.showDesktopNotifications = true;
      }, 2000);
    },
    removeNotification(context, value) {
      context.state.notifications = context.state.notifications.filter(
        (notification) => notification.title !== value.title
      );
      setLocal("notifications", context.state.notifications);
    },
    hideNotifications(context) {
      context.state.notifications = context.state.notifications.map(
        (notification) => {
          if (notification.show === true) notification.show = false;
          return notification;
        }
      );
      context.state.showDesktopNotifications = false;
      setLocal("notifications", context.state.notifications);
    },
    closeShowDesktopNotifications(context) {
      context.state.showDesktopNotifications = false;
    },
  },
  getters: {
    getInstalledApps(state) {
      return state.apps.filter((app) => app.installed);
    },
  },
});
