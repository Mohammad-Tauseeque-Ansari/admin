import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ItemMaster } from './itemMaster.model';
import { ItemMasterService } from '../shared/services/item-master.service';

@Component({
  selector: 'app-list-groups',
  templateUrl: './list-groups.component.html',
  styleUrls: ['./list-groups.component.scss'],
})
export class ListGroupsComponent {
  itemMasterModelObj: ItemMaster = new ItemMaster();
  searchTerm: any;
  itemMasterData!: any;
  SuppliersName !: any;
  itemsMake !: any;
  itemsCategory !: any;
  showAdd!: boolean;
  showUpdate!: boolean;
  currentPage: number = 1;
  itemsPerPage: number = 6;
  

  constructor(private api: ItemMasterService) {}

  itemMasterForm = new FormGroup({
    itemCategory: new FormControl('' , [Validators.required]),
    itemName: new FormControl('' ,[Validators.required]),
    itemCode: new FormControl(''),
    hsnCode: new FormControl(''),
    itemMake: new FormControl(''),
    itemType: new FormControl(''),
    capitalItem: new FormControl(''),
    source: new FormControl(''),
    abcClass: new FormControl(''),
    location: new FormControl(''),
    uom: new FormControl(''),
    minStock: new FormControl(''),
    recordLevel: new FormControl(''),
    eoq: new FormControl(''),
    leadDays: new FormControl(''),
    mtnCons: new FormControl(''),
    purchaseCode: new FormControl(''),
    lastIssueNo: new FormControl(''),
    lastIssueDate: new FormControl(''),
    lastRecivedNo: new FormControl(''),
    lastRecivedDate: new FormControl(''),
    lastSupplier: new FormControl(''),
    lastRate: new FormControl(''),
    ytdCons: new FormControl(''),
    remark: new FormControl(''),
    batNo: new FormControl(''),
    otherNo: new FormControl(''),
  });

  ngOnInit(): void {
    this.getAllMaster();
    this.getSupplierName();
    this.getItemMake();
    this.getItemCategory();


     

  

  }

  onClose() {
    this.itemMasterForm.reset();
  }

