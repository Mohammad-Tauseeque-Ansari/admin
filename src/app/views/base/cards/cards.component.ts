import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SupplierService } from '../shared/services/supplier.service';
import { SupplierModel } from './supplier.model';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss'],
})
export class CardsComponent {
  supplierModelObj: SupplierModel = new SupplierModel();
  searchTerm: string = '';

  supplierData!: any;

  showAdd!: boolean;
  showUpdate!: boolean;

  constructor(private api: SupplierService) {}

  supplierForm = new FormGroup({
    supplierName: new FormControl(''),
    cPerson: new FormControl(''),
    mobile: new FormControl(''),
    email: new FormControl(''),
    phone1: new FormControl(''),
    phone2: new FormControl(''),
    faxNo: new FormControl(''),
    address1: new FormControl(''),
    address2: new FormControl(''),
    state: new FormControl(''),
    pin: new FormControl(''),
    tax1: new FormControl(''),
    tax1Date: new FormControl(''),
    tax2: new FormControl(''),
    tax2Date: new FormControl(''),
    bankName: new FormControl(''),
    ifscCode: new FormControl(''),
    accountNumber: new FormControl(''),
    creditDays: new FormControl(''),
    gstNumber: new FormControl(''),
    remarks: new FormControl(''),
    date: new FormControl(''),
  });

  ngOnInit(): void {
    this.getAllSupplier();
  }

  onClose() {
    this.supplierForm.reset();
  }

