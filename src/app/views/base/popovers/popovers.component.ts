import { Component, OnInit } from '@angular/core';
import { FormGroup , FormControl, Validators } from '@angular/forms';
import { TaxDiscountModel } from './taxDiscount.model' ;
import { TaxDiscountService } from '../shared/services/tax-discount.service';

@Component({
  selector: 'app-popovers',
  templateUrl: './popovers.component.html',
  styleUrls: ['./popovers.component.scss']
})
export class PopoversComponent implements OnInit {

  taxDiscountModelObj: TaxDiscountModel = new TaxDiscountModel();
  searchTerm: any;
  taxDiscountData! : any;
  showAdd!: boolean;
  showUpdate!: boolean;
  currentPage: number = 1; 
  itemsPerPage: number = 8; // you can also change from your requiremnt


  constructor(private api : TaxDiscountService) { }


  taxDiscountForm = new FormGroup({
    tName: new FormControl('' ,[Validators.required]),
    type: new FormControl(''),
    tdFor: new FormControl('' ,[Validators.required]),
    createdAt :new FormControl(''),
    remark: new FormControl(''),
  });


  ngOnInit(): void {
    this.getAllTaxDiscount();
  }

  onClose() {
    this.taxDiscountForm.reset();
  }

  onAdd() {
    this.taxDiscountForm.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }
  addNewData() {
    var postDataObj = {
      tName: this.taxDiscountForm.value.tName,
      type: this.taxDiscountForm.value.type,
      tdFor:this.taxDiscountForm.value.tdFor,
      createdAt: new Date(),
      remark: this.taxDiscountForm.value.remark,
    };
    // console.log(postDataObj);

    this.api.postTaxDiscount(postDataObj).subscribe(
      (res) => {
        alert('Tax Discount  Added Successfully');
        this.getAllTaxDiscount();
        let ref = document.getElementById('cancel');
        ref?.click();
        //  this.onClose()
        this.taxDiscountForm.reset();
      },
      (err) => {
        console.log('Something Went Wrong');
      }
    );
  }

  getAllTaxDiscount() {
    this.api.getAllTaxDiscount().subscribe(
      (res) => {
        console.log(res);
        this.taxDiscountData = res;
      },
      (err) => {
        alert('Something Went Wrong');
      }
    );
  }

  deleteTaxDiscount(row:any){
    this.api.deleteTaxDiscount(row.id).subscribe(res=>{
      alert("Tax Discount  Deleted Successfully");
      this.getAllTaxDiscount();
    },err=>{
      alert("Something went wrong while deleting");
    })
  }

  onEdit(row:any){
    this.showAdd = false;
    this.showUpdate = true;
    this.taxDiscountModelObj.id = row.id ;
    this.taxDiscountForm.patchValue({
      tName : row.tName,
      type : row.type,
      tdFor : row.tdFor,
      createdAt : row.createdAt,
      remark : row.remark,
    })
  }

  updateTaxDisount() {
    var updateDataObj = {
      tName: this.taxDiscountForm.value.tName,
      type: this.taxDiscountForm.value.type,
      tdFor:this.taxDiscountForm.value.tdFor,
      createdAt: this.taxDiscountForm.value.createdAt,
      remark: this.taxDiscountForm.value.remark,
    };

    this.api.updateTaxDiscount(updateDataObj , this.taxDiscountModelObj.id).subscribe(
      (res) => {
        alert('Tax Discount  Updated Successfully');
        this.getAllTaxDiscount();
        let ref = document.getElementById('cancel');
        ref?.click();
        //  this.onClose()
        this.taxDiscountForm.reset();
      },
      (err) => {
        console.log('Something Went Wrong');
      }
    );
  }

  get totalPages(): number {
    return Math.ceil(this.taxDiscountData.length / this.itemsPerPage);
  }

  get pages(): number[] {
    return Array(this.totalPages).fill(0).map((_, index) => index + 1);
  }

  get paginatedTaxDiscountData(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.taxDiscountData.slice(startIndex, endIndex);
  }

  // Function to navigate to a specific page
  setPage(pageNumber: number): void {
    if (pageNumber >= 1 && pageNumber <= this.totalPages) {
      this.currentPage = pageNumber;
    }
  }
    
  }


