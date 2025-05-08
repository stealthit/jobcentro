import { defineComponent, PropType, computed  } from 'vue'

export type PaginationData = {
  total: number;      // 전체 항목 수
  totalPage: number;  // 전체 페이지 수
  pageSize: number;   // 페이지당 항목 수
  currentPage: number; // 현재 페이지
};

const Pagination = defineComponent({
  name: 'Pagination',
  props: {
    paginationData: {
      type: Object as PropType<PaginationData>,
      required: true
    }
  },
  emits: ['change-page'],
  setup(props, { emit }) {
    // 현재 페이지와 전체 페이지 계산
    const currentPage = computed(() => props.paginationData.currentPage);
    const totalPage = computed(() => props.paginationData.totalPage);
    
    // 시작 항목과 끝 항목 계산
    const startItem = computed(() => {
      return (props.paginationData.currentPage - 1) * props.paginationData.pageSize + 1;
    });
    
    const endItem = computed(() => {
      const end = startItem.value + props.paginationData.pageSize - 1;
      return end > props.paginationData.total ? props.paginationData.total : end;
    });
    
    // 현재 페이지 그룹 계산
    const currentGroup = computed(() => {
      return Math.ceil(currentPage.value / props.paginationData.pageSize);
    });

    // 현재 그룹의 시작 페이지
    const startPage = computed(() => {
      return (currentGroup.value - 1) * props.paginationData.pageSize + 1;
    });

    // 현재 그룹의 끝 페이지
    const endPage = computed(() => {
      const end = currentGroup.value * props.paginationData.pageSize;
      return end > totalPage.value ? totalPage.value : end;
    });

    // 페이지 번호 배열 생성
    const pageNumbers = computed(() => {
      const pages = [];
      for (let i = startPage.value; i <= endPage.value; i++) {
        pages.push(i);
      }
      return pages;
    });

    // 페이지 이동 함수
    const goToPage = (page: number) => {
      if (page < 1 || page > totalPage.value || page === currentPage.value) {
        return;
      }
      emit('change-page', page);
    };

    // 처음 페이지로 이동
    const goToFirstPage = () => {
      if (currentPage.value !== 1) {
        emit('change-page', 1);
      }
    };

    // 마지막 페이지로 이동
    const goToLastPage = () => {
      if (currentPage.value !== totalPage.value) {
        emit('change-page', totalPage.value);
      }
    };

    // 이전 페이지 그룹으로 이동
    const goToPrevPage = () => {
      if (currentPage.value > 1) {
        emit('change-page', currentPage.value - 1);
      }
    };

    // 다음 페이지 그룹으로 이동
    const goToNextPage = () => {
      if (endPage.value != currentPage.value) {
        emit('change-page', currentPage.value + 1);
      }
    };

    return {
      pageNumbers,
      currentPage,
      totalPage,
      startItem,
      endItem,
      totalItems: props.paginationData.total,
      goToPage,
      goToFirstPage,
      goToLastPage,
      goToPrevPage,
      goToNextPage
    };
  },
  render() {
    return (
      <div class="pageWrap">
        <a 
          href="javascript:void(0);" 
          onClick={this.goToFirstPage} 
          class={this.currentPage === 1 ? '' : ''}
        >
          <img class="ic-first-32" alt="첫 페이지" />
        </a>
        <a 
          href="javascript:void(0);" 
          onClick={this.goToPrevPage} 
          class={this.currentPage === 1 ? '' : ''}
        >
          <img class="ic-arr-prev-32" alt="이전 그룹" />
        </a>        
        <ul class="pagination">
          {this.pageNumbers.map(page => (
            <li 
              key={page} 
              class={page === this.currentPage ? 'cur' : ''}
            >
              <a 
                href="javascript:void(0);" 
                onClick={() => this.goToPage(page)}
              >
                {page}
              </a>
            </li>
          ))}
        </ul>
        <a 
          href="javascript:void(0);" 
          onClick={this.goToNextPage} 
          class={this.currentPage === this.totalPage ? '' : ''}
        >
          <img class="ic-arr-next-32" alt="다음 그룹" />
        </a>
        <a 
          href="javascript:void(0);" 
          onClick={this.goToLastPage} 
          class={this.currentPage === this.totalPage ? '' : ''}
        >
          <img class="ic-last-32" alt="마지막 페이지" />
        </a>
      </div>
    );
  }
})

export default Pagination