import { Component } from '@angular/core';
import { FormGroup , FormControl } from '@angular/forms';
import { ItemMakeModel } from './itemMake.model' ;
import { ItemMakeService } from '../shared/services/item-make.service';


@Component({
  selector: 'app-collapses',
  templateUrl: './collapses.component.html',
  styleUrls: ['./collapses.component.scss']
})
export class CollapsesComponent {

  itemMakeModelObj: ItemMakeModel = new ItemMakeModel();
  searchTerm: any;
  itemMakeData! : any;
  showAdd!: boolean;
  showUpdate!: boolean;

  constructor(private api: ItemMakeService) {}

  itemMakeForm = new FormGroup({
    makeCode: new FormControl(''),
    makeDescription: new FormControl(''),
    createdAt: new FormControl(''),
  });

  ngOnInit(): void {
    this.getAllItemMake();
  }

  onClose() {
    this.itemMakeForm.reset();
  }

  onAdd() {
    this.itemMakeForm.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }
  addNewData() {
    var postDataObj = {
      makeCode: this.itemMakeForm.value.makeCode,
      makeDescription: this.itemMakeForm.value.makeDescription,
      createdAt: new Date(),
    };
    // console.log(postDataObj);

    this.api.postItemMake(postDataObj).subscribe(
      (res) => {
        alert('Item Make Added Successfully');
        this.getAllItemMake();
        let ref = document.getElementById('cancel');
        ref?.click();
        //  this.onClose()
        this.itemMakeForm.reset();
      },
      (err) => {
        console.log('Something Went Wrong');
      }
    );
  }

  getAllItemMake() {
    this.api.getAllItemMake().subscribe(
      (res) => {
        console.log(res);
        this.itemMakeData = res;
      },
      (err) => {
        alert('Something Went Wrong');
      }
    );
  }

  deleteItemMake(row:any){
    this.api.deleteItemMake(row.id).subscribe(res=>{
      alert("Item Make Deleted Successfully");
      this.getAllItemMake();
    },err=>{
      alert("Something went wrong while deleting");
    })
  }

  onEdit(row:any){
    this.showAdd = false;
    this.showUpdate = true;
    this.itemMakeModelObj.id = row.id ;
    this.itemMakeForm.patchValue({
      makeCode : row.makeCode,
      makeDescription : row.makeDescription,
      createdAt : row.createdAt,
    })
  }

  updateItemMake() {
    var updateDataObj = {
      makeCode: this.itemMakeForm.value.makeCode,
      makeDescription: this.itemMakeForm.value.makeDescription,
      createdAt: new Date(),
    };

    this.api.updateItemMake(updateDataObj , this.itemMakeModelObj.id).subscribe(
      (res) => {
        alert('Item Make Updated Successfully');
        this.getAllItemMake();
        let ref = document.getElementById('cancel');
        ref?.click();
        //  this.onClose()
        this.itemMakeForm.reset();
      },
      (err) => {
        console.log('Something Went Wrong');
      }
    );
  }


}
