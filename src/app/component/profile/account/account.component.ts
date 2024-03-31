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

  addressForm: any = {
    line1: '',
    line2: '',
    landmark: '',
    cityId: '',
    stateId: '',
  };

  addressValidation: any = {};

  //inserting value
  constructor(private user: UserService) {
    this.addressValidation = {
      line1: [true, 'Please Provide Valid Input.'],
      line2: [true, 'Please Provide Valid Input.'],
      landmark: [true, 'Please Provide Valid Input.'],
      state: [true, 'Please Provide Valid Input.'],
      city: [true, 'Please Provide Valid Input.'],
    };
  }

  ngOnInit() {
    //  Value get from API
    this.getUserProfile();
  }

  //Function for APi Call

  getUserProfile() {
    let token = localStorage.getItem('_token') || '';

    this.user.getUserProfile(token).subscribe({
      next: (response: any) => {
        this.userDetails = response;
        this.userAddresses = response.user_addresses;
        this.newUserDetails = {
          ...response,
        };
      },
      error: (error: any) => {
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

    let id = JSON.parse(localStorage.getItem('id') || 'null') || '';
    let token = localStorage.getItem('_token') || '';

    this.user.updateUserDetails(id, token, this.newUserDetails).subscribe({
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

  //address form
  showAddressForm = false;

  showAddressFormBtn() {
    this.fetchStates();
    this.showAddressForm = true;
  }
  cancelAddressFormBtn() {
    this.showAddressForm = false;
  }

  checkLength(value: string, length: number) {
    return value.length >= length;
  }

  validateAddressLine1() {
    if (!this.checkLength(this.addressForm.line1, 5)) {
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

    const addressData = {
      user_details: id, // Replace with actual user details
      address_line_1: this.addressForm.line1,
      address_line_2: this.addressForm.line2,
      landmark: this.addressForm.landmark,
      isDefault: false, // Set to true if it's the default address
      city: this.addressForm.cityId, // Replace with actual city details
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
    if (this.addressForm.cityId === '' || this.addressForm.cityId === null) {
      this.addressValidation.city[0] = false;
      this.addressValidation.city[1] = 'Please Select City and State.';
      return false;
    }

    this.addressValidation.city[0] = true;
    return true;
  }

  validateAddressLandmark() {
    if (!this.checkLength(this.addressForm.landmark, 3)) {
      this.addressValidation.landmark[0] = false;
      this.addressValidation.landmark[1] =
        'Landmark Name must be 3 characters long.';
      return false;
    }
    this.addressValidation.landmark[0] = true;
    return true;
  }
  states: any = [];

  fetchStates() {
    this.user.getAllStates().subscribe({
      next: (response) => {
        this.states = response.data;
        console.log('States:', this.states);
      },
      error: (error) => {
        console.error('Error fetching states:', error);
      },
    });
  }
  cities: any = [];

  onStateChange() {
    if (this.addressForm.stateId) {
      this.user.getCityById(this.addressForm.stateId).subscribe({
        next: (response) => {
          this.cities = response.data;
          console.log('Cities:', this.cities);
        },
        error: (error) => {
          console.error('Error fetching cities:', error);
        },
      });
    } else {
      this.cities = [];
    }
  }
}
