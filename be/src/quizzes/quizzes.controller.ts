import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { QuizzesService } from './quizzes.service';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { ApiCreatedResponse, ApiProperty } from '@nestjs/swagger';
import { Quiz } from './domain/quiz';
import { InfinityPaginationResponse, InfinityPaginationResponseDto } from 'src/utils/dto/infinity-pagination-response.dto';
import { QueryQuizDto } from './dto/query-quiz.dto';
import { infinityPagination } from 'src/utils/infinity-pagination';

@Controller('quizzes')
export class QuizzesController {
  constructor(private readonly quizzesService: QuizzesService) {}

  @ApiCreatedResponse({
    type: Quiz
  })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createQuizDto: CreateQuizDto) : Promise<Quiz|null> {
    return this.quizzesService.create(createQuizDto);
  }

  @ApiProperty({
    type: InfinityPaginationResponse(Quiz)
  })
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(@Query() query: QueryQuizDto) : Promise<InfinityPaginationResponseDto<Quiz>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 100) {
      limit = 100;
    }
    return infinityPagination(
      await this.quizzesService.findManyWithPagination({
        sortOptions: query?.sort,
        paginationOptions: {
          page,
          limit,
        }
      }),
      {page,limit}
    )
  }
  //Hello

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.quizzesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateQuizDto: UpdateQuizDto) {
    return this.quizzesService.update(+id, updateQuizDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.quizzesService.remove(+id);
  }
}
