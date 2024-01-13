import { Today, Timer } from "@vicons/ionicons5";
import { useIcon } from "@izhimu/seas-core/src";

export default function jobInitIcon() {
  const { loadIcon } = useIcon();
  loadIcon("job", Today);
  loadIcon("job.timer", Timer);
}
