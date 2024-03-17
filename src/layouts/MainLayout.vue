<template>
  <q-layout view="hHh lpR fFf">

    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
          </q-avatar>
          Quasar Chat
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered>
      <div class="column q-gutter-lg q-pa-md">
        <q-input outlined label="api地址" hint="http://127.0.0.1:8080" v-model="store.address"></q-input>
        <q-input outlined label="system" type="textarea" autogrow v-model="store.system"></q-input>
        <q-input outlined label="pre" type="textarea" autogrow v-model="store.pre"></q-input>
        <div>
          <q-badge color="secondary">
            temperature
          </q-badge>
          <q-slider v-model="store.temperature" :min="0" :max="1" :step="0.1" label markers/>
        </div>

        <q-btn label="清除对话" icon="delete" color="warning" @click="store.clear()"></q-btn>
      </div>

    </q-drawer>

    <q-page-container style="">
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script setup>
import {computed, ref, watch} from 'vue'
import {ChatStore} from "stores/chat-store";
const leftDrawerOpen = ref(false)
const store = ChatStore()



function toggleLeftDrawer () {
  leftDrawerOpen.value = !leftDrawerOpen.value
}


</script>
