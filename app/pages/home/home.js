import {Platform, Page, Storage, SqlStorage} from 'ionic-angular';


@Page({
    templateUrl: 'build/pages/home/home.html'
})
export class HomePage {

    static get parameters(){
        return [[Platform]];
    }

    constructor(platform) {
        this.platform = platform;
        this.people = [];
        this.platform.ready().then(() => {
            this.storage = new Storage(SqlStorage);
            this.refresh();
        });
    }

    add(){
        this.platform.ready().then(() => {
            this.storage.query("INSERT INTO people (firstname, lastname) VALUES ('Navid', 'Hosseini')").then((data) =>{
            console.log(JSON.stringify(data.res));

            //Call refresh function for refresh the list
            this.refresh();
        }, (error) => {
            console.log("ERROR: "+ JSON.stringify(error.err));
        });
        });
    }

    refresh(){
        this.platform.ready().then(() => {
            this.people = [];

            //Retrive all people in people table
            this.storage.query("SELECT * FROM people").then((data) => {
                if(data.res.rows.length > 0){
                    for(var i = 0; i < data.res.rows.length; i++){
                        this.people.push({ firstname: data.res.rows.item(i).firstname, lastname: data.res.rows.item(i).lastname });
                    }
                }
            }, (error) => {
                console.log("ERROR: "+ JSON.stringify(error.err));
            });
        });
    }
}