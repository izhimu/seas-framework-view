import { Fitness, HardwareChip } from "@vicons/ionicons5";
import { useIcon } from "@izhimu/seas-core/src";

export default function healthyInitIcon() {
  const { loadIcon } = useIcon();
  loadIcon("healthy", Fitness);
  loadIcon("healthy.os", HardwareChip);
}
