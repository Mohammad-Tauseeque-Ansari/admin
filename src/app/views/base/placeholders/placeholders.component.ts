import { Component, OnInit } from '@angular/core';
import { FormGroup , FormControl, Validators } from '@angular/forms';
import { JobContracterModel } from './jobContracter.model' ;
import { JobContracterService } from '../shared/services/job-contracter.service';

@Component({
  selector: 'app-placeholders',
  templateUrl: './placeholders.component.html',
  styleUrls: ['./placeholders.component.scss']
})
export class PlaceholdersComponent implements OnInit {
  jobContracterModelObj: JobContracterModel = new JobContracterModel();
  searchTerm: any;
  jobContracterData! : any;
  showAdd!: boolean;
  showUpdate!: boolean;
  currentPage: number = 1; 
  itemsPerPage: number = 8; // you can also change from your requiremnt
  jobContracterNames !:any;
  jobMasterNames !:any;

  constructor(private api : JobContracterService) { }

  jobContracterForm = new FormGroup({
    jobSelect: new FormControl('' ,[Validators.required]),
    jobContracter: new FormControl('' ,[Validators.required]),
    startDate: new FormControl('' ,[Validators.required]),
    endDate: new FormControl('' , [Validators.required]),
    remark: new FormControl(''),
  });
  
  // jobSelect : string = '';
  // jobContracter : string = '';
  // startDate :  Date = new Date();
  // endDate :  Date = new Date();
   


  ngOnInit(): void {
    this.getAllJobContracters();
    this.getContracterNames() ;
    this.getJobMaster();
  }

  onClose() {
    this.jobContracterForm.reset();
  }

  onAdd() {
    this.jobContracterForm.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }
  addNewData() {
    var postDataObj = {
      jobSelect: this.jobContracterForm.value.jobSelect,
      jobContracter: this.jobContracterForm.value.jobContracter,
      startDate:this.jobContracterForm.value.startDate,
      endDate: this.jobContracterForm.value.endDate,
      remark: this.jobContracterForm.value.remark,
    };
    // console.log(postDataObj);

    this.api.postJobContracter(postDataObj).subscribe(
      (res) => {
        alert('Job Contracter Added Successfully');
        this.getAllJobContracters();
        let ref = document.getElementById('cancel');
        ref?.click();
        //  this.onClose()
        this.jobContracterForm.reset();
      },
      (err) => {
        console.log('Something Went Wrong');
      }
    );
  }

  getAllJobContracters() {
    this.api.getAllJobContracter().subscribe(
      (res) => {
        console.log(res);
        this.jobContracterData = res;
      },
      (err) => {
        alert('Something Went Wrong');
      }
    );
  }
 
  getContracterNames() {
    this.api.getContracterNames().subscribe(
      (res) => {
        console.log(res);
        this.jobContracterNames = res.map((contracter:any)=>contracter.contracterName);
      },
      (err) => {
        alert('Something Went Wrong');
      }
    );
  }

  getJobMaster(){
    this.api.getJobMasterNames().subscribe(res=>{
      console.log(res);
      this.jobMasterNames =res.map((names:any)=> names.jobTitle)
    },
    (err) => {
      alert('Something Went Wrong');
    })
  }

  deleteJobContracter(row:any){
    this.api.deleteJobContracter(row.id).subscribe(res=>{
      alert("Job Contracter Deleted Successfully");
      this.getAllJobContracters();
    },err=>{
      alert("Something went wrong while deleting");
    })
  }

  onEdit(row:any){
    this.showAdd = false;
    this.showUpdate = true;
    this.jobContracterModelObj.id = row.id ;
    this.jobContracterForm.patchValue({
      jobSelect : row.jobSelect,
      jobContracter : row.jobContracter,
      startDate : row.startDate,
      endDate : row.endDate,
      remark : row.remark,
    })
  }

  updateJobContracter() {
    var updateDataObj = {
      jobSelect: this.jobContracterForm.value.jobSelect,
      jobContracter: this.jobContracterForm.value.jobContracter,
      startDate:this.jobContracterForm.value.startDate,
      endDate: this.jobContracterForm.value.endDate,
      remark: this.jobContracterForm.value.remark,
    };

    this.api.updateJobContracter(updateDataObj , this.jobContracterModelObj.id).subscribe(
      (res) => {
        alert('Job Contracter Updated Successfully');
        this.getAllJobContracters();
        let ref = document.getElementById('cancel');
        ref?.click();
        //  this.onClose()
        this.jobContracterForm.reset();
      },
      (err) => {
        console.log('Something Went Wrong');
      }
    );
  }

  get totalPages(): number {
    return Math.ceil(this.jobContracterData.length / this.itemsPerPage);
  }

  get pages(): number[] {
    return Array(this.totalPages).fill(0).map((_, index) => index + 1);
  }

  get paginatedJobContracterData(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.jobContracterData.slice(startIndex, endIndex);
  }

  // Function to navigate to a specific page
  setPage(pageNumber: number): void {
    if (pageNumber >= 1 && pageNumber <= this.totalPages) {
      this.currentPage = pageNumber;
    }
  }

}
