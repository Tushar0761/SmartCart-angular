import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
})
export class AccountComponent {
  userId: any = 0;
  userDetails: any = {};

  constructor(private user: UserService, private auth: AuthService) {
    this.userId = this.auth.getUserId();
  }

  ngOnInit() {
    this.getUserProfile();
  }

  getUserProfile() {
    this.user.getUserProfile().subscribe({
      next: (response: any) => {
        this.userDetails = response;
        this.newUserDetails = {
          ...response,
        };
      },
      error: (error: any) => {
        console.error(error);
      },
    });
  }

  newUserDetails: any = {};
  showUpdateForm = false;

  cancelUpdateProfileBtn() {
    this.showUpdateForm = false;
  }
  updateProfileBtn() {
    this.showUpdateForm = true;
  }

  updateProfileValidation = {
    username: [true, ''],
    mobile_number: [true, ''],
    updateError: [true, ''],
  };

  validateUpdateProfile() {
    let isValid = true;
    this.newUserDetails.username = this.newUserDetails.username.trim();

    if (this.newUserDetails.username.length < 3) {
      this.updateProfileValidation.username[0] = false;
      this.updateProfileValidation.username[1] =
        'Username must be 3 characters long.';
      isValid = false;
    } else {
      this.updateProfileValidation.username[0] = true;
      this.updateProfileValidation.username[1] = '';
    }

    if (
      this.newUserDetails.mobile_number.length < 10 ||
      this.newUserDetails.mobile_number.length > 12 ||
      isNaN(this.newUserDetails.mobile_number)
    ) {
      if (this.newUserDetails.mobile_number !== '') {
        this.updateProfileValidation.mobile_number[0] = false;
        this.updateProfileValidation.mobile_number[1] =
          'Pleas Provide Valid Mobile Number.';
        isValid = false;
      }
    } else {
      this.updateProfileValidation.mobile_number[0] = true;
      this.updateProfileValidation.mobile_number[1] = '';
    }
    return isValid;
  }

  updateProfile() {
    if (!this.validateUpdateProfile()) {
      return;
    }

    this.user.updateUserDetails(this.newUserDetails).subscribe({
      next: (response) => {
        alert('User details updated successfully');
        this.showUpdateForm = false;
        this.getUserProfile();
        this.updateProfileValidation.updateError[0] = true;
      },
      error: (error) => {
        this.updateProfileValidation.updateError[0] = false;
        this.updateProfileValidation.updateError[1] =
          error.error?.error?.message || 'Error updating user details';
      },
    });
  }
}
