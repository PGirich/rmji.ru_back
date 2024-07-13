import { Injectable } from '@nestjs/common';
import { Post } from './posts.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreatePostDto } from './dto/create-post.dto';
import { FilesService } from 'src/files/files.service';

@Injectable()
export class PostsService {
    constructor(
        @InjectModel(Post) private postsRepo: typeof Post,
        private filesService: FilesService
      ) {}
    
      async create(dto: CreatePostDto, image: any) {
        console.log('create file: '+typeof image)
        const fileName = await this.filesService.createFile(image)
        console.log(JSON.stringify({...dto, image: fileName}))
        const post = await this.postsRepo.create({...dto, image: fileName});
        return post
      } 

      async getAll() {
        const posts = await this.postsRepo.findAll({ include: { all: true } })
        return posts
      }
    



}
