import { Component } from '@angular/core';
import { FormGroup , FormControl } from '@angular/forms';
import { UserRoleModel } from './userRole.model' ;
import { UserRoleService } from '../services/user-role.service';

@Component({
  selector: 'app-button-groups',
  templateUrl: './button-groups.component.html',
  styleUrls: ['./button-groups.component.scss']
})
export class ButtonGroupsComponent {
  UserRoleModelObj: UserRoleModel = new UserRoleModel();
  searchTerm: any;
  userRoleData! : any;
  showAdd!: boolean;
  showUpdate!: boolean;
  currentPage: number = 1; 
  itemsPerPage: number = 8; // you can also change from your comfartablity


  constructor(private api: UserRoleService) {}

  userRoleForm = new FormGroup({
    shortCode: new FormControl(''),
    role: new FormControl(''),
    description: new FormControl(''),
    createdAt: new FormControl(''),
  });

  ngOnInit(): void {
    this.getAllUserRole();
  }

  onClose() {
    this.userRoleForm.reset();
  }

  onAdd() {
    this.userRoleForm.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }
  addNewData() {
    var postDataObj = {
      shortCode: this.userRoleForm.value.shortCode,
      description: this.userRoleForm.value.description,
      role: this.userRoleForm.value.role,
      createdAt: new Date(),
    };
    // console.log(postDataObj);

    this.api.postUser(postDataObj).subscribe(
      (res) => {
        alert('User Role Added Successfully');
        this.getAllUserRole();
        let ref = document.getElementById('cancel');
        ref?.click();
        //  this.onClose()
        this.userRoleForm.reset();
      },
      (err) => {
        console.log('Something Went Wrong');
      }
    );
  }

  getAllUserRole() {
    this.api.getAllUser().subscribe(
      (res) => {
        console.log(res);
        this.userRoleData = res;
      },
      (err) => {
        alert('Something Went Wrong');
      }
    );
  }

  deleteUserRole(row:any){
    this.api.deleteUser(row.id).subscribe(res=>{
      alert("User Role Deleted Successfully");
      this.getAllUserRole();
    },err=>{
      alert("Something went wrong while deleting");
    })
  }

  onEdit(row:any){
    this.showAdd = false;
    this.showUpdate = true;
    this.UserRoleModelObj.id = row.id ;
    this.userRoleForm.patchValue({
      shortCode : row.shortCode,
      description : row.description,
      role : row.role,
      createdAt : row.createdAt,
    })
  }

  updateUserRole() {
    var updateDataObj = {
      shortCode: this.userRoleForm.value.shortCode,
      description : this.userRoleForm.value.description,
      role: this.userRoleForm.value.role,
      createdAt: new Date(),
    };

    this.api.updateUser(updateDataObj , this.UserRoleModelObj.id).subscribe(
      (res) => {
        alert('User Role Updated Successfully');
        this.getAllUserRole();
        let ref = document.getElementById('cancel');
        ref?.click();
        //  this.onClose()
        this.userRoleForm.reset();
      },
      (err) => {
        console.log('Something Went Wrong');
      }
    );
  }

  get totalPages(): number {
    return Math.ceil(this.userRoleData.length / this.itemsPerPage);
  }

  get pages(): number[] {
    return Array(this.totalPages).fill(0).map((_, index) => index + 1);
  }

  get paginatedUserRoleData(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.userRoleData.slice(startIndex, endIndex);
  }

  // Function to navigate to a specific page
  setPage(pageNumber: number): void {
    if (pageNumber >= 1 && pageNumber <= this.totalPages) {
      this.currentPage = pageNumber;
    }
  }

  
}
