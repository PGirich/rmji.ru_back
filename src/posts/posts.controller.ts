import { Body, Controller, Get, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreatePostDto } from './dto/create-post.dto';
import { PostsService } from './posts.service';
import { Post as _Post} from './posts.model';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
  constructor(
    private postsService: PostsService
    ) {}

  @ApiOperation({ summary: 'Create a post' })
  @ApiResponse({ status: 200, type: _Post })
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  create(@Body() dto:CreatePostDto, @UploadedFile() image) {
    console.log(JSON.stringify(dto))
    return this.postsService.create(dto, image);
  }

  @ApiOperation({ summary: 'Get all posts' })
  @ApiResponse({ status: 200, type: [_Post] })
  @Get()
  getAll() {
    return this.postsService.getAll()
  }
  
}