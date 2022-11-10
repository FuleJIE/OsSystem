<template>
  <Layout folderName="TaskManager" class="layout">
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
    >
      <el-menu-item index="1">进程管理器</el-menu-item>
      <el-menu-item index="2">设备管理器</el-menu-item>
    </el-menu>

    <div class="main" v-if="activeIndex === '1'">
      <div class="left1">
        <div
          style="
            padding: 10px;
            padding-bottom: 0;
            display: flex;
            justify-content: center;
            align-items: center;
          "
        >
          <el-form :inline="true" class="demo-form-inline">
            <el-form-item label="正在运行进程的编号">
              <el-input
                placeholder="进程的编号"
                style="width: 100px"
                v-model="id"
              ></el-input>
            </el-form-item>
            <el-form-item label="当前执行结果">
              <el-input
                placeholder="执行结果"
                style="width: 100px"
                v-model="ax"
              ></el-input>
            </el-form-item>
            <el-form-item label="当前执行指令">
              <el-input
                placeholder="执行指令"
                style="width: 100px"
                v-model="ir"
              ></el-input>
            </el-form-item>
            <el-form-item label="剩余时间片">
              <el-input
                placeholder="时间片"
                style="width: 100px"
                v-model="time"
              ></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div>
          <el-table
            :data="getProcessTable"
            style="width: 100%"
            height="800px"
            stripe
          >
            <el-table-column
              prop="pid"
              label="进程编号"
              sortable
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="status"
              label="进程状态"
              sortable
              align="center"
            >
              <template scope="scope">
                <el-tag v-if="scope.row.status == '0'" style="color: blue"
                  >运行态</el-tag
                >
                <el-tag v-else-if="scope.row.status == '1'" style="color: green"
                  >就绪态</el-tag
                >
                <el-tag v-else-if="scope.row.status == '2'" style="color: red"
                  >阻塞态</el-tag
                >
                <el-tag v-else-if="scope.row.status == '3'" style="color: gray"
                  >终止态</el-tag
                >
              </template>
            </el-table-column>
            <el-table-column
              prop="fileName"
              label="执行文件地址"
              sortable
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="memoryStatus"
              label="内存占用情况"
              sortable
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="pcb"
              label="进程控制块"
              sortable
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="ax"
              label="当前执行结果"
              sortable
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="progress"
              label="进程完成进度"
              sortable
              align="center"
            >
              <template slot-scope="scope">
                <el-progress
                  :text-inside="true"
                  :stroke-width="15"
                  :percentage="(scope.row.progress * 100).toFixed(2)"
                  :color="colors"
                ></el-progress>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div class="right1">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="显示设置" name="first">
            <el-radio-group
              @change="radioChange1"
              v-model="radio1"
              style="
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
              "
            >
              <div
                style="
                  display: flex;
                  flex-direction: column;
                  justify-content: center;
                  align-items: center;
                "
              >
                <el-radio :label="1" border style="margin: 10px"
                  >显示所有态</el-radio
                >
                <el-radio :label="2" border style="margin: 10px"
                  >显示运行态</el-radio
                >
                <el-radio :label="3" border style="margin: 10px"
                  >显示就绪态</el-radio
                >
                <el-radio :label="4" border style="margin: 10px"
                  >显示阻塞态</el-radio
                >
                <el-radio :label="5" border style="margin: 10px"
                  >显示终止态</el-radio
                >
              </div>
            </el-radio-group>
          </el-tab-pane>
          <el-tab-pane label="标记设置" name="second">
            <el-radio-group
              @change="radioChange2"
              v-model="radio2"
              style="
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
              "
            >
              <div
                style="
                  display: flex;
                  flex-direction: column;
                  justify-content: center;
                  align-items: center;
                "
              >
                <el-radio :label="1" border style="margin: 10px"
                  >不进行标记</el-radio
                >
                <el-radio :label="2" border style="margin: 10px"
                  >标记运行态</el-radio
                >
                <el-radio :label="3" border style="margin: 10px"
                  >标记就绪态</el-radio
                >
                <el-radio :label="4" border style="margin: 10px"
                  >标记阻塞态</el-radio
                >
                <el-radio :label="5" border style="margin: 10px"
                  >标记终止态</el-radio
                >
              </div>
            </el-radio-group>
          </el-tab-pane>
        </el-tabs>
        <div
          style="
            display: flex;
            justify-content: center;
            align-items: center;
            margin-top: 100px;
          "
        >
          <el-button @click="stop">暂停</el-button>
          <el-button @click="continue1">继续</el-button>
        </div>
      </div>
    </div>

    <div class="main" v-if="activeIndex === '2'">
      <div class="left2">
        <el-menu
          :default-active="activeIndex1"
          class="el-menu-vertical-demo"
          @select="handleSelect1"
        >
          <el-menu-item index="1">
            <i class="el-icon-document"></i>
            <span slot="title">内存</span>
          </el-menu-item>
          <el-menu-item index="2">
            <i class="el-icon-pie-chart"></i>
            <span slot="title">磁盘</span>
          </el-menu-item>
          <el-menu-item index="3">
            <i class="el-icon-setting"></i>
            <span slot="title">设备</span>
          </el-menu-item>
          <el-menu-item index="4">
            <i class="el-icon-s-help"></i>
            <span slot="title">PCB进程控制块</span>
          </el-menu-item>
        </el-menu>
      </div>
      <div class="right2">
        <div v-if="activeIndex1 === '1'" style="padding-top: 90px">
          <ve-line
            :data="chartData"
            :title="{ text: '内存使用量' }"
            style="margin: 30px"
          ></ve-line>
        </div>
        <div
          v-if="activeIndex1 === '2'"
          style="display: flex; flex-direction: column"
        >
          <div style="height: 340px">
            <ve-pie
              :data="diskData"
              :title="{ text: '磁盘使用量' }"
              style="margin: 30px"
            ></ve-pie>
          </div>
          <div>
            <el-table
              :data="diskBlock"
              style="width: 100%"
              height="515px"
              stripe
            >
              <el-table-column
                prop="diskNum"
                label="磁盘块"
                sortable
                align="center"
                width="90px"
              >
              </el-table-column>
              <el-table-column
                prop="nextIdx"
                label="索引"
                sortable
                align="center"
                width="90px"
              >
              </el-table-column>
              <el-table-column
                prop="useStatus"
                label="磁盘块使用情况"
                sortable
                align="center"
              >
                <template scope="scope">
                  <el-tag v-if="scope.row.useStatus == '1'" style="color: blue"
                    >占用</el-tag
                  >
                  <el-tag
                    v-else-if="scope.row.useStatus == '0'"
                    style="color: green"
                    >未占用</el-tag
                  >
                </template>
              </el-table-column>
              <el-table-column
                prop="content"
                label="类型"
                sortable
                align="center"
                width="120px"
              >
                <template scope="scope">
                  <el-tag v-if="scope.row.content == '6'" style="color: blue"
                    >系统文件</el-tag
                  >
                  <el-tag
                    v-else-if="scope.row.content == '8'"
                    style="color: green"
                    >目录文件</el-tag
                  >
                  <el-tag
                    v-else-if="scope.row.content == '10'"
                    style="color: red"
                    >普通文件</el-tag
                  >
                  <el-tag
                    v-else-if="scope.row.content == '12'"
                    style="color: gray"
                    >FAT文件</el-tag
                  >
                </template>
              </el-table-column>
              <el-table-column
                prop="bytesUsesCondition"
                label="字节数占比"
                sortable
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="data"
                label="前16个字节"
                sortable
                align="center"
              >
              </el-table-column>
            </el-table>
          </div>
        </div>
        <div v-if="activeIndex1 === '3'">
          <div>
            <el-checkbox-group
              v-model="checkboxGroup1"
              size="medium"
              style="height: 100%"
            >
              <div
                style="
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  margin-top: 50px;
                "
              >
                <el-checkbox-button
                  v-for="device in devices"
                  :label="device"
                  :key="device"
                  size="medium"
                  class="aa"
                  >{{ device }}
                </el-checkbox-button>
              </div>
            </el-checkbox-group>
            <ve-line
              :data="deviceData"
              :title="{ text: '设备使用情况' }"
              style="margin: 30px"
            ></ve-line>
          </div>
        </div>
        <div v-if="activeIndex1 === '4'">
          <div>
            <el-checkbox-group
              v-model="runGroup"
              size="medium"
              style="height: 100%"
            >
              <div
                style="
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  margin-top: 30px;
                "
              >
                <el-tag>运行态</el-tag>
                <el-checkbox-button
                  v-for="pcb in pcbs"
                  :label="pcb"
                  :key="pcb"
                  size="medium"
                  >{{ pcb }}
                </el-checkbox-button>
              </div>
            </el-checkbox-group>
            <el-checkbox-group
              v-model="readyGroup"
              size="medium"
              style="height: 100%"
            >
              <div
                style="
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  margin-top: 10px;
                "
              >
                <el-tag>就绪态</el-tag>
                <el-checkbox-button
                  v-for="pcb in pcbs"
                  :label="pcb"
                  :key="pcb"
                  size="medium"
                  >{{ pcb }}
                </el-checkbox-button>
              </div>
            </el-checkbox-group>
            <el-checkbox-group
              v-model="waitGroup"
              size="medium"
              style="height: 100%"
            >
              <div
                style="
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  margin-top: 10px;
                "
              >
                <el-tag>阻塞态</el-tag>
                <el-checkbox-button
                  v-for="pcb in pcbs"
                  :label="pcb"
                  :key="pcb"
                  size="medium"
                  >{{ pcb }}
                </el-checkbox-button>
              </div>
            </el-checkbox-group>
            <el-checkbox-group
              v-model="endGroup"
              size="medium"
              style="height: 100%"
            >
              <div
                style="
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  margin-top: 10px;
                "
              >
                <el-tag>终止态</el-tag>
                <el-checkbox-button
                  v-for="pcb in pcbs"
                  :label="pcb"
                  :key="pcb"
                  size="medium"
                  >{{ pcb }}
                </el-checkbox-button>
              </div>
            </el-checkbox-group>
            <ve-line
              :data="pcbData"
              style="margin: 30px"
              :title="{ text: '进程控制块使用情况' }"
            ></ve-line>
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>

