<template>
  <v-container grid-list-xl fluid>
    <v-layout row wrap>
      <v-flex sm12>
        <div>자주 나오는 질문들을 제공해 드립니다.</div>
      </v-flex>
      <v-flex lg12 sm12>
        <div slot="widget-content">
          <div class="basic">
            <v-radio-group v-model="search" :mandatory="true" row>
              <v-radio label="전체" value="" color="#1d64aa"></v-radio>
              <v-radio label="프로필" value="프로필" color="#1d64aa"></v-radio>
              <v-radio label="방송 설정" value="방송 설정" color="#1d64aa"></v-radio>
              <v-radio label="게임 설정" value="장비 설정" color="#1d64aa"></v-radio>
              <v-radio label="게임 설정" value="게임 설정" color="#1d64aa"></v-radio>
            </v-radio-group>
          </div>
        </div>
      </v-flex>
      <v-flex lg12>
        <v-card>
          <v-toolbar card color="white">
            <v-toolbar-title v-if="search===''"><h4>전체</h4></v-toolbar-title>
            <v-toolbar-title v-else><h4>{{search}}</h4></v-toolbar-title>
            <v-divider
              class="mx-4"
              inset
              vertical
            ></v-divider>
            <div></div>
            <v-dialog v-model="dialog" persistent max-width="500px">
              <v-card>
                <v-card-title class="headline grey lighten-3">
                  <span class="headline">{{editedItem.type}}</span>
                </v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                  <v-container grid-list-md>
                    <v-layout wrap>
                      <v-flex xs12>
                        <v-text-field v-if="editedIndex===-1" v-model="editedItem.command" label="명령어"></v-text-field>
                        <v-text-field v-else v-model="editedItem.command" disabled label="명령어"></v-text-field>
                      </v-flex>
                      <v-flex xs12>
                        <v-text-field v-model="editedItem.question" disabled label="질문 예시"></v-text-field>
                      </v-flex>
                      <v-flex xs12>
                        <v-text-field v-model="editedItem.answer" label="답변"></v-text-field>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-card-text>
                <v-divider/>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" flat @click="close">Cancel</v-btn>
                  <v-btn color="blue darken-1" flat @click="save">Save</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
          <v-divider></v-divider>
          <v-card-text class="pa-0">
            <v-data-table
              :headers="headers"
              :search="search"
              :items="questions"
              hide-actions
              class="elevation-1"
              item-key="Question"
              v-model="selected"
            >
              <template slot="items" slot-scope="props">
                <td><v-switch v-on:change="change(props.item)" hide-details color="#1d64aa" v-model="props.item.enabled"></v-switch></td>
                <td>{{ props.item.category }}</td>
                <td>{{ props.item.type }}</td>
                <td>{{ props.item.question }}</td>
                <td>{{ props.item.command }}</td>
                <td>{{ props.item.answer }}</td>
                <td class="text-xs-center">
                  <v-btn flat icon color="grey" @click="editItem(props.item)">
                    <v-icon>edit</v-icon>
                  </v-btn>
                  <v-btn flat icon color="grey" @click="deleteItem(props.item)">
                    <v-icon>delete</v-icon>
                  </v-btn>
                </td>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-flex>


    </v-layout>
  </v-container>

</template>

<script>
  import axios from 'axios';
  export default {
    layout: "dashboard",
    data(){
      return {
        dialog:false,
        radio:"111",
        userName:"",
        imgURL:"",
        selected:[],
        search:'',
        editedIndex:-1,
        editedItem: {
          enabled:true,
          type:'',
          question: '',
          answer: '',
          command: ''
        },
        headers: [
          {text:'On/Off',value:'',sortable:false},
          {text:'카테고리',value:'category',sortable: false,},
          {
            text: '질문유형',
            align: 'left',
            sortable: false,
            value: 'type'
          },
          { text: '질문 예시', value: 'question',sortable: false,},
          { text: '명령어', value: 'command',sortable: false, },
          { text: '답변 예시', value: 'answer',sortable: false,filterable: false, },
          { text: 'Action', value: 'action', sortable: false, align:'center' },

        ],
        questions:[
        ],
      };
    },
    created: function() {
      this.update()
    },
    computed: {
    },
    methods: {
      change(param){
        // console.log(param)
        const api = axios.create({
          withCredentials: true
        });
        setTimeout(100)
        api.put('http://211.254.217.44:8893/predefinedQA/'+param.qid, param)
        .then(()=>{
          this.update()
        })
      },
      update () {
        const api = axios.create({
          withCredentials: true
        });
        api.get('http://211.254.217.44:8893/predefinedQA')
        .then((result) => {
          console.log(result.data)
          this.questions = result.data.QAlist
          this.userName = result.data.userName
          this.imgURL = result.data.userImg
        })
      },

      editItem (item) {
        this.editedIndex = this.questions.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        const index = this.questions.indexOf(item)
        const api = axios.create({
          withCredentials: true
        });
        // confirm('Are you sure you want to delete this item?') &&
        api.delete('http://211.254.217.44:8893/predefinedQA/'+this.questions[index].qid)
        .then(()=>{
          this.update()
        })
      },

      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },

      save () {
        if(this.editedItem.answer===''){
          alert('빈칸은 싫어요!')
        }
        else{
          const api = axios.create({
            withCredentials: true
          });
          this.editedItem.enabled=true
          api.put('http://211.254.217.44:8893/predefinedQA/'+this.questions[this.editedIndex].qid, this.editedItem)
          .then((result) => {
            console.log(this.editedItem)
            this.update()
          })
          this.close()
        }
      },


    }
  }
</script>
