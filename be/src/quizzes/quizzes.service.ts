import { Injectable } from '@nestjs/common';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { Quiz } from './domain/quiz';
import { SortQuizDto } from './dto/query-quiz.dto';
import { IPaginationOptions } from './../utils/types/pagination-options';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { QuizSchemaClass } from './document/schemas/quiz.schema';
import { QuizMapper } from './document/mappers/quiz.mapper';
import { NullableType } from '../utils/types/nullable.type';

@Injectable()
export class QuizzesService {
  constructor(
    @InjectModel(QuizSchemaClass.name)
    private quizModel: Model<QuizSchemaClass>,
  ) {}

  async create(createQuizDto: CreateQuizDto): Promise<Quiz | null> {
    const createdQuiz = new this.quizModel(createQuizDto);
    const savedQuiz = await createdQuiz.save();
    return QuizMapper.toDomain(savedQuiz);
  }

  async findManyWithPagination({
    sortOptions,
    paginationOptions,
  }: {
    sortOptions?: SortQuizDto[] | null;
    paginationOptions: IPaginationOptions;
  }): Promise<{data: Quiz[], totalItems: number}> {
    const [quizObjects, totalItems] = await Promise.all([
      this.quizModel
      .find()
      .sort(
        sortOptions?.reduce(
        (accumulator, sort) => ({
          ...accumulator,
          [sort.orderBy === 'id' ? '_id' : sort.orderBy]:
          sort.order.toUpperCase() === 'ASC' ? 1 : -1,
        }),
        {},
        ),
      )
      .skip((paginationOptions.page - 1) * paginationOptions.limit)
      .limit(paginationOptions.limit)
      .exec(),
      this.quizModel.countDocuments().exec()
    ]);

    const quizzes = quizObjects.map((quiz) => QuizMapper.toDomain(quiz));
    return { data: quizzes, totalItems: totalItems };
  }

  async findOne(id: Quiz['id']) : Promise<NullableType<Quiz>> {
    const quiz = await this.quizModel.findById(id).exec();
    return quiz ? QuizMapper.toDomain(quiz) : null;
  }

  update(id: number, updateQuizDto: UpdateQuizDto) {
    return `This action updates a #${id} quiz`;
  }

  remove(id: number) {
    return `This action removes a #${id} quiz`;
  }
}
