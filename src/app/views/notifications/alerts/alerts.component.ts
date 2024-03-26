import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MRNDetailsModel } from './mrn.model';
import { MrnService } from '../services/mrn.service';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.scss'],
})
export class AlertsComponent implements OnInit {
  mrnDetailsModelObj: MRNDetailsModel = new MRNDetailsModel();
  searchTerm: any;
  mrnDetailsData!: any;
  showAdd!: boolean;
  showUpdate!: boolean;
  currentPage: number = 1;
  itemsPerPage: number = 8; // you can also change from your comfartablity

  DepartmentData!: any;
  ItemData!: any;
  JobMasterData!: any;
  SupplierData!: any;

  constructor(private api: MrnService) {}

  mrnDetailsForm = new FormGroup({
    mrnDate: new FormControl('', [Validators.required]),
    interchange: new FormControl(''),
    storeInterchange: new FormControl(''),
    hod: new FormControl('', [Validators.required]),
    authorSign: new FormControl(''),
    remark: new FormControl(''),
    item: new FormControl('', [Validators.required]),
    currentPR: new FormControl(''),
    quantityRequired: new FormControl(''),
    quantityOrder: new FormControl(''),
    uom: new FormControl(''),
    quantityStock: new FormControl(''),
    lastPR: new FormControl(''),
    lastPRDate: new FormControl(''),
    mRemark: new FormControl(''),
    supplier: new FormControl('', [Validators.required]),
    department: new FormControl('', [Validators.required]),
    jobMaster: new FormControl('', [Validators.required]),
    createdAt: new FormControl(''),
  });

  ngOnInit(): void {
    this.getAllMrnDetails();
    this.getDepartment();
    this.getSupplier();
    this.getJobData();
    this.getItem();
  }

  onClose() {
    this.mrnDetailsForm.reset();
  }

  onAdd() {
    this.mrnDetailsForm.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }
  addNewData() {
    var postDataObj = {
      mrnDate: this.mrnDetailsForm.value.mrnDate,
      interchange: this.mrnDetailsForm.value.interchange,
      storeInterchange: this.mrnDetailsForm.value.storeInterchange,
      hod: this.mrnDetailsForm.value.hod,
      authorSign: this.mrnDetailsForm.value.authorSign,
      remark: this.mrnDetailsForm.value.remark,
      item: this.mrnDetailsForm.value.item,
      currentPR: this.mrnDetailsForm.value.currentPR,
      quantityRequired: this.mrnDetailsForm.value.quantityRequired,
      quantityOrder: this.mrnDetailsForm.value.quantityOrder,
      uom: this.mrnDetailsForm.value.uom,
      quantityStock: this.mrnDetailsForm.value.quantityStock,
      lastPR: this.mrnDetailsForm.value.lastPR,
      lastPRDate: this.mrnDetailsForm.value.lastPRDate,
      mRemark: this.mrnDetailsForm.value.mRemark,
      supplier: this.mrnDetailsForm.value.supplier,
      department: this.mrnDetailsForm.value.department,
      jobMaster: this.mrnDetailsForm.value.jobMaster,
      createdAt: new Date(),
    };
    // console.log(postDataObj);

    this.api.postmrnDetails(postDataObj).subscribe(
      (res) => {
        alert('MRN Details Added Successfully');
        this.getAllMrnDetails();
        let ref = document.getElementById('cancel');
        ref?.click();
        //  this.onClose()
        this.mrnDetailsForm.reset();
      },
      (err) => {
        console.log('Something Went Wrong');
      }
    );
  }

  getAllMrnDetails() {
    this.api.getAllmrnDetails().subscribe(
      (res) => {
         
        this.mrnDetailsData = res;
         
        
      },
      (err) => {
        alert('Something Went Wrong');
      }
    );
  }

  getDepartment() {
    this.api.getDepartment().subscribe(
      (res) => {
        console.log(res);
        this.DepartmentData = res.map((dept: any) => dept.deptName);
        console.log("Department Data" , this.DepartmentData);
        
      },
      (err) => {
        alert('Something Went Wrong');
      }
    );
  }

  getJobData() {
    this.api.getJobMaster().subscribe(
      (res) => {
        console.log(res);
        this.JobMasterData = res.map((job: any) => job.jobTitle);
        console.log("Job Data" , this.JobMasterData);

      },
      (err) => {
        alert('Something Went Wrong');
      }
    );
  }

