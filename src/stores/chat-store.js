import { defineStore } from 'pinia';
import axios from "axios";
import {Notify} from "quasar";

export const ChatStore = defineStore('Chat', {
  state: () => ({
    messages: [{
      "role":"system",
      "content":""
    },{
      "role":"assistant",
      "content":""
    }],
    address:"",
    temperature:0.7,
    system:"",
    pre:"",
    loading:false,

  }),
  persist: true,
  getters: {
    fullAddress: (state) => state.address+"/v1/chat/completions",
    displayMessages: (state) => state.messages.slice(2),
    httpBody() {
      this.messages[0].content = this.system
      this.messages[1].content = this.pre
      return {
        messages:this.messages,
        temperature: this.temperature,
      }
    }
  },
  actions: {
    clear(){
      this.messages = this.messages.slice(0,2)
    },
    addAssistantMessage(content){
      this.messages.push({
        "role":"assistant",
        "content":content
      })
    },
    deleteMessage(index){
      this.messages.splice(index, 1)
    },
    addUserMessage(content){
      this.messages.push({
        "role":"user",
        "content":content
      })
      this.loading = true
      axios.post(this.fullAddress, this.httpBody).then(r => {
        this.loading = false
        this.messages.push(r.data.choices[0].message)


      }).catch(err=>{
        Notify.create({
          message: "发生错误",
          color: "negative",
          position: "top",
          timeout: 2000
        })
        this.loading = false
      })
    },
    reGeneration(){
      const last = this.messages[this.messages.length-1]
      if(last.role === "user"){
      }
      if(last.role === "assistant"){
        this.messages.splice(this.messages.length-1,1)
      }
      this.loading = true
      axios.post(this.fullAddress, this.httpBody).then(r => {
        this.loading = false
        this.messages.push(r.data.choices[0].message)


      }).catch(err=>{
        this.loading = false
        Notify.create({
          message: "发生错误",
          color: "negative",
          position: "top",
          timeout: 2000
        })
      })
    }
  },
});
