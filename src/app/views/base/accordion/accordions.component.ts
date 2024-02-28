import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { DomSanitizer } from '@angular/platform-browser';
import { FormGroup, FormControl } from '@angular/forms'
import { CompanyModel } from './emp.model';
// import { EmpServiceService } from '../services/emp-service.service';


@Component({
  selector: 'app-accordions',
  templateUrl: './accordions.component.html',
  styleUrls: ['./accordions.component.scss']
})
export class AccordionsComponent {
  employeeModelObj: CompanyModel = new CompanyModel();
  selectedCountry: any; // Declare the selectedCountry variable

  employeeData !: any;

  showAdd !: boolean;
  showUpdate !: boolean;

  countryData = [
    {
      "country": "United States",
      "states": ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"]
    },
    {
      "country": "Canada",
      "states": ["Alberta", "British Columbia", "Manitoba", "New Brunswick", "Newfoundland and Labrador", "Nova Scotia", "Ontario", "Prince Edward Island", "Quebec", "Saskatchewan"]
    },
    {
      "country": "India",
      "states": ["Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"]
    },
    {
      "country": "Australia",
      "states": ["New South Wales", "Queensland", "South Australia", "Tasmania", "Victoria", "Western Australia", "Australian Capital Territory", "Northern Territory"]
    },
    {
      "country": "Brazil",
      "states": ["Acre", "Alagoas", "Amapá", "Amazonas", "Bahia", "Ceará", "Espírito Santo", "Goiás", "Maranhão", "Mato Grosso", "Mato Grosso do Sul", "Minas Gerais", "Pará", "Paraíba", "Paraná", "Pernambuco", "Piauí", "Rio de Janeiro", "Rio Grande do Norte", "Rio Grande do Sul", "Rondônia", "Roraima", "Santa Catarina", "São Paulo", "Sergipe", "Tocantins"]
    },
    {
      "country": "China",
      "states": ["Beijing", "Shanghai", "Tianjin", "Chongqing", "Hebei", "Shanxi", "Inner Mongolia", "Liaoning", "Jilin", "Heilongjiang", "Jiangsu", "Zhejiang", "Anhui", "Fujian", "Jiangxi", "Shandong", "Henan", "Hubei", "Hunan", "Guangdong", "Guangxi", "Hainan", "Sichuan", "Guizhou", "Yunnan", "Tibet", "Shaanxi", "Gansu", "Qinghai", "Ningxia", "Xinjiang"]
    },
    {
      "country": "Germany",
      "states": ["Baden-Württemberg", "Bavaria", "Berlin", "Brandenburg", "Bremen", "Hamburg", "Hesse", "Lower Saxony", "Mecklenburg-Vorpommern", "North Rhine-Westphalia", "Rhineland-Palatinate", "Saarland", "Saxony", "Saxony-Anhalt", "Schleswig-Holstein", "Thuringia"]
    },
    {
      "country": "Mexico",
      "states": ["Aguascalientes", "Baja California", "Baja California Sur", "Campeche", "Chiapas", "Chihuahua", "Coahuila", "Colima", "Durango", "Guanajuato", "Guerrero", "Hidalgo", "Jalisco", "Mexico City", "Mexico State", "Michoacán", "Morelos", "Nayarit", "Nuevo León", "Oaxaca", "Puebla", "Querétaro", "Quintana Roo", "San Luis Potosí", "Sinaloa", "Sonora", "Tabasco", "Tamaulipas", "Tlaxcala", "Veracruz", "Yucatán", "Zacatecas"]
    },
    {
      "country": "South Africa",
      "states": ["Eastern Cape", "Free State", "Gauteng", "KwaZulu-Natal", "Limpopo", "Mpumalanga", "North West", "Northern Cape", "Western Cape"]
    },
    {
      "country": "Russia",
      "states": ["Moscow", "Saint Petersburg", "Adygea", "Altai", "Bashkortostan", "Buryatia", "Chechnya", "Chuvashia", "Dagestan", "Ingushetia", "Kabardino-Balkaria", "Kalmykia", "Karachay-Cherkessia", "Karelia", "Khakassia", "Komi", "Mari El", "Mordovia", "North Ossetia", "Sakha", "Tatarstan", "Tuva", "Udmurtia", "Yakutia", "Zabaykalsky Krai"]
    },
    {
      "country": "Japan",
      "states": ["Hokkaido", "Aomori", "Iwate", "Miyagi", "Akita", "Yamagata", "Fukushima", "Ibaraki", "Tochigi", "Gunma", "Saitama", "Chiba", "Tokyo", "Kanagawa", "Niigata", "Toyama", "Ishikawa", "Fukui", "Yamanashi", "Nagano", "Gifu", "Shizuoka", "Aichi", "Mie", "Shiga", "Kyoto", "Osaka", "Hyogo", "Nara", "Wakayama", "Tottori", "Shimane", "Okayama", "Hiroshima", "Yamaguchi", "Tokushima", "Kagawa", "Ehime", "Kochi", "Fukuoka", "Saga", "Nagasaki", "Kumamoto", "Oita", "Miyazaki", "Kagoshima", "Okinawa"]
    }
  ];
  



