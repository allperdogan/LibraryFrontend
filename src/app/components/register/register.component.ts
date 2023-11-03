import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  signForm:FormGroup;
  constructor(private formBuilder:FormBuilder, private authService:AuthService, private toastrService:ToastrService) { }
  
    ngOnInit(): void {
      this.createLoginForm();
    }
  
    createLoginForm(){
      this.signForm = this.formBuilder.group({
        email:["",Validators.required],
        password:["",Validators.required],
        firstName:["",Validators.required],
        lastName:["",Validators.required]
      })
    }
  
    sign(){
      if(this.signForm.valid){
        console.log(this.signForm.value);
        let signModel = Object.assign({},this.signForm.value)
  
        this.authService.sign(signModel).subscribe(response=>{
          this.toastrService.info(response.message)
          localStorage.setItem("token",response.data.token)
        },responseError=>{
          //console.log(responseError)
          this.toastrService.error(responseError.error)
        })
      }
    }
  }
