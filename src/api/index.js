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
