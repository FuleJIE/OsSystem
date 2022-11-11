# OS课设（仿Windows 10）

### 下载依赖
```
npm install
```

### 启动项目
```
npm run serve
```

### 编译项目
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### 项目目录结构
```
windows 10
├─ public --静态文件
├─ README.md
├─ src --项目根目录
│  ├─ App.vue --入口组件
│  ├─ api --封装axios接口文件
│  ├─ assets --静态资源
│  ├─ components --公用组件
│  │  ├─ ContextMenu.vue --右键菜单
│  │  ├─ FolderButton.vue --桌面图标按钮
│  │  ├─ FolderList.vue --桌面图标列表
│  │  ├─ Folders --各图标组件
│  │  ├─ Home.vue --桌面
│  │  ├─ Layouts --windows窗体
│  │  ├─ MobileWarning.vue
│  │  └─ Navigation --底部状态栏
│  ├─ database --图标数组
│  ├─ helpers --辅助函数
│  ├─ main.js --入口文件
│  └─ store --全局状态（数据）管理
└─ vue.config.js --vue配置文件

```