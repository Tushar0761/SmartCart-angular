import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
})
export class AccountComponent {
  userDetails: any = {};

  //inserting value
  constructor(private user: UserService) {
    this.newUserDetails = {
      username: '',
      phone: '',
    };
  }

  ngOnInit() {
    //  Value get from API
    this.getUserProfile();
  }

  //Function for APi Call

  getUserProfile() {
    let token = JSON.parse(localStorage.getItem('_token')?.toString() || '');

    this.user.getUserProfile(token).subscribe({
      next: (response: any) => {
        this.userDetails = response;
        this.newUserDetails.username = response.username;
        this.newUserDetails.phone = response.phone;
      },
      error: (error: any) => {
        // this.isLoggedIn = false;
        console.log('err');
        console.table(error);
      },
    });
  }

  //user update form
  newUserDetails: any = {};
  showUpdateForm = false;

  cancelUpdateProfileBtn() {
    this.showUpdateForm = false;
  }
  updateProfileBtn() {
    this.showUpdateForm = true;
    this.newUserDetails = {
      username: this.userDetails.username,
      phone: this.userDetails.phone,
    };
  }

  updateProfile() {
    console.log(this.newUserDetails);
    // let token = JSON.parse(localStorage.getItem('_token')?.toString() || '');
    // this.user.updateUserProfile(this.userDetails, token).subscribe({
    //   next: (response: any) => {
    //     console.log(response);
    //   },
    //   error: (error: any) => {
    //     console.log('err');
    //     console.table(error);
    //   },
    // });
  }

  //address form
  showAddressForm = false;

  showAddressFormBtn() {
    this.showAddressForm = true;
  }
  cancelAddressFormBtn() {
    this.showAddressForm = false;
  }
}
