import { Module } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Account, AccountSchema } from './Schema/account.schema';
import { AccountsController } from './accounts.controller';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [MongooseModule.forFeature([{ name: Account.name, schema: AccountSchema }]),MulterModule.register({
    dest: './upload',
  })],
  providers: [AccountsService],
  controllers: [AccountsController]
})
export class AccountsModule {}
