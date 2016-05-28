import {App, Platform, Storage, SqlStorage} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {HomePage} from './pages/home/home';


@App({
  template: '<ion-nav [root]="rootPage"></ion-nav>',
  config: {} // http://ionicframework.com/docs/v2/api/config/Config/
})
export class MyApp {
  static get parameters() {
    return [[Platform]];
  }

  constructor(platform) {
    this.platform = platform;
    this.initializeApp();
    this.rootPage = HomePage;

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
  });
  }

  initializeApp(){
    this.platform.ready().then(() => {
      this.storage = new Storage(SqlStorage);

      this.storage.query('CREATE TABLE IF NOT EXISTS people (id INTEGER PRIMARY KEY AUTOINCREMENT, firstname TEXT, lastname TEXT)').then((data) => {
        console.log("TABLE CREATED -> " + JSON.stringify(data.res));
      }, (error) => {
        console.log("ERROR -> " + JSON.stringify(error.err));
      });
    });
  }

}