import { Model } from 'mongoose';
import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel,  } from '@nestjs/mongoose';
import {Schema as MongooseSchema} from 'mongoose'
import { Account, AccountDocument } from './Schema/account.schema';
import {CreateAccountDto } from './Dto/creat-account.dto';
import { throwError } from 'rxjs';

@Injectable()
export class AccountsService {
  constructor(@InjectModel(Account.name) private accountModel: Model<AccountDocument>) {}
private result:any;
  async create(CreateAccountDto: CreateAccountDto): Promise<Account> {
    const createdCat = new this.accountModel(CreateAccountDto);
    return await createdCat.save();
  }

  async findAll(): Promise<Account[]> {
    return this.accountModel.find().exec();
  }
  
  async getOneAccount(id:MongooseSchema.Types.ObjectId): Promise<Account[]> {

       this.result= await this.accountModel.findById(id)
       if(!this.result) throw new NotFoundException("not found") 
  
      return this.result
     

  }

  async updateOneAccount(id:MongooseSchema.Types.ObjectId, CreateAccountDto: CreateAccountDto): Promise<Account[]> {
    return this.accountModel.findByIdAndUpdate(id,CreateAccountDto,{new:true})
  }
  async deleteOneAccount(id:MongooseSchema.Types.ObjectId): Promise<Account[]> {
    return this.accountModel.findByIdAndDelete(id)
  }
}
