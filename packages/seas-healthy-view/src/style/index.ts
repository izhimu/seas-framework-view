import { Fitness, HardwareChip } from "@vicons/ionicons5";
import { useIcon } from "@izhimu/seas-core/src";

const loadIcons = () => {
  const { loadIcon } = useIcon();
  loadIcon("healthy", Fitness);
  loadIcon("healthy.os", HardwareChip);
};

export default loadIcons;
