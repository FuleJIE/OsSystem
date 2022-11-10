<template>
  <Layout folderName="FileAttribute" class="layout">
    <div class="main">
      <ul class="title">
        <li class="choose">常规</li>
        <li>共享</li>
        <li>安全</li>
        <li>以前的版本</li>
        <li>自定义</li>
      </ul>
      <div class="first">
        <img
          v-if="fileType == '文件夹'"
          src="../../assets/file-icons/fileContent.png"
        />
        <img v-else src="../../assets/file-icons/txt.png" />
        <input v-model="fileName" />
      </div>
      <ul class="message">
        <li>
          <span class="msgitem1">类型:</span>
          <span class="msgitem2">{{ fileType }}</span>
        </li>
        <li>
          <span class="msgitem1">位置:</span>
          <span class="msgitem2">{{ fileLocation }}</span>
        </li>
        <li v-if="fileType != '文件夹'">
          <span class="msgitem1">大小:</span>
          <span class="msgitem2">{{ occupyNum }}B</span>
        </li>
      </ul>
      <div class="message">
        <li>
          <span class="msgitem1">创建时间:</span>
          <span class="msgitem2">{{ createTime }}</span>
        </li>
      </div>
      <div class="message2">
        <li>
          <span class="msgitem1">属性:</span>
          <div class="check">
            <input
              type="checkbox"
              :checked="isReadonly"
              @change="isReadonly = !isReadonly"
            />
            <span>只读</span>
          </div>
          <div class="check">
            <input
              type="checkbox"
              :checked="!isReadonly"
              @change="isReadonly = !isReadonly"
            />
            <span>可写</span>
          </div>
        </li>
      </div>
      <div class="btn">
        <button @click="setAttribute">确定</button>
        <button @click="closeAttribute">取消</button>
      </div>
    </div>
  </Layout>
</template>

<script>
import Layout from "../Layouts/FolderLayout";
import { getLocal } from "../../helpers/local";
import { fileAttribute, setAttribute } from "../../api";
import { closeFolder, getFolders } from "../../helpers/folders";

export default {
  name: "FileAttribute",
  components: { Layout },
  data() {
    return {
      currentSetFile: "",
      fileName: "",
      fileType: "",
      fileLocation: "",
      occupyNum: 0,
      createTime: "",
      isReadonly: true,
    };
  },
  methods: {
    //获取文件属性
    getAttribute() {
      fileAttribute(this.currentSetFile)
        .then((res) => {
          if (res.code == 1) {
            this.fileName = res.data.fileName;
            if (res.data.operationType == 8) {
              this.fileType = "文件夹";
            } else {
              this.fileType = "文本文档(.txt)";
            }
            this.fileLocation = res.data.fileLocation;
            this.occupyNum = res.data.occupyNum;
            this.createTime = res.data.createTime;
            if (res.data.operationType == 10) {
              this.isReadonly = false;
            } else {
              this.isReadonly = true;
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //修改文件属性
    setAttribute() {
      //先判断当前文件读写类型
      var ReadType;
      if (this.fileType == "文件夹") {
        ReadType = 8;
      } else if (this.isReadonly) {
        ReadType = 1;
      } else {
        ReadType = 10;
      }
      console.log("rawFileName==", this.currentSetFile);
      console.log("newFileName==", this.fileLocation + "/" + this.fileName);
      console.log("operationType==", ReadType);
      setAttribute({
        rawFileName: this.currentSetFile,
        newFileName: this.fileLocation + "/" + this.fileName,
        operationType: ReadType,
      })
        .then((res) => {
          if (res.code == 1) {
            this.getAttribute;
            //关闭当前属性窗口
            closeFolder("FileAttribute");
            this.$store.dispatch("fetchFolders", getFolders());
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //关闭属性窗口
    closeAttribute() {
      closeFolder("FileAttribute");
      this.$store.dispatch("fetchFolders", getFolders());
    },
  },
  mounted() {
    this.currentSetFile = getLocal("current-setFile");
    this.getAttribute();
  },
};
</script>

<style lang="scss" scoped>
.layout {
  min-width: 297px;
  min-height: 435px;
  width: 10%;
  height: 40%;
  max-width: 297px;
  max-height: 435px;
}
.main {
  background-color: #ffffff;
  font-size: 0.8em;
  height: 100%;
  .title {
    display: flex;
    border-bottom: 1px solid #f0f0f0;
    background-color: #fafafa;
    li {
      font-size: 0.8em;
      padding: 0.3em 0.5em 0.3em 0.5em;
      // border-right: 1px solid #f0f0f0;
      user-select: none;
      &:hover {
        background: #e5f3ff;
      }
    }
    .choose {
      background-color: #ffffff;
    }
  }
}
.first {
  display: flex;
  align-items: center;
  border-bottom: 1px solid #a0a0a0;
  margin: 0 0.8em;
  img {
    width: 2.2em;
    height: 2.2em;
    margin: 1em 2em 0.5em 0;
  }
  input {
    width: 2200px;
    height: 26px;
    margin-top: 0.7em;
  }
}
.message {
  padding-top: 15px;
  margin: 0 0.8em;
  border-bottom: 1px solid #a0a0a0;
  li {
    display: flex;
    align-items: center;
    padding: 0 20px 15px 4px;
    .msgitem1 {
      width: 108px;
    }
    .msgitem2 {
      margin-left: 22px;
      width: 300px;
    }
  }
}

.message2 {
  padding-top: 15px;
  margin: 0 0.8em;
  li {
    display: flex;
    align-items: center;
    padding: 0 20px 15px 4px;
    .msgitem1 {
      width: 72px;
    }
    .msgitem2 {
      margin-left: 22px;
      width: 300px;
    }
    .check {
      padding: 0 10px;
      align-items: center;
      display: flex;
      input {
        width: 15px;
        height: 15px;
      }
      span {
        margin-left: 2px;
      }
    }
  }
}
.btn {
  margin: 86px 0 0 100px;
  display: flex;
  button {
    width: 100px;
    padding: 3px 20px;
    margin-right: 10px;
    border: 1px solid #a0a0a0;
    background-color: #e1e1e1;
    &:hover {
      background: #e5f3ff;
    }
  }
}
</style>
