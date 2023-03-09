import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup } from '@angular/forms';
import { employeeModel } from './employee-dashboard.model';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit{
  formValue !: FormGroup;
  model : employeeModel= new employeeModel();
  employeeData !: any;
  constructor(private formbuilder: FormBuilder, private api: ApiService){}
  ngOnInit(): void {
      this.formValue = this.formbuilder.group({
        firstName:[''],
        lastName:[''],
        email:[''],
        mobile:[''],
        salary:[''],
      }
    )
    this.getAllEmploye();
    
  }
  postEmployeeDetails(){
    this.model.firstName = this.formValue.value.firstName;
    this.model.lastName= this.formValue.value.lastName;
    this.model.email= this.formValue.value.email;
    this.model.mobile= this.formValue.value.mobile;
    this.model.salary = this.formValue.value.salary;
    this.api.postEmployee(this.model).subscribe(res=>{
      console.log(res)
      alert("Empleado Agregado Correctamente");
      let ref = document.getElementById('cancel')
      ref?.click();
      this.getAllEmploye();
    },
    err=>{
      alert("Algo salio mal");
    })
  }
  reset(){
    this.formValue.reset();
  }
  getAllEmploye(){
    this.api.getEmployee().subscribe(res=>{
      this.employeeData= res;
    })
  }
  deleteEmployee(row:any){
    this.api.deleteEmploye(row.id).subscribe(res=>{
      alert("Empleado Eliminado");
      this.getAllEmploye();
    })
  }
  onEdit(row:any){
    this.model.id= row.id;
    this.formValue.controls['firstName'].setValue(row.firstName);
    this.formValue.controls['lastName'].setValue(row.lastName);
    this.formValue.controls['email'].setValue(row.email);
    this.formValue.controls['mobile'].setValue(row.mobile);
    this.formValue.controls['salary'].setValue(row.salary);
    
  }
  updateEmployeeDetails(){
    this.model.firstName= this.formValue.value.firstName;
    this.model.lastName= this.formValue.value.lastName;
    this.model.email= this.formValue.value.email;
    this.model.mobile= this.formValue.value.mobile;
    this.model.salary = this.formValue.value.salary;

    this.api.updateEmployee(this.model, this.model.id).subscribe(rest=>{
      alert("Registro actualizado correctamente");
      let ref = document.getElementById('cancel') 
      ref?.click();
      this.formValue.reset();
      this.getAllEmploye();
      
    })
  }
}


