// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  api_url: '//teamperaturerest.herokuapp.com/tempPerature'
  //api_url: '//api.ubersalas.local'
};

export const firebaseConfig = {
  apiKey: "AIzaSyDqr_WIaje0Ud0frQgzzECO0dj3vPzG5vg",
  authDomain: "teamperature-fbf9d.firebaseapp.com",
  databaseURL: "https://teamperature-fbf9d.firebaseio.com",
  projectId: "teamperature-fbf9d",
  storageBucket: "teamperature-fbf9d.appspot.com",
  messagingSenderId: "376527068069"
};
