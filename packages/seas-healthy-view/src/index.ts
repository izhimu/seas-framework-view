import "./router";
import "./style";

export { default as healthyRouter } from "./router";
export {
  type CpuInfo,
  type Disk,
  type Memory,
  type Network,
  type Sensors,
  dCpuInfo,
  dMemory,
  dSensors,
} from "./entity/os";
