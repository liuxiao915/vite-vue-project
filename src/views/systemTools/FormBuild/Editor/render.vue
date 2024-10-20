<script lang="jsx">
import { ref, h } from 'vue'
export default {
  props: ['conf'],
  setup (props) {
    const render = () => {
      if(props.conf.tag === 'ElSelect') {
        return h(ElSelect)
      }
    }
    return render
  }
}
</script>