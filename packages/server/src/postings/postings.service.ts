import { Injectable } from "@nestjs/common";
import Posting from "./posting.entity";
import { CreatePostingDto } from "./dto/createPosting.dto";

@Injectable()
export default class PostingsService {
  private postings: Posting[] = [];
  private lastPostingId = 0;

  getAllPostings() {
    return this.postings;
  }

  createPosting(posting: CreatePostingDto) {
    const newPosting = {
      id: ++this.lastPostingId,
      ...posting,
    };

    this.postings.push(newPosting);
    return newPosting;
  }
}
