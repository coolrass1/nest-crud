import { Body, Controller, Delete, Get, Param, Patch, Post, UseInterceptors } from '@nestjs/common';
import { CreatePostDto } from './Dto/creat-post.dto';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
    constructor(private readonly PostService:PostsService){}
    @Get()
  getHello(): any {
    return this.PostService.findAll();
  }
  @Post()
  addAccount( @Body() CreatePostDto: CreatePostDto):Promise<any>{

    return this.PostService.create(CreatePostDto)
 
   
  }
  @Get(":id")
  async getOneAccount(@Param() params){
    return this.PostService.getOneAccount(params.id)
  }
  @Patch(":id")
  async updateOneAccount(@Param() params, @Body() CreatePostDto: CreatePostDto){
    return this.PostService.updateOneAccount(params.id,CreatePostDto)
  }
  //eleteOneAccount
  @Delete(":id")
  async deleteOneAccount(@Param() params){
    return this.PostService.deleteOneAccount(params.id)
  }
//   @Post('upload')
// @UseInterceptors(FileInterceptor('file'))
// uploadFile(@UploadedFile() file: Express.Multer.File) {
//   console.log(file);
// }

}
