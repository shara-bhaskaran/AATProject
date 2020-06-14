import { Component, OnInit,ViewChild } from '@angular/core';
import {FormBuilder,FormGroup,Validators} from '@angular/forms';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';

import {ProfileService} from '../Services/profile.service';
import {visibility,expand,appear} from '../animations/app.animations';
import {MasterService} from '../Services/master.service';
import {Masters} from '../shared/masters';
import { promise } from 'protractor';
import {Profile} from '../shared/profile';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss'],
  host:{
    '[flyInOut]' : 'true',
    'style' : 'display: block;'
  },
  animations:[
    visibility(),
    expand()    
  ] 
})
export class TeamComponent implements OnInit {

          profileForm : FormGroup;
          @ViewChild('fform') teamFormDirective;
          errMess: string;  
          masters: Masters;  
          organisations: string[];
          managers: string[];
          roles: string[]; 
          profiles: Profile[];
          profile: Profile;
          updatedProfile: Profile;
          status: string[] = ["Active","Released"];
          area: string[] = ["Capex","Opex"];
          displayedColumns = ['#','id', 'staffName','organisation','manager','startDate','endDate','offshorerate','onsiterate','revisedrate','status','area'];
          dataSource;
          @ViewChild(MatSort, {static: true}) sort: MatSort;
          formErrors = {
            'staffid':'',
            'staffName': '',
            'role': '',
            'grade': '',
            'organisation': '',
            'manager': '',
            'startDate': '',
            'endDate': '',
            'offshorerate': '',
            'onsiterate': '',
            'revisedrate':'',
            'status':'',
            'area':''
            
          };

          validationMessages = {
            'staffid':{
              'required': 'Staff Id is required',
              'minlength': 'Name must be at least 2 characters long',
              'maxlength': 'Staff Id cannot be more than 5 characters'
            },
            'staffName':{
              'required': 'Staff name is required',
              'minlength': 'Name must be at least 2 characters long',
              'maxlength': 'Name cannot be more than 25 characters'
            },
            'role': {
              'required': ' Role is required',
            },
            'organisation': {
              'required': ' Organisation  is required',      
            },
            'manager': {
              'required': ' Manager  is required',      
            },
            'startDate': {
              'required': ' Start Date  is required',      
            },
            'endDate': {
              'required': ' End Date  is required',      
            },
            'offshorerate': {
              'required': ' Offshore Rate  is required',      
            },
            'onsiterate': {
              'required': ' Onsite Rate  is required',      
            },              
          };  

  constructor(private fb: FormBuilder,
    private profileService: ProfileService,
    private masterService: MasterService) {
      this.createForm() }

     

  ngOnInit(): void {

    this.masterService.getMasters()      
    .subscribe(masters => this.masters = masters,
      errmess => this.errMess = <any>errmess);
      setTimeout(()=>{this.setMasters()},5000); 
      this.getProfiles();
      this.dataSource.sort = this.sort;
  }

  createForm() {
    this.profileForm = this.fb.group({
      staffid: ['',[Validators.required,]],
      staffName: ['',[Validators.required,Validators.minLength(2),Validators.maxLength(25)]],
      role: ['',[Validators.required,Validators.minLength(2),Validators.maxLength(25)]],
      grade: [''],
      organisation: ['',[Validators.required,Validators.minLength(2),Validators.maxLength(25)]],
      manager: ['',[Validators.required,Validators.minLength(2),Validators.maxLength(25)]],
      startDate: [Date,[Validators.required,]],
      endDate: [Date,[Validators.required,]],     
      offshorerate: [''], 
      onsiterate: [''], 
      revisedrate: [''],
      status: [''],
      area: [''],     
    });

    this.profileForm.valueChanges
      .subscribe(data => this.onValueChanged(data));
      //console.log("called");
     this.onValueChanged(); //(re)set form validation messages 
  }

  setMasters(){  
  this.organisations = this.masters[0].organisations;
  this.managers = this.masters[0].managers;
  this.roles = this.masters[0].roles;
  console.log(this.organisations);
  //this.organisations = this.masters.organisations
  }

  createProfile(){
  
    this.profile = this.profileForm.value;
    this.profileService.createProfile(this.profile)
      .subscribe(profile => {this.updatedProfile=profile;
        this.profile = null;
          setTimeout(() =>{
            this.delayFunction(),5000;
            this.getProfiles();
        })},
        errmess =>this.errMess = <any> errmess) 
  }

  getProfiles(){    
    this.profileService.getProfiles()
      .subscribe(profiles => {this.profiles = profiles;
        this.dataSource = new MatTableDataSource(this.profiles);
        console.log(this.dataSource)},
        errmess => this.errMess = <any>errmess);              
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log(filterValue);
    this.dataSource.filter = filterValue.trim().toLowerCase();
    console.log(this.dataSource);
  }

  delayFunction(){
    setTimeout(() => {this.updatedProfile = null;this.profile=null}, 5000);
  }




            onValueChanged(data?: any) {
              if (!this.profileForm) { return; }
              const form = this.profileForm;
              for (const field in this.formErrors) {
                if (this.formErrors.hasOwnProperty(field)) {
                  // clear previous error message (if any)
                  this.formErrors[field] = '';
                  const control = form.get(field);
                  if (control && control.dirty && !control.valid) {
                    const messages = this.validationMessages[field];
                    for (const key in control.errors) {
                      if (control.errors.hasOwnProperty(key)) {
                        this.formErrors[field] += messages[key] + ' ';
                      }
                    }
                  }
                }
              }
            }

}
