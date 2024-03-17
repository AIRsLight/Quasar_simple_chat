<template>
  <q-page class="column full-width full-height ">
      <div style="width: 100%;height: 80vh">
        <q-scroll-area class="q-pl-lg q-pr-lg" style="width: 100%;height: 100%" ref="scroll">
          <div >

            <q-chat-message
              :name="msg.role"
              v-for="msg in store.displayMessages"
              :sent="msg.role === 'user'"
            >

                <v-md-preview :text="msg.content" style="max-width: 70vw"/>


              <template v-slot:stamp>
                <div :class="{'q-gutter-lg':true,'row':true,'justify-end':msg.role === 'user'}">
                  <q-icon name="edit" class="">
                    <q-popup-proxy>
                      <div style="background-color: white">
                        <q-input v-model="msg.content" outlined label="修改内容" type="textarea" autogrow/>
                      </div>
                    </q-popup-proxy>
                  </q-icon>
                  <q-icon name="delete" @click="store.deleteMessage(store.messages.indexOf(msg))"></q-icon>
                  <q-icon name="content_copy" @click="copyToClipboard(msg.content)" ></q-icon>
                </div>

              </template>
            </q-chat-message>

          </div>
          <div style="height: 200px"></div>

        </q-scroll-area>
      </div>

      <div class="row q-gutter-sm q-pa-md absolute-bottom bg-white">
        <div class="column justify-center">
          <q-btn :label="role" color="secondary" @click="role = role==='user'? 'assistant':'user'"></q-btn>
        </div>

        <q-input  class="col" outlined v-model="text" label="在这里输入" type="textarea" autogrow/>

        <div class="column justify-center">
          <q-btn label="发送" color="primary" @click="sent" :disable="!text"></q-btn>
        </div>
      </div>


  </q-page>
</template>

<script setup>
import {ref, watch} from "vue";
import {ChatStore} from "stores/chat-store";
import { copyToClipboard } from 'quasar'
import VMdPreview from '@kangc/v-md-editor/lib/preview';
import '@kangc/v-md-editor/lib/style/preview.css';
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';
import '@kangc/v-md-editor/lib/theme/style/github.css';
import hljs from 'highlight.js';

VMdPreview.use(githubTheme, {
  Hljs: hljs,
});


const store = ChatStore()
const  scroll = ref(null)
defineOptions({
  name: 'IndexPage'
});

const text = ref("")
const role = ref("user")
function sent() {
  if (role.value === 'user') {
    store.addUserMessage(text.value)
  } else {
    store.addAssistantMessage(text.value)
  }
  text.value = ""
}
watch(() => store.displayMessages, (n,o) => {
  if(n.length > o.length) {
    scroll.value.setScrollPercentage('vertical', 1.0,0.5)
  }
})


</script>

<style>

.github-markdown-body {
  padding: 8px 8px 8px;
}


</style>
