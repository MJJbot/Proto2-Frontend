<template>
  <div id="pageDashboard">
    <v-container grid-list-xl fluid>
      <div v-if="!bot" class="mx-auto">
        <v-btn
          color="primary"
          dark
          @click="botIn"
          @click.stop="dialog = true"
        >
          입장하기
        </v-btn>
      </div>
      <div v-else class="mx-auto">
        <v-btn
          color="primary"
          dark
          @click="botOut"
        >
          퇴장하기
        </v-btn>
      </div>
      <v-dialog v-model="dialog" max-width="500">
      <v-card>
        <v-card-title class="headline">
          봇을 입장시켰습니다.
        </v-card-title>
        <v-card-text>
          트위치 채팅창에서 "/mod mjj"를 입력해주세요.
        </v-card-text>
        <v-divider/>
        <v-card-actions>
          <v-spacer/>
          <v-btn text @click="dialog = false">
            닫기
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    </v-container>
  </div>
</template>

<script>
  export default {

    layout: 'dashboard',
    data: () => ({

      bot:false,
      dialog:false,
    }),
    methods: {
      botIn(){
        //봇 입장시 api호출!
        this.bot = true
      },
      botOut(){
        //봇 퇴장시 api호출!
        this.bot = false
      },
      
    }

  };
</script>

<style>
  @import url(http://cdn.jsdelivr.net/font-nanum/1.0/nanumbarungothic/nanumbarungothic.css);
  td,div {
    font-family: 'Nanum Barun Gothic', sans-serif;
  }
</style>
