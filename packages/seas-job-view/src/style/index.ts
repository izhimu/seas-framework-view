import { Today, Timer } from "@vicons/ionicons5";
import { useIcon } from "@izhimu/seas-core/src";

const loadIcons = () => {
  const { loadIcon } = useIcon();
  loadIcon("job", Today);
  loadIcon("job.timer", Timer);
};

export default loadIcons;
