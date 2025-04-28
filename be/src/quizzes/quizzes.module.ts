import { Module } from '@nestjs/common';
import { QuizzesService } from './quizzes.service';
import { QuizzesController } from './quizzes.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { QuizSchema, QuizSchemaClass } from './document/schemas/quiz.schema';
import { QuizRepository } from './document/repositories/quiz.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: QuizSchemaClass.name,
      schema: QuizSchema,
    }]),
  ],
  controllers: [QuizzesController],
  providers: [QuizzesService, QuizRepository],
})
export class QuizzesModule {}
