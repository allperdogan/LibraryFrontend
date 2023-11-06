import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder} from "@angular/forms"
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { delay } from 'rxjs';
import { AppComponent } from 'src/app/app.component';
import { OperationClaim } from 'src/app/models/operationClaim';
import { UserDetail } from 'src/app/models/userDetail';
import { AuthService } from 'src/app/services/auth.service';
import { LocalService } from 'src/app/services/local.service';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup
  userDetail:UserDetail

  constructor(private authService:AuthService,
    private userService:UserService,
    private localService:LocalService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private router: Router) { }

  ngOnInit(): void {
    this.createLoginForm()
  }

  createLoginForm(){
    this.loginForm = this.formBuilder.group({
      email:["",Validators.required],
      password:["",Validators.required]
    })
  }

  login(){
   if (this.loginForm.valid) {
    let loginModel = Object.assign({},this.loginForm.value) 
    this.authService.login(loginModel).subscribe((response) => {
      console.log(response)
      this.toastrService.info(response.message , "Bilgilendirme!")
      this.localService.add("token" , response.data.token)
      this.getUserDetails()
      this.router.navigate(["/books"])
    },(responseError) => {
      this.toastrService.error(responseError.error , "İşlem başarısız!")
    })
   }else{
    this.toastrService.error("Form bilgileri eksik." , "İşlem başarısız!")
   }
  }

  

  getUserClaims(){
    this.userService.getClaimsByUserId(this.userDetail.id).subscribe((response)=>{
      let claim:OperationClaim = response.data[0]
      if(claim==null){
        window.location.reload();
      }
      console.log(claim)
      this.localService.add("user_claim",JSON.stringify(claim.name))
      console.log("claimadded")
      window.location.reload();
    })
  }

  getUserDetails(){
    this.userService.getUserDetailsByEmail(this.loginForm.value.email).subscribe((response) => { 
      this.userDetail = response.data
      this.localService.add("user_details" , JSON.stringify(this.userDetail))
      this.getUserClaims()
    })
  }

}