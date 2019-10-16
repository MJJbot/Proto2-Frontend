<template>
  <v-app id="login" class="primary">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4 lg4>
            <v-card class="elevation-1 pa-3">
              <v-card-text>
                <div class="layout column align-center">
                  <img src="../static/background.png" alt="MuJinJang BOT" width="300">
                  <img src="../static/logo.png" alt="MuJinJang BOT" width="300">
                  <h1 class="flex my-4 primary--text"></h1>
                  <div>최신 인싸템!</div>
                  <div>무진장 봇과 함께하세요!</div>
                </div>
              </v-card-text>
              <v-card-actions>
                <v-btn block color="primary" @click="login1" :loading="loading1">스트리머 로그인</v-btn>
                <v-btn block color="primary" @click="login2" :loading="loading2">시청자 로그인</v-btn>
              </v-card-actions>
              <v-btn block color="primary" @click="login3" href="http://211.254.217.44:8893/auth/oauth/twitch" :loading="loading3">진짜 로그인</v-btn>

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
    }),

    methods: {
      login1() {
        this.loading1 = true;
        setTimeout(() => {
          this.$router.push('/dashboard');
        }, 1000);
      },
      login2() {
        this.loading2 = true;
        setTimeout(() => {
          this.$router.push('/dashboard');
        }, 1000);
      },
      login2() {
        this.loading3 = true;
      },
    }

  };
</script>
<style scoped lang="css">
  @import url(http://cdn.jsdelivr.net/font-nanum/1.0/nanumbarungothic/nanumbarungothic.css);
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

</style>
