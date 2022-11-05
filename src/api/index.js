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