  constructor() { }

  companyForm = new FormGroup({

    companyName: new FormControl(''),
    address1: new FormControl(''),
    address2: new FormControl(''),
    address3: new FormControl(''),
    country: new FormControl(''),
    state: new FormControl(''),
    city: new FormControl(''),
    taxId1: new FormControl(''),
    taxId2: new FormControl(''),
    phone: new FormControl(''),
    faxNo: new FormControl(''),
    email: new FormControl(''),
    mobile: new FormControl(''),
    website: new FormControl(''),
  })





  ngOnInit(): void {

    this.getAllEmployee();

  }


  onCountryChange(country: any) {
    this.selectedCountry = country;
  }


  getAllEmployee() {
    
  }

  onAddEmployee() {
    this.companyForm.reset()
    this.showAdd = true;
    this.showUpdate = false;
  }
  
  
  




  postEmpData() {
    // this.employeeModelObj.fname = this.companyForm.value.fname;
    // this.employeeModelObj.lname = this.companyForm.value.lname;
    // this.employeeModelObj.email = this.companyForm.value.email;
    // this.employeeModelObj.mobile = this.companyForm.value.mobile;
    // this.employeeModelObj.salary = this.companyForm.value.salary;

    // this.api.postEmployee(this.employeeModelObj).subscribe(res => {
    //   console.log(res);
    //   alert('Data Added Successfully')
    //   let ref = document.getElementById('cancel')
    //   ref?.click();
    //   this.companyForm.reset()
    //   this.getAllEmployee();

    // }, err => {
    //   alert('Something Went wrong')
    // })


  }

  deleteEmployee(emp: any) {
    // this.api.deleteEmployee(emp.id).subscribe(res => {
    //   alert('Employee Deleted Successfully');
    //   this.getAllEmployee();
    // })
  }

  // onEdit(emp: any) {
  //   this.showAdd = false;
  //   this.showUpdate = true;
  //   this.employeeModelObj.id = emp.id;
  //   this.companyForm.controls['fname'].setValue(emp.fname);
  //   this.companyForm.controls['lname'].setValue(emp.lname);
  //   this.companyForm.controls['email'].setValue(emp.email);
  //   this.companyForm.controls['mobile'].setValue(emp.mobile);
  //   this.companyForm.controls['salary'].setValue(emp.salary);
  // }

  updateEmployee() {
    console.log();

    // this.employeeModelObj.fname = this.companyForm.value.fname;
    // this.employeeModelObj.lname = this.companyForm.value.lname;
    // this.employeeModelObj.email = this.companyForm.value.email;
    // this.employeeModelObj.mobile = this.companyForm.value.mobile;
    // this.employeeModelObj.salary = this.companyForm.value.salary;

    // this.api.updateEmployee(this.employeeModelObj, this.employeeModelObj.id).subscribe(res => {
    //   console.log('updated Value', res);
    //   alert('Updated Succesfully');
    //   let ref = document.getElementById('cancel')
    //   ref?.click();
    //   this.companyForm.reset()
    //   this.getAllEmployee();


    // })



  }
}
