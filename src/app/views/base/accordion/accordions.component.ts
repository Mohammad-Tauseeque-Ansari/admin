import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { DomSanitizer } from '@angular/platform-browser';
import { FormGroup, FormControl } from '@angular/forms';
import { CompanyModel } from './company.model';
// import { EmpServiceService } from '../services/emp-service.service';

import { CompanyService } from '../shared/services/company.service';

@Component({
  selector: 'app-accordions',
  templateUrl: './accordions.component.html',
  styleUrls: ['./accordions.component.scss'],
})
export class AccordionsComponent {
  CompanyModelObj: CompanyModel = new CompanyModel();
  selectedCountry: any; // Declare the selectedCountry variable

  companyData!: any;

  showAdd!: boolean;
  showUpdate!: boolean;

  countryData = [
    {
      country: 'United States',
      states: [
        'Alabama',
        'Alaska',
        'Arizona',
        'Arkansas',
        'California',
        'Colorado',
        'Connecticut',
        'Delaware',
        'Florida',
        'Georgia',
        'Hawaii',
        'Idaho',
        'Illinois',
        'Indiana',
        'Iowa',
        'Kansas',
        'Kentucky',
        'Louisiana',
        'Maine',
        'Maryland',
        'Massachusetts',
        'Michigan',
        'Minnesota',
        'Mississippi',
        'Missouri',
        'Montana',
        'Nebraska',
        'Nevada',
        'New Hampshire',
        'New Jersey',
        'New Mexico',
        'New York',
        'North Carolina',
        'North Dakota',
        'Ohio',
        'Oklahoma',
        'Oregon',
        'Pennsylvania',
        'Rhode Island',
        'South Carolina',
        'South Dakota',
        'Tennessee',
        'Texas',
        'Utah',
        'Vermont',
        'Virginia',
        'Washington',
        'West Virginia',
        'Wisconsin',
        'Wyoming',
      ],
    },
    {
      country: 'Canada',
      states: [
        'Alberta',
        'British Columbia',
        'Manitoba',
        'New Brunswick',
        'Newfoundland and Labrador',
        'Nova Scotia',
        'Ontario',
        'Prince Edward Island',
        'Quebec',
        'Saskatchewan',
      ],
    },
    {
      country: 'India',
      states: [
        'Andhra Pradesh',
        'Arunachal Pradesh',
        'Assam',
        'Bihar',
        'Chhattisgarh',
        'Goa',
        'Gujarat',
        'Haryana',
        'Himachal Pradesh',
        'Jharkhand',
        'Karnataka',
        'Kerala',
        'Madhya Pradesh',
        'Maharashtra',
        'Manipur',
        'Meghalaya',
        'Mizoram',
        'Nagaland',
        'Odisha',
        'Punjab',
        'Rajasthan',
        'Sikkim',
        'Tamil Nadu',
        'Telangana',
        'Tripura',
        'Uttar Pradesh',
        'Uttarakhand',
        'West Bengal',
      ],
    },
    {
      country: 'Australia',
      states: [
        'New South Wales',
        'Queensland',
        'South Australia',
        'Tasmania',
        'Victoria',
        'Western Australia',
        'Australian Capital Territory',
        'Northern Territory',
      ],
    },
    {
      country: 'Brazil',
      states: [
        'Acre',
        'Alagoas',
        'Amapá',
        'Amazonas',
        'Bahia',
        'Ceará',
        'Espírito Santo',
        'Goiás',
        'Maranhão',
        'Mato Grosso',
        'Mato Grosso do Sul',
        'Minas Gerais',
        'Pará',
        'Paraíba',
        'Paraná',
        'Pernambuco',
        'Piauí',
        'Rio de Janeiro',
        'Rio Grande do Norte',
        'Rio Grande do Sul',
        'Rondônia',
        'Roraima',
        'Santa Catarina',
        'São Paulo',
        'Sergipe',
        'Tocantins',
      ],
    },
    {
      country: 'China',
      states: [
        'Beijing',
        'Shanghai',
        'Tianjin',
        'Chongqing',
        'Hebei',
        'Shanxi',
        'Inner Mongolia',
        'Liaoning',
        'Jilin',
        'Heilongjiang',
        'Jiangsu',
        'Zhejiang',
        'Anhui',
        'Fujian',
        'Jiangxi',
        'Shandong',
        'Henan',
        'Hubei',
        'Hunan',
        'Guangdong',
        'Guangxi',
        'Hainan',
        'Sichuan',
        'Guizhou',
        'Yunnan',
        'Tibet',
        'Shaanxi',
        'Gansu',
        'Qinghai',
        'Ningxia',
        'Xinjiang',
      ],
    },
    {
      country: 'Germany',
      states: [
        'Baden-Württemberg',
        'Bavaria',
        'Berlin',
        'Brandenburg',
        'Bremen',
        'Hamburg',
        'Hesse',
        'Lower Saxony',
        'Mecklenburg-Vorpommern',
        'North Rhine-Westphalia',
        'Rhineland-Palatinate',
        'Saarland',
        'Saxony',
        'Saxony-Anhalt',
        'Schleswig-Holstein',
        'Thuringia',
      ],
    },
    {
      country: 'Mexico',
      states: [
        'Aguascalientes',
        'Baja California',
        'Baja California Sur',
        'Campeche',
        'Chiapas',
        'Chihuahua',
        'Coahuila',
        'Colima',
        'Durango',
        'Guanajuato',
        'Guerrero',
        'Hidalgo',
        'Jalisco',
        'Mexico City',
        'Mexico State',
        'Michoacán',
        'Morelos',
        'Nayarit',
        'Nuevo León',
        'Oaxaca',
        'Puebla',
        'Querétaro',
        'Quintana Roo',
        'San Luis Potosí',
        'Sinaloa',
        'Sonora',
        'Tabasco',
        'Tamaulipas',
        'Tlaxcala',
        'Veracruz',
        'Yucatán',
        'Zacatecas',
      ],
    },
    {
      country: 'South Africa',
      states: [
        'Eastern Cape',
        'Free State',
        'Gauteng',
        'KwaZulu-Natal',
        'Limpopo',
        'Mpumalanga',
        'North West',
        'Northern Cape',
        'Western Cape',
      ],
    },
    {
      country: 'Russia',
      states: [
        'Moscow',
        'Saint Petersburg',
        'Adygea',
        'Altai',
        'Bashkortostan',
        'Buryatia',
        'Chechnya',
        'Chuvashia',
        'Dagestan',
        'Ingushetia',
        'Kabardino-Balkaria',
        'Kalmykia',
        'Karachay-Cherkessia',
        'Karelia',
        'Khakassia',
        'Komi',
        'Mari El',
        'Mordovia',
        'North Ossetia',
        'Sakha',
        'Tatarstan',
        'Tuva',
        'Udmurtia',
        'Yakutia',
        'Zabaykalsky Krai',
      ],
    },
    {
      country: 'Japan',
      states: [
        'Hokkaido',
        'Aomori',
        'Iwate',
        'Miyagi',
        'Akita',
        'Yamagata',
        'Fukushima',
        'Ibaraki',
        'Tochigi',
        'Gunma',
        'Saitama',
        'Chiba',
        'Tokyo',
        'Kanagawa',
        'Niigata',
        'Toyama',
        'Ishikawa',
        'Fukui',
        'Yamanashi',
        'Nagano',
        'Gifu',
        'Shizuoka',
        'Aichi',
        'Mie',
        'Shiga',
        'Kyoto',
        'Osaka',
        'Hyogo',
        'Nara',
        'Wakayama',
        'Tottori',
        'Shimane',
        'Okayama',
        'Hiroshima',
        'Yamaguchi',
        'Tokushima',
        'Kagawa',
        'Ehime',
        'Kochi',
        'Fukuoka',
        'Saga',
        'Nagasaki',
        'Kumamoto',
        'Oita',
        'Miyazaki',
        'Kagoshima',
        'Okinawa',
      ],
    },
  ];

