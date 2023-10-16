export default function useDownload() {
  const ofBlob = (blob: Blob, name: string) => {
    const link = document.createElement("a"); // 创建a标签
    link.download = name;
    link.style.display = "none";
    link.href = URL.createObjectURL(blob);
    document.body.appendChild(link);
    link.click();
    URL.revokeObjectURL(link.href);
    document.body.removeChild(link);
  };

  return {
    ofBlob,
  };
}
