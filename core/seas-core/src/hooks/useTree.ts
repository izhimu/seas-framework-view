import { Ref, ref } from "vue";
import { TreeNodeProps } from "naive-ui/lib/tree/src/interface";
import { TreeOption, TreeOptions } from "naive-ui/es/tree/src/interface";
import { Result } from "../entity/core.ts";

interface QueryFun<S> {
  (search?: S): Promise<Result<Array<TreeOption>>>;
}

const forDisable = (
  tree: TreeOptions,
  disableExpand: Ref<Array<string | number>>,
) => {
  tree.forEach((item) => {
    if (item.disabled && item.key) {
      disableExpand.value.push(item.key);
    }
    if (item.children) {
      forDisable(item.children, disableExpand);
    }
  });
};

export default function useTree<S>(
  query: QueryFun<S>,
  nodeProps?: TreeNodeProps,
  expandByDisable = false,
) {
  const treeLoading = ref<boolean>(false);
  const treePattern = ref();
  const treeData = ref<TreeOptions>([]);
  const checkedKeys = ref<Array<string | number>>([]);
  const disableExpand = ref<Array<string | number>>([]);
  const queryTreeData = () => {
    treeLoading.value = true;
    query()
      .then((res) => {
        if (res.data) {
          treeData.value = res.data;
          if (expandByDisable) {
            forDisable(treeData.value, disableExpand);
          }
        }
      })
      .finally(() => {
        treeLoading.value = false;
      });
  };
  const updateCheckedKeys = (v: Array<string | number>) => {
    checkedKeys.value = v;
  };

  return {
    treeData,
    treeLoading,
    treePattern,
    checkedKeys,
    disableExpand,
    nodeProps,
    queryTreeData,
    updateCheckedKeys,
  };
}
