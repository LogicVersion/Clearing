import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../shared/user.model';
import { UserService } from '../../shared/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  user!: User;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  roles! : any[];

  constructor(private userService: UserService, private toastr: ToastrService) { }

  ngOnInit() {
    this.resetForm();
    this.userService.getAllRoles().subscribe(
      (data : any)=>{
        data.forEach((obj: any) => obj.selected = false);
        this.roles = data;
      }
    );
  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.reset();
    this.user = {
      UserName: '',
      password: '',
      confirmPassword: '',
      Email: '',
      FirstName: '',
      LastName: '',
    };
    if (this.roles)
      this.roles.map(x => x.selected = false);
  }

  OnSubmit(form: NgForm) {

        let x: any[]=[];
        if (this.roles){
          x = this.roles.filter((x) => x.selected).map((y) => y.name);
          if (x.length <= 0) {
            this.toastr.warning('No User Role(s) Selected');
            return;
          }
        }
        else{
          this.toastr.warning('User Roles Required! Please Register one or more Roles');
          return;
        }

      this.userService.registerUser(form.value,x)
      .subscribe((data: any)=> {
          this.resetForm(form);
          this.toastr.success('User registration successful'),
          this.toastr.error(data.Errors[0]);
      });
  }

  updateSelectedRoles(index: number) {
    this.roles[index].selected = !this.roles[index].selected;
  }

}