<script>
import Layout from "../Layouts/FolderLayout";
import {
  getExecutingProcess,
  getProcessTable,
  getMemoryStatus,
  listDiskInfo,
  DiskOccupy,
  getDeviceStatus,
  getPCBStatus,
  stopThread,
  continueThread,
} from "../../api";
const deviceOptions = ["A1", "A2", "B1", "B2", "B3", "C1", "C2", "C3"];
const pcbOptions = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
export default {
  mounted() {
    // this.pcbStatus();
    // this.deviceStatus();
    this.timer = setInterval(() => {
      this.executingProcess();
      this.processTable();
      this.getMemoryData();
      this.diskInfo();
      this.getDiskOccupy();
      this.deviceStatus();
      this.getDeviceData();
      this.pcbStatus();
      this.getPCBData();
    }, 1000);
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
  name: "TaskManager",
  components: {
    Layout,
  },
  data() {
    return {
      pcbData: {
        columns: ["时间", "运行态", "就绪态", "阻塞态", "终止态"],
        rows: [
          {
            时间: "00:00:00",
            运行态: "0",
            就绪态: "0",
            阻塞态: "0",
            终止态: "0",
          },
          {
            时间: "00:00:00",
            运行态: "0",
            就绪态: "0",
            阻塞态: "0",
            终止态: "0",
          },
        ],
      },
      deviceData: {
        columns: ["时间", "占用比"],
        rows: [
          {
            时间: "00:00:00",
            占用比: "0",
          },
          {
            时间: "00:00:00",
            占用比: "0",
          },
        ],
      },
      diskBlock: [],
      diskData: {
        columns: ["占用情况", "占用比"],
        rows: [
          {
            时间: "00:00:00",
            占用比: "0",
          },
          {
            时间: "00:00:00",
            占用比: "0",
          },
        ],
      },
      chartData: {
        columns: ["时间", "占用比"],
        rows: [
          {
            时间: "00:00:00",
            占用比: "0",
          },
          {
            时间: "00:00:00",
            占用比: "0",
          },
        ],
      },
      pcbs: pcbOptions,
      devices: deviceOptions,
      checkboxGroup1: [],
      checkboxGroup2: [],
      runGroup: [],
      readyGroup: [],
      waitGroup: [],
      endGroup: [],
      timer: null,
      colors: [
        {
          color: "#f56c6c",
          percentage: 20,
        },
        {
          color: "#e6a23c",
          percentage: 40,
        },
        {
          color: "#5cb87a",
          percentage: 60,
        },
        {
          color: "#1989fa",
          percentage: 80,
        },
        {
          color: "#6f7ad3",
          percentage: 100,
        },
      ],
      ax: "",
      id: "",
      ir: "",
      time: "",
      labelPosition: "right",
      formLabelAlign: {
        name: "",
        region: "",
        type: "",
      },
      radio1: 1,
      radio2: 1,
      activeName: "first",
      activeIndex: "1",
      activeIndex1: "1",
      getProcessTable0: [],
      getProcessTable: [],
    };
  },
  methods: {
    continue1() {
      continueThread().then((res) => {
        console.log(res);
      });
    },
    stop() {
      stopThread().then((res) => {
        console.log(res);
      });
    },
    pcbStatus() {
      // this.runGroup.length = 0;
      // this.readyGroup.length = 0;
      // this.waitGroup.length = 0;
      // this.endGroup.length = 0;
      getPCBStatus().then((res) => {
        console.log(res);
        this.runGroup.splice(0);
        this.readyGroup.splice(0);
        this.waitGroup.splice(0);
        this.endGroup.splice(0);
        res.data.forEach((item, index) => {
          console.log("index", index);
          var inx = parseInt(item.pid) - 1;
          // console.log('inx', inx);
          // console.log(this.pcbs[index]);
          // console.log(item);
          // console.log(index);
          // console.log(item.status);

          if (item.status == 0) {
            // console.log(this.pcbs[inx]);
            this.runGroup.push(this.pcbs[inx]);
          }
          if (item.status == 1) {
            // console.log(this.pcbs[inx]);
            this.readyGroup.push(this.pcbs[inx]);
          }
          if (item.status == 2) {
            // console.log(this.pcbs[inx]);
            this.waitGroup.push(this.pcbs[inx]);
          }
          if (item.status == 3) {
            // console.log(this.pcbs[inx]);
            this.endGroup.push(this.pcbs[inx]);
          }
        });
      });
    },
    deviceStatus() {
      getDeviceStatus().then((res) => {
        console.log(res);
        res.data.devicesLists.forEach((item, index) => {
          console.log(this.devices[index]);
          console.log(item);
          console.log(index);
          console.log(item.occupyStatus);
          if (item.occupyStatus == 1) {
            console.log("aaaa");
            console.log(this.devices[index]);
            this.checkboxGroup1.push(this.devices[index]);
          }
        });
      });
    },
    getDiskOccupy() {
      DiskOccupy().then((res) => {
        console.log("DiskOccupy");
        console.log(res.data);
        var unO = res.data.emptyDiskNum;
        var enO = res.data.totalDiskNum - res.data.emptyDiskNum;
        var unRate = unO / res.data.totalDiskNum;
        var enRate = enO / res.data.totalDiskNum;
        this.diskData.rows.length = 0;
        this.diskData.rows.push({
          占用情况: "已占用",
          占用比: enRate,
        });
        this.diskData.rows.push({
          占用情况: "未占用",
          占用比: unRate,
        });
      });
    },
    diskInfo() {
      listDiskInfo().then((res) => {
        console.log("listDiskInfo");
        console.log(res.data);
        this.diskBlock = res.data;
        console.log(this.diskBlock);
      });
    },
    getPCBData() {
      let runCNT = 0,
        readyCNT = 0,
        waitCNT = 0,
        endCNT = 0;
      var now = this.$moment().format("hh:mm:ss");
      getPCBStatus().then((res) => {
        res.data.forEach((item, index) => {
          console.log(index);
          // console.log(res);
          if (item.status == 0) {
            runCNT++;
          }
          if (item.status == 1) {
            console.log(11111111111);
            readyCNT++;
          }
          if (item.status == 2) {
            waitCNT++;
          }
          if (item.status == 3) {
            endCNT++;
          }
        });
        this.pcbData.rows.push({
          时间: now,
          运行态: runCNT,
          就绪态: readyCNT,
          阻塞态: waitCNT,
          终止态: endCNT,
        });
      });
    },
    getDeviceData() {
      var now = this.$moment().format("hh:mm:ss");
      // console.log(now)
      // console.log(this.chartData)
      getDeviceStatus().then((res) => {
        var rate = (res.data.occupiedNum / res.data.totalNum) * 100;
        console.log(rate);
        console.log(res);
        this.deviceData.rows.push({
          时间: now,
          占用比: rate,
        });
      });

      console.log(111);
    },
    getMemoryData() {
      var now = this.$moment().format("hh:mm:ss");
      // console.log(now)
      // console.log(this.chartData)
      getMemoryStatus().then((res) => {
        var rate = (res.data.totalNum / res.data.occupyNum) * 100;
        console.log(rate);
        console.log(res);
        this.chartData.rows.push({
          时间: now,
          占用比: rate,
        });
      });

      console.log(111);
    },
    processTable() {
      console.log("222");
      getProcessTable().then((res) => {
        this.getProcessTable0 = JSON.parse(JSON.stringify(res.data));
        // this.getProcessTable0 = res.data;
        this.getProcessTable = res.data;
        console.log("this.getProcessTable", this.getProcessTable);
        console.log(res);
      });
    },

    executingProcess() {
      console.log("111");
      getExecutingProcess().then((res) => {
        this.ax = res.data.ax;
        this.id = res.data.id;
        this.ir = res.data.ir;
        this.time = res.data.time;
        console.log(res);
      });
    },
    radioChange1(value) {
      console.log(value);
      if (value == "1") {
        this.processTable();
      }
      if (value == "2") {
        this.getProcessTable.length = 0;
        this.getProcessTable0.forEach((item) => {
          if (item.status == "0") {
            this.getProcessTable.push(item);
          }
        });
      }
      if (value == "3") {
        console.log(1112);
        this.getProcessTable.length = 0;
        this.getProcessTable0.forEach((item) => {
          if (item.status == "1") {
            this.getProcessTable.push(item);
          }
        });
      }
      if (value == "4") {
        this.getProcessTable.length = 0;
        this.getProcessTable0.forEach((item) => {
          if (item.status == "2") {
            this.getProcessTable.push(item);
          }
        });
      }
      if (value == "5") {
        this.getProcessTable.length = 0;
        this.getProcessTable0.forEach((item) => {
          if (item.status == "3") {
            this.getProcessTable.push(item);
          }
        });
      }
    },
    radioChange2(value) {
      console.log(value);
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    handleSelect(key, keyPath) {
      this.activeIndex = key;
      console.log("activeIndex", this.activeIndex);
      console.log(key, keyPath);
    },
    handleSelect1(key, keyPath) {
      this.activeIndex1 = key;
      console.log("activeIndex1", this.activeIndex1);
      console.log(key, keyPath);
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>

<style scoped>
.layout {
  min-width: 1100px;
  min-height: 690px;
  width: 50%;
  height: 40%;
}
.aa {
  display: flex;
  justify-content: center;
  align-items: center;
}

.aa /deep/ .el-checkbox-button__inner {
  padding: 25px 25px;
  font-size: 20px;
  border-radius: 0;
}

.main {
  height: 100%;
  display: flex;
  background-color: #ffffff;
}

.left1 {
  width: 100%;
  height: 100%;
  border-right: 0.1em solid #e5e5e5;
}

.left2 {
  width: 20em;
  border-right: 0.1em solid #e5e5e5;
}

.right1 {
  width: 15em;
  padding-left: 10px;
}

.right2 {
  width: 100%;
  height: 100%;
}
</style>
