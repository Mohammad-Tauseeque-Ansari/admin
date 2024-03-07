import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ItemCategoryModel } from './itemCategory.model';
import { ItemCategoryService } from '../shared/services/item-category.service';
@Component({
  selector: 'app-carousels',
  templateUrl: './carousels.component.html',
  styleUrls: ['./carousels.component.scss'],
})
export class CarouselsComponent {
  itemCategoryModelObj: ItemCategoryModel = new ItemCategoryModel();
  searchTerm: any;
  itemCategoryData! : any;
  showAdd!: boolean;
  showUpdate!: boolean;

  constructor(private api: ItemCategoryService) {}

  itemCategoryForm = new FormGroup({
    categoryCode: new FormControl(''),
    categoryName: new FormControl(''),
    status: new FormControl(''),
  });

  ngOnInit(): void {
    this.getAllItem();
  }

  onClose() {
    this.itemCategoryForm.reset();
  }

  onAdd() {
    this.itemCategoryForm.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  addNewData() {
    var postDataObj = {
      categoryCode: this.itemCategoryForm.value.categoryCode,
      categoryName: this.itemCategoryForm.value.categoryName,
      status: this.itemCategoryForm.value.status,
    };
    // console.log(postDataObj);

    this.api.postItemCategory(postDataObj).subscribe(
      (res) => {
        alert('Item Category Added Successfully');
        this.getAllItem();
        let ref = document.getElementById('cancel');
        ref?.click();
        //  this.onClose()
        this.itemCategoryForm.reset();
      },
      (err) => {
        console.log('Something Went Wrong');
      }
    );
  }

  getAllItem() {
    this.api.getAllItemCategory().subscribe(
      (res) => {
        console.log(res);
        this.itemCategoryData = res;
      },
      (err) => {
        alert('Something Went Wrong');
      }
    );
  }

  deleteItemCategory(row:any){
    this.api.deleteItemCategory(row.id).subscribe(res=>{
      alert("Item Category Deleted Successfully");
      this.getAllItem();
    },err=>{
      alert("Something went wrong while deleting");
    })
  }

  onEdit(row:any){
    this.showAdd = false;
    this.showUpdate = true;
    this.itemCategoryModelObj.id = row.id ;
    this.itemCategoryForm.patchValue({
      categoryCode : row.categoryCode,
      categoryName : row.categoryName,
      status : row.status,
    })
  }

  updateItemCategory() {
    var updateDataObj = {
      categoryCode: this.itemCategoryForm.value.categoryCode,
      categoryName: this.itemCategoryForm.value.categoryName,
      status: this.itemCategoryForm.value.status,
    };

    this.api.updateItemCategory(updateDataObj , this.itemCategoryModelObj.id).subscribe(
      (res) => {
        alert('Item Category Updated Successfully');
        this.getAllItem();
        let ref = document.getElementById('cancel');
        ref?.click();
        //  this.onClose()
        this.itemCategoryForm.reset();
      },
      (err) => {
        console.log('Something Went Wrong');
      }
    );
  }


}
