import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { plainToInstance, Transform, Type } from 'class-transformer';
import {
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
import { Quiz } from '../domain/quiz';

export class SortQuizDto {
  @ApiProperty()
  @Type(() => String)
  @IsString()
  orderBy: keyof Quiz;

  @ApiProperty()
  @IsString()
  order: string;
}

export class QueryQuizDto {
  @ApiPropertyOptional()
  @Transform(({ value }) => (value ? Number(value) : 1))
  @IsOptional()
  @IsInt()
  @Min(1)
  @IsOptional()
  page: number;

  @ApiPropertyOptional()
  @Transform(({ value }) => (value ? Number(value) : 10))
  @IsOptional()
  @IsNumber()
  @IsOptional()
  limit: number;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @Transform(({ value }) => {
    return value ? plainToInstance(SortQuizDto, JSON.parse(value)) : undefined;
  })
  @ValidateNested({ each: true })
  @Type(() => SortQuizDto)
  sort?: SortQuizDto[] | null;
}
