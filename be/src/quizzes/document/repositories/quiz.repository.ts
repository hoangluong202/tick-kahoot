import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { QuizSchemaClass } from "../schemas/quiz.schema";
import { Quiz } from "../../domain/quiz";
import { NullableType } from "src/utils/types/nullable.type";
import { SortQuizDto } from "../../dto/query-quiz.dto";
import { IPaginationOptions } from "src/utils/types/pagination-options";
import { QuizMapper } from "../mappers/quiz.mapper";
import { PayloadQuiz } from "../../types/quiz.type";


@Injectable()
export class QuizRepository {
  constructor(
    @InjectModel(QuizSchemaClass.name) private readonly quizzesModel: Model<QuizSchemaClass>
  ) {}

  async create(data: PayloadQuiz): Promise<Quiz|null> {
    const createdQuiz = new this.quizzesModel(data);
    const savedQuiz = await createdQuiz.save();
    return QuizMapper.toDomain(savedQuiz);
  }

  async findById(id: Quiz['id']): Promise<NullableType<Quiz>> {
    const quiz = await this.quizzesModel.findById(id).exec();
    return quiz
      ? {
          id: quiz._id.toString(),
          ...quiz.toObject(),
          questions: quiz.questions.map((question) => ({
            ...question,
            id: question._id.toString(),
          })),
        }
      : null;
  }

  async findManyWithPagination({
    sortOptions,
    paginationOptions,
  }: {
    sortOptions?:SortQuizDto[] | null;
    paginationOptions: IPaginationOptions;
  }): Promise<Quiz[]> {
    const quizObjects = await this.quizzesModel
      .find()
      .sort(sortOptions?.reduce(
          (accumulator, sort) => ({
            ...accumulator,
            [sort.orderBy === 'id' ? '_id' : sort.orderBy]:
              sort.order.toUpperCase() === 'ASC' ? 1 : -1,
          }),
          {},
        ),)
      .skip((paginationOptions.page - 1) * paginationOptions.limit)
      .limit(paginationOptions.limit)
      .exec();

    return quizObjects.map((quiz) => QuizMapper.toDomain(quiz));
  }
}