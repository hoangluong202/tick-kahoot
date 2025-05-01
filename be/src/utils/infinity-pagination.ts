import { IPaginationOptions } from './types/pagination-options';
import { InfinityPaginationResponseDto } from './dto/infinity-pagination-response.dto';

export const infinityPagination = <T>(
  data: T[],
  totalItems: number,
  options: IPaginationOptions,
  prefix: string = '',
): InfinityPaginationResponseDto<T> => {
  return {
    data: data,
    meta: {
      currentPage: options.page,
      perPage: options.limit,
      totalItems: totalItems,
      totalPages: Math.ceil(totalItems / options.limit),
    },
    links: {
      first: `${prefix}?page=1&limit=${options.limit}`,
      last: `${prefix}?page=${Math.ceil(totalItems/ options.limit)}&limit=${options.limit}`,
      pre:
        options.page > 1
          ? `${prefix}?page=${options.page - 1}&limit=${options.limit}`
          : null,
      next:
        options.page < Math.ceil(totalItems/ options.limit)
          ? `${prefix}?page=${options.page + 1}&limit=${options.limit}`
          : null,
    },
  };
};
