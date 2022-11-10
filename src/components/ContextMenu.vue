<template>
  <ul id="rmenu" class="context-menu" ref="ContextMenu" v-click-outside="hide">
    <li>
      <button>
        查看(V)
        <img class="showOtherBrother" src="../assets/file-icons/menu-arr.png" />
      </button>
      <ul class="sub">
        <li
          v-for="item in $store.state.folderSizeList"
          :class="item.size === $store.state.folderSize.size && 'selected'"
          :key="item.shortName"
          @click="setFolderSize(item)"
        >
          <button @click="folderSize = item.shortName">
            {{
              item.name === "Large"
                ? "大"
                : item.name === "Medium"
                ? "中等"
                : "小"
            }}图标{{
              item.name === "Large"
                ? "(R)"
                : item.name === "Medium"
                ? "(M)"
                : "(N)"
            }}
          </button>
        </li>
        <li
          class="border-top"
          :class="$store.state.showDesktopIcons && 'selected'"
        >
          <button @click="showDesktopIcons">显示桌面图标(D)</button>
        </li>
      </ul>
    </li>
    <li>
      <button>
        排序方式(O)
        <img class="showOtherBrother" src="../assets/file-icons/menu-arr.png" />
      </button>
      <ul class="sub">
        <li
          v-for="item in sortTypes"
          :class="item === $store.state.folderSortType && 'selected'"
          :key="item"
        >
          <button @click="folderSort(item)">
            {{ item === "Name" ? "名称" : "大小" }}
          </button>
        </li>
      </ul>
    </li>
    <li>
      <button @click="reload">刷新(E)</button>
    </li>
    <li>
      <button
        @click="
          changeBackgroundShow(
            'changeBackground',
            'thisPC',
            'Change Background'
          )
        "
      >
        个性化(R)
      </button>
    </li>
    <li>
      <button @click="switchTheme">
        切换
        {{ $store.state.theme === "light" ? "深色模式" : "浅色模式" }}
      </button>
    </li>
  </ul>
</template>

<script>
import { setFolder } from "../helpers/folders";
import { getLocal } from "../helpers/local";
export default {
  name: "ContextMenu",
  data() {
    return {
      sortTypes: ["Name", "Size"],
    };
  },
  methods: {
    hide() {
      document.getElementById("rmenu").classList.remove("show");
    },
    reload() {
      window.location.reload();
    },
    changeBackgroundShow(path, icon, title) {
      if (path && icon && title) {
        setFolder(title, icon, path);
        this.$store.dispatch("fetchFolders", getLocal("windows-folders"));
      }
      this.hide();
    },
    folderSort(value) {
      this.$store.dispatch("setFolderSort", value);
      this.hide();
    },
    showDesktopIcons() {
      this.$store.dispatch(
        "setShowFolders",
        !this.$store.state.showDesktopIcons
      );
      this.hide();
    },
    setFolderSize(size) {
      this.$store.dispatch("setFoldersSize", size);
      this.hide();
    },
    switchTheme() {
      let theme;
      if (this.$store.state.theme === "light") {
        theme = "dark";
      } else {
        theme = "light";
      }
      this.$store.dispatch("setTheme", theme);
      this.hide();
    },
  },
};
</script>

<style lang="scss" scoped>
html.dark {
  .context-menu {
    background: #111;
    * {
      color: #e0e0e0;
    }
    li {
      &:hover {
        background: #333;
      }
      .sub {
        background: #111;

        li.selected::before {
          background: #e0e0e0;
        }
      }
    }
  }
}
.context-menu {
  z-index: 9999;
  display: none;
  flex-direction: column;
  width: 210px;
  padding: 5px 0;
  position: absolute;
  top: 150px;
  left: 150px;
  background: #f8f8f8;
  border: 1px solid rgba(0, 0, 0, 0.4);
  box-shadow: 5px 5px 3px -3px #8e8e8e;
  &.show {
    display: flex;
  }
  img {
    width: 1.2em;
    height: 1.2em;
  }
  li {
    position: relative;
    button {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 26px;
      width: 100%;
      padding: 0 0 0 30px;
      text-align: left;
      font-size: 12px;
    }
    .showOtherBrother {
      position: relative;
      font-style: normal;
      width: 1.4em;
      height: 1.4em;
      margin-right: 0.3em;
      // &:hover {
      //   transform: rotate(90deg);
      // }
    }
    &:hover,
    &:focus {
      background: #ccc;
      .sub {
        opacity: 1;
        visibility: visible;
        transform: translateY(0);
      }
    }
    &.border-top {
      margin-top: 3px;
      padding-top: 3px;
      border-top: 1px solid rgba(0, 0, 0, 0.2) !important;
    }
    .sub {
      z-index: 100;
      flex-direction: column;
      width: 170px;
      padding: 5px 0;
      position: absolute;
      top: 0;
      left: 98%;
      background: #f8f8f8;
      border: 1px solid rgba(0, 0, 0, 0.4);
      box-shadow: 5px 5px 3px -3px #8e8e8e;
      opacity: 0;
      visibility: hidden;
      transform: translateY(4px);
      transition: 250ms;
      li {
        position: relative;
        button {
          padding: 0 30px;
        }
        &.selected {
          &::before {
            content: "";
            position: absolute;
            top: 50%;
            left: 15px;
            transform: translateY(-50%);
            width: 5px;
            height: 5px;
            border-radius: 50%;
            background: black;
          }
        }
        &.border-top {
          margin-top: 3px;
          padding-top: 3px;
          border-top: 1px solid rgba(0, 0, 0, 0.2) !important;
        }
      }
    }
  }
}
</style>
