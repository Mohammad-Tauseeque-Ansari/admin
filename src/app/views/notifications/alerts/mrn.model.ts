export class MRNDetailsModel {
  id: number = 0;
  mrnDate: Date = new Date();
  interchange: string = '';
  storeInterchange: string = '';
  hod: string = '';
  authorSign: string = '';
  remark: string = '';
  item: string = '';
  currentPR: string = ''; // PR = Purchase Rate
  quantityRequired: string = '';
  quantityOrder: string = '';
  uom: string = '';
  quantityStock: string = '';
  lastPR: string = '';
  lastPRDate: Date = new Date();
  mRemark: string = '';
  supplier: string = '';
  department: string = '';
  jobMaster: string = '';
  createdAt: Date = new Date();
}
