import { Aperture, ChatbubbleEllipsesSharp } from "@vicons/ionicons5";
import { useIcon } from "@izhimu/seas-core/src";

const loadIcons = () => {
  const { loadIcon } = useIcon();
  loadIcon("ai", Aperture);
  loadIcon("ai.chat", ChatbubbleEllipsesSharp);
};

export default loadIcons;
