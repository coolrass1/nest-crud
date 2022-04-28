import { Body, Controller, Delete, Get, Param, Patch, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import {AccountsService} from "./accounts.service"
import {CreateAccountDto } from './Dto/creat-account.dto';
import { editFileName, imageFileFilter } from './file-upload.utils';
@Controller('accounts')
export class AccountsController {
    constructor(private readonly accountService:AccountsService){}

    @Get()
  getHello(): any {
    return this.accountService.findAll();
  }
  @Post()
  addAccount(  @Body() CreateAccountDto: CreateAccountDto):Promise<any>{
    console.log(CreateAccountDto)
    return this.accountService.create(CreateAccountDto)
  }
  @Get(":id")
  async getOneAccount(@Param() params){
    return this.accountService.getOneAccount(params.id)
  }
  @Patch(":id")
  async updateOneAccount(@Param() params, @Body() CreateAccountDto: CreateAccountDto){
    return this.accountService.updateOneAccount(params.id,CreateAccountDto)
  }
  //eleteOneAccount
  @Delete(":id")
  async deleteOneAccount(@Param() params){
    return this.accountService.deleteOneAccount(params.id)
  }
  @Post('upload')
@UseInterceptors(FileInterceptor('file'))
uploadFile(@UploadedFile() file: Express.Multer.File) {
  console.log(file);
}


@UseInterceptors(FileInterceptor('file', {
  storage: diskStorage({
    destination: './files',
    filename: editFileName,
  }),
  // fileFilter: imageFileFilter,
}))
@Post('file')
uploadFiles(
  @Body() body: any,
  @UploadedFile() file: Express.Multer.File,
) {
  return {
    body,
    file: file.mimetype,
    originalname: file.originalname,
    filename: file.filename

  };
}

}
