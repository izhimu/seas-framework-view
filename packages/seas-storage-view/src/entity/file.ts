export interface File {
  id: string;
  fileName: string | null;
  contentType: string | null;
  fileSize: number | null;
  fileSuffix: string | null;
  fileUrl: string | null;
}
