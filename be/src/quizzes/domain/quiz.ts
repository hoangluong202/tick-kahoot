import { ApiProperty } from '@nestjs/swagger';

export class Quiz {
  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty({
    type: String,
    example: 'Quiz Title',
  })
  title: string;

  @ApiProperty({
    type: String,
    example: 'Quiz Description',
  })
  description?: string;

  @ApiProperty({
    type: String,
    example: 'creatorId',
  })
  creatorId: string;

  questions: Question[];

  @ApiProperty({
    type: Number,
    example: 0,
  })
  playCount: number;
}

export class Question {
  @ApiProperty({ type: String, example: 'ndjaeadfj' })
  id: string;

  @ApiProperty({
    type: String,
    example: 'What is the capital of France?',
  })
  question: string;

  @ApiProperty({
    type: [String],
    example: ['Paris', 'London', 'Berlin', 'Madrid'],
  })
  options: string[];

  @ApiProperty({
    type: Number,
    example: 0,
  })
  correctOptionIndex: number;

  @ApiProperty({
    type: Number,
    example: 30,
  })
  timeLimit: number;

  @ApiProperty({
    type: Number,
    example: 10,
  })
  points: number;
}
