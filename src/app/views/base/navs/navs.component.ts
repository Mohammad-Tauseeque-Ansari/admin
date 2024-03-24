import { Component } from '@angular/core';
import { FormGroup , FormControl, Validators } from '@angular/forms';
import { JobMasterModel } from './jobMaster.model' ;
import { JobMasterService } from '../shared/services/job-master.service';

@Component({
  selector: 'app-navs',
  templateUrl: './navs.component.html',
  styleUrls: ['./navs.component.scss']
})
export class NavsComponent {

  
  jobMasterModelObj: JobMasterModel = new JobMasterModel();
  searchTerm: any;
  jobMasterData! : any;
  showAdd!: boolean;
  showUpdate!: boolean;
  currentPage: number = 1; 
  itemsPerPage: number = 8; // you can also change from your requiremnt


  constructor(private api : JobMasterService) { }

  jobMasterForm = new FormGroup({
    jobTitle: new FormControl('' ,[Validators.required]),
    jobDescription: new FormControl(''),
    beginDate: new FormControl('' ,[Validators.required]),
    endDate: new FormControl('' , [Validators.required]),
    remark: new FormControl(''),
  });


  ngOnInit(): void {
    this.getAllJobs();
  }

  onClose() {
    this.jobMasterForm.reset();
  }

  onAdd() {
    this.jobMasterForm.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }
  addNewData() {
    var postDataObj = {
      jobTitle: this.jobMasterForm.value.jobTitle,
      jobDescription: this.jobMasterForm.value.jobDescription,
      beginDate:this.jobMasterForm.value.beginDate,
      endDate: this.jobMasterForm.value.endDate,
      remark: this.jobMasterForm.value.remark,
    };
    // console.log(postDataObj);

    this.api.postJobMaster(postDataObj).subscribe(
      (res) => {
        alert('Job Master Added Successfully');
        this.getAllJobs();
        let ref = document.getElementById('cancel');
        ref?.click();
        //  this.onClose()
        this.jobMasterForm.reset();
      },
      (err) => {
        console.log('Something Went Wrong');
      }
    );
  }

  getAllJobs() {
    this.api.getAllJobMaster().subscribe(
      (res) => {
        console.log(res);
        this.jobMasterData = res;
      },
      (err) => {
        alert('Something Went Wrong');
      }
    );
  }

  deleteJobMaster(row:any){
    this.api.deleteJobMaster(row.id).subscribe(res=>{
      alert("Job Master Deleted Successfully");
      this.getAllJobs();
    },err=>{
      alert("Something went wrong while deleting");
    })
  }

  onEdit(row:any){
    this.showAdd = false;
    this.showUpdate = true;
    this.jobMasterModelObj.id = row.id ;
    this.jobMasterForm.patchValue({
      jobTitle : row.jobTitle,
      jobDescription : row.jobDescription,
      beginDate : row.beginDate,
      endDate : row.endDate,
      remark : row.remark,
    })
  }

  updateJobMaster() {
    var updateDataObj = {
      jobTitle: this.jobMasterForm.value.jobTitle,
      jobDescription: this.jobMasterForm.value.jobDescription,
      beginDate:this.jobMasterForm.value.beginDate,
      endDate: this.jobMasterForm.value.endDate,
      remark: this.jobMasterForm.value.remark,
    };

    this.api.updateJobMaster(updateDataObj , this.jobMasterModelObj.id).subscribe(
      (res) => {
        alert('Job Master Updated Successfully');
        this.getAllJobs();
        let ref = document.getElementById('cancel');
        ref?.click();
        //  this.onClose()
        this.jobMasterForm.reset();
      },
      (err) => {
        console.log('Something Went Wrong');
      }
    );
  }

  get totalPages(): number {
    return Math.ceil(this.jobMasterData.length / this.itemsPerPage);
  }

  get pages(): number[] {
    return Array(this.totalPages).fill(0).map((_, index) => index + 1);
  }

  get paginatedJobMasterData(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.jobMasterData.slice(startIndex, endIndex);
  }

  // Function to navigate to a specific page
  setPage(pageNumber: number): void {
    if (pageNumber >= 1 && pageNumber <= this.totalPages) {
      this.currentPage = pageNumber;
    }
  }


}

