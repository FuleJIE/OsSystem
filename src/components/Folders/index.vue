<template>
  <component v-if="comp" :is="comp" />
</template>

<script>
import Chrome from "./Chrome";
import FileExplorer from "./FileExplorer";
import TaskManager from "./TaskManager";
import NewTxt from "./NewTxt.vue";
import FileAttribute from "./FileAttribute.vue";
import Twitter from "./Twitter";
import WeChat from "./WeChat";
import QQ from "./QQ";
import DingTalk from "./DingTalk";
import VsCode from "./VsCode";
import CloudMusic from "./CloudMusic";
import IDEA from "./IDEA";
import GithubFinder from "./GithubFinder";
import ChangeBackground from "./ChangeBackground";
import CardGame from "./CardGame";
import Bilibili from "./Bilibili";
import Minecraft from "./Minecraft";
import Store from "./Store.vue";
export default {
  name: "Folder",
  props: {
    comp: {
      required: true,
      type: String,
    },
  },
  components: {
    FileExplorer,
    TaskManager,
    NewTxt,
    FileAttribute,
    ChangeBackground,
    GithubFinder,
    IDEA,
    CloudMusic,
    VsCode,
    DingTalk,
    QQ,
    WeChat,
    Chrome,
    Twitter,
    CardGame,
    Bilibili,
    Minecraft,
    Store,
  },
};
</script>
