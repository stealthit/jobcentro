import { defineComponent, PropType, ref } from 'vue'
import styles from './index.module.scss'
import Pagination from '../components/pagination'

export type TableColumn = {
  key: string;       // 데이터의 키 값
  title: string;     // 표시될 헤더 제목
  width: number; // 열의 너비 (px 단위)
};

const BaseTable = defineComponent({
  name: 'BaseTable',
  props: { 
    tableHeader: {
      type: Array as PropType<TableColumn[]>,
      required: true
    },
    tableData: {
      type: Array,
      required: true
    },
    tableItemCount: {
      type: Number,
      default: 0
    },
    currentPage: {
      type: Number,
      default: 1
    },
    pageSize: {
      type: Number,
      default: 10
    },
    title: {
      type: String,
      default: 'Title을 입력해주세요.'
    }
  },
  emits: ['row-click', 'change-page'],
  setup(props, { emit }) {
    const selectedRow = ref<number | null>(null);

    const handleRowClick = (item: any, index: number) => {
      selectedRow.value = index;
      emit('row-click', item);
    };

    const handlePageChange = (page: number) => {
      emit('change-page', page);
    };

    return { 
      handleRowClick,
      handlePageChange,
      selectedRow
    };
  },
  render() {
    return (
      <div class={[styles.tableBox, "contentBox"]}>
        <div class="titleWrap"> 
          <div class="title">{this.title}</div>
        </div>
        <div class="tableWrap">
          <table class="job-table">                            
            <thead>              
              <tr>
                {this.tableHeader.map(header => (
                  <th key={header.key} style={`width: ${header.width}px`}>
                    {header.title}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody class="table-body">
              {this.tableData.map((item, index) => (
                <tr 
                  key={index} 
                  onClick={() => this.handleRowClick(item, index)}
                  class={this.selectedRow === index ? styles.selected : ''}
                >
                  {this.tableHeader.map(header => (
                    <td key={header.key}>
                      {header.key === 'index' ? index + 1 + (this.currentPage-1) * this.pageSize  : item[header.key]} 
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>

          <Pagination 
            paginationData={{
              total: this.tableData.length,
              totalPage: Math.ceil(this.tableItemCount / this.pageSize), // 전체 페이지 수
              pageSize: this.pageSize,
              currentPage: this.currentPage, // 현재 페이지
            }}
            onChangePage={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
});

export default BaseTable;