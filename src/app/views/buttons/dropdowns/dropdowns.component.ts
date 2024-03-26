import { Component } from '@angular/core';
import { FormGroup , FormControl } from '@angular/forms';
import {  UserDepartmentModel} from './userDepartment.model' ;
import { UserDepartmentService } from '../services/user-department.service';

@Component({
  selector: 'app-dropdowns',
  templateUrl: './dropdowns.component.html',
  
})
export class DropdownsComponent {

  UserDepartmentModelObj: UserDepartmentModel = new UserDepartmentModel();
  searchTerm: any;
  UserDepartmentData! : any;
  showAdd!: boolean;
  showUpdate!: boolean;
  currentPage: number = 1; 
  itemsPerPage: number = 8; // you can also change from your comfartablity


  constructor(private api: UserDepartmentService) {}

  userDepartmentForm = new FormGroup({
    shortCode: new FormControl(''),
    deptDetails: new FormControl(''),
    createdAt: new FormControl(''),
  });

  ngOnInit(): void {
    this.getAllDepartment();
  }

  onClose() {
    this.userDepartmentForm.reset();
  }

  onAdd() {
    this.userDepartmentForm.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }
  addNewData() {
    var postDataObj = {
      shortCode: this.userDepartmentForm.value.shortCode,
      
      deptDetails: this.userDepartmentForm.value.deptDetails,
      createdAt: new Date(),
    };
    // console.log(postDataObj);

    this.api.postUserDepartment(postDataObj).subscribe(
      (res) => {
        alert('User Department Added Successfully');
        this.getAllDepartment();
        let ref = document.getElementById('cancel');
        ref?.click();
        //  this.onClose()
        this.userDepartmentForm.reset();
      },
      (err) => {
        console.log('Something Went Wrong');
      }
    );
  }

  getAllDepartment() {
    this.api.getAllUserDepartment().subscribe(
      (res) => {
        console.log(res);
        this.UserDepartmentData = res;
      },
      (err) => {
        alert('Something Went Wrong');
      }
    );
  }

  deleteDepartment(row:any){
    this.api.deleteUserDepartment(row.id).subscribe(res=>{
      alert("User Department Deleted Successfully");
      this.getAllDepartment();
    },err=>{
      alert("Something went wrong while deleting");
    })
  }

  onEdit(row:any){
    this.showAdd = false;
    this.showUpdate = true;
    this.UserDepartmentModelObj.id = row.id ;
    this.userDepartmentForm.patchValue({
      shortCode : row.shortCode,
   
      deptDetails : row.deptDetails,
      createdAt : row.createdAt,
    })
  }

  updateDepartment() {
    var updateDataObj = {
      shortCode: this.userDepartmentForm.value.shortCode,
      
      deptDetails: this.userDepartmentForm.value.deptDetails,
      createdAt: new Date(),
    };

    this.api.updateUserDepartment(updateDataObj , this.UserDepartmentModelObj.id).subscribe(
      (res) => {
        alert('User Department Updated Successfully');
        this.getAllDepartment();
        let ref = document.getElementById('cancel');
        ref?.click();
        //  this.onClose()
        this.userDepartmentForm.reset();
      },
      (err) => {
        console.log('Something Went Wrong');
      }
    );
  }

  get totalPages(): number {
    return Math.ceil(this.UserDepartmentData.length / this.itemsPerPage);
  }

  get pages(): number[] {
    return Array(this.totalPages).fill(0).map((_, index) => index + 1);
  }

  get paginatedDepartmentData(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.UserDepartmentData.slice(startIndex, endIndex);
  }

  // Function to navigate to a specific page
  setPage(pageNumber: number): void {
    if (pageNumber >= 1 && pageNumber <= this.totalPages) {
      this.currentPage = pageNumber;
    }
  }

}
