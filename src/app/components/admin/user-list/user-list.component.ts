import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { UserUpdateComponent } from '../user-update/user-update.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent {

  users: User[] = [];
  filterText = "";

  constructor(private userService:UserService,  private toastrService:ToastrService, private dialog: MatDialog) {
    
  }
  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(){
    this.userService.getAll().subscribe(response=>{
      this.users = response.data;
    });
  }


  deleteUser(user: User): void {
    this.userService.deleteUser(user).subscribe(response=>{
      console.log(`User ID ${user.id} silindi.`);
      this.toastrService.success("Silindi")
      window.location.reload()
    });
  }

  openUpdateDialog(user: User): void {
    const dialogRef = this.dialog.open(UserUpdateComponent, {
      width: '400px', // Modalin genişliği
      data: { user } // Güncelleme bileşenine veriyi aktarır
    });

    dialogRef.afterClosed().subscribe(result => {
      // Modaldan dönen sonuçları işleyebilirsiniz (örneğin, başarı mesajı göstermek gibi)
      console.log('Modal kapatıldı.', result);
    });
  }
}

