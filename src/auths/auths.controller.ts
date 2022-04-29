import { Body, Controller, Post } from '@nestjs/common';
import { AuthsService } from './auths.service';

@Controller('auths')
export class AuthsController {
    constructor(private readonly authService:AuthsService){}
    @Post()
    async Login(@Body() {username, password}){
  
return await this.authService.validateUser(username, password)
    }
    @Post("create")
    async Createuser(@Body() user){
        // console.log(`${username} an ${password} `)
return await this.authService.regiteruser(user)
    }
}
