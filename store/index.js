export const state = () => ({
  drawer: true,
  messages: [],
  myself:{},
  participants: [],
  chatTitle: '',
  placeholder: '',
})

export const mutations = {
  toggleDrawer(state) {
    state.drawer = !state.drawer
  },
  drawer(state, val) {
    state.drawer = val
  },
  newMessage: (state, message) => {
    state.messages = [...state.messages, message];
  },
  setParticipants: (state, participants) => {
    state.participants = participants;
  },
  setMyself: (state, myself) => {
    state.myself = myself;
  },
  setMessages: (state, messages) => {
    state.messages = messages;
  },
  setChatTitle: (state, title) => {
    state.chatTitle = title;
  },
  setPlaceholder: (state, placeholder) => {
    state.placeholder = placeholder;
  }
}

export const getters = {
  getParticipantById: (state) => (id) => {
    let curr_participant;
    state.participants.forEach(participant => {
      if(participant.id == id){
        curr_participant = participant;
      }
    })

    return curr_participant;
  }
}
