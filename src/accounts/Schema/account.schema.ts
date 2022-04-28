import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AccountDocument = Account & Document;

@Schema()
export class Account {
  @Prop()
 username: string;

  @Prop()
  password: string;
}

export const AccountSchema = SchemaFactory.createForClass(Account);