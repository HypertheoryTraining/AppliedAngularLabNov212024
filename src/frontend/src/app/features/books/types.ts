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

export type BookListColumn = 'id' | 'title' | 'author' | 'year';
export type SortDirection = 'asc' | 'desc' | 'none';

export type SortByOption = {
  column: BookListColumn;
  direction: SortDirection;
};
