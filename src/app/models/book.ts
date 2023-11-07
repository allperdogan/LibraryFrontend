export interface Book{
    id:number;
    categoryId:number;
    authorId:number;
    authorFirstName:string;
    authorLastName:string;
    categoryName:string;
    bookName:string;
    publishedYear:number;
    summary:string;
    returnDate:Date;
    imagePath:string | undefined;
    date:string | undefined;
    file:File | undefined;
    bookId:number | undefined;
}