  onAdd() {
    this.supplierForm.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  AddNewData() {
    // console.log(this.supplierForm.value);

    var postDataObj = {
      supplierName: this.supplierForm.value.supplierName,
      cPerson: this.supplierForm.value.cPerson,
      mobile: this.supplierForm.value.mobile,
      email: this.supplierForm.value.email,
      phone1: this.supplierForm.value.phone1,
      phone2: this.supplierForm.value.phone2,
      faxNo: this.supplierForm.value.faxNo,
      address1: this.supplierForm.value.address1,
      address2: this.supplierForm.value.address2,
      state: this.supplierForm.value.state,
      pin: this.supplierForm.value.pin,
      tax1: this.supplierForm.value.tax1,
      tax1Date1: this.supplierForm.value.tax1Date,
      tax2: this.supplierForm.value.tax2,
      tax2Date2: this.supplierForm.value.tax2Date,
      bankName: this.supplierForm.value.bankName,
      ifscCode: this.supplierForm.value.ifscCode,
      accountNumber: this.supplierForm.value.accountNumber,
      creditDays: this.supplierForm.value.creditDays,
      gstNumber: this.supplierForm.value.gstNumber,
      remarks: this.supplierForm.value.remarks,
      date: this.supplierForm.value.date,
    };
    console.log(postDataObj);

    this.api.postSupplier(postDataObj).subscribe(
      (res) => {
        alert('Supplier Added Successfully');
        this.getAllSupplier();
        let ref = document.getElementById('cancel');
        ref?.click();
        //  this.onClose()
        this.supplierForm.reset();
      },
      (err) => {
        console.log('Something Went Wrong');
      }
    );
  }

  getAllSupplier() {
    this.api.getSupplier().subscribe(
      (res) => {
        console.log(res);
        this.supplierData = res;
      },
      (err) => {
        console.log('Something went wrong');
      }
    );
  }

  deleteSupplier(row: any) {
    this.api.deleteSupplier(row.id).subscribe((res) => {
      alert('Supplier Deleted Successfully');
      this.getAllSupplier();
    });
  }

  onEdit(row: any) {
    this.showAdd = false;
    this.showUpdate = true;
    this.supplierModelObj.id = row.id;
    this.supplierForm.patchValue({
      supplierName: row.supplierName,
      cPerson: row.cPerson,
      mobile: row.mobile,
      email: row.email,
      phone1: row.phone1,
      phone2: row.phone2,
      faxNo: row.faxNo,
      address1: row.address1,
      address2: row.address2,
      state: row.state,
      pin: row.pin,
      tax1: row.tax1,
      tax1Date: row.tax1Date, // Assuming row.tax1Date is a string representing a date
      tax2: row.tax2,
      tax2Date: row.tax2Date, // Assuming row.tax2Date is a string representing a date
      bankName: row.bankName,
      ifscCode: row.ifscCode,
      accountNumber: row.accountNumber,
      creditDays: row.creditDays,
      gstNumber: row.gstNumber,
      remarks: row.remarks,
      date: row.date, // Assuming row.date is a string representing a date
    });
  }

  updateSupplier() {
     
    var updatedDataObj = {
      supplierName: this.supplierForm.value.supplierName,
      cPerson: this.supplierForm.value.cPerson,
      mobile: this.supplierForm.value.mobile,
      email: this.supplierForm.value.email,
      phone1: this.supplierForm.value.phone1,
      phone2: this.supplierForm.value.phone2,
      faxNo: this.supplierForm.value.faxNo,
      address1: this.supplierForm.value.address1,
      address2: this.supplierForm.value.address2,
      state: this.supplierForm.value.state,
      pin: this.supplierForm.value.pin,
      tax1: this.supplierForm.value.tax1,
      tax1Date1: this.supplierForm.value.tax1Date,
      tax2: this.supplierForm.value.tax2,
      tax2Date2: this.supplierForm.value.tax2Date,
      bankName: this.supplierForm.value.bankName,
      ifscCode: this.supplierForm.value.ifscCode,
      accountNumber: this.supplierForm.value.accountNumber,
      creditDays: this.supplierForm.value.creditDays,
      gstNumber: this.supplierForm.value.gstNumber,
      remarks: this.supplierForm.value.remarks,
      date: this.supplierForm.value.date,
    };
    console.log(updatedDataObj);
    this.api.updateSupplier(updatedDataObj, this.supplierModelObj.id).subscribe(
      (res) => {
        alert('Supplier Updated Successfully');
        this.getAllSupplier();
        let ref = document.getElementById('cancel');
        ref?.click();
        this.supplierForm.reset();
      },
      (err) => {
        console.log('Something Went wrong');
      }
    );
  }

  

  filterSuppliers(): void {
    this.api.getSupplier().subscribe(
      (res) => {
        this.supplierData = res.filter((supplier: any) => {
          return (
            supplier.supplierName
              .toLowerCase()
              .includes(this.searchTerm.toLowerCase()) ||
            supplier.cPerson
              .toLowerCase()
              .includes(this.searchTerm.toLowerCase()) ||
            supplier.mobile
              .toLowerCase()
              .includes(this.searchTerm.toLowerCase()) ||
            supplier.email
              .toLowerCase()
              .includes(this.searchTerm.toLowerCase()) ||
            supplier.phone1
              .toLowerCase()
              .includes(this.searchTerm.toLowerCase()) ||
            supplier.phone2
              .toLowerCase()
              .includes(this.searchTerm.toLowerCase()) ||
            supplier.faxNo
              .toLowerCase()
              .includes(this.searchTerm.toLowerCase()) ||
            supplier.address1
              .toLowerCase()
              .includes(this.searchTerm.toLowerCase()) ||
            supplier.address2
              .toLowerCase()
              .includes(this.searchTerm.toLowerCase()) ||
            supplier.state
              .toLowerCase()
              .includes(this.searchTerm.toLowerCase()) ||
            supplier.pin
              .toLowerCase()
              .includes(this.searchTerm.toLowerCase()) ||
            supplier.tax1
              .toLowerCase()
              .includes(this.searchTerm.toLowerCase()) ||
            supplier.tax2
              .toLowerCase()
              .includes(this.searchTerm.toLowerCase()) ||
            supplier.bankName
              .toLowerCase()
              .includes(this.searchTerm.toLowerCase())
            // Add similar conditions for other fields
          );
        });
      },
      (err) => {
        console.log('Something went wrong');
      }
    );
  }
}
