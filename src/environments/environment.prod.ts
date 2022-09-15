export const environment = {
  production: true,
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
  // version: env.npm_package_version,
  // serverUrl: 'https://api.chucknorris.io',
  defaultLanguage: 'en-US',
  supportedLanguages: ['en-US'],
};
