export type UsePaginationParams = {
   totalCountOfRegisters: number,
   currentPage: number,
   registersPerPage: number,
}

export type PaginationState = {
   previousPages: number[],
   nextPages: number[],
   lastPage: number,
   maxItemPerPage: number,
   initialPageItem: number,
   siblingsCount: number,
}