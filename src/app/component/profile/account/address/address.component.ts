import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css'],
})
export class AddressComponent {
  userId: any = 0;

  userAddresses: any = [];
  addressValidation: any = {};

  addressForm: any = {
    line1: '',
    line2: '',
    landmark: '',
    cityId: '',
    stateId: '',
  };
  constructor(private user: UserService, private auth: AuthService) {
    this.userId = this.auth.getUserId();

    this.addressValidation = {
      line1: [true, 'Please Provide Valid Input.'],
      line2: [true, 'Please Provide Valid Input.'],
      landmark: [true, 'Please Provide Valid Input.'],
      state: [true, 'Please Provide Valid Input.'],
      city: [true, 'Please Provide Valid Input.'],
    };
  }
  ngOnInit() {
    this.getUserProfile();
  }
  getUserProfile() {
    this.user.getUserProfile().subscribe({
      next: (response: any) => {
        this.userAddresses = response.user_addresses;
      },
      error: (error: any) => {
        console.error(error);
      },
    });
  }
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

    const addressData = {
      user_details: this.userId,
      address_line_1: this.addressForm.line1,
      address_line_2: this.addressForm.line2,
      landmark: this.addressForm.landmark,
      isDefault: false,
      city: this.addressForm.cityId,
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
