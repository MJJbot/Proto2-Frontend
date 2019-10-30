<template>
  <v-container grid-list-xl fluid>
    <v-layout row wrap>
      <v-flex sm12>
        <div>비슷한 질문이 들어오면 대신 답변을 해 드립니다.</div>
      </v-flex>
      <v-flex lg12 sm12 xs12>
        <v-toolbar card dense color="transparent">
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" persistent max-width="500px">
            <v-btn color="primary" dark slot="activator">Q&A 추가</v-btn>
            <v-card>
              <v-card-title class="headline grey lighten-3">
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>
              <v-divider></v-divider>
              <v-card-text>
                <v-container grid-list-md>
                  <v-layout wrap>
                    <v-flex xs12>
                      <v-text-field v-if="editedIndex===-1" v-model="editedItem.question" label="질문"></v-text-field>
                      <v-text-field v-else v-model="editedItem.question" disabled label="질문"></v-text-field>
                    </v-flex>
                    <v-flex xs12>
                      <v-text-field v-model="editedItem.command" label="명령어"></v-text-field>
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
        <v-card>
          <v-divider></v-divider>
          <v-card-text class="pa-0">
            <template>
              <v-data-table
                :headers="headers"
                :items="questions"
                hide-actions
                v-model="selected"
                item-key="question"
                class="elevation-0 table-striped"
              >
                <template slot="items" slot-scope="props">
                  <!-- <td>
                    <v-checkbox
                      primary
                      hide-details
                      v-model="props.selected"
                    ></v-checkbox>
                  </td> -->

                  <td><v-switch v-on:change="change(props.item)" hide-details color="#1d64aa" v-model="props.item.enabled"></v-switch></td>
                  <td class="text-xs-left">{{ props.item.question }}</td>
                  <td class="text-xs-left">{{ props.item.command }}</td>
                  <td class="text-xs-left">{{ props.item.answer }}</td>
                  <td class="text-xs-center">

                    <v-btn flat icon color="grey" @click="editItem(props.item)">
                      <v-icon>edit</v-icon>
                    </v-btn>
                    <v-btn flat icon color="grey" @click="deleteItem(props.item)">
                      <v-icon>delete</v-icon>
                    </v-btn>
                  </td>
                  <!-- <td class="text-xs-center">
                    <template v-slot:item.action="{ item }">
                      <v-icon
                        class="mr-2"
                        @click="editItem(item)"
                      >
                        edit
                      </v-icon>
                      <v-icon
                        @click="deleteItem(item)"
                      >
                        delete
                      </v-icon>
                    </template>
                  </td> -->
                </template>
              </v-data-table>
            </template>
            <v-divider></v-divider>
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
    data:()=>({
      dialog: false,
      userName:'',
      s1:true,
      imgURL:'',
      selected:[],
      headers: [
          {text:"On/off",value:'',sortable:false},
          {
            text: '질문',
            align: 'left',
            value: 'question',
            sortable:false,
          },
          { text: '명령어', value: 'command',sortable:false,},
          { text: '답변', value: 'answer',sortable:false,},
          { text: 'Actions', value: 'action',align:'center',sortable:false,}
      ],
      editedIndex: -1,
      editedItem: {
        id:'',
        question: '',
        command:'',
        answer: '',
        enabled: true,
      },
      defaultItem: {
        id:'',
        question: '',
        command: '',
        answer: '',
        enabled: true,
      },
      questions: [],

    }),
    computed: {
      formTitle () {
        return this.editedIndex === -1 ? '질문 추가' : '질문 수정'
      },
    },
    watch: {
      dialog (val) {
        val || this.close()
      },
    },
    created: function() {
      this.update()
    },
    methods: {
      change(param){
        console.log(param)
        const api = axios.create({
          withCredentials: true
        });
        api.put('http://211.254.217.44:8893/customQA/'+param.id, param)
        .then(()=>{
          this.update()
        })
      },
      update () {
        const api = axios.create({
          withCredentials: true
        });
        api.get('http://211.254.217.44:8893/customQA')
        .then((result) => {
          console.log(result)
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

//delete 테스트 필요
      deleteItem (item) {
        const index = this.questions.indexOf(item)
        const api = axios.create({
          withCredentials: true
        });
        confirm('Are you sure you want to delete this item?') &&
        api.delete('http://211.254.217.44:8893/customQA/'+this.questions[index].id)
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
        if(this.editedItem.command===''||this.editedItem.question===''||this.editedItem.answer===''){
          alert('빈칸은 싫어요!')
        }
        else{
          const api = axios.create({
            withCredentials: true
          });
          if (this.editedIndex > -1) {
            // this.questions[this.editedIndex] = this.editedItem
            api.put('http://211.254.217.44:8893/customQA/'+this.questions[this.editedIndex].id, this.editedItem)
            .then(()=>{
              this.update()
            })
          } else {
            // this.questions.push(this.editedItem);
            api.post('http://211.254.217.44:8893/customQA',this.editedItem)
            .then(()=>{
              this.update()
            })
          }
          this.close()
        }
      },

    }

  }
</script>

<!-- 폰트 어떻게 하는지 잘 모른다. -->
<style>
  @import url(http://cdn.jsdelivr.net/font-nanum/1.0/nanumbarungothic/nanumbarungothic.css);
  td,div {
    font-family: 'Nanum Barun Gothic', sans-serif;
  }
</style>
