import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  changePasswordForm: FormGroup;

  constructor(private userService: UserService, private formBuilder: FormBuilder, private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.createChangePasswordForm();
  }

  createChangePasswordForm() {
    this.changePasswordForm = this.formBuilder.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
    });
  }

  changePassword() {
    // if (this.changePasswordForm.valid) {
    //   const userId = /* Kullanıcının ID'sini burada elde edin */;

    //   this.userService.update({
    //     id: userId,
    //     oldPassword: this.changePasswordForm.value.oldPassword,
    //     newPassword: this.changePasswordForm.value.newPassword,
    //     // Diğer güncelleme özelliklerini buraya ekleyebilirsiniz
    //   }).subscribe(response => {
    //     this.toastrService.success('Şifre değiştirme başarılı.');
    //   }, error => {
    //     this.toastrService.error('Şifre değiştirme başarısız.');
    //   });
    // } else {
    //   this.toastrService.error('Formu eksiksiz doldurunuz.');
    // }
  }

}