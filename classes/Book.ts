export interface Book {
  id: number;
  name: string;
}

export interface User {
  firstname: string;
  lastname: string;
  email: string;
  book: Book;
  startDate: Date;
  endDate: Date;
}