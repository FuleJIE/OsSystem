<template>
  <Layout folderName="FileExplorer">
    <div class="fileToolBar"></div>
    <div class="pathTool">
      <div>
        <button @click="BackHistoryList()">
          <img class="historyBtn" src="../../assets/file-icons/arr.png" />
        </button>
      </div>
      <div>
        <button @click="ForwardHistoryList()">
          <img
            class="historyBtn"
            style="transform: rotate(180deg)"
            src="../../assets/file-icons/arr.png"
          />
        </button>
      </div>
      <div>
        <a>
          <img
            class="historyBtn2"
            src="../../assets/file-icons/history.png"
            :style="{
              // transform: showHistory ? 'rotate(0deg)' : 'rotate(-180deg)',
            }"
          />
        </a>
      </div>
      <div>
        <button @click="upperTargetPath()">
          <img
            class="historyBtn"
            style="transform: rotate(90deg)"
            src="../../assets/file-icons/arr.png"
          />
        </button>
      </div>
      <div class="path">
        <img src="../../assets/file-icons/file.png" alt="" />
        <input type="text" id="input" v-model.lazy.trim="inputPath" />
        <div class="path-content">
          <span v-for="(item, index) in path" :key="index">
            <img
              class="showOtherBrother"
              src="../../assets/file-icons/history.png"
              style="transform: rotate(-90deg)"
            />
            <!-- <span @click="goTarget(path, item)">{{ item }}</span> -->
            <span class="path-item" @click="goTarget(index)">{{ item }}</span>
          </span>
        </div>
        <label for="input" class="clickLocation"></label>
      </div>
      <div class="search">
        <img
          src="../../assets/file-icons/search.png"
          alt=""
          style="transform: rotate(90deg)"
        />
        <!-- <input type="text" placeholder="search" @keydown.enter="searchStr($event)" /> -->
      </div>
    </div>
    <div class="main">
      <div class="tree">
        <el-tree
          class="eltree"
          :data="treelist"
          :props="defaultProps"
          @node-click="handleNodeClick"
          icon-class="el-icon-arrow-right"
        ></el-tree>
      </div>
      <div class="fileContent">
        <div class="contentTitle">
          <span class="title1">名称</span>
          <span class="title2">修改日期</span>
          <span class="title3">类型</span>
          <span class="title4">大小</span>
        </div>
        <ul>
          <li
            v-for="(item, index) in contentList"
            :key="index"
            @dblclick="goTargetPath(item)"
          >
            <img
              v-if="item.fileType == 8"
              src="../../assets/file-icons/fileContent.png"
            />
            <img v-else src="../../assets/file-icons/txt.png" />
            <div class="content1">
              <span>{{ item.fileName }}</span>
            </div>
            <div class="content2">
              <span>{{ item.updateTime }}</span>
            </div>
            <div class="content3">
              <span>{{ item.fileType == 8 ? "文件夹" : "文本" }}</span>
            </div>
            <div class="content4" v-if="item.fileType != 8">
              <span>{{ item.occupyLength }}KB</span>
            </div>
          </li>
        </ul>
        <span v-if="isShowNull" class="fileNull">此文件夹为空。</span>
      </div>
    </div>
  </Layout>
</template>

<script>
import Layout from "../Layouts/FolderLayout";
import { getCurrentFile, getCurrentTree } from "../../api";

export default {
  name: "FileExplorer",
  components: { Layout },
  data() {
    return {
      treelist: [
        // {
        //   label: "Windows(C:)",
        //   children: [
        //     {
        //       label: "User",
        //     },
        //     {
        //       label: "Program Files",
        //     },
        //     {
        //       label: "DeskTop",
        //     },
        //   ],
        // },
        // {
        //   label: "Data(D:)",
        //   children: [
        //     {
        //       label: "Music",
        //     },
        //   ],
        // },
      ],
      defaultProps: {
        children: "lists",
        label: "folderName",
      },
      path: ["C:"],
      contentList: [
        // {
        //   fileName: "123.txt",
        //   updateTime: "2022/10/31 16:33",
        //   fileType: "文本",
        //   occupyLength: "3KB",
        // },
        // {
        //   fileName: "mytxt",
        //   updateTime: "2022/10/31 15:30",
        //   fileType: "文件夹",
        //   occupyLength: "",
        // },
        // {
        //   fileName: "DeskTop",
        //   updateTime: "2022/10/31 11:30",
        //   fileType: "文件夹",
        //   occupyLength: "",
        // },
      ],
      isShowNull: false,
      historyList: ["C:"],
      historyPoint: 0,
    };
  },
  computed: {
    inputPath: {
      get() {
        return this.path.join("/");
      },
      set(newPath) {
        this.changeTargetPath(newPath);
      },
    },
  },
  methods: {
    //文件树点击操作
    handleNodeClick(data) {
      getCurrentFile(data.folderName)
        .then((res) => {
          this.path.splice(0, this.path.length, ...data.folderName.split("/"));
          this.contentList = res.data;
          if (res.data.length != 0) {
            this.isShowNull = false;
          } else {
            this.isShowNull = true;
          }
          this.updateHistoryList();
        })
        .catch((err) => {
          //待完善，是否需要增加警告弹窗（需要则可直接调用changeTargetPath）
          console.log(err);
          // console.log("Windows找不到“", newPath, "”。请检查拼写并重试。");
        });
    },
    //点击列表，前往新路径
    goTargetPath(item) {
      //判断文件类型，若为文本则直接打开，若为文件夹，则请求子目录
      if (item.fileType == 1 || item.fileType == 10) {
        //请求文本内容
      } else {
        this.path.splice(this.path.length, 0, item.fileName);
        //调用接口访问，若有子目录，则更新文件数组，否则显示为空
        getCurrentFile(this.inputPath)
          .then((res) => {
            this.contentList = res.data;
            if (res.data.length != 0) {
              this.isShowNull = false;
            } else {
              this.isShowNull = true;
            }
          })
          .catch((err) => {
            console.log(err);
          });
        this.updateHistoryList();
      }
    },
    //点击路径，前往新路径
    goTarget(index) {
      //如果当前点击的路径按钮是当前路径则不进行操作
      if (index < this.path.length - 1) {
        this.path.splice(index + 1, this.path.length - index - 1);
        //请求当前路径下的目录
        getCurrentFile(this.inputPath)
          .then((res) => {
            this.contentList = res.data;
            if (res.data.length != 0) {
              this.isShowNull = false;
            } else {
              this.isShowNull = true;
            }
          })
          .catch((err) => {
            console.log(err);
          });
        this.updateHistoryList();
      }
    },
    //更改路径，前往新路径
    changeTargetPath(newPath) {
      //先请求新路径是否存在，若存在，则更新path，若不存在，则提示错误路径并且不更新path
      getCurrentFile(newPath)
        .then((res) => {
          this.path.splice(0, this.path.length, ...newPath.split("/"));
          this.contentList = res.data;
          if (res.data.length != 0) {
            this.isShowNull = false;
          } else {
            this.isShowNull = true;
          }
          this.updateHistoryList();
        })
        .catch((err) => {
          //待完善，增加警告弹窗
          console.log(err);
          console.log("Windows找不到“", newPath, "”。请检查拼写并重试。");
        });
    },
    //更新历史路径队列
    updateHistoryList() {
      //若此时队列指针不在队尾（即进行前进后退操作时）
      this.historyList.splice(
        this.historyPoint + 1,
        this.historyList.length - this.historyPoint - 1
      );
      if (this.historyPoint >= 9) {
        this.historyList.shift();
        this.historyPoint--;
      }
      this.historyList.push(this.inputPath);
      this.historyPoint++;
      console.log("HistoryList==", this.historyList);
      console.log("Num==", this.historyPoint);
    },
    //回退操作（历史路径）
    BackHistoryList() {
      if (this.historyPoint > 0) {
        // this.changeTargetPath(this.historyList[--this.historyPoint]);
        getCurrentFile(this.historyList[--this.historyPoint])
          .then((res) => {
            this.path.splice(
              0,
              this.path.length,
              ...this.historyList[this.historyPoint].split("/")
            );
            this.contentList = res.data;
            if (res.data.length != 0) {
              this.isShowNull = false;
            } else {
              this.isShowNull = true;
            }
          })
          .catch((err) => {
            //待完善，增加警告弹窗
            console.log(err);
            console.log(
              "Windows找不到“",
              this.historyList[this.historyPoint],
              "”。请检查拼写并重试。"
            );
          });
      }
      console.log("HistoryList==", this.historyList);
      console.log("Num==", this.historyPoint);
    },
    //前进操作（历史路径）
    ForwardHistoryList() {
      if (this.historyPoint < this.historyList.length - 1) {
        // this.changeTargetPath(this.historyList[++this.historyPoint]);
        getCurrentFile(this.historyList[++this.historyPoint])
          .then((res) => {
            this.path.splice(
              0,
              this.path.length,
              ...this.historyList[this.historyPoint].split("/")
            );
            this.contentList = res.data;
            if (res.data.length != 0) {
              this.isShowNull = false;
            } else {
              this.isShowNull = true;
            }
          })
          .catch((err) => {
            //待完善，增加警告弹窗
            console.log(err);
            console.log(
              "Windows找不到“",
              this.historyList[this.historyPoint],
              "”。请检查拼写并重试。"
            );
          });
      }
      console.log("HistoryList==", this.historyList);
      console.log("Num==", this.historyPoint);
    },
    //上级目录操作
    upperTargetPath() {
      if (this.path.length > 1) {
        this.path.splice(this.path.length - 1, 1);
        getCurrentFile(this.inputPath)
          .then((res) => {
            this.contentList = res.data;
            if (res.data.length != 0) {
              this.isShowNull = false;
            } else {
              this.isShowNull = true;
            }
          })
          .catch((err) => {
            console.log(err);
          });
        this.updateHistoryList();
      }
      console.log("HistoryList==", this.historyList);
      console.log("Num==", this.historyPoint);
    },
  },
  mounted() {
    //Folder打开时获取"C:"下的文件
    getCurrentFile("C:")
      .then((res) => {
        this.contentList = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
    //Folder打开时获取目录树
    getCurrentTree()
      .then((res) => {
        this.treelist.push(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style lang="scss" scoped>
.main {
  display: flex;
  background-color: #ffffff;
}
.pathTool {
  display: flex;
  align-items: center;
  width: 100%;
  height: 50px;
  padding: 0.5em 0.8em;
  background-color: #ffffff;
  .historyBtn {
    height: 1em;
    width: 1em;
    font-size: 1.4em;
    margin-right: 0.5em;
  }
  .historyBtn2 {
    height: 1em;
    width: 1em;
    font-size: 1em;
    margin-right: 0.5em;
  }

  .path {
    display: flex;
    align-items: center;
    padding: 0 0 0 0.5em;
    width: 60%;
    height: 100%;
    border: 1px solid #dddddd;

    img {
      width: 1em;
      height: 1em;
    }
    #input {
      width: 0;
      outline: none;
      border: 0;
      // font-size: 0.8em;
      margin-left: 0.5em;
    }
    #input:focus {
      width: 100%;
    }
    #input:focus + .path-content {
      display: none;
    }
    &-content {
      display: flex;
      align-items: center;
      height: 100%;
      font-size: 0.8em;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      span {
        // margin-left: 0.5em;
        height: 100%;
        flex-wrap: nowrap;
        overflow: hidden;
        display: flex;
        align-items: center;
        // padding: 4px;
        // &::after {
        //   content: '>';
        //   margin-left: 0.2em;
        // }
        .showOtherBrother {
          position: relative;
          font-style: normal;
          width: 1.2em;
          height: 1.2em;
          &:hover {
            transform: rotate(90deg);
          }
        }
      }
    }
  }
  .path-item {
    display: flex;
    align-items: center;
    height: 100%;
    padding: 0 0.5em;
    &:hover {
      background: #e5f3ff;
      user-select: none;
    }
  }
  .search {
    display: flex;
    align-items: center;
    margin-left: 10px;
    padding: 0.6em 1em;
    flex: 1;
    height: 100%;
    border: 1px solid #dddddd;

    img {
      width: 0.8em;
      height: 0.8em;
    }
    input {
      outline: none;
      width: 100%;
      border: 0;
      font-size: 0.8em;
      padding-left: 0.8em;
    }
  }
}

.clickLocation {
  flex-grow: 1;
  min-width: 1em;
  height: 100%;
}

.tree {
  width: 12em;
  height: 80em;
  overflow-y: scroll;
  border-right: 0.1em solid #e5e5e5;
}
.eltree {
  height: 100%;
  color: #000000;
  // &:hover {
  //   background: #e1f3ff;
  // }
}
.fileContent {
  width: 100%;
  height: 100%;
  ul {
    justify-content: flex-start;
    align-content: flex-start;
    flex-flow: wrap;
    overflow-y: scroll;

    list-style: none;
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0.5em 1em 1em 1em;
    li {
      display: flex;
      align-items: center;
      font-size: 0.8em;
      width: 100%;
      // height: 2em;
      padding: 0.3em 0;

      img {
        width: 1.2em;
        height: 1.2em;
      }
      &:hover {
        background: #e5f3ff;
      }
    }
  }
}

.contentTitle {
  font-size: 0.8em;
  color: #4c6070;
  padding-left: 1em;
}
.title1 {
  border-right: 0.1em solid #e5e5e5;
  padding: 0.4em 10em 0.4em 0em;
  align-items: center;
  user-select: none;
}
.title2 {
  border-right: 0.1em solid #e5e5e5;
  padding: 0.4em 10em 0.4em 0.4em;
  user-select: none;
}
.title3 {
  border-right: 0.1em solid #e5e5e5;
  padding: 0.4em 5em 0.4em 0.4em;
  user-select: none;
}
.title4 {
  border-right: 0.1em solid #e5e5e5;
  padding: 0.4em 3em 0.4em 0.4em;
  user-select: none;
}

.content1 {
  width: 11.1em;
  user-select: none;
}
.content2 {
  width: 14.4em;
  color: #6d6d6d;
  user-select: none;
}
.content3 {
  width: 9.3em;
  color: #6d6d6d;
  user-select: none;
}
.content4 {
  width: 3em;
  color: #6d6d6d;
  text-align: right;
  user-select: none;
}

.fileNull {
  color: #6d6d6d;
  font-size: 0.8em;
  margin: 17em;
}
</style>
