import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { ValidationError } from 'class-validator';
import { jwtConstants } from './constant';


@Injectable()
export class AuthsService {
    constructor(private usersService: UsersService,private jwtService: JwtService) {}
    
async regiteruser (user:any){
    
    const passwordtoHash=await this.hashpassword(user.password)
    const userhashed={username:user.username, password:passwordtoHash}
    const userlogged =await this.usersService.create(userhashed)
    const { password, ...result } = userlogged;
      //console.log(result)
      const {access_token} =await this.login(result)
      return {username:userlogged.username, access_token};
}
  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if(!user) throw new NotFoundException("no such user")
   const isvalid= await bcrypt.compare(pass,user.password)
    if (user && isvalid) {
      const { password, ...result } = user;
      //console.log(result)
      const {access_token} =await this.login(result)
      return {username:user.username, access_token};
    }
     throw new NotFoundException("password not correct");
  }
  async login(user: any) {
    //const payload = { username: user.username, sub: user.userId };
    const payload = { username: user._doc.username, sub: user._doc._id };

    return {
     access_token: this.jwtService.sign(payload),

    };
  }
  async hashpassword(password:any){

    const saltOrRounds = 10;

    const hash = await bcrypt.hash(password, saltOrRounds);
    console.log(hash)
    return hash;
  }
}
