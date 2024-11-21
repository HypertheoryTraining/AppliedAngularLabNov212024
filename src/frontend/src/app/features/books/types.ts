export type BookEntity = {
  author: string;
  country: string;
  imageLink: string;
  language: string;
  link: string;
  pages: number;
  title: string;
  year: number;
  id: string;
};

export const BOOK_LIST_COLUMNS = ['id', 'title', 'author', 'year'] as const;
export const SORT_DIRECTIONS = ['ascending', 'descending', 'none'] as const;

export type BookListColumn = (typeof BOOK_LIST_COLUMNS)[number];
export type SortDirection = (typeof SORT_DIRECTIONS)[number];

export type SortByOption = {
  column: BookListColumn;
  direction: SortDirection;
};
