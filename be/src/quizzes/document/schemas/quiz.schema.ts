import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Types } from 'mongoose';
import { EntityDocumentHelper } from 'src/utils/document-entity-helper';
import { QuestionSchema, QuestionSchemaClass } from './question.schema';

@Schema({ timestamps: true })
export class QuizSchemaClass extends EntityDocumentHelper {
  @Prop({ required: true })
  title: string;

  @Prop()
  description?: string;

  @Prop({ required: true })
  creatorId: string;

  @Prop([QuestionSchema])
  questions: QuestionSchemaClass[];

  @Prop({ default: 0 })
  playCount: number;
}

export const QuizSchema = SchemaFactory.createForClass(QuizSchemaClass);

export type QuizDocumentOverride = {
  questions: Types.Array<QuestionSchemaClass>;
};

export type QuizDocument = HydratedDocument<
  QuizSchemaClass,
  QuizDocumentOverride
>;
