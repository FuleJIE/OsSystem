<template>
  <Layout folderName="FileExplorer" id="fileExplorer">
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
          <span class="title1">??????</span>
          <span class="title2">????????????</span>
          <span class="title3">??????</span>
          <span class="title4">??????</span>
        </div>
        <ul>
          <li
            v-for="(item, index) in contentList"
            :key="index"
            @dblclick="goTargetPath(item)"
            @contextmenu.prevent="rightShowSet(item)"
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
              <span>{{ item.fileType == 8 ? "?????????" : "??????" }}</span>
            </div>
            <div class="content4" v-if="item.fileType != 8">
              <span>{{ item.occupyLength }}B</span>
            </div>
          </li>
        </ul>
        <span v-if="isShowNull" class="fileNull">?????????????????????</span>
        <div class="blank" @contextmenu.prevent="rightShowFile()"></div>
      </div>
      <!-- ???????????????????????????????????? -->
      <ul
        class="context-menu"
        id="smenu"
        ref="setMenu"
        v-show="isshowSetMenu"
        v-click-outside="noShow"
      >
        <li @click="openFile()">
          <button>??????(O)</button>
        </li>
        <li>
          <button>??????(T)</button>
        </li>
        <li>
          <button>??????(C)</button>
        </li>
        <li class="border-top" @click="deleteFile()">
          <button>??????(D)</button>
        </li>
        <li class="border-top" @click="SetFileAttribute()">
          <button>??????(R)</button>
        </li>
      </ul>
      <!-- ??????????????????????????? -->
      <ul
        class="context-menu"
        id="fmenu"
        ref="fileMenu"
        v-show="isshowFileMenu"
        v-click-outside="noShow"
      >
        <li>
          <button>
            ??????(V)
            <img
              class="showOtherBrother"
              src="../../assets/file-icons/menu-arr.png"
            />
          </button>
          <ul class="sub">
            <li>
              <button>????????????(X)</button>
            </li>
            <li>
              <button>?????????(R)</button>
            </li>
            <li>
              <button>????????????(M)</button>
            </li>
            <li>
              <button>?????????(N)</button>
            </li>
            <li>
              <button>??????(L)</button>
            </li>
            <li :class="'selected'">
              <button>????????????(D)</button>
            </li>
            <li>
              <button>??????(S)</button>
            </li>
            <li>
              <button>??????(T)</button>
            </li>
          </ul>
        </li>
        <li>
          <button>
            ????????????(O)
            <img
              class="showOtherBrother"
              src="../../assets/file-icons/menu-arr.png"
            />
          </button>
          <ul class="sub">
            <li :class="'selected'">
              <button>??????</button>
            </li>
            <li>
              <button>????????????</button>
            </li>
            <li>
              <button>??????</button>
            </li>
            <li>
              <button>??????</button>
            </li>
            <li class="border-top" :class="'selected'">
              <button>??????(A)</button>
            </li>
            <li>
              <button>??????(D)</button>
            </li>
            <li class="border-top">
              <button>??????(M)...</button>
            </li>
          </ul>
        </li>
        <li @click="reloadFile()">
          <button>??????(E)</button>
        </li>
        <li class="border-top">
          <button>
            ??????(W)
            <img
              class="showOtherBrother"
              src="../../assets/file-icons/menu-arr.png"
            />
          </button>
          <ul class="sub">
            <li @click="createFolder()">
              <!-- <img src="../../assets/file-icons/fileContent.png" /> -->
              <button>?????????(F)</button>
            </li>
            <li @click="createFile()">
              <!-- <img src="../../assets/file-icons/txt.png" /> -->
              <button>????????????</button>
            </li>
          </ul>
        </li>
        <li class="border-top">
          <button>??????(R)</button>
        </li>
      </ul>
    </div>
  </Layout>
</template>

<script>
import Layout from "../Layouts/FolderLayout";
import {
  getCurrentFile,
  getCurrentTree,
  newFolder,
  newFile,
  deleteFolder,
  deleteFile,
} from "../../api";
import { setFolder } from "../../helpers/folders";
import { getLocal, setLocal } from "../../helpers/local";

