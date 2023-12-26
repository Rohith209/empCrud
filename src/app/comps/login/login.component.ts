import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm!: FormGroup;
  constructor(private fb: FormBuilder, private auth: AuthService, private toastr: ToastrService, private router: Router) {
    this.loginForm = this.fb.group({
      'email': ['', Validators.required],
      'pwd': ['', Validators.required]
    })
  }

  Login() {
    let x: any = undefined;
    this.auth.loginUser().subscribe((data: any) => {
      console.log(data);
      if (data) {
        x = data.find((user: any) => {
          return (user.email === this.loginForm.value.email) && (user.pwd === this.loginForm.value.pwd);
        })

        if (x) {
          localStorage.setItem('token', 'x');
          this.toastr.success("Login Successful", "Success");
          this.loginForm.reset();
          this.router.navigateByUrl('/dashboard');
        } else {
          localStorage.removeItem('token');
          this.loginForm.reset();
          this.toastr.error("Email or Password is incorrect", "Error");
        }

      }
    })
  }
}
