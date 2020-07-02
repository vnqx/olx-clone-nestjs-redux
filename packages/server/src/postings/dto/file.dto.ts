export type ImageMimeType = "image/png" | "image/jpeg";

export class FileDto {
  fieldname!: string;
  originalname!: string;
  encoding!: string;
  mimetype!: ImageMimeType;
  buffer!: Buffer;
  size!: number;
}

export interface UploadedFile extends FileDto {
  url: string;
}
