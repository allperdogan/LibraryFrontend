import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserDetail } from 'src/app/models/userDetail';
import { LocalService } from 'src/app/services/local.service';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent implements OnInit {

  isAuthorizated = false
  userDetails: UserDetail;

  constructor(private localService: LocalService,
    private router: Router,
    private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.checkIsAuthorizated()
    this.getUserDetails()
  }


  getUserDetails() {
    this.userDetails = JSON.parse(this.localService.getItem("user_details") || '')
  }

  checkIsAuthorizated() {
    if (this.localService.getItem("token")) {
      this.isAuthorizated = true
    } else {
      this.isAuthorizated = false
    }
  }

  logOut() {
    this.localService.delete("token")
    this.localService.delete("user_details")
    this.localService.delete("claim")
    this.toastrService.info("Çıkış yapıldı.", "Bilgilendirme!")
    this.router.navigate(["login"])
    window.location.reload()
  }

}