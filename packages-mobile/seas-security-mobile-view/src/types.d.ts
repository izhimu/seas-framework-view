interface Window {
  kmpJsBridge: {
    callNative: (
      methodName: string,
      params?: string,
      callback?: (data: string) => void,
    ) => void;
  };
}