export default {
  name: "FileExplorer",
  components: { Layout },
  data() {
    return {
      treelist: [],
      defaultProps: {
        children: "lists",
        label: "folderName",
      },
      path: ["C:"],
      contentList: [],
      isShowNull: false,
      historyList: ["C:"],
      historyPoint: 0,
      modifyPath: "",
      clickFile: {},
      isshowSetMenu: false,
      isshowFileMenu: false,
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
    //?????????????????????
    handleNodeClick(data) {
      this.noShow(); //????????????
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
          //?????????????????????????????????????????????????????????????????????changeTargetPath???
          console.log(err);
          // console.log("Windows????????????", newPath, "?????????????????????????????????");
        });
    },
    //??????????????????????????????
    goTargetPath(item) {
      this.noShow(); //????????????
      //???????????????????????????????????????????????????????????????????????????????????????
      if (item.fileType == 1 || item.fileType == 10) {
        // ???????????????????????????????????????????????????
        setFolder(item.fileName + " - ?????????", "newTxt", "NewTxt");
        this.$store.dispatch("fetchFolders", getLocal("windows-folders"));
        //??????????????????????????????????????????
        setLocal("current-openTxt", this.inputPath + "/" + item.fileName);
      } else {
        this.path.splice(this.path.length, 0, item.fileName);
        //?????????????????????????????????????????????????????????????????????????????????
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
    //??????????????????????????????
    goTarget(index) {
      this.noShow(); //????????????
      //??????????????????????????????????????????????????????????????????
      if (index < this.path.length - 1) {
        this.path.splice(index + 1, this.path.length - index - 1);
        //??????????????????????????????
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
    //??????????????????????????????
    changeTargetPath(newPath) {
      this.noShow(); //????????????
      //??????????????????????????????????????????????????????path??????????????????????????????????????????????????????path
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
          //??????????????????????????????
          console.log(err);
          console.log("Windows????????????", newPath, "?????????????????????????????????");
        });
    },
    //????????????????????????
    updateHistoryList() {
      //?????????????????????????????????????????????????????????????????????
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
    //??????????????????????????????
    BackHistoryList() {
      this.noShow(); //????????????
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
            //??????????????????????????????
            console.log(err);
            console.log(
              "Windows????????????",
              this.historyList[this.historyPoint],
              "?????????????????????????????????"
            );
          });
      }
      console.log("HistoryList==", this.historyList);
      console.log("Num==", this.historyPoint);
    },
    //??????????????????????????????
    ForwardHistoryList() {
      this.noShow(); //????????????
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
            //??????????????????????????????
            console.log(err);
            console.log(
              "Windows????????????",
              this.historyList[this.historyPoint],
              "?????????????????????????????????"
            );
          });
      }
      console.log("HistoryList==", this.historyList);
      console.log("Num==", this.historyPoint);
    },
    //??????????????????
    upperTargetPath() {
      this.noShow(); //????????????
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
    //??????????????????
    rightShowSet(item) {
      //??????????????????
      let menu2 = this.$refs.fileMenu;
      menu2.style.display = "none";
      //????????????????????????
      this.clickFile = item;
      let menu = this.$refs.setMenu;
      this.isshowSetMenu = true;
      var evt = event || window.event;
      // var clientWidth =
      //   document.documentElement.clientWidth || document.body.clientWidth;
      // var scrollLeft =
      //   document.documentElement.scrollLeft || document.body.scrollLeft;

      // var clientHeight =
      //   document.documentElement.clientHeight || document.body.clientHeight;
      // var scrollTop =
      //   document.documentElement.scrollTop || document.body.scrollTop;

      //???left???top?????????????????????????????????
      menu.style.left = evt.layerX + "px";
      menu.style.top = evt.layerY + "px";
      // //??????????????????????????????????????????left???????????????
      // if (evt.pageX + 100 > clientWidth + scrollLeft) {
      //   //??????????????????????????????
      //   var left1 = evt.pageX - 100;
      //   menu.style.left = left1 + "px";
      // }
      // //??????????????????????????????????????????top???????????????
      // if (evt.pageY + 100 > clientHeight + scrollTop) {
      //   var top1 = evt.pageY - 100;
      //   menu.style.top = top1 + "px";
      // }
      document.getElementById("fmenu").style.display = "none";
      document.getElementById("rmenu").style.display = "none";
      menu.style.display = "block";
    },
    //??????????????????
    rightShowFile() {
      //??????????????????
      let menu = this.$refs.setMenu;
      menu.style.display = "none";
      let menu2 = this.$refs.fileMenu;
      this.isshowFileMenu = true;
      var evt = event || window.event;
      // var clientWidth =
      //   document.documentElement.clientWidth || document.body.clientWidth;
      // var scrollLeft =
      //   document.documentElement.scrollLeft || document.body.scrollLeft;

      // var clientHeight =
      //   document.documentElement.clientHeight || document.body.clientHeight;
      // var scrollTop =
      //   document.documentElement.scrollTop || document.body.scrollTop;

      //???left???top?????????????????????????????????
      menu2.style.left = evt.layerX + "px";
      menu2.style.top = evt.layerY + "px";
      // //??????????????????????????????????????????left???????????????
      // if (evt.pageX + 100 > clientWidth + scrollLeft) {
      //   //??????????????????????????????
      //   var left1 = evt.pageX - 100;
      //   menu.style.left = left1 + "px";
      // }
      // //??????????????????????????????????????????top???????????????
      // if (evt.pageY + 100 > clientHeight + scrollTop) {
      //   var top1 = evt.pageY - 100;
      //   menu.style.top = top1 + "px";
      // }
      document.getElementById("smenu").style.display = "none";
      document.getElementById("rmenu").style.display = "none";
      menu2.style.display = "block";
    },
    noShow() {
      let menu = this.$refs.setMenu;
      menu.style.display = "none";
      let menu2 = this.$refs.fileMenu;
      menu2.style.display = "none";
      document.getElementById("smenu").style.display = "none";
      document.getElementById("fmenu").style.display = "none";
    },
    //???????????????/??????
    openFile() {
      this.goTargetPath(this.clickFile);
    },
    //???????????????/??????
    deleteFile() {
      //???????????????????????????????????????????????????????????????????????????????????????????????????
      if (this.clickFile.fileType == 1 || this.clickFile.fileType == 10) {
        //????????????
        deleteFile(this.inputPath + "/" + this.clickFile.fileName)
          .then((res) => {
            if (res.code == 1) {
              //?????????????????????????????????????????????
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
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        //???????????????
        deleteFolder(this.inputPath + "/" + this.clickFile.fileName)
          .then((res) => {
            if (res.code == 1) {
              //?????????????????????????????????????????????
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
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
      this.noShow(); //????????????
    },
    //???????????????
    createFolder() {
      var num = 1;
      var newName = "???????????????(" + num + ")";
      var haveSame = true;
      while (haveSame) {
        haveSame = false;
        for (let item of this.contentList) {
          if (item.fileName == newName) {
            num++;
            newName = "???????????????(" + num + ")";
            haveSame = true;
          }
        }
      }
      newFolder(this.inputPath + "/" + newName)
        .then((res) => {
          if (res.code == 1) {
            //???????????????????????????????????????????????????
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
          }
        })
        .catch((err) => {
          console.log(err);
        });
      this.noShow(); //????????????
    },
    //????????????
    createFile() {
      var num = 1;
      var newName = "??????????????????(" + num + ").txt";
      var haveSame = true;
      while (haveSame) {
        haveSame = false;
        for (let item of this.contentList) {
          if (item.fileName == newName) {
            num++;
            newName = "??????????????????(" + num + ").txt";
            haveSame = true;
          }
        }
      }
      newFile(this.inputPath + "/" + newName)
        .then((res) => {
          if (res.code == 1) {
            //???????????????????????????????????????????????????
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
          }
        })
        .catch((err) => {
          console.log(err);
        });
      this.noShow(); //????????????
    },
    //????????????
    reloadFile() {
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
      getCurrentTree()
        .then((res) => {
          this.treelist = [];
          this.treelist.push(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
      this.noShow(); //????????????
    },
    //??????????????????
    SetFileAttribute() {
      setFolder(
        this.clickFile.fileName + " ??????",
        "fileAttribute",
        "FileAttribute"
      );
      this.$store.dispatch("fetchFolders", getLocal("windows-folders"));
      //??????????????????????????????????????????
      setLocal(
        "current-setFile",
        this.inputPath + "/" + this.clickFile.fileName
      );
      this.noShow(); //????????????
    },
  },
  mounted() {
    //Folder???????????????"C:"????????????
    getCurrentFile("C:")
      .then((res) => {
        this.contentList = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
    //Folder????????????????????????
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
            transform: rotate(-90deg);
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
    user-select: none;
    &:hover {
      background: #e5f3ff;
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
  width: 15em;
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
      width: 150px;
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

.blank {
  width: 100%;
  height: 80em;
}
</style>
