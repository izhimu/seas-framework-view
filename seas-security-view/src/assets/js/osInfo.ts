const osData: Array<{
  name: string;
  group: string;
  identifier: string;
  version?: string;
  versionSeparator?: string;
  versionIdentifier?: string;
}> = [
  {
    name: "Windows 2000",
    group: "windows_server",
    identifier: "Windows NT 5.0",
    version: "5.0",
  },
  {
    name: "Windows XP",
    group: "windows",
    identifier: "Windows NT 5.1",
    version: "5.1",
  },
  {
    name: "Windows 2003",
    group: "windows_server",
    identifier: "Windows NT 5.2",
    version: "5.2",
  },
  {
    name: "Windows Vista",
    group: "windows",
    identifier: "Windows NT 6.0",
    version: "6.0",
  },
  {
    name: "Windows 7",
    group: "windows",
    identifier: "Windows NT 6.1",
    version: "7.0",
  },
  {
    name: "Windows 8",
    group: "windows",
    identifier: "Windows NT 6.2",
    version: "8.0",
  },
  {
    name: "Windows 8.1",
    group: "windows",
    identifier: "Windows NT 6.3",
    version: "8.1",
  },
  {
    name: "Windows 10",
    group: "windows",
    identifier: "Windows NT 10.0",
    version: "10.0",
  },
  {
    name: "Windows 2008",
    group: "windows_server",
    identifier: "Windows NT 6.0; WOW64",
    version: "6.0",
  },
  {
    name: "Windows 2008",
    group: "windows_server",
    identifier: "Windows NT 6.1; WOW64",
    version: "6.1",
  },
  {
    name: "Windows 2012",
    group: "windows_server",
    identifier: "Windows NT 6.3; Win64",
    version: "6.3",
  },
  { name: "Chrome OS", group: "windows", identifier: "CrOS" },
  {
    name: "Mac OS X Capitan",
    group: "mac",
    identifier: "Mac OS X (10([_|.])11([0-9_.]*))",
    versionSeparator: "[_|.]",
  },
  {
    name: "Mac OS X Yosemite",
    group: "mac",
    identifier: "Mac OS X (10([_|.])10([0-9_.]*))",
    versionSeparator: "[_|.]",
  },
  {
    name: "Mac OS X Mavericks",
    group: "mac",
    identifier: "Mac OS X (10([_|.])9([0-9_.]*))",
    versionSeparator: "[_|.]",
  },
  {
    name: "Mac OS X Mountain Lion",
    group: "mac",
    identifier: "Mac OS X (10([_|.])8([0-9_.]*))",
    versionSeparator: "[_|.]",
  },
  {
    name: "Mac OS X Lion",
    group: "mac",
    identifier: "Mac OS X (10([_|.])7([0-9_.]*))",
    versionSeparator: "[_|.]",
  },
  {
    name: "Mac OS X Snow Leopard",
    group: "mac",
    identifier: "Mac OS X (10([_|.])6([0-9_.]*))",
    versionSeparator: "[_|.]",
  },
  {
    name: "Mac OS X Leopard",
    group: "mac",
    identifier: "Mac OS X (10([_|.])5([0-9_.]*))",
    versionSeparator: "[_|.]",
  },
  {
    name: "Mac OS X Tiger",
    group: "mac",
    identifier: "Mac OS X (10([_|.])4([0-9_.]*))",
    versionSeparator: "[_|.]",
  },
  {
    name: "Mac OS X Panther",
    group: "mac",
    identifier: "Mac OS X (10([_|.])3([0-9_.]*))",
    versionSeparator: "[_|.]",
  },
  {
    name: "Mac OS X Jaguar",
    group: "mac",
    identifier: "Mac OS X (10([_|.])2([0-9_.]*))",
    versionSeparator: "[_|.]",
  },
  {
    name: "Mac OS X Puma",
    group: "mac",
    identifier: "Mac OS X (10([_|.])1([0-9_.]*))",
    versionSeparator: "[_|.]",
  },
  {
    name: "Mac OS X Cheetah",
    group: "mac",
    identifier: "Mac OS X (10([_|.])0([0-9_.]*))",
    versionSeparator: "[_|.]",
  },
  { name: "Mac OS", group: "mac", identifier: "Mac OS" },
  {
    name: "Ubuntu",
    group: "linux_server",
    identifier: "Ubuntu",
    versionIdentifier: "Ubuntu/([0-9.]*)",
  },
  {
    name: "CentOs",
    group: "linux_server",
    identifier: "CentOs",
    versionIdentifier: "CentOs/([0-9.]*)",
  },
  { name: "Debian", group: "linux_server", identifier: "Debian" },
  { name: "Gentoo", group: "linux_server", identifier: "Gentoo" },
  { name: "国产系统", group: "linux", identifier: "Linux" },
];

export const system = () => {
  const userAgent = navigator.userAgent.toLowerCase();
  const data: {
    name?: string;
    group?: string;
  } = {};
  for (let i = 0; i < osData.length; i += 1) {
    if (Object.prototype.hasOwnProperty.call(osData, i)) {
      const osRegExp = new RegExp(osData[i].identifier.toLowerCase());
      const osRegExpResult = osRegExp.exec(userAgent);

      if (osRegExpResult != null) {
        data.name = osData[i].name;
        data.group = osData[i].group;
        break;
      }
    }
  }
  return data;
};

export const webview = () => {
  const { userAgent } = navigator;
  if (userAgent.indexOf("Opera") > -1 || userAgent.indexOf("OPR") > -1) {
    return "Opera";
  }
  if (userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1) {
    return "IE";
  }
  if (userAgent.indexOf("Edge") > -1) {
    return "Edge";
  }
  if (userAgent.indexOf("Firefox") > -1) {
    return "Firefox";
  }
  if (userAgent.indexOf("Safari") > -1 && userAgent.indexOf("Chrome") === -1) {
    return "Safari";
  }
  if (userAgent.indexOf("Chrome") > -1 && userAgent.indexOf("Safari") > -1) {
    return "Chrome";
  }
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  if (!!window.ActiveXObject || "ActiveXObject" in window) {
    return "IE>=11";
  }
  return "Unkonwn";
};
