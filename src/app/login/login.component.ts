import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import { first } from 'rxjs/operators';
import { NgbDatepickerConfig, NgbCalendar, NgbDate, NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";

import { AlertService, AuthenticationService } from "../_services";
import { error } from '@angular/compiler/src/util';
import { config } from 'rxjs';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: []
})

export class LoginComponent implements OnInit {

  loading = false;
  submitted = false;
  returnUrl: string;
  dob: string;
  model: NgbDateStruct;

  registerForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl(' ', Validators.required),
    password: new FormControl('', Validators.required),
    dob: new FormControl()
  });

  
  constructor(private http: HttpClient, 
    private authenticationService: AuthenticationService,
    private alertService: AlertService,
    private route: ActivatedRoute,
    private router: Router, private formBuilder: FormBuilder,
    config: NgbDatepickerConfig, calendar: NgbCalendar) {
      // customize default values of datepickers used by this component tree
      config.minDate = { year: 1900, month: 1, day: 1 };
      config.maxDate = { year: 2099, month: 12, day: 31 };
     }

  ngOnInit() {
    
  }

  onSubmit() {
    this.submitted = true;
        
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return console.log("Empty Input");
    }

    this.dob = this.registerForm.value.dob.month + "/" + this.registerForm.value.dob.day + "/" + this.registerForm.value.dob.year;
    this.registerForm.value.dob = this.dob;

    this.loading = true;
    this.authenticationService.register(this.registerForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.alertService.success('Registration successful', true);
          this.router.navigate(['/subscribe']);
        },
        error => {
          this.alertService.error(error);
          this.loading = false
        }
      )

  }

}
