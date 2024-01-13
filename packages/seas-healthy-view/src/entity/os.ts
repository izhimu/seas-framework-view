export interface CpuInfo {
  total: number;
  sys: number;
  user: number;
  free: number;
  model: string;
}

export interface Disk {
  uuid: string;
  name: string;
  volume: string;
  type: string;
  total: number;
  totalStr: string;
  used: number;
  usedStr: string;
}

export interface Memory {
  total: number;
  totalStr: string;
  used: number;
  usedStr: string;
  swapTotal: number;
  swapTotalStr: string;
  swapUsed: number;
  swapUsedStr: string;
  virtualMax: number;
  virtualMaxStr: string;
  virtualInUse: number;
  virtualInUseStr: string;
}

export interface Network {
  id: string;
  name: string;
  alias: string;
  displayName: string;
  status: string;
  mac: string;
  ipv4: string;
  ipv6: string;
  mtu: number;
  speed: number;
  bytesRecv: string;
  bytesSent: string;
  packetsRecv: string;
  packetsSent: string;
}

export interface Sensors {
  cpuTemperature: number;
  cpuVoltage: number;
  fanSpeeds: number[];
}

export const dCpuInfo = (): CpuInfo => ({
  total: 0,
  sys: 0,
  user: 0,
  free: 0,
  model: "",
});

export const dMemory = (): Memory => ({
  total: 0,
  totalStr: "0",
  used: 0,
  usedStr: "0",
  swapTotal: 0,
  swapTotalStr: "0",
  swapUsed: 0,
  swapUsedStr: "0",
  virtualMax: 0,
  virtualMaxStr: "0",
  virtualInUse: 0,
  virtualInUseStr: "0",
});

export const dSensors = (): Sensors => ({
  cpuTemperature: 0,
  cpuVoltage: 0,
  fanSpeeds: [0],
});
