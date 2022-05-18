export const state = () => ({
  config: {
    // 'domain': "theladsofficial.com",
    'domain': "localhost:3000"
  }
})

export const getters = {
  config: state => {return state.config}
}

export const actions = {}

export const mutations = {}
