import { Injectable } from '@nestjs/common';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { QuizRepository } from './document/repositories/quiz.repository';
import { Quiz } from './domain/quiz';
import { SortQuizDto } from './dto/query-quiz.dto';
import { IPaginationOptions } from './../utils/types/pagination-options';

@Injectable()
export class QuizzesService {
  constructor(
    private readonly quizzesRepository: QuizRepository
  ) {}

  async create(createQuizDto: CreateQuizDto) : Promise<Quiz|null> {
    return this.quizzesRepository.create(createQuizDto);
  }

  findManyWithPagination({
    sortOptions,
    paginationOptions,
  }: {
    sortOptions?: SortQuizDto[]|null;
    paginationOptions: IPaginationOptions;
  }) : Promise<Quiz[]> {
    return this.quizzesRepository.findManyWithPagination({
      sortOptions,
      paginationOptions,
    });
  }

  findOne(id: Quiz['id']) {
    return this.quizzesRepository.findById(id);
  }

  update(id: number, updateQuizDto: UpdateQuizDto) {
    return `This action updates a #${id} quiz`;
  }

  remove(id: number) {
    return `This action removes a #${id} quiz`;
  }
}
