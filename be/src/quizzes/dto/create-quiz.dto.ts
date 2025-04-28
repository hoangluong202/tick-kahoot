import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, Max, Min, ValidateNested } from "class-validator";

class QuestionDto {
  @ApiProperty({
    type: String,
    example: "What is the capital of France?",
  })
  @IsString()
  @IsNotEmpty()
  question: string;

  @ApiProperty({
    type: [String],
    example: ["Paris", "London", "Berlin", "Madrid"],
  })
  @IsArray()
  @IsString({ each: true })
  options: string[];

  @ApiProperty({
    type: Number,
    example: 0,
  })
  @IsInt()
  @Min(0)
  @Max(3)
  correctOptionIndex: number;

  @ApiProperty({
    type: Number,
    example: 30,
  })
  @IsInt()
  @Min(15)
  @Max(120)
  timeLimit: number;

  @ApiProperty({
    type: Number,
    example: 10,
  })
  @IsInt()
  @Min(0)
  @Max(100)
  points: number;
}

export class CreateQuizDto {
  @ApiProperty({
    type: String,
    example: "Around the World",
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    type: String,
    example: "A quiz about world capitals",
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    type: String,
    example: "creatorId",
  })
  @IsString()
  @IsNotEmpty()
  creatorId: string;

  @ApiProperty({
    type: [QuestionDto],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => QuestionDto)
  questions: QuestionDto[];

  @IsNumber()
  playCount: number;
}
