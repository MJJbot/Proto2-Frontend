<template>
  <v-app id="login" class="aa">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4 lg4>
            <v-card class="elevation-1 pa-3">
              <v-card-text>
                <div class="layout column align-center">
                  <h1 class="flex my-4 mjj">무진장 봇</h1>
                  <h4>불편한 명령어 등록은 그만!</h4>
                  <div>시청자들의 질문을 이해하는 무진장 봇과 함께하세요!</div>
                </div>
              </v-card-text>
              <v-card-actions>
                <v-btn :height=200 block dark color="#1d64aa" @click.stop="dialog = true" :loading="loading1">스트리머 로그인</v-btn>
                <v-dialog v-model="dialog" max-width="500">
                  <v-card>
                    <v-card-title class="headline">
                      스트리머 로그인
                      <v-spacer></v-spacer>
                      <v-icon @click.stop="dialog = false">cancel</v-icon>
                    </v-card-title>
                    <v-card-actions>
                      <v-btn block dark color='#6441A5' @click="login1">트위치 로그인</v-btn>
                    </v-card-actions>
                    <v-card-actions>
                      <v-btn block dark color='#cd201f'>유튜브 로그인</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
                <v-btn block dark color="#1d64aa" @click="login2" :loading="loading2">시청자 로그인</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  export default {
    layout: 'default',
    data: () => ({
      loading1: false,
      loading2: false,
      loading3: false,
      dialog: false,
    }),

    methods: {

      login2() {
        this.loading2 = true;
        setTimeout(() => {
          this.$router.push('/chat/messaging');
        }, 500);
      },
      login1() {
        this.loading1 = true;
        setTimeout(() => {
          window.location.href = "http://211.254.217.44:8893/auth/oauth/twitch"
        }, 500);
        this.dialog = false
      },
    }

  };
</script>
<style scoped scoped lang="css">
  @import url(http://cdn.jsdelivr.net/font-nanum/1.0/nanumbarungothic/nanumbarungothic.css);
  @font-face {
    font-family: 'mjj';
    src: url(../static/font/mjj.ttf) format('truetype');
  }
  .mjj {
    font-family: mjj;
    font-size: 100px;
  }
  td,div {
    font-family: 'Nanum Barun Gothic', sans-serif;
  }
  #login {
    height: 50%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    content: "";
    z-index: 0;
  }
  .aa {
    background-color:#1d64aa;
    border-color:#1d64aa;
  }
</style>
