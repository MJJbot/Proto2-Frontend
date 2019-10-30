<template>
  <v-container grid-list-xl fluid>
    <v-layout row wrap>
      <v-flex sm12>
        <div>봇이 답변하지 못한 질문들을 분석하여 제공해 드립니다.</div>
      </v-flex>
      <v-flex lg12>
        <v-dialog v-model="dialog" persistent max-width="500px">
          <v-card>
            <v-card-title class="headline grey lighten-3">
              <span class="headline">{{editedItem.questionRep}}</span>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12>
                    <v-text-field v-model="editedItem.answer" label="답변"></v-text-field>
                  </v-flex>
                  <v-checkbox :label="`커스텀 Q&A에 추가`" v-model="editedItem.use"></v-checkbox>
                  <v-flex xs12>
                    <v-text-field v-if="editedItem.use" v-model="editedItem.command" label="명령어"></v-text-field>
                    <v-text-field v-else v-model="editedItem.command" disabled label="명령어"></v-text-field>
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
              item-key="questionRep"
              hide-actions
              class="elevation-1"
            >
              <template slot="items" slot-scope="props">
                <tr>
                  <td>
                    <v-btn flat icon color="grey" @click="props.expanded = !props.expanded">
                      <v-icon>keyboard_arrow_down</v-icon>
                    </v-btn>
                  </td>
                  <td>{{ props.item.donationMoney }}원</td>
                  <td>{{ props.item.num }}</td>
                  <td>{{ props.item.questionRep }}</td>
                  <td class="text-xs-center">
                    <v-btn flat icon color="grey" @click="editItem(props.item)">
                      <v-icon>edit</v-icon>
                    </v-btn>
                    <v-btn flat icon color="grey" @click="deleteItem(props.item)">
                      <v-icon>delete</v-icon>
                    </v-btn>
                  </td>
                </tr>
              </template>
              <template slot="expand" slot-scope="props">
                <v-card flat v-for="item in props.item.questionList" v-bind:key="">
                  <v-card-text>{{item.name}}: {{item.question}}</v-card-text>
                </v-card>
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
      check:false,
      dialog:false,
      userName:"",
      imgURL:"",
      editedIndex:-1,
      editedItem: {
        answer: '',
        command: '',
        use:false,
      },
      defaultItem: {
        answer: '',
        command: '',
        use:false,
      },
      headers: [
        {text:'',value:'',sortable:'',width:30},
        { text: '모인 후원금', value: 'donationMoney',width:100 ,sortable: true,filterable: false, },
        { text: '질문 횟수', value: 'num',width:100, sortable: true,filterable: false, },
        {
          text: '자주 나왔던 질문',
          align: 'left',
          sortable: false,
          value: 'question'
        },
        { text: 'Action', value: 'action', sortable: false, align:'center' },

      ],
      questions:[
        {
          "id":"",
          "questionRep":"",
          "questionList":[
            {"name":"","question":""},
            {"name":"","question":""},
          ],
          "donationMoney":0
        },
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
      api.get('http://211.254.217.44:8893/RecommendQA')
      .then((result) => {
        this.questions = result.data.QAlist
        console.log(this.questions)
        for (var i in this.questions){
          console.log(this.questions[i])
          this.questions[i].num = this.questions[i].questionList.length;
        }
        console.log(this.questions)

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
      api.delete('http://211.254.217.44:8893/RecommendQA/'+this.questions[index].id)
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
      console.log(this.editedItem)
      api.put('http://211.254.217.44:8893/RecommendQA/'+this.questions[this.editedIndex].id, this.editedItem)
      .then((result) => {
        this.update()
      })
      this.close()
    },


  }
}
</script>
