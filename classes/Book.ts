export interface Book {
  id: number;
  name: string;
}

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  book: Book;
  startDate: Date;
  endDate: Date;
}