import { EmployeeService } from './../../services/employee.service';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, NgFor, ReactiveFormsModule, NgIf],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  empData: any = [];
  EmpEditForm!: FormGroup;
  editData: boolean = false;
  addData: boolean = false;
  constructor(private formBuilder: FormBuilder,
    private EmpService: EmployeeService,
    private toastr: ToastrService,
    private router: Router) {
    this.EmpForm = this.formBuilder.group({
      'firstName': ['', Validators.required],
      'lastName': ['', Validators.required],
      'email': ['', [Validators.required, Validators.email]],
      'mobile': ['', [Validators.required, Validators.minLength(10)]],
      'id': [""]
    });
    this.renderEmployeeData();
  }

  EmpForm!: FormGroup;
  addEmpObj: any = {};
  @ViewChild('closeModal') closeModal!: ElementRef;

  RenderAddEmpModal() {
    this.editData = false;
    this.addData = true;
    this.addEmpObj = {};
    this.EmpForm.reset();
  }

  addEmp() {
    this.editData = false;
    this.addData = true;

    this.addEmpObj.firstName = this.EmpForm.get('firstName')?.value;
    this.addEmpObj.lastName = this.EmpForm.get('lastName')?.value;
    this.addEmpObj.email = this.EmpForm.get('email')?.value;
    this.addEmpObj.mobile = this.EmpForm.get('mobile')?.value;

    this.EmpService.addEmployee(this.addEmpObj).subscribe((data: any) => {
      this.empData = data;
      this.toastr.success('Data Added Successfully', "Success");
      this.EmpForm.reset();
      this.closeModal.nativeElement.click();
      this.renderEmployeeData();
    });
  }
  renderEmployeeData() {
    this.EmpService.getEmployees().subscribe((data: any) => {
      this.empData = data;
    })
  }

  id: number = 0;
  EditEmp(data: any) {
    this.editData = true;
    this.addData = false;

    this.EmpForm.controls['firstName'].setValue(data.firstName);
    this.EmpForm.controls['lastName'].setValue(data.lastName);
    this.EmpForm.controls['email'].setValue(data.email);
    this.EmpForm.controls['mobile'].setValue(data.mobile);
    this.id = data.id;
  }

  updateData() {
    this.addEmpObj.firstName = this.EmpForm?.get('firstName')?.value;
    this.addEmpObj.lastName = this.EmpForm?.get('lastName')?.value;
    this.addEmpObj.email = this.EmpForm?.get('email')?.value;
    this.addEmpObj.mobile = this.EmpForm?.get('mobile')?.value;
    console.log(this.addEmpObj, this.id);
    this.EmpService.updateEmployee(this.addEmpObj, this.id).subscribe((data: any) => {
      this.empData = data;
      this.toastr.info('Data Updated Successfully', "Updated");
      this.EmpForm.reset();
      this.closeModal.nativeElement.click();
      this.renderEmployeeData();
    });

  }

  deleteEmp(id: number) {
    if (window.confirm('Are you sure you want to delete?')) {
      this.EmpService.deleteEmployee(id).subscribe((data: any) => {
        this.toastr.error('Data Deleted Successfully', "Success");
        this.renderEmployeeData();
      })
    }
  }

  logOut() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login');
  }

}
