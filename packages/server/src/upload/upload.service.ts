import { ConfigService } from "@nestjs/config";
import { Injectable } from "@nestjs/common";
import { FileDto, UploadedFile } from "../postings/dto/file.dto";
import { Readable } from "typeorm/platform/PlatformTools";
import cloudinary from "cloudinary";

@Injectable()
export class UploadService {
  constructor(private readonly configService: ConfigService) {
    cloudinary.v2.config({
      cloud_name: this.configService.get("CLOUDINARY_CLOUD_NAME"),
      api_key: this.configService.get("CLOUDINARY_API_KEY"),
      api_secret: this.configService.get("CLOUDINARY_API_SECRET"),
    });
  }

  private createUploadStream(
    fileName: string,
    callback: cloudinary.UploadResponseCallback,
  ): cloudinary.UploadStream {
    return cloudinary.v2.uploader.upload_stream(
      {
        public_id: fileName,
      },
      (error, file) => callback(error, file),
    );
  }

  private async uploadSingleFile(file: FileDto): Promise<UploadedFile> {
    return new Promise((resolve, reject) => {
      const uploadStream = this.createUploadStream(
        file.originalname,
        (error, result) => {
          if (error) return reject(error);
          return resolve({
            ...file,
            // result! because either error or result can be undefined
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            url: result!.secure_url,
          });
        },
      );

      // https://github.com/nestjs/nest/issues/1090
      const stream = new Readable();
      stream.push(file.buffer);
      stream.push(null);

      stream.pipe(uploadStream);
    });
  }

  private async uploadMultipleFiles(files: FileDto[]): Promise<UploadedFile[]> {
    return Promise.all(files.map((file) => this.uploadSingleFile(file)));
  }

  async uploadPhotos(filesDto: FileDto[]): Promise<string[]> {
    const photos = await this.uploadMultipleFiles(filesDto);
    const photoUrls = photos.map((photo) => photo.url);

    return photoUrls;
  }
}
