
import emitter from '../../emitter'
import { eventBus } from '@/utils/eventBus'

export default {
  mixins: [emitter],
  created() { },
  methods: {
    editEventHandler(eventName, eventParams) {
      this.dispatch('SettingPanel', 'editEventHandler', [eventName, [...eventParams]])
    },

  }
}
