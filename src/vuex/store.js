import Vue from 'vue'
import Vuex from 'vuex'
import { getNextType } from '../unit'
import mutations from './mutations'
import { isFocus } from '../unit'
import { blankMatrix, lastRecord, maxPoint, blockType } from '../unit/const'
import Block from '../unit/block'
import { hasWebAudioAPI } from '../unit/music';
Vue.use(Vuex)

