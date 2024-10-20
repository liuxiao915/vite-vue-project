<script lang="jsx">
import { ref, h } from 'vue'
export default {
  setup () {
    const countRef = ref(200)
    const render = () => {
      // return <span>JSX--{countRef.value}</span> // jsx就是js语法，所以要加 .value
      return h(ElSelect)
    }
    return render
  }
}
</script>