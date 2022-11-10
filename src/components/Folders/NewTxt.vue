<template>
  <Layout folderName="NewTxt" class="layout">
    <div class="main">
      <ul class="title">
        <li @click="showMenu()">文件(F)</li>
        <li>编辑(E)</li>
        <li>格式(O)</li>
        <li>查看(V)</li>
        <li>帮助(H)</li>
      </ul>
      <textarea
        v-model="txtData"
        :readonly="isReadonly"
        @click.self="noShow"
      ></textarea>
      <ul class="context-menu" id="menu" ref="setMenu">
        <li>
          <button>新建(N)</button>
        </li>
        <li>
          <button>打开(O)</button>
        </li>
        <li @click="saveFileContext">
          <button>保存(S)</button>
        </li>
        <li>
          <button>另存为(A)</button>
        </li>
        <li class="border-top">
          <button>退出(X)</button>
        </li>
      </ul>
    </div>
  </Layout>
</template>

<script>
import Layout from "../Layouts/FolderLayout";
import { getLocal } from "../../helpers/local";
import { openFile, saveFile } from "../../api";

export default {
  name: "NewTxt",
  components: { Layout },
  data() {
    return {
      txtData: "",
      isReadonly: false,
      isshowSetMenu: true,
      currentOpenTxt: "",
    };
  },
  methods: {
    showMenu() {
      let menu = this.$refs.setMenu;
      menu.style.left = 0 + "px";
      menu.style.top = 25 + "px";
      menu.style.display = "block";
    },
    noShow() {
      let menu = this.$refs.setMenu;
      menu.style.display = "none";
    },
    //保存文本内容
    saveFileContext() {
      saveFile({
        fileName: this.currentOpenTxt,
        buffer: this.txtData,
      })
        .then((res) => {
          if (res.code == 1) {
            this.noShow();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    this.currentOpenTxt = getLocal("current-openTxt");
    openFile(this.currentOpenTxt)
      .then((res) => {
        if (res.code == 1) {
          this.txtData = res.data.data;
          //判断文本是否可读可写
          if (res.data.operationType == 10) {
            this.isReadonly = false;
          } else if (res.data.operationType == 1) {
            this.isReadonly = true;
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style lang="scss" scoped>
.layout {
  min-width: 500px;
  min-height: 400px;
  width: 20%;
  height: 40%;
}
.main {
  background-color: #ffffff;
  .title {
    display: flex;
    border-bottom: 1px solid #f0f0f0;
    li {
      font-size: 0.8em;
      padding: 0.3em 0.5em 0.3em 0.5em;
      user-select: none;
      &:hover {
        background: #e5f3ff;
      }
    }
  }
  textarea {
    font-size: 1.4em;
    width: 100%;
    height: 80em;
    background-color: #ffffff;
    overflow-y: visible;
    border: none;
    resize: none;
    user-select: none;
  }
}
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
  // display: none;
  flex-direction: column;
  width: 120px;
  padding: 5px 0;
  position: absolute;
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
      padding: 0 0 0 11px;
      text-align: left;
      font-size: 12px;
    }
    .showOtherBrother {
      position: relative;
      font-style: normal;
      width: 2em;
      height: 2em;
      &:hover {
        transform: rotate(90deg);
      }
    }
    &:hover,
    &:focus {
      background: #ccc;
    }
    &.border-top {
      margin-top: 3px;
      padding-top: 3px;
      border-top: 1px solid rgba(0, 0, 0, 0.2) !important;
    }
  }
}
</style>
