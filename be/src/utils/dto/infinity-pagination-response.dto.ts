import { Type } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class InfinityPaginationResponseDto<T> {
  data: T[];
  meta: {
    currentPage: number;
    perPage: number;
    totalItems: number;
    totalPages: number;
  };
  links: {
    first: string;
    last: string;
    pre: string | null;
    next: string | null;
  };
}

export function InfinityPaginationResponse<T>(classReference: Type<T>) {
  abstract class Pagination {
    @ApiProperty({ type: [classReference] })
    data!: T[];

    @ApiProperty({
      type: Object,
      example: {
        currentPage: 1,
        perPage: 10,
        totalItems: 100,
        totalPages: 10,
      },
    })
    meta!: {
      currentPage: number;
      perPage: number;
      totalItems: number;
      totalPages: number;
    };

    @ApiProperty({
      type: Object,
      example: {
        first: '/api/items?page=1',
        last: '/api/items?page=10',
        pre: null,
        next: '/api/items?page=2',
      },
    })
    links!: {
      first: string;
      last: string;
      pre: string | null;
      next: string | null;
    };
  }

  Object.defineProperty(Pagination, 'name', {
    writable: false,
    value: `InfinityPagination${classReference.name}ResponseDto`,
  });

  return Pagination;
}
