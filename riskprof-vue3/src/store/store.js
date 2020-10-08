import { createStore } from 'vuex'
import actions from './actions';
import mutations from './mutations';
import getters from './getters';


export const store = createStore({
    state: {
        host: 'http://rating.141.riskprof.ru/ajax',
        ratings: []
    },
    getters,
    mutations,
    actions
});