  constructor(private api: CompanyService) {}

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
  });

  ngOnInit(): void {
    this.getAllCompany();
  }

  onCountryChange(country: any) {
    this.selectedCountry = country;
  }

  getAllCompany() {
    this.api.getCompany().subscribe(
      (res) => {
        console.log(res);
        this.companyData = res;
      },
      (err) => {
        console.log('Something went wrong');
      }
    );
  }

  onAddEmployee() {
    this.companyForm.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  onClose() {
    this.companyForm.reset();
  }

  AddNewCompany() {
    var addCompanyObj = {
      companyName: this.companyForm.value.companyName,
      address1: this.companyForm.value.address1,
      address2: this.companyForm.value.address2,
      address3: this.companyForm.value.address3,
      country: this.companyForm.value.country,
      state: this.companyForm.value.state,
      city: this.companyForm.value.city,
      taxId1: this.companyForm.value.taxId1,
      taxId2: this.companyForm.value.taxId2,
      phone: this.companyForm.value.phone,
      faxNo: this.companyForm.value.faxNo,
      email: this.companyForm.value.email,
      mobile: this.companyForm.value.mobile,
      website: this.companyForm.value.website,
    };
    console.log(addCompanyObj);

    this.api.postCompany(addCompanyObj).subscribe(
      (res) => {
        alert('Company Added Successfully');
        this.getAllCompany();
        let ref = document.getElementById('cancel');
        ref?.click();
        //  this.onClose()
        this.companyForm.reset();
      },
      (err) => {
        console.log('Something Went Wrong');
      }
    );
  }

  deleteCompany(row: any) {
    this.api.deleteCompany(row.id).subscribe(res => {
      alert('Company Deleted Successfully');
      this.getAllCompany();
    })
  }

  onEdit(row: any) {
    this.showAdd = false;
    this.showUpdate = true;
    this.CompanyModelObj.id = row.id;
    this.companyForm.controls['companyName'].setValue(row.companyName);
    this.companyForm.controls['address1'].setValue(row.address1);
    this.companyForm.controls['address2'].setValue(row.address2);
    this.companyForm.controls['address3'].setValue(row.address3);
    this.companyForm.controls['country'].setValue(row.country);
    this.companyForm.controls['state'].setValue(row.state);
    this.companyForm.controls['city'].setValue(row.city);
    this.companyForm.controls['taxId1'].setValue(row.taxId1);
    this.companyForm.controls['taxId2'].setValue(row.taxId2);
    this.companyForm.controls['phone'].setValue(row.phone);
    this.companyForm.controls['mobile'].setValue(row.mobile);
    this.companyForm.controls['website'].setValue(row.website);
    this.companyForm.controls['faxNo'].setValue(row.faxNo);
    this.companyForm.controls['email'].setValue(row.email);
  }

  updateCompany() {
    console.log();

    var updatedCompanyObj = {
      companyName: this.companyForm.value.companyName,
      address1: this.companyForm.value.address1,
      address2: this.companyForm.value.address2,
      address3: this.companyForm.value.address3,
      country: this.companyForm.value.country,
      state: this.companyForm.value.state,
      city: this.companyForm.value.city,
      taxId1: this.companyForm.value.taxId1,
      taxId2: this.companyForm.value.taxId2,
      phone: this.companyForm.value.phone,
      faxNo: this.companyForm.value.faxNo,
      email: this.companyForm.value.email,
      mobile: this.companyForm.value.mobile,
      website: this.companyForm.value.website,
    };
    console.log(updatedCompanyObj);

    this.api
      .updateCompany(updatedCompanyObj, this.CompanyModelObj.id)
      .subscribe((res) => {
        console.log('updated Value', res);
        alert('Company Updated Succesfully');
        let ref = document.getElementById('cancel');
        ref?.click();
        this.companyForm.reset();
        this.getAllCompany();
      });
 
  }
}
