import requests from "./request";

//获取当前路径下的文件
export function getCurrentFile(data) {
  return requests({
    url: "/fileSystem/listFileInFolder",
    method: "post",
    data: data,
    headers: { "Content-Type": "text/plain" },
  });
}

//获取当前目录树
export function getCurrentTree() {
  return requests({
    url: "/fileSystem/getFolderTree",
    method: "get",
  });
}

//新建文件夹
export function newFolder(data) {
  return requests({
    url: "/fileSystem/newFolder",
    method: "post",
    data: data,
    headers: { "Content-Type": "text/plain" },
  });
}

//新建文本
export function newFile(data) {
  return requests({
    url: "/fileSystem/newFile",
    method: "post",
    data: data,
    headers: { "Content-Type": "text/plain" },
  });
}

//删除文件夹
export function deleteFolder(data) {
  return requests({
    url: "/fileSystem/deleteFolder",
    method: "delete",
    data: data,
    headers: { "Content-Type": "text/plain" },
  });
}

//删除文本
export function deleteFile(data) {
  return requests({
    url: "/fileSystem/deleteFile",
    method: "delete",
    data: data,
    headers: { "Content-Type": "text/plain" },
  });
}

//获取文本类型和内容
export function openFile(data) {
  return requests({
    url: "/fileSystem/openFile",
    method: "post",
    data: data,
    headers: { "Content-Type": "text/plain" },
  });
}

//保存文本内容
export function saveFile(data) {
  return requests({
    url: "/fileSystem/saveFile",
    method: "put",
    data: data,
    headers: { "Content-Type": "application/json" },
  });
}

//获取文件属性表
export function fileAttribute(data) {
  return requests({
    url: "/fileSystem/fileAttribute",
    method: "post",
    data: data,
    headers: { "Content-Type": "text/plain" },
  });
}

//修改文件属性
export function setAttribute(data) {
  return requests({
    url: "/fileSystem/fileAttribute",
    method: "put",
    data: data,
    headers: { "Content-Type": "application/json" },
  });
}

//获取系统可执行文件（文件系统表）
export const getFileSystemList = (params) =>
  requests({
    url: "/fileSystem/listSystemFile",
    method: "get",
    params: params,
  });

//获取当前运行中进程相关信息
export function getExecutingProcess() {
  return requests({
    url: "/allSystem/getExecutingProcess",
    method: "get",
  });
}

//获取进程状态表
export function getProcessTable() {
  return requests({
    url: "/allSystem/getProcessTable",
    method: "get",
  });
}

//获取内存使用情况
export function getMemoryStatus() {
  return requests({
    url: "/allSystem/getMemoryStatus",
    method: "get",
  });
}

//获取磁盘占用情况
export function DiskOccupy() {
  return requests({
    url: "/fileSystem/DiskOccupy",
    method: "get",
  });
}

//获取磁盘使用情况
export function listDiskInfo() {
  return requests({
    url: "/fileSystem/listDiskInfo",
    method: "get",
  });
}

//获取设备使用情况
export function getDeviceStatus() {
  return requests({
    url: "/allSystem/getDeviceStatus",
    method: "get",
  });
}

//获取PCB使用情况
export function getPCBStatus() {
  return requests({
    url: "/allSystem/getPCBStatus",
    method: "get",
  });
}

//暂停进程调度
export function stopThread() {
  return requests({
    url: "/allSystem/stopThread",
    method: "get",
  });
}

//继续进程调度
export function continueThread() {
  return requests({
    url: "/allSystem/continueThread",
    method: "get",
  });
}
