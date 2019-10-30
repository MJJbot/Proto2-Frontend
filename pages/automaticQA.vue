<template>
  <v-container grid-list-xl fluid>
    <v-layout row wrap>
      <v-flex sm12>
        <div>응답을 자동으로 관리해 드립니다.</div>
      </v-flex>
      <v-flex lg12 sm12 xs12>
        <v-dialog v-model="dialog" persistent max-width="500px">
          <v-card>
            <v-card-title class="headline grey lighten-3">
              <span class="headline">답변 포맷 수정</span>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12>
                    <v-text-field v-if="editedIndex===-1" v-model="editedItem.Type" label="질문"></v-text-field>
                    <v-text-field v-else v-model="editedItem.type" disabled label="질문"></v-text-field>
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field v-model="editedItem.command" disabled label="명령어"></v-text-field>
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field v-model="editedItem.answer" label="답변 포맷"></v-text-field>
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
        <v-card>
          <v-card-text class="pa-0">
            <v-data-table
              :headers="headers"
              :items="questions"
              hide-actions
              class="elevation-1"
            >
              <template slot="items" slot-scope="props">
                <td><v-switch v-on:change="change(props.item)" hide-details color="#1d64aa" v-model="props.item.enabled"></v-switch></td>
                <td>{{ props.item.type }}</td>
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
        type:'',
        question: '',
        answer: '',
        command: '',
        enabled: true
      },
      headers: [
        {text:"On/Off",value:'',sortable:false},
        {
          text: '질문 타입',
          align: 'left',
          sortable: false,
          value: 'Type'
        },
        { text: '명령어', value: 'Command',sortable: false, },
        { text: '답변 포맷', value: 'Answer',sortable: false,filterable: false, },
        { text: 'Action', value: 'action', sortable: false, align:'center' },

      ],
      questions:[
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
    change(param){
      console.log(param)
      const api = axios.create({
        withCredentials: true
      });
      api.put('http://211.254.217.44:8893/automaticQA/'+param.qid, param)
      .then(()=>{
        this.update()
      })
    },
    update () {
      const api = axios.create({
        withCredentials: true
      });
      api.get('http://211.254.217.44:8893/automaticQA')
      .then((result) => {
        this.questions = result.data.QAlist
        this.userName = result.data.userName
        this.imgURL = result.data.userImg
        console.log(result)
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
      confirm('Are you sure you want to delete this item?') &&
      api.delete('http://211.254.217.44:8893/automaticQA/'+this.questions[index].qid)
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
        this.editedItem.enabled = true
        console.log(this.editedItem)
        api.put('http://211.254.217.44:8893/automaticQA/'+this.questions[this.editedIndex].qid, this.editedItem)
        .then((result) => {
          this.update()
        })
        this.close()
      }
    },


  }
}
</script>
