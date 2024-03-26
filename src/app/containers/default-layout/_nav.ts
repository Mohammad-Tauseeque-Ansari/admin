import { ViewChildren } from '@angular/core';
import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    iconComponent: { name: 'cil-speedometer' },
    badge: {
      color: 'info',
      text: 'NEW'
    }
  },
  // {
  //   title: true,
  //   name: 'Theme'
  // },

  // {
  //   name: 'Components',
  //   title: true
  // },
  {
    name: 'General Master',
    url: '/base',
    iconComponent: { name: 'cil-pen' },
    children: [
      {
        name: 'Company',
        url: '/base/accordion'
      },
      
      {
        name: 'Department',
        url: '/base/breadcrumbs'
      },
      {
        name: 'Supplier',
        url: '/base/cards'
      },
      {
        name: 'Item Category',
        url: '/base/carousel'
      },
      {
        name: 'Item Make',
        url: '/base/collapse'
      },
      {
        name: 'Item Master',
        url: '/base/list-group'
      },
      {
        name: 'Job Master',
        url: '/base/navs'
      },
      {
        name: 'Contractor',
        url: '/base/pagination'
      },
      {
        name: 'Job Contractor',
        url: '/base/placeholder'
      },
      {
        name: 'Tax Discount',
        url: '/base/popovers'
      }
      // {
      //   name: 'Progress',
      //   url: '/base/progress'
      // },
      // {
      //   name: 'Spinners',
      //   url: '/base/spinners'
      // },
      // {
      //   name: 'Tables',
      //   url: '/base/tables'
      // },
      // {
      //   name: 'Tabs',
      //   url: '/base/tabs'
      // },
      // {
      //   name: 'Tooltips',
      //   url: '/base/tooltips'
      // }
    ]
  },
  {
    name: 'User Master',
    url: '/buttons',
    iconComponent: { name: 'cil-pen' },
    children: [
     
      {
        name: 'User Role',
        url: '/buttons/button-groups'
      }, {
        name: 'Designation',
        url: '/buttons/buttons'
      },
      {
        name: 'User Department',
        url: '/buttons/dropdowns'
      },
      {
        name: 'Create User',
        url: '/buttons/createUser'
      }
    ]
  },
  {
    name: 'Transaction',
    url: '/notifications',
    iconComponent: { name: 'cil-list' },
    children: [
      {
        name: 'Material Requirement Note',
        url: '/notifications/alerts'
      },
      {
        name: 'Purchase Order',
        url: '/notifications/badges'
      },
      {
        name: 'Good Receipt Master',
        url: '/notifications/modal'
      },
      {
        name: 'Issue Note',
        url: '/notifications/toasts'
      }
    ]
  },
  {
    name: 'Reports',
    url: '/forms',
    iconComponent: { name: 'cil-notes' },
    children: [
      {
        name: 'M.R.N Report',
        url: '/forms/form-control'
      },
      {
        name: 'Purchase Report',
        url: '/forms/select'
      },
      {
        name: 'G.R.N Report',
        url: '/forms/checks-radios'
      },
      {
        name: 'Issue Item Report',
        url: '/forms/range'
      },
      {
        name: 'Stock Report',
        url: '/forms/input-group'
      },
      {
        name: 'Inspection Report',
        url: '/forms/floating-labels'
      },
      {
        name: 'Gate Pass Report',
        url: '/forms/layout'
      },
      {
        name: 'Bin Card Report',
        url: '/forms/validation'
      }
    ]
  },
  {
    name: 'Change Password',
    url: '/theme/colors',
    iconComponent: { name: 'cil-drop' }
  },
  {
    name: 'Logout',
    url: '/theme/typography',
    linkProps: { fragment: 'someAnchor' },
    iconComponent: { name: 'cil-pencil' }
  },
  // {
  //   name: 'Charts',
  //   url: '/charts',
  //   iconComponent: { name: 'cil-chart-pie' }
  // },
  // {
  //   name: 'Icons',
  //   iconComponent: { name: 'cil-star' },
  //   url: '/icons',
  //   children: [
  //     {
  //       name: 'CoreUI Free',
  //       url: '/icons/coreui-icons',
  //       badge: {
  //         color: 'success',
  //         text: 'FREE'
  //       }
  //     },
  //     {
  //       name: 'CoreUI Flags',
  //       url: '/icons/flags'
  //     },
  //     {
  //       name: 'CoreUI Brands',
  //       url: '/icons/brands'
  //     }
  //   ]
  // },
 
  // {
  //   name: 'Widgets',
  //   url: '/widgets',
  //   iconComponent: { name: 'cil-calculator' },
  //   badge: {
  //     color: 'info',
  //     text: 'NEW'
  //   }
  // },
  // {
  //   title: true,
  //   name: 'Extras'
  // },
  // {
  //   name: 'Pages',
  //   url: '/login',
  //   iconComponent: { name: 'cil-star' },
  //   children: [
  //     {
  //       name: 'Login',
  //       url: '/login'
  //     },
  //     {
  //       name: 'Register',
  //       url: '/register'
  //     },
  //     {
  //       name: 'Error 404',
  //       url: '/404'
  //     },
  //     {
  //       name: 'Error 500',
  //       url: '/500'
  //     }
  //   ]
  // },
  // {
  //   title: true,
  //   name: 'Links',
  //   class: 'py-0'
  // },
  // {
  //   name: 'Docs',
  //   url: 'https://coreui.io/angular/docs/templates/installation',
  //   iconComponent: { name: 'cil-description' },
  //   attributes: { target: '_blank', class: '-text-dark' },
  //   class: 'mt-auto'
  // },
  // {
  //   name: 'Try CoreUI PRO',
  //   url: 'https://coreui.io/product/angular-dashboard-template/',
  //   iconComponent: { name: 'cil-layers' },
  //   attributes: { target: '_blank' }
  // }
];
