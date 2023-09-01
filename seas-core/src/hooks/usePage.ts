import { reactive, ref } from "vue";
import { PaginationProps } from "naive-ui/lib/pagination";
import { SortState } from "naive-ui/lib/data-table/src/interface";
import { Page, Result } from "../entity/core.ts";
import { Column, Columns } from "../types";

interface QueryFun<T, S> {
  (pages: Page<T>, search: S): Promise<Result<Page<T>>>;
}

export default function usePage<T, S>(
  query: QueryFun<T, S>,
  search: S,
  columnData?: Columns<T>
) {
  const pageData = ref();
  const pageLoading = ref<boolean>(false);
  const orders = ref();
  const pagination: PaginationProps = reactive({
    page: 1,
    pageSize: 10,
    pageSizes: [10, 20, 50, 100],
    showSizePicker: true,
  });
  const queryPage = () => {
    pageLoading.value = true;
    query(
      {
        current: pagination.page,
        size: pagination.pageSize,
        orders: orders.value,
      },
      search
    )
      .then((res) => {
        pagination.pageCount = Number(res.data?.pages);
        pagination.itemCount = Number(res.data?.total);
        pageData.value = res.data?.records;
      })
      .finally(() => {
        pageLoading.value = false;
      });
  };
  const columns = ref();
  if (columnData) {
    columns.value = columnData;
  }
  const handleSorter = (sorter: SortState) => {
    orders.value = [];
    columns.value
      .filter((item: Column<T>) => item.sorter)
      .forEach((item: Column<T>) => {
        if (item.key === sorter.columnKey) {
          item.sortOrder = !sorter ? false : sorter.order;
          if (orders.value && item.sortKey && item.sortOrder) {
            orders.value.push({
              column: item.sortKey,
              asc: item.sortOrder === "ascend",
            });
          }
        } else {
          item.sortOrder = false;
        }
      });
    queryPage();
  };
  pagination.prefix = ({ itemCount }) => `共 ${itemCount} 项`;
  pagination.onChange = (page) => {
    pagination.page = page;
  };
  pagination.onUpdatePageSize = (pageSize) => {
    pagination.pageSize = pageSize;
    pagination.page = 1;
    queryPage();
  };
  return {
    columns,
    pagination,
    pageLoading,
    pageData,
    orders,
    search,
    queryPage,
    handleSorter,
  };
}
