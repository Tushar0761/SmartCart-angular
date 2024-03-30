import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
})
export class AccountComponent {
  userDetails: any = {};
  userAddresses: any = [];

  addressFrom: any = {
    line1: '',
    line2: '',
    landmark: '',
    city: '',
  };
  addressValidation: any = {};

  //inserting value
  constructor(private user: UserService) {
    this.newUserDetails = {
      mobile_number: '',
    };
    this.addressValidation = {
      line1: [true, 'Please Provide Valid Input.'],
      line2: [true, 'Please Provide Valid Input.'],
      landmark: [true, 'Please Provide Valid Input.'],
      city: [true, 'Please Provide Valid Input.'],
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
        this.userAddresses = response.user_addresses;
        console.table(this.userAddresses);
        this.newUserDetails.mobile_number = response.phone;
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
  }

  updateProfile() {
    let id = JSON.parse(localStorage.getItem('id') || 'null') || '';
    let token = JSON.parse(localStorage.getItem('_token') || '""') || '';

    this.user.updateUserDetails(id, token, this.newUserDetails).subscribe({
      next: (response) => {
        console.log('User details updated successfully:', response);
      },
      error: (error) => {
        console.error('Error updating user details:', error);
      },
    });
  }

  //address form
  showAddressForm = false;

  showAddressFormBtn() {
    this.showAddressForm = true;
  }
  cancelAddressFormBtn() {
    this.showAddressForm = false;
  }

  checkLength(value: string, length: number) {
    return value.length >= length;
  }

  validateAddressLine1() {
    if (!this.checkLength(this.addressFrom.line1, 5)) {
      this.addressValidation.line1[0] = false;
      this.addressValidation.line1[1] = 'It  must be 5 characters long.';
      return false;
    }
    this.addressValidation.line1[0] = true;
    return true;
  }

  addressFormSubmit() {
    if (!this.addressFormValidation()) {
      return;
    }

    let id = JSON.parse(localStorage.getItem('id') || '');
    console.log('for id :', id);

    const addressData = {
      user_details: id, // Replace with actual user details
      address_line_1: this.addressFrom.line1,
      address_line_2: this.addressFrom.line2,
      landmark: this.addressFrom.landmark,
      isDefault: false, // Set to true if it's the default address
      city: 1, // Replace with actual city details
    };

    this.user.addNewAddress(addressData).subscribe({
      next: (response: any) => {
        alert('Address added successfully');
        this.showAddressForm = false;

        this.getUserProfile();
      },
      error: (error: any) => {
        console.error('Error adding address:', error);
        alert('Error adding address');
      },
    });
  }

  addressFormValidation() {
    let isValid = true;

    isValid = this.validateAddressLine1() && isValid;
    isValid = this.validateAddressLandmark() && isValid;
    isValid = this.validateAddressCity() && isValid;

    return isValid;
  }

  validateAddressCity() {
    if (!this.checkLength(this.addressFrom.city, 3)) {
      this.addressValidation.city[0] = false;
      this.addressValidation.city[1] = 'City Name must be 3 characters long.';
      return false;
    }
    this.addressValidation.city[0] = true;
    return true;
  }

  validateAddressLandmark() {
    if (!this.checkLength(this.addressFrom.landmark, 3)) {
      this.addressValidation.landmark[0] = false;
      this.addressValidation.landmark[1] =
        'Landmark Name must be 3 characters long.';
      return false;
    }
    this.addressValidation.landmark[0] = true;
    return true;
  }
}
