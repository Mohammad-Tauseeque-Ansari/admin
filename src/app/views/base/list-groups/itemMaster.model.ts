export class ItemMaster {
    id : number = 0;
    itemCategory : string ='';
    itemName : string ='';
    itemCode : string ='';
    hsnCode : string ='';
    itemMake : string ='';
    itemType : string ='';
    capitalItem : string ='';
    source : string ='';
    abcClass : string ='';
    location : string ='';
    uom : string ='';
    minStock : string ='';
    recordLevel : string ='';
    eoq : string ='';
    leadDays : string ='';
    mtnCons : string ='';
    purchaseCode : string ='';
    lastIssueNo : string ='';
    lastIssueDate : Date = new Date();
    lastRecivedNo : string ='';
    lastRecivedDate : Date = new Date();
    lastSupplier : string ='';
    lastRate : string ='';
    ytdCons : string ='';
    remark : string ='';
    batNo : string ='';
    otherNo : string = '';

}

// export class ItemMakeModel {
//     id : number = 0 ;
//     makeCode : string = '';
//     makeDescription : string = '';
//     createdAt :  Date = new Date();
// }