  getItem() {
    this.api.getitemMaster().subscribe(
      (res) => {
        console.log(res);
        this.ItemData = res.map((item: any) => ({
          itemName: item.itemName,
          itemCode: item.itemCode,
        }));
        console.log("Item Data" , this.ItemData);

      },
      (err) => {
        alert('Something Went Wrong');
      }
    );
  }

  getSupplier() {
    this.api.getSupplier().subscribe(
      (res) => {
        console.log(res);
        this.SupplierData = res.map((supp: any) => ({
          supplierName: supp.supplierName,
          mobile: supp.mobile,
        }));
        console.log("Supplier Data" , this.SupplierData);

      },
      (err) => {
        alert('Something Went Wrong');
      }
    );
  }

  deleteMrnDetails(row: any) {
    this.api.deletemrnDetails(row.id).subscribe(
      (res) => {
        alert('designation Deleted Successfully');
        this.getAllMrnDetails();
      },
      (err) => {
        alert('Something went wrong while deleting');
      }
    );
  }

  onEdit(row: any) {
    this.showAdd = false;
    this.showUpdate = true;
    this.mrnDetailsModelObj.id = row.id;
    this.mrnDetailsForm.patchValue({
      mrnDate: row.mrnDate,
      interchange: row.interchange,
      storeInterchange: row.storeInterchange,
      hod: row.hod,
      authorSign: row.authorSign,
      remark: row.remark,
      item: row.item,
      currentPR: row.currentPR,
      quantityRequired: row.quantityRequired,
      quantityOrder: row.quantityOrder,
      uom: row.uom,
      quantityStock: row.quantityStock,
      lastPR: row.lastPR,
      lastPRDate: row.lastPRDate,
      mRemark: row.mRemark,
      supplier: row.supplier,
      department: row.department,
      jobMaster: row.jobMaster,
    });
  }

  updateMrnDetails() {
    var updateDataObj = {
      mrnDate: this.mrnDetailsForm.value.mrnDate,
      interchange: this.mrnDetailsForm.value.interchange,
      storeInterchange: this.mrnDetailsForm.value.storeInterchange,
      hod: this.mrnDetailsForm.value.hod,
      authorSign: this.mrnDetailsForm.value.authorSign,
      remark: this.mrnDetailsForm.value.remark,
      item: this.mrnDetailsForm.value.item,
      currentPR: this.mrnDetailsForm.value.currentPR,
      quantityRequired: this.mrnDetailsForm.value.quantityRequired,
      quantityOrder: this.mrnDetailsForm.value.quantityOrder,
      uom: this.mrnDetailsForm.value.uom,
      quantityStock: this.mrnDetailsForm.value.quantityStock,
      lastPR: this.mrnDetailsForm.value.lastPR,
      lastPRDate: this.mrnDetailsForm.value.lastPRDate,
      mRemark: this.mrnDetailsForm.value.mRemark,
      supplier: this.mrnDetailsForm.value.supplier,
      department: this.mrnDetailsForm.value.department,
      jobMaster: this.mrnDetailsForm.value.jobMaster,
      createdAt: new Date(),
    };

    this.api
      .updatemrnDetails(updateDataObj, this.mrnDetailsModelObj.id)
      .subscribe(
        (res) => {
          alert('MRN Details Updated Successfully');
          this.getAllMrnDetails();
          let ref = document.getElementById('cancel');
          ref?.click();
          //  this.onClose()
          this.mrnDetailsForm.reset();
        },
        (err) => {
          console.log('Something Went Wrong');
        }
      );
  }

  get totalPages(): number {
    return Math.ceil(this.mrnDetailsData.length / this.itemsPerPage);
  }

  get pages(): number[] {
    return Array(this.totalPages)
      .fill(0)
      .map((_, index) => index + 1);
  }

  get paginatedMRNDetailsData(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.mrnDetailsData.slice(startIndex, endIndex);
  }

  // Function to navigate to a specific page
  setPage(pageNumber: number): void {
    if (pageNumber >= 1 && pageNumber <= this.totalPages) {
      this.currentPage = pageNumber;
    }
  }
}
