import { Copy, Server, Albums, ExtensionPuzzle } from "@vicons/ionicons5";
import { useIcon } from "@izhimu/seas-core";

export default function healthyInitIcon() {
  const { loadIcon } = useIcon();
  loadIcon("generate", Copy);
  loadIcon("generate.datasource", Server);
  loadIcon("generate.template", Albums);
  loadIcon("generate.info", ExtensionPuzzle);
}
