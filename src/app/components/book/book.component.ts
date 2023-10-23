import { Component } from '@angular/core';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css'],
})
export class BookComponent {
  book1 = { bookName: 'Kitap1', bookId: 1, categoryId: 1 };
  book2 = { bookName: 'Kitap2', bookId: 2, categoryId: 1 };
  book3 = { bookName: 'Kitap3', bookId: 3, categoryId: 1 };
  book4 = { bookName: 'Kitap4', bookId: 4, categoryId: 1 };

  books = [this.book1, this.book2, this.book3, this.book4];
}
