export const environment = {
  production: true,
  versionCheckURL: 'http://sapidholdingsonline.com/clearing/version.json',
  apiURL_Admin: 'http://sapidholdingsonline.com/apix/api/authenticate', // /api/authenticate', //AuthAPI
  appURL: 'http://sapidholdingsonline.com/sapi/api/clearing', //billingAPI
  reportServer: 'http://sapidholdingsonline.com/crystalapi/api/reports', //billingAPI

  // versionCheckURL: 'assets/version.json',
  // appURL: 'http://localhost:8081/api/clearing',
  // apiURL_Admin: 'http://localhost:8082/api/authenticate', //http://localhost:5000/api',
  // reportServer: 'http://localhost:8095/api/reports',

  coyID: 'Clearing',
  coyName: 'Sapid Agencies Ltd',
  imgLogo: '',
  imgHome: 'assets/images/sapidHol.jpg',
  imgHomeLogo: 'assets/images/sapidLogo22.png',
  VAT: 7.5,
  // version: env.npm_package_version,
  // serverUrl: 'https://api.chucknorris.io',
  defaultLanguage: 'en-US',
  supportedLanguages: ['en-US'],
};
