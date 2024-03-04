import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { departmentModel } from './department.model';
import { DepartmentService } from '../shared/services/department.service';

@Component({
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss'],
})
export class BreadcrumbsComponent implements OnInit {
  public items = <any>[];
  departments: string[] = [
    'Mechanical Design',
    'Manufacturing Engineering',
    'Quality Assurance',
    'Research and Development',
    'Supply Chain Management',
    'Maintenance',
    'Automation and Control',
    'Materials Engineering',
    'Technical Documentation',
    'Project Management',
  ];
  selectedDepartment: string = '';

  departmentModelObj: departmentModel = new departmentModel();

  departmentData!: any;

  showAdd!: boolean;
  showUpdate!: boolean;

  constructor(private api: DepartmentService) {}

  departmentForm = new FormGroup({
    deptName: new FormControl(''),
    deptSection: new FormControl(''),
    secDescription: new FormControl(''),
    mdept: new FormControl(''),
  });

  ngOnInit(): void {
    
    this.getAllDepartment();

  }

  onClose() {
    this.departmentForm.reset();
  }

  onAdd() {
    this.departmentForm.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  addNewData() {
    // console.log(this.departmentForm.value);

    var postDataObj = {
      deptName: this.departmentForm.value.deptName,
      deptSection: this.departmentForm.value.deptSection,
      secDescription: this.departmentForm.value.secDescription,
      mdept: this.departmentForm.value.mdept,
    };
    console.log(postDataObj);

    this.api.postDepartment(postDataObj).subscribe(
      (res) => {
        alert('Department Added Successfully');
         this.getAllDepartment();
        let ref = document.getElementById('cancel');
        ref?.click();
        //  this.onClose()
        this.departmentForm.reset();
      },
      (err) => {
        console.log('Something Went Wrong');
      }
    );
  }

  getAllDepartment() {
    this.api.getDepartment().subscribe(res => {
      console.log(res);
      this.departmentData = res;
    }, err => {
      console.log('Something went wrong');
    })
  }

  deleteDepartment(row: any) {
    this.api.deleteDepartment(row.id).subscribe(res => {
      alert('Department Deleted Successfully');
      this.getAllDepartment();

    })
  }

  onEdit(row: any) {
    this.showAdd = false;
    this.showUpdate = true;
    this.departmentModelObj.id = row.id
    this.departmentForm.controls['deptName'].setValue(row.deptName);
    this.departmentForm.controls['deptSection'].setValue(row.deptSection);
    this.departmentForm.controls['secDescription'].setValue(row.secDescription);
    this.departmentForm.controls['mdept'].setValue(row.mdept);
  }

  updateDepartment() {
    // this.departmentModelObj.deptName = this.departmentForm.value.deptName || '';  
    // this.departmentModelObj.deptSection = this.departmentForm.value.deptSection || '';  
    // this.departmentModelObj.secDescription = this.departmentForm.value.secDescription || '';  
    // this.departmentModelObj.mdept = this.departmentForm.value.mdept || '';  
    
    
    var updatedDataObj = {
      deptName: this.departmentForm.value.deptName,
      deptSection: this.departmentForm.value.deptSection,
      secDescription: this.departmentForm.value.secDescription,
      mdept: this.departmentForm.value.mdept,
    };
    console.log(updatedDataObj);
    this.api.updateDepartment(updatedDataObj, this.departmentModelObj.id).subscribe(res => {
      alert('Department Updated Successfully');
      this.getAllDepartment()
      let ref = document.getElementById('cancel');
      ref?.click();
      this.departmentForm.reset()

    }, err => {
      console.log('Something Went wrong');

    })

 
  }
}
