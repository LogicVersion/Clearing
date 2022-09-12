import { Component, OnInit } from '@angular/core';
import {  FormGroup ,FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  numOfChars = 0;
  empLogin!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.empLogin = this.fb.group({
      fullName: [
        '',
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(10),
      ],
      email: ['', Validators.required],
      skills: this.fb.group({
        skillName: ['', Validators.required],
        experience: ['', Validators.required],
        proficiency: ['', Validators.required],
      }),
    });

    this.empLogin.get('fullName')?.valueChanges.subscribe((data) => {
      this.logValidationErrors(this.empLogin);
    });
  }

  onClickLoadData(): void {
    // this.logValidationErrors(this.empLogin);
    // console.log(this.pageErrors);
  }

  logValidationErrors(frmgp: FormGroup=this.empLogin): void {
    Object.keys(frmgp.controls).forEach((key: string) => {
      const abstractControl = frmgp.get(key);
      if (abstractControl instanceof FormGroup) {
        this.logValidationErrors(abstractControl);
      } else {
        if (abstractControl && !abstractControl?.valid &&
          (abstractControl.touched || abstractControl.dirty)) {
          let messages = this.validationMessages[key];
          for (let errKey in abstractControl.errors) {
            if (errKey) {
              this.pageErrors[key] += messages[errKey] + ' ';
              //console.log(`key is ${key} and errKey is ${errKey}`);
              //console.log(frmgp.controls);
            }
          }
        }
      }
    });
  }

  validationMessages: any = {
    fullName: {
      required: 'Fullname required',
      minLength: 'minimum length of two chars reqd',
      maxLength: 'max length of 10 chars reqd',
    },
    email: {
      required: 'email reqd'
    },
    skillName: {
      required: 'Skill reqd',
    },
    experience: {
      required: 'exp reqd',
    },
    proficiency: {
      required: 'good proficiency reqd',
    },
  };

  pageErrors: any = {
    fullName: '',
    email: '',
    skillName: '',
    experience: '',
    proficiency: '',
  };

  save() {
    console.log(this.empLogin.value);
  }
}
