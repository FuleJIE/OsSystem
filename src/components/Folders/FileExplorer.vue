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
              v-if="item.fileType == '文件夹'"
              src="../../assets/file-icons/fileContent.png"
            />
            <img
              v-if="item.fileType == '文本'"
              src="../../assets/file-icons/txt.png"
            />
            <div class="content1">
              <span>{{ item.fileName }}</span>
            </div>
            <div class="content2">
              <span>{{ item.changeTime }}</span>
            </div>
            <div class="content3">
              <span>{{ item.fileType }}</span>
            </div>
            <div class="content4">
              <span>{{ item.fileSize }}</span>
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
import { getCurrentFile } from "../../api";
// import { getCurrentFile } from "../../api/index";

export default {
  name: "FileExplorer",
  components: { Layout },
  data() {
    return {
      treelist: [
        {
          label: "Windows(C:)",
          children: [
            {
              label: "User",
            },
            {
              label: "Program Files",
            },
            {
              label: "DeskTop",
            },
          ],
        },
        {
          label: "Data(D:)",
          children: [
            {
              label: "Music",
            },
          ],
        },
      ],
      defaultProps: {
        children: "children",
        label: "label",
      },
      path: ["C:"],
      contentList: [
        {
          fileName: "123.txt",
          changeTime: "2022/10/31 16:33",
          fileType: "文本",
          fileSize: "3KB",
        },
        {
          fileName: "mytxt",
          changeTime: "2022/10/31 15:30",
          fileType: "文件夹",
          fileSize: "",
        },
        {
          fileName: "DeskTop",
          changeTime: "2022/10/31 11:30",
          fileType: "文件夹",
          fileSize: "",
        },
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
    handleNodeClick(data) {
      console.log(data);
    },
    //点击列表，前往新路径
    goTargetPath(item) {
      //判断文件类型，若为文本则直接打开，若为文件夹，则请求子目录
      if (item.fileType == "文本") {
        //请求文本内容
      } else {
        this.path.splice(this.path.length, 0, item.fileName);
        //调用接口访问，若有子目录，则更新文件数组，否则显示为空
        getCurrentFile("C:")
          .then((res) => {
            console.log("res==", res);
          })
          .catch((err) => {
            console.log(err);
          });
        if (this.inputPath == "C:/DeskTop") {
          this.contentList = [
            {
              fileName: "Game",
              changeTime: "2022/10/31 16:33",
              fileType: "文件夹",
              fileSize: "",
            },
            {
              fileName: "Chrome",
              changeTime: "2022/10/31 15:30",
              fileType: "文件夹",
              fileSize: "",
            },
          ];
          this.isShowNull = false;
        } else {
          this.contentList = [];
          this.isShowNull = true;
        }
        this.updateHistoryList();
      }
    },
    //点击路径，前往新路径
    goTarget(index) {
      //如果当前点击的路径按钮是当前路径则不进行操作
      if (index < this.path.length - 1) {
        this.path.splice(index + 1, this.path.length - index - 1);
        //请求当前路径下的目录
        if (this.inputPath == "C:") {
          this.contentList = [
            {
              fileName: "123.txt",
              changeTime: "2022/10/31 16:33",
              fileType: "文本",
              fileSize: "3KB",
            },
            {
              fileName: "Video",
              changeTime: "2022/10/31 15:30",
              fileType: "文件夹",
              fileSize: "",
            },
            {
              fileName: "DeskTop",
              changeTime: "2022/10/31 11:30",
              fileType: "文件夹",
              fileSize: "",
            },
          ];
          this.isShowNull = false;
        } else {
          this.contentList = [];
          this.isShowNull = true;
        }
        this.updateHistoryList();
      }
    },
    //更改路径，前往新路径
    changeTargetPath(newPath) {
      //先请求新路径是否存在，若存在，则更新path，若不存在，则提示错误路径并且不更新path
      if (newPath == "C:/DeskTop/Game") {
        this.path.splice(0, this.path.length, ...newPath.split("/"));
        this.contentList = [
          {
            fileName: "111.txt",
            changeTime: "2022/10/31 16:33",
            fileType: "文本",
            fileSize: "3KB",
          },
          {
            fileName: "222.txt",
            changeTime: "2022/10/31 15:30",
            fileType: "文本",
            fileSize: "36KB",
          },
          {
            fileName: "333.txt",
            changeTime: "2022/10/31 11:30",
            fileType: "文本",
            fileSize: "51KB",
          },
        ];
        this.updateHistoryList();
      } else {
        console.log("Windows找不到“", newPath, "”。请检查拼写并重试。");
      }
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
        this.changeTargetPath(this.historyList[--this.historyPoint]);
      }
      console.log("HistoryList==", this.historyList);
      console.log("Num==", this.historyPoint);
    },
    //前进操作（历史路径）
    ForwardHistoryList() {
      if (this.historyPoint < this.historyList.length - 1) {
        this.changeTargetPath(this.historyList[++this.historyPoint]);
      }
      console.log("HistoryList==", this.historyList);
      console.log("Num==", this.historyPoint);
    },
    //上级目录操作
    upperTargetPath() {
      if (this.path.length > 1) {
        this.path.splice(this.path.length - 1, 1);
        this.updateHistoryList();
      }
      console.log("HistoryList==", this.historyList);
      console.log("Num==", this.historyPoint);
    },
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
  padding: 0.4em 7em 0.4em 0.4em;
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
  width: 11.4em;
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
