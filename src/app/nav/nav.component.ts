import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router, ActivatedRoute, NavigationEnd } from "@angular/router";
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import { first } from 'rxjs/operators';

import { AlertService, AuthenticationService } from "../_services";
import { User } from "../_models";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  login: boolean;
  home: boolean;
  loading = false;
  submitted = false;
  returnUrl: string;
  navLoginForm: FormGroup;
  currentUser: User;

  constructor(private router: Router,
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private alertService: AlertService ) {

    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
   }

  ngOnInit() {
    
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        let currentUrl = event.url;

        switch (currentUrl) {
          case '/login':
            this.login = true;
            this.home = false;
            break;
          
          case '/home':
            this.home = true;
            this.login = false;
            break;

          case '/subscribe':
            this.home = true;
            this.login = false;
            break;

          case '/':
            this.home = true;
            this.login = false;
            break;

          case '/admin':
            this.home = true;
            this.login = false;
            break;
        
          default:
            this.home = false;
            this.login = false;
            break;
        }
      }
    });

    this.navLoginForm = new FormGroup ({
      email: new FormControl(),
      password: new FormControl()
    });
    
  }

  // convenience getter for easy access to form fields
  get email() {return this.navLoginForm.get('email'); }
  get password() {return this.navLoginForm.get('password'); }

  // Login submissions
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.navLoginForm.invalid) {
      return ;
    }

    this.loading = true;
    this.authenticationService.login(this.email.value, this.password.value)
        .pipe(first())
        .subscribe( 
          data => {
            if (data.role == "super-admin") {
              this.router.navigate(['/admin'])
            }
            else {
              this.router.navigate(['/'])
            }
          },
          error => {
            this.alertService.error(error);
            this.loading = false;
          }
        );    
  }

  logout(id: number) {
    this.authenticationService.logout(id)
      .subscribe(
        data => {
          localStorage.removeItem('currentUser');
          this.router.navigate(['/login']);
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        }
      ); 
  }

}
