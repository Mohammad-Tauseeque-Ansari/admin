import { Component } from '@angular/core';
import { FormGroup , FormControl, Validators } from '@angular/forms';
import { ContracterModel } from './contracter.model' ;
import { ContarcterService } from '../shared/services/contarcter.service';
import * as XLSX from 'xlsx'; // Import XLSX library for Excel export
import { saveAs } from 'file-saver'; // Import saveAs function for file download

interface ContractData {
  id: number;
  contracterName: string;
  address1: string;
  address2: string;
  mobile: string;
  remark: string;
}


@Component({
  selector: 'app-paginations',
  templateUrl: './paginations.component.html',
  styleUrls: ['./paginations.component.scss']
})
export class PaginationsComponent {

    
  ContractModelObj: ContracterModel = new ContracterModel();
  searchTerm: any;
  ContractMasterData! : any;
  showAdd!: boolean;
  showUpdate!: boolean;
  currentPage: number = 1; 
  itemsPerPage: number = 8; // you can also change from your requiremnt

  constructor(private api:ContarcterService) { }

  contractMasterForm = new FormGroup({
    contracterName: new FormControl('' ,[Validators.required]),
    address1: new FormControl(''),
    address2: new FormControl('' ,[Validators.required]),
    mobile: new FormControl('' , [Validators.required]),
    remark: new FormControl(''),
  });


  ngOnInit(): void {
    this.getAllContracterData();
  }

  onClose() {
    this.contractMasterForm.reset();
  }

  onAdd() {
    this.contractMasterForm.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }
  addNewData() {
    var postDataObj = {
      contracterName: this.contractMasterForm.value.contracterName,
      address1: this.contractMasterForm.value.address1,
      address2:this.contractMasterForm.value.address2,
      mobile: this.contractMasterForm.value.mobile,
      remark: this.contractMasterForm.value.remark,
    };
    // console.log(postDataObj);

    this.api.postContracter(postDataObj).subscribe(
      (res) => {
        alert('Contract Master Added Successfully');
        this.getAllContracterData();
        let ref = document.getElementById('cancel');
        ref?.click();
        //  this.onClose()
        this.contractMasterForm.reset();
      },
      (err) => {
        console.log('Something Went Wrong');
      }
    );
  }

  getAllContracterData() {
    this.api.getAllContracter().subscribe(
      (res) => {
        console.log(res);
        this.ContractMasterData = res;
      },
      (err) => {
        alert('Something Went Wrong');
      }
    );
  }

  deleteContracter(row:any){
    this.api.deleteContracter(row.id).subscribe(res=>{
      alert("Contract Master Deleted Successfully");
      this.getAllContracterData();
    },err=>{
      alert("Something went wrong while deleting");
    })
  }

  onEdit(row:any){
    this.showAdd = false;
    this.showUpdate = true;
    this.ContractModelObj.id = row.id ;
    this.contractMasterForm.patchValue({
      contracterName : row.contracterName,
      address1 : row.address1,
      address2 : row.address2,
      mobile : row.mobile,
      remark : row.remark,
    })
  }

  updateContracter() {
    var updateDataObj = {
      contracterName: this.contractMasterForm.value.contracterName,
      address1: this.contractMasterForm.value.address1,
      address2:this.contractMasterForm.value.address2,
      mobile: this.contractMasterForm.value.mobile,
      remark: this.contractMasterForm.value.remark,
    };

    this.api.updateContracter(updateDataObj , this.ContractModelObj.id).subscribe(
      (res) => {
        alert('Contract Master Updated Successfully');
        this.getAllContracterData();
        let ref = document.getElementById('cancel');
        ref?.click();
        //  this.onClose()
        this.contractMasterForm.reset();
      },
      (err) => {
        console.log('Something Went Wrong');
      }
    );
  }

  get totalPages(): number {
    return Math.ceil(this.ContractMasterData.length / this.itemsPerPage);
  }

  get pages(): number[] {
    return Array(this.totalPages).fill(0).map((_, index) => index + 1);
  }

  get paginatedContracterData(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.ContractMasterData.slice(startIndex, endIndex);
  }

  // Function to navigate to a specific page
  setPage(pageNumber: number): void {
    if (pageNumber >= 1 && pageNumber <= this.totalPages) {
      this.currentPage = pageNumber;
    }
  }

  exportToExcel(): void {
    // Convert ContractMasterData to Excel format
    const excelData = this.ContractMasterData.map((row:any) => {
      return {
        'Sr.No.': row.id,
        'Contracter Name': row.contracterName,
        'Address 1': row.address1,
        'Address 2': row.address2,
        'Mobile No': row.mobile,
        'Remark': row.remark
      };
    });

    // Create worksheet
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(excelData);

    // Create workbook and add the worksheet
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };

    // Convert the workbook to an Excel Binary String
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

    // Save as Excel file
    const data: Blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
    const fileName: string = 'contract_master_data.xlsx';
    saveAs(data, fileName);
  }

}
