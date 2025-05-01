import { Quiz } from '../../domain/quiz';
import { QuizSchemaClass } from '../schemas/quiz.schema';

export class QuizMapper {
  static toDomain(raw: QuizSchemaClass): Quiz {
    const domainnEntity = new Quiz();
    domainnEntity.id = raw._id.toString();
    domainnEntity.title = raw.title;
    domainnEntity.description = raw.description;
    domainnEntity.creatorId = raw.creatorId;
    domainnEntity.questions = raw.questions.map((question) => ({
      id: question._id.toString(),
      question: question.question,
      options: question.options,
      correctOptionIndex: question.correctOptionIndex,
      timeLimit: question.timeLimit,
      points: question.points,
    }));
    domainnEntity.playCount = raw.playCount;
    return domainnEntity;
  }
}
