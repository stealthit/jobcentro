import { defineComponent } from 'vue'

const Pagination = defineComponent({
  name: 'Pagination',
  render() {
    return (
      <div class="pageWrap">
        <a href=""><img class="ic-first-32" /></a>
        <a href=""><img class="ic-arr-prev-32" /></a>        
        <ul class="pagination">
          <li class="cur"><a href="">1</a></li>
          <li><a href="">2</a></li>
          <li><a href="">3</a></li>
          <li><a href="">4</a></li>
          <li><a href="">5</a></li>
          <li><a href="">6</a></li>
          <li><a href="">7</a></li>
          <li><a href="">8</a></li>
          <li><a href="">9</a></li>
          <li><a href="">10</a></li>
        </ul>
        <a href=""><img class="ic-arr-next-32" /></a>
        <a href=""><img class="ic-last-32" /></a>
      </div>
    )
  }
})

export default Pagination