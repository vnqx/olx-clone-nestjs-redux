import { ConfigService } from "@nestjs/config";
import { FileDto, UploadedFile } from "./dto/file.dto";
import { Injectable } from "@nestjs/common";
import Posting from "./posting.entity";
import { CreatePostingDto } from "./dto/createPosting.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import cloudinary from "cloudinary";
import { Readable } from "stream";

@Injectable()
export default class PostingsService {
  constructor(
    @InjectRepository(Posting) private postingsRepository: Repository<Posting>,
    private configService: ConfigService,
  ) {}

  private createUploadStream(
    fileName: string,
    callback: cloudinary.UploadResponseCallback,
  ): cloudinary.UploadStream {
    cloudinary.v2.config({
      cloud_name: this.configService.get("CLOUDINARY_CLOUD_NAME"),
      api_key: this.configService.get("CLOUDINARY_API_KEY"),
      api_secret: this.configService.get("CLOUDINARY_API_SECRET"),
    });
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

  findAll(): Promise<Posting[]> {
    return this.postingsRepository.find();
  }

  async create(createPostingDto: CreatePostingDto): Promise<Posting> {
    const createdPosting = this.postingsRepository.create(createPostingDto);

    await this.postingsRepository.save(createdPosting);

    return createdPosting;
  }

  async uploadPhotos(filesDto: FileDto[]): Promise<any> {
    const file = await this.uploadSingleFile(filesDto[0]);

    return file.url;
  }
}
