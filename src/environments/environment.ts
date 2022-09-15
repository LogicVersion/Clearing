// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // appURL: 'http://localhost:8081/api/clearing',
  // appURL: 'https://localhost:7118/api/clearing',
  // appURL: 'http://sapidholdingsonline.com/testingapi/api/clearing', //billingAPI
  appURL: 'http://sapidholdingsonline.com/sapi/api/clearing', //billingAPI
  // apiURL_Admin: 'http://localhost:8082/api/authenticate', //http://localhost:5000/api',
  // apiURL_Admin: 'http://localhost:5000/api/authenticate', //http://localhost:5000/api',
  apiURL_Admin: 'http://sapidholdingsonline.com/apix/api/authenticate', // /api/authenticate', //AuthAPI
  //reportServer: 'http://localhost:8095',
  reportServer: 'http://sapidholdingsonline.com/crystalapi/api/reports', //billingAPI
  coyID: 'Clearing',
  coyName: 'Sapid Agencies Ltd',
  imgLogo: '',
  imgHome: 'assets/images/sapidHol.jpg',
  imgHomeLogo: 'assets/images/sapidLogo2.jpg',
  VAT: 7.5,
  //version: env.npm_package_version + '-dev',
  serverUrl: '/api',
  defaultLanguage: 'en-US',
  supportedLanguages: ['en-US'],
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
