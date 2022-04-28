import { Injectable, NotFoundException } from '@nestjs/common';
import {Schema as MongooseSchema} from 'mongoose'
import { Post, PostDocument } from './Schema/account.schema';
import {CreatePostDto } from './Dto/creat-post.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
@Injectable()
export class PostsService {
    constructor(@InjectModel(Post.name) private accountModel: Model<PostDocument>) {}
    private result:any;
      async create(CreatePostDto: CreatePostDto): Promise<Post> {
        const createdCat = new this.accountModel(CreatePostDto);
        return await createdCat.save();
      }
    
      async findAll(): Promise<Post[]> {
        return this.accountModel.find().exec();
      }
      
      async getOneAccount(id:MongooseSchema.Types.ObjectId): Promise<Post[]> {
    
           this.result= await this.accountModel.findById(id)
           if(!this.result) throw new NotFoundException("not found") 
      
          return this.result
         
    
      }
    
      async updateOneAccount(id:MongooseSchema.Types.ObjectId, CreatePostDto: CreatePostDto): Promise<Post[]> {
        return this.accountModel.findByIdAndUpdate(id,CreatePostDto,{new:true})
      }
      async deleteOneAccount(id:MongooseSchema.Types.ObjectId): Promise<Post[]> {
        return this.accountModel.findByIdAndDelete(id)
      }
}
