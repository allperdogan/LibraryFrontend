import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent {
  
  updateForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<UserUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { user: User },
    private formBuilder: FormBuilder, private userService:UserService,
    private toastrService:ToastrService
  ) {
    this.updateForm = this.formBuilder.group({
      firstName: [data.user.firstName, Validators.required],
      lastName: [data.user.lastName, Validators.required],
      eMail: [data.user.email, Validators.required],
  
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  updateUser(): void {
    if (this.updateForm.valid) {
      const updatedUser: User = {
        id: this.data.user.id,
        ...this.updateForm.value
      };

      this.userService.updateUser(updatedUser).subscribe(response=>{
        this.toastrService.success("Başarılı")
      });

      this.dialogRef.close(updatedUser); 
    }
  }
}
