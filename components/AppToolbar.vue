<template>
  <v-toolbar
    color="primary"
    fixed
    dark
    app
  >
    <v-toolbar-title class="ml-0">
      <v-toolbar-side-icon @click.stop="toggleDrawer()"></v-toolbar-side-icon>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn icon @click="handleFullScreen()">
      <v-icon>fullscreen</v-icon>
    </v-btn>
    <v-menu offset-y origin="center center" :nudge-right="140" :nudge-bottom="10" transition="scale-transition">
      <v-btn icon large flat slot="activator">
        <v-avatar size="30px">
          <img v-bind:src="user.userImg" alt="userImg"/>
        </v-avatar>
      </v-btn>
      <v-list class="pa-0">
        <v-list-tile @click="gotoChannel()">
          <v-list-tile-content>
            <v-list-tile-title>{{this.user.userName}}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile v-for="(item,index) in items" :to="!item.href ? { name: item.name } : null" :href="item.href"
                     @click="item.click" ripple="ripple" :disabled="item.disabled" :target="item.target" rel="noopener"
                     :key="index">
          <v-list-tile-action v-if="item.icon">
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-menu>
  </v-toolbar>
</template>
<script>
  import axios from 'axios';
  import NotificationList from '@/components/widgets/list/NotificationList';
  import Util from '@/util';

  export default {
    name: 'app-toolbar',
    components: {
      NotificationList
    },
    data:  function () {
      return {
        user:{"userName":"","userImg":"","channel":""},
        items: [
          {
            icon: 'account_circle',
            href: '#',
            title: 'Profile',
            click: (e) => {
              console.log(e);
            }
          },
          {
            icon: 'settings',
            href: '#',
            title: 'Settings',
            click: (e) => {
              console.log(e);
            }
          },
          {
            icon: 'fullscreen_exit',
            href: '#',
            title: 'Logout',
            click: this.handleLogout
          }
        ],
      }
    },
    created: function() {
      this.update()
    },
    computed: {
      toolbarColor() {
        return this.$vuetify.options.extra.mainNav;
      }
    },
    methods: {
      gotoChannel(){
        window.location.href = this.user.channel
      },
      update() {
        const api = axios.create({
          withCredentials: true
        });
        api.get('http://211.254.217.44:8893/user')
        .then((result) => {
          this.user = result.data
        })
      },
      toggleDrawer() {
        this.$store.commit('toggleDrawer')
      },
      handleFullScreen() {
        Util.toggleFullScreen();
      },
      handleLogout() {
        this.$router.push('/login');
      }
    }
  };
</script>
