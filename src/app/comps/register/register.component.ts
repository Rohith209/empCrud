import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm!: FormGroup;
  constructor(private fb: FormBuilder, private auth: AuthService, private toastr: ToastrService, private router: Router) {
    this.registerForm = this.fb.group({
      'firstName': ['', Validators.required],
      'lastName': ['', Validators.required],
      'email': ['', Validators.required],
      'pwd': ['', Validators.required],
      'confirmPwd': ['', Validators.required],
    })
  }

  Register() {
    //console.log(this.registerForm.value);
    this.auth.registerUser(this.registerForm.value).subscribe(data => {
      if (data) {
        localStorage.setItem('token', 'x');
        this.toastr.success("Registration Successful", "Success");
        this.registerForm.reset();
        this.router.navigateByUrl('/dashboard');
      }
    })
  }

}
