import { Component } from '@angular/core';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent {
  
  categories: Category[] = [];
  currentCategory: Category | undefined;
  filterText = "";
  dataLoaded = false;
  filteredCategories: Category[] = [];
  selectedCategory: Category | undefined;

  constructor(private categoryService: CategoryService) {
    
  }
  ngOnInit(): void {
    this.getCategories();
  }


  getCategories() {
    this.categoryService.getCategories().subscribe((response) => {
      this.categories = response.data;
      this.filteredCategories = this.categories; // initial filteredCategories ayarlanıyor
      this.dataLoaded = true;
    });
  }

  setCurrentCategory(category:Category){
    this.currentCategory = category;
  }

  getCurrentCategoryClass(category:Category){
    if(category == this.currentCategory){
      return "list-group-item active"
    }
    else{
      return "list-group-item"
    }
  }
  setAllCategory(){
    this.currentCategory = undefined;
  }
  getAllCategoryClass(){
    if(this.currentCategory){
      return "list-group-item"
    }
    else{
      return "list-group-item active"
    }
  }
}
