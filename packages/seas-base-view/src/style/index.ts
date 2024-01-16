import {
  Settings,
  PersonCircle,
  PeopleCircle,
  People,
  Menu,
  FileTrayFull,
  ShieldCheckmark,
  DocumentLockSharp,
  DocumentTextSharp,
  Build,
} from "@vicons/ionicons5";
import { useIcon } from "@izhimu/seas-core";

const loadIcons = () => {
  const { loadIcon } = useIcon();
  loadIcon("system", Settings);
  loadIcon("system.user", PersonCircle);
  loadIcon("system.role", PeopleCircle);
  loadIcon("system.org", People);
  loadIcon("system.menu", Menu);
  loadIcon("system.dict", FileTrayFull);
  loadIcon("system.conf", Build);
  loadIcon("log", ShieldCheckmark);
  loadIcon("log.login.log", DocumentLockSharp);
  loadIcon("log.log", DocumentTextSharp);
};

export default loadIcons;
