import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';
import { ContactSchema } from 'src/models/contactSchema';
import { group } from '@angular/animations';

@Component({
  selector: 'app-edit-contacts',
  templateUrl: './edit-contacts.component.html',
  styleUrls: ['./edit-contacts.component.css']
})
export class EditContactsComponent implements OnInit {
  contact:ContactSchema={}
  groups:any=[]
  editRouter: any;
  constructor(private editActivatedRoute:ActivatedRoute,private api:ApiService){
  }
    ngOnInit():void{
      this.editActivatedRoute.params.subscribe({
        next:(pathParameter:any)=>{
          const{id}=pathParameter
          console.log(id);
           //api call to get a particular contact details
      this.api.viewContact(id).subscribe({
        next:(response:any)=>{
          console.log(response);
          this.contact=response
           }
      })
    }

  })
  //get all groups
  this.api.getGroups().subscribe({
    next:(allGroups:any)=>{
      this.groups = allGroups
      console.log(this.groups);
      
    }
  })
}
//edit contact
editContact(id:any){
  //api call to edit contact
  this.api.editContact(id,this.contact).subscribe({
    next:(response:any)=>{
      //navigate all contacts 
      this.editRouter.navigateByUrl("")
    }
  })
}
}