  onAdd() {
    this.itemMasterForm.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  // addNewData() {
  //   var postDataObj = {
  //     itemCategory: this.itemMasterForm.value.itemCategory,
  //     itemName: this.itemMasterForm.value.itemName,
  //     itemCode: this.itemMasterForm.value.itemCode,
  //     hsnCode: this.itemMasterForm.value.hsnCode,
  //     itemMake: this.itemMasterForm.value.itemMake,
  //     itemType: this.itemMasterForm.value.itemType,
  //     capitalItem: this.itemMasterForm.value.capitalItem,
  //     source: this.itemMasterForm.value.source,
  //     abcClass: this.itemMasterForm.value.abcClass,
  //     location: this.itemMasterForm.value.location,
  //     uom: this.itemMasterForm.value.uom,
  //     minStock: this.itemMasterForm.value.minStock,
  //     recordLevel: this.itemMasterForm.value.recordLevel,
  //     eoq: this.itemMasterForm.value.eoq,
  //     leadDays: this.itemMasterForm.value.leadDays,
  //     mtnCons: this.itemMasterForm.value.mtnCons,
  //     purchaseCode: this.itemMasterForm.value.purchaseCode,
  //     lastIssueNo: this.itemMasterForm.value.lastIssueNo,
  //     lastIssueDate: this.itemMasterForm.value.lastIssueDate,
  //     lastRecivedNo: this.itemMasterForm.value.lastRecivedNo,
  //     lastRecivedDate: this.itemMasterForm.value.lastRecivedDate,
  //     lastSupplier: this.itemMasterForm.value.lastSupplier,
  //     lastRate: this.itemMasterForm.value.lastRate,
  //     ytdCons: this.itemMasterForm.value.ytdCons,
  //     remark: this.itemMasterForm.value.remark,
  //     batNo: this.itemMasterForm.value.batNo,
  //     otherNo: this.itemMasterForm.value.otherNo,
  //   };

  //   this.api.postItemMaster(postDataObj).subscribe(
  //     (res) => {
  //       alert('Item Master Added Successfully');
  //       this.getAllMaster();
  //       let ref = document.getElementById('cancel');
  //       ref?.click();
  //       //  this.onClose()
  //       this.itemMasterForm.reset();
  //     },
  //     (err) => {
  //       alert('! Something went wrong while Adding');
  //     }
  //   );
  // }

  addNewData() {
    if (this.itemMasterForm.valid) {
      var postDataObj = {
        itemCategory: this.itemMasterForm.value.itemCategory,
        itemName: this.itemMasterForm.value.itemName,
        itemCode: this.itemMasterForm.value.itemCode,
        hsnCode: this.itemMasterForm.value.hsnCode,
        itemMake: this.itemMasterForm.value.itemMake,
        itemType: this.itemMasterForm.value.itemType,
        capitalItem: this.itemMasterForm.value.capitalItem,
        source: this.itemMasterForm.value.source,
        abcClass: this.itemMasterForm.value.abcClass,
        location: this.itemMasterForm.value.location,
        uom: this.itemMasterForm.value.uom,
        minStock: this.itemMasterForm.value.minStock,
        recordLevel: this.itemMasterForm.value.recordLevel,
        eoq: this.itemMasterForm.value.eoq,
        leadDays: this.itemMasterForm.value.leadDays,
        mtnCons: this.itemMasterForm.value.mtnCons,
        purchaseCode: this.itemMasterForm.value.purchaseCode,
        lastIssueNo: this.itemMasterForm.value.lastIssueNo,
        lastIssueDate: this.itemMasterForm.value.lastIssueDate,
        lastRecivedNo: this.itemMasterForm.value.lastRecivedNo,
        lastRecivedDate: this.itemMasterForm.value.lastRecivedDate,
        lastSupplier: this.itemMasterForm.value.lastSupplier,
        lastRate: this.itemMasterForm.value.lastRate,
        ytdCons: this.itemMasterForm.value.ytdCons,
        remark: this.itemMasterForm.value.remark,
        batNo: this.itemMasterForm.value.batNo,
        otherNo: this.itemMasterForm.value.otherNo,
      };
  
      this.api.postItemMaster(postDataObj).subscribe(
        (res) => {
          alert('Item Master Added Successfully');
          this.getAllMaster();
          let ref = document.getElementById('cancel');
          ref?.click();
          //  this.onClose()
          this.itemMasterForm.reset();
        },
        (err) => {
          alert('! Something went wrong while Adding');
        }
      );
      // Your existing logic for adding new data
    } else {
     alert( "Please Enter Required Field");
    
    }
  }

  getAllMaster() {
    this.api.getAllItemMaster().subscribe(
      (res) => {
        this.itemMasterData = res;
        console.log(res);
      },
      (err) => {
        alert('! Something went wrong while Fetching Data');
      }
    );
  }

  deleteMaster(row: any) {
    this.api.deleteItemMaster(row.id).subscribe(
      (res) => {
        alert('Item Master Deleted Successfully');
        this.getAllMaster();
      },
      (err) => {
        alert('! Something went wrong while Deleting Data');
      }
    );
  }

  onEdit(row: any) {
    this.showUpdate = true;
    this.showAdd = false;
    this.itemMasterModelObj.id = row.id;
    this.itemMasterForm.patchValue({
      itemCategory: row.itemCategory,
      itemName: row.itemName,
      itemCode: row.itemCode,
      hsnCode: row.hsnCode,
      itemMake: row.itemMake,
      itemType: row.itemType,
      capitalItem: row.capitalItem,
      source: row.source,
      abcClass: row.abcClass,
      location: row.location,
      uom: row.uom,
      minStock: row.minStock,
      recordLevel: row.recordLevel,
      eoq: row.eoq,
      leadDays: row.leadDays,
      mtnCons: row.mtnCons,
      purchaseCode: row.purchaseCode,
      lastIssueNo: row.lastIssueNo,
      lastIssueDate: row.lastIssueDate,
      lastRecivedNo: row.lastRecivedNo,
      lastRecivedDate: row.lastRecivedDate,
      lastSupplier: row.lastSupplier,
      lastRate: row.lastRate,
      ytdCons: row.ytdCons,
      remark: row.remark,
      batNo: row.batNo,
      otherNo: row.otherNo,
    });
  }


  updateItemMaster(){
    var updateDataObj = {
      itemCategory: this.itemMasterForm.value.itemCategory,
      itemName: this.itemMasterForm.value.itemName,
      itemCode: this.itemMasterForm.value.itemCode,
      hsnCode: this.itemMasterForm.value.hsnCode,
      itemMake: this.itemMasterForm.value.itemMake,
      itemType: this.itemMasterForm.value.itemType,
      capitalItem: this.itemMasterForm.value.capitalItem,
      source: this.itemMasterForm.value.source,
      abcClass: this.itemMasterForm.value.abcClass,
      location: this.itemMasterForm.value.location,
      uom: this.itemMasterForm.value.uom,
      minStock: this.itemMasterForm.value.minStock,
      recordLevel: this.itemMasterForm.value.recordLevel,
      eoq: this.itemMasterForm.value.eoq,
      leadDays: this.itemMasterForm.value.leadDays,
      mtnCons: this.itemMasterForm.value.mtnCons,
      purchaseCode: this.itemMasterForm.value.purchaseCode,
      lastIssueNo: this.itemMasterForm.value.lastIssueNo,
      lastIssueDate: this.itemMasterForm.value.lastIssueDate,
      lastRecivedNo: this.itemMasterForm.value.lastRecivedNo,
      lastRecivedDate: this.itemMasterForm.value.lastRecivedDate,
      lastSupplier: this.itemMasterForm.value.lastSupplier,
      lastRate: this.itemMasterForm.value.lastRate,
      ytdCons: this.itemMasterForm.value.ytdCons,
      remark: this.itemMasterForm.value.remark,
      batNo: this.itemMasterForm.value.batNo,
      otherNo: this.itemMasterForm.value.otherNo,
    };

    this.api.updateItemMaster(updateDataObj ,  this.itemMasterModelObj.id).subscribe(
      (res) => {
        alert('Item Master Updated Successfully');
        this.getAllMaster();
        let ref = document.getElementById('cancel');
        ref?.click();
        //  this.onClose()
        this.itemMasterForm.reset();
      },
      (err) => {
        alert('! Something went wrong while Updating');
      }
    );
  }
  

  getSupplierName(){
      this.api.getSupplier().subscribe(suppliers=>{
        this.SuppliersName  = suppliers.map((supplier:any) => supplier.supplierName);
        console.log(this.SuppliersName);
        
      })
  }

  getItemMake(){
    this.api.getItemMake().subscribe(make =>{
      this.itemsMake = make.map((itemMake:any)=> itemMake.makeCode);
      console.log(this.itemsMake);

    })
  }

  getItemCategory(){
    this.api.getItemCategory().subscribe(category =>{
      this.itemsCategory = category.map((categoryName:any)=> categoryName.categoryName);
      console.log(this.itemsCategory);

    })
  }

  filterSuppliers(): void {
    this.api.getAllItemMaster().subscribe(
      (res) => {
        this.itemMasterData = res.filter((master: any) => {
          return (
            master.itemName
              .toLowerCase()
              .includes(this.searchTerm.toLowerCase()) ||
            master.itemCategory
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


  get totalPages(): number {
    return Math.ceil(this.itemMasterData.length / this.itemsPerPage);
  }

  get pages(): number[] {
    return Array(this.totalPages).fill(0).map((_, index) => index + 1);
  }

  get paginatedItemMasterData(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.itemMasterData.slice(startIndex, endIndex);
  }

  // Function to navigate to a specific page
  setPage(pageNumber: number): void {
    if (pageNumber >= 1 && pageNumber <= this.totalPages) {
      this.currentPage = pageNumber;
    }
  }
}

 
