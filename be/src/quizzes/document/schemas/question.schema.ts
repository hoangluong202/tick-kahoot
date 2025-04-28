import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
import { EntityDocumentHelper } from "src/utils/document-entity-helper";

@Schema({timestamps: true})
export class QuestionSchemaClass extends EntityDocumentHelper{
  @Prop({ required: true })
  question: string;

  @Prop({ required: true })
  options: string[];

  @Prop({ required: true })
  correctOptionIndex: number;

  @Prop({ default: 30 })
  timeLimit: number;

  @Prop({ default: 10 })
  points: number;
}

export const QuestionSchema = SchemaFactory.createForClass(QuestionSchemaClass);