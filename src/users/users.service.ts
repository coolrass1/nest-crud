import { Injectable, NotAcceptableException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './Dto/create-user.dto';
import { UserDocument, User } from './Schema/user.schema';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
    async create(CreateUserDto: CreateUserDto): Promise<User> {
   
        const {username}=CreateUserDto
        const isOk=await this.userModel.findOne({username})
        if(isOk) throw new NotAcceptableException("userexist")
        const createdCat =  new this.userModel(CreateUserDto);
        return await createdCat.save();
      }
    async findOne(email:any) :Promise<User>{
        return await this.userModel.findOne({username:email})
    }
}
