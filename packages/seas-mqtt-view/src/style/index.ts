import { ChatboxEllipses, ShieldHalfOutline } from "@vicons/ionicons5";
import { useIcon } from "@izhimu/seas-core/src";

const loadIcons = () => {
  const { loadIcon } = useIcon();
  loadIcon("mqtt", ChatboxEllipses);
  loadIcon("mqtt.user", ShieldHalfOutline);
};

export default loadIcons;
