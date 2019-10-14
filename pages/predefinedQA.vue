<template>
  <v-container grid-list-xl fluid>
    <v-layout row wrap>
      <v-flex sm12>
        <h3>pre-defined Questions</h3>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <div>스트리밍 중 자주 나오는 질문들에 대한 답변을 만들어 보세요.</div>
      </v-flex>
      <v-flex lg12 sm12>
        <div slot="widget-content">
          <div class="basic">
            <v-radio-group v-model="search" :mandatory="true" row>
              <v-radio label="전체" value="" color="pink"></v-radio>
              <v-radio label="프로필" value="프로필" color="secondary"></v-radio>
              <v-radio label="방송 설정" value="방송 설정" color="teal"></v-radio>
              <v-radio label="게임 설정" value="장비 설정" color="teal"></v-radio>
              <v-radio label="게임 설정" value="게임 설정" color="teal"></v-radio>
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
                  <span class="headline">Q&A 수정</span>
                </v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                  <v-container grid-list-md>
                    <v-layout wrap>
                      <v-flex xs12>
                        <v-text-field v-if="editedIndex===-1" v-model="editedItem.Question" label="질문"></v-text-field>
                        <v-text-field v-else v-model="editedItem.Question" disabled label="질문"></v-text-field>
                      </v-flex>
                      <v-flex xs12>
                        <v-text-field v-model="editedItem.Command" label="명령어"></v-text-field>
                      </v-flex>
                      <v-flex xs12>
                        <v-text-field v-model="editedItem.Answer" label="답변"></v-text-field>
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
              select-all
              v-model="selected"
            >
              <template slot="items" slot-scope="props">
                <td>
                  <v-checkbox
                    primary
                    hide-details
                    v-model="props.selected"
                  ></v-checkbox>
                </td>
                <td>{{ props.item.Category }}</td>
                <td>{{ props.item.Type }}</td>
                <td>{{ props.item.Question }}</td>
                <td>{{ props.item.Command }}</td>
                <td>{{ props.item.Answer }}</td>
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
          type:'',
          Question: '',
          Answer: '',
          Command: ''
        },
        headers: [
          {text:'카테고리',value:'Category',sortable: false,},
          {
            text: '질문유형',
            align: 'left',
            sortable: false,
            value: 'Type'
          },
          { text: '질문 예시', value: 'Question',sortable: false,},
          { text: '명령어', value: 'Command',sortable: false, },
          { text: '답변 예시', value: 'Answer',sortable: false,filterable: false, },
          { text: 'Action', value: 'action', sortable: false, align:'center' },

        ],
        questions:[
        {Category:"프로필",Type:"이름",Question:"이름이 뭐에요?",Command:"!이름",Answer:"게임 방송하는 김민재라고합니다.",c_id:"1"},
        {Category:"프로필",Type:"나이",Question:"나이가 어떻게 되세요?",Command:"!나이",Answer:"21살입니다.",c_id:"1"},
        {Category:"방송 설정",Type:"게임",Question:"오늘 게임 뭐해요?",Command:"!오늘게임",Answer:"1부 롤, 2부 하스스톤입니다.",c_id:"2"},
        {Category:"장비 설정",Type:"마우스",Question:"마우스 뭐 쓰세요?",Command:"!마우스",Answer:"",c_id:"3"},
        {Category:"프로필",Type:"롤티어",Question:"지금 롤 티어가 어디임?",Command:"!롤티어",Answer:"",c_id:"3"}
        ],
        colors: {
          processing: 'blue',
          sent: 'red',
          delivered: 'green'
        }
      };
    },
    created: function() {
      this.update()
    },
    computed: {

    },
    methods: {
      update () {
        const api = axios.create({
          withCredentials: true
        });
        api.get('http://211.254.217.44:8893/predefinedQA')
        .then((result) => {
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
        api.delete('http://211.254.217.44:8893/predefinedQA/'+this.questions[index].id)
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
        const api = axios.create({
          withCredentials: true
        });
        api.put('http://211.254.217.44:8893/predefinedQA/'+this.questions[this.editedIndex].id, this.editedItem)
        .then((result) => {
          this.update()
        })
        this.close()
      },


    }
  }
</script>
