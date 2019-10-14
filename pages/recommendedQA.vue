<template>
  <v-container grid-list-xl fluid>
    <v-layout row wrap>
      <v-flex sm12>
        <h3>recommended QA</h3>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <div>최근 스트리밍의 채팅을 분석하여 ...</div>
      </v-flex>
      <v-flex lg12>
        <v-card>
          <v-toolbar card color="white">
            <v-toolbar-title><h4>recommendedQA</h4></v-toolbar-title>
            <v-divider
              class="mx-4"
              inset
              vertical
            ></v-divider>
            <div></div>
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
                        <v-text-field v-else v-model="editedItem.Type" disabled label="질문"></v-text-field>
                      </v-flex>
                      <v-flex xs12>
                        <v-text-field v-model="editedItem.Command" label="명령어"></v-text-field>
                      </v-flex>
                      <v-flex xs12>
                        <v-text-field v-model="editedItem.Answer" label="답변 포맷"></v-text-field>
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
              :items="questions"
              hide-actions
              class="elevation-1"
            >
              <template slot="items" slot-scope="props">
                <td>
                  <v-checkbox
                    primary
                    hide-details
                    v-model="props.selected"
                  ></v-checkbox>
                </td>
                <td>{{ props.item.Type }}</td>
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
      userName:"",
      imgURL:"",
      editedIndex:-1,
      editedItem: {
        type:'',
        Question: '',
        Answer: '',
        Command: ''
      },
      headers: [
        {
          text: '자주 나왔던 질문',
          align: 'left',
          sortable: false,
          value: 'Type'
        },
        { text: '명령어', value: 'Command',sortable: false, },
        { text: '답변', value: 'Answer',sortable: false,filterable: false, },
        { text: '모인 후원금', value: 'Answer',sortable: false,filterable: false, },
        { text: '질문 횟수', value: 'Answer',sortable: false,filterable: false, },
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
    update () {
      const api = axios.create({
        withCredentials: true
      });
      api.get('http://211.254.217.44:8893/recommendedQA')
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
      api.delete('http://211.254.217.44:8893/recommendedQA/'+this.questions[index].id)
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
      api.put('http://211.254.217.44:8893/recommendedQA/'+this.questions[this.editedIndex].id, this.editedItem)
      .then((result) => {
        this.update()
      })
      this.close()
    },


  }
}
</script>
