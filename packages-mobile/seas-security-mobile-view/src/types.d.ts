type KMPJsBridge = {
  callNative: (
    methodName: string,
    params?: string,
    callback?: (data: string) => void,
  ) => void;
};

interface Window {
  kmpJsBridge: KMPJsBridge;
}
