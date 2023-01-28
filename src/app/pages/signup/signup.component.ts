import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

//custom validator to Match password and confirm Password
export function passwordDontMatch(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    let password = control.get('password')?.value;
    let confirmPassword = control.get('confirmPassword')?.value;

    if (password && confirmPassword && password !== confirmPassword) {
      return {
        passwordDontMatch: true
      }
    }
    return null;
  }
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor() { }

  signUpForm = new FormGroup({
    'name': new FormControl(null, Validators.required),
    'email': new FormControl(null, [Validators.required, Validators.email]),
    'password': new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(30)]),
    'confirmPassword': new FormControl(null, [Validators.required])
  },{validators: passwordDontMatch()})

  ngOnInit(): void {
  }

  //get function to extract specific control from all form controls
  get name() {
    return this.signUpForm.get('name');
  }
  get email() {
    return this.signUpForm.get('email');
  }
  get password() {
    return this.signUpForm.get('password');
  }
  get confirmPassword() {
    return this.signUpForm.get('confirmPassword');
  }

  onSubmit() {
    //code for task shall be done after submitting the form
  }
  

}