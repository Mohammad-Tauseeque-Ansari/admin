import { Component } from '@angular/core';
import { FormGroup , FormControl } from '@angular/forms';
import { DesignationModel } from './designation.model' ;
import { DesignationService } from '../services/designation.service';


@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.scss']
})
export class ButtonsComponent {
  DesignationModelObj: DesignationModel = new DesignationModel();
  searchTerm: any;
  designationData! : any;
  showAdd!: boolean;
  showUpdate!: boolean;
  currentPage: number = 1; 
  itemsPerPage: number = 8; // you can also change from your comfartablity

   Roles = [
    "Telecoller",
    "Supervisor",
    "Director",
    "Managing",
    "Store Incharge",
    "JV - Partner",
    "Revenue Collector",
    "TeleCallingExecutive",
    "Technician",
    "Employee",
    "Other",
  ];


  constructor(private api: DesignationService) {}

  designationForm = new FormGroup({
    shortCode: new FormControl(''),
    designation: new FormControl(''),
    underDesignation: new FormControl(''),
    createdAt: new FormControl(''),
  });

  ngOnInit(): void {
    this.getAllDesignations();
  }

  onClose() {
    this.designationForm.reset();
  }

  onAdd() {
    this.designationForm.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }
  addNewData() {
    var postDataObj = {
      shortCode: this.designationForm.value.shortCode,
      underDesignation: this.designationForm.value.underDesignation,
      designation: this.designationForm.value.designation,
      createdAt: new Date(),
    };
    // console.log(postDataObj);

    this.api.postDesignation(postDataObj).subscribe(
      (res) => {
        alert('Designation Added Successfully');
        this.getAllDesignations();
        let ref = document.getElementById('cancel');
        ref?.click();
        //  this.onClose()
        this.designationForm.reset();
      },
      (err) => {
        console.log('Something Went Wrong');
      }
    );
  }

  getAllDesignations() {
    this.api.getAllDesignation().subscribe(
      (res) => {
        console.log(res);
        this.designationData = res;
      },
      (err) => {
        alert('Something Went Wrong');
      }
    );
  }

  deleteDesignation(row:any){
    this.api.deleteDesignation(row.id).subscribe(res=>{
      alert("designation Deleted Successfully");
      this.getAllDesignations();
    },err=>{
      alert("Something went wrong while deleting");
    })
  }

  onEdit(row:any){
    this.showAdd = false;
    this.showUpdate = true;
    this.DesignationModelObj.id = row.id ;
    this.designationForm.patchValue({
      shortCode : row.shortCode,
      underDesignation : row.underDesignation,
      designation : row.designation,
      createdAt : row.createdAt,
    })
  }

  updateDesignation() {
    var updateDataObj = {
      shortCode: this.designationForm.value.shortCode,
      underDesignation : this.designationForm.value.underDesignation,
      designation: this.designationForm.value.designation,
      createdAt: new Date(),
    };

    this.api.updateDesignation(updateDataObj , this.DesignationModelObj.id).subscribe(
      (res) => {
        alert('User designation Updated Successfully');
        this.getAllDesignations();
        let ref = document.getElementById('cancel');
        ref?.click();
        //  this.onClose()
        this.designationForm.reset();
      },
      (err) => {
        console.log('Something Went Wrong');
      }
    );
  }

  get totalPages(): number {
    return Math.ceil(this.designationData.length / this.itemsPerPage);
  }

  get pages(): number[] {
    return Array(this.totalPages).fill(0).map((_, index) => index + 1);
  }

  get paginatedDesignationData(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.designationData.slice(startIndex, endIndex);
  }

  // Function to navigate to a specific page
  setPage(pageNumber: number): void {
    if (pageNumber >= 1 && pageNumber <= this.totalPages) {
      this.currentPage = pageNumber;
    }
  }
}
