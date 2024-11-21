import emitter from '@/views/systemTools/formDesign11/utils/emitter'
import eventBus from "@/views/systemTools/formDesign11/utils/event-bus"

export default {
  mixins: [emitter],
  created() {},
  methods: {
    editEventHandler(eventName, eventParams) {
      this.dispatch('SettingPanel', 'editEventHandler', [eventName, [...eventParams]])
    },

  }
}
