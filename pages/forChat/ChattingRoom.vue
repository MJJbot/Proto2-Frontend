<template>
    <div class="sc-chat-window">
      <Chat
      v-on:close="close"
      :participants="participants"
      :myself="myself"
      :messages="messages"
      :onMessageSubmit="onMessageSubmit"
      :chatTitle="chatTitle"
      :placeholder="placeholder"
      :colors="colors"
      :borderStyle="borderStyle"
      :hideCloseButton="hideCloseButton"
      :closeButtonIconSize="closeButtonIconSize"
      :submitIconSize="submitIconSize"/>
    </div>

</template>

<script>
  import axios from 'axios';
  import Chat from './Chat.vue'
  import { mapMutations } from 'vuex'
  export default {
    components: {
      Chat
    },
    data: () => ({
      participants: [
        {
          name: '무진장 봇',
          id: 1
        }
      ],
      myself: {
        name: '나',
        id: 2
      },
      messages: [
      ],
      chatTitle: '테스트 해보기',
      placeholder: '채팅을 입력해보세요',
      colors:{
        header:{
          bg: '#1d64aa',
          text: '#fff'
        },
        message:{
          myself: {
            bg: '#fff',
            text: '#bdb8b8'
          },
          others: {
            bg: '#fff',
            text: '#a3a3a3'
          }
        },
        submitIcon: '#b91010'
      },
      borderStyle: {
        topLeft: "10px",
        topRight: "10px",
        bottomLeft: "10px",
        bottomRight: "10px",
      },
      hideCloseButton: false,
      submitIconSize: "30px",
      closeButtonIconSize: "30px"
    }),


    methods: {
      ...mapMutations([
          'newMessage'
      ]),
      onMessageSubmit: function(message){
        const api = axios.create({
          withCredentials: true
        });
        // this.messages.push({chat:"hi",myself:false,participantId:1})
        // console.log(message)
        // console.log(Object.assign({chat:message["chat"]},{myself:false,participantId:1}))

        api.post('http://211.254.217.44:8893/chat',message)
        .then((result)=>{
          console.log(result)
          if(result.data!==""&&result.data.reply!==null){
            this.newMessage({chat:result.data.reply,myself:false,participantId:1})

          }
          // this.newMessage(Object.assign({chat:result.data.reply},{myself:false,participantId:1}))

        })

      },
      close(){
        this.$emit('close');
      }
    }
  }



</script>
<style>

.sc-chat-window {
  width: 370px;
  height: calc(100% - 120px);
  max-height: 500px;
  position: fixed;
  right: 15px;
  bottom: 55px;
  box-sizing: border-box;
  box-shadow: 0px 7px 40px 2px rgba(148, 149, 150, 0.1);
  background: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: 0.3s ease-in-out;
  border-radius: 10px;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
}
</style>
