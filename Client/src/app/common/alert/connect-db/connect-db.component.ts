import { Component, OnInit } from '@angular/core';
import { MongoDBAPIService } from 'src/app/core/service/mongodb-api.service';


@Component({
  // selector: 'app-connect-db',
  templateUrl: './connect-db.component.html',
  styleUrls: ['./connect-db.component.css']
})

export class ConnectDbComponent implements OnInit{ // 
  data: any;
  constructor(private mongoDbApiService: MongoDBAPIService){}
  ngOnInit(): void {
    this.loadData();
  }
  loadData(){
    this.mongoDbApiService.findOne().subscribe((result)=>{
      this.data = result;
      console.log(this.data)
    })
  }
}
