/* eslint-disable no-console */
const dateStyle = "color:grey;";
const msgStyle = "color:auto;";
export const format = (level: string, msg: string, symbol = ">") => {
  return `%c${new Date().toLocaleTimeString()} %c${level} %c${symbol} %c${msg}`;
};

export const debug = (msg: string) =>
  console.debug(
    format("DEB", msg),
    dateStyle,
    "color:#51952A",
    dateStyle,
    dateStyle,
  );

export const info = (msg: string) =>
  console.info(
    format("INF", msg),
    dateStyle,
    "color:#51952A",
    dateStyle,
    msgStyle,
  );

export const warn = (msg: string) =>
  console.info(
    format("WAR", msg),
    dateStyle,
    "color:#A68A0D",
    dateStyle,
    "color:#A68A0D;",
  );

export const error = (msg: string) =>
  console.info(
    format("ERR", msg),
    dateStyle,
    "color:#EF4736",
    dateStyle,
    "color:#EF4736",
  );

export const group = (msg: string) =>
  console.group(
    format("INF", msg),
    dateStyle,
    "color:#51952A",
    dateStyle,
    msgStyle,
  );
export const end = () => console.groupEnd();
