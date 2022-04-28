import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PostDocument = Post & Document;

@Schema()
export class Post {
  @Prop()
Title: string;

  @Prop()
  Description: string;
}

export const PostSchema = SchemaFactory.createForClass(Post);