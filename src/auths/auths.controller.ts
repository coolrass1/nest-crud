import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/users/Dto/create-user.dto';
import { AuthsService } from './auths.service';

@Controller('auths')
export class AuthsController {
    constructor(private readonly authService:AuthsService){}
    @Post()
    async Login(@Body() {username, password}){
  
return await this.authService.validateUser(username, password)
    }
    @Post("create")
    async Createuser(@Body() user:CreateUserDto){
        
return await this.authService.regiteruser(user)
    }
}
