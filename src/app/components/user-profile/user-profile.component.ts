import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { UserDetail } from 'src/app/models/userDetail';
import { UserForUpdateDto } from 'src/app/models/userForUpdateDto';
import { LocalService } from 'src/app/services/local.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  user: User
  userDetail: UserDetail
  userUpdateForm: FormGroup
  userUpdateModel: User

  constructor(private userService: UserService,
    private localService: LocalService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.getUserByUserId()
    this.createUserUpdateForm()
  }

  updateUser() {
    let userDetail = JSON.parse(this.localService.getItem("user_details") || '')
    let userUpdateModel: UserForUpdateDto = { 
      id: userDetail.id, 
      firstName: this.userUpdateForm.value.firstName, 
      lastName: this.userUpdateForm.value.lastName, 
      email: this.userUpdateForm.value.email 
    }

    this.userService.update(userUpdateModel).subscribe((response) => {
      this.toastrService.success("Kullanıcı güncellendi" , "İşlem başarılı!")
      this.localService.update("user_details" , JSON.stringify(userUpdateModel))
      window.location.reload()
    },(responseError) => {
      if (responseError.error.Errors.length>0) {
        for (let i = 0; i < responseError.error.Errors.length; i++) {
          this.toastrService.error(responseError.error.Errors[i].ErrorMessage , "İşlem başarısız")
        }
      }
    })
  }


  createUserUpdateForm() {
    this.userUpdateForm = this.formBuilder.group({
      firstName: [this.userDetail.firstName],
      lastName: [this.userDetail.lastName],
      email: [this.userDetail.email],
    })
  }

  getUserByUserId() {
    this.userDetail = JSON.parse(localStorage.getItem("user_details") || '');
    this.userService.getUserById(this.userDetail.id).subscribe((response) => {
      console.log(response)
      this.user = response.data
    })
  }


}