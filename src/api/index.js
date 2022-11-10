import requests from "./request";

//获取系统可执行文件（文件系统表）
export const getFileSystemList = (params) =>
  requests({
    url: "/fileSystem/listSystemFile",
    method: "get",
    params: params,
  });

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

export function getExecutingProcess() {
  return requests({
    url: "/allSystem/getExecutingProcess",
    method: "get",
  });
}

export function getProcessTable() {
  return requests({
    url: "/allSystem/getProcessTable",
    method: "get",
  });
}

export function getMemoryStatus() {
  return requests({
    url: "/allSystem/getMemoryStatus",
    method: "get",
  });
}

export function DiskOccupy() {
  return requests({
    url: "/fileSystem/DiskOccupy",
    method: "get",
  });
}

export function listDiskInfo() {
  return requests({
    url: "/fileSystem/listDiskInfo",
    method: "get",
  });
}

export function getDeviceStatus() {
  return requests({
    url: "/allSystem/getDeviceStatus",
    method: "get",
  });
}

export function getPCBStatus() {
  return requests({
    url: "/allSystem/getPCBStatus",
    method: "get",
  });
}