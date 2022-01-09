import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { RegisterUser } from 'src/app/models/register-user.model'
import { AuthenticationService } from 'src/app/services/authentication/authentication.service'

@Component({
  selector: 'app-signup',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignupComponent implements OnInit {

  
  checkbox = 0
  errorText = ""
  recaptcha_response = ''
  isInvalid: boolean = false
  btnClicked: boolean = false
  isRecaptchaValid: boolean = true
  isCheckboxValid: boolean = true
  password_mismatch: boolean = false

  constructor(private authService: AuthenticationService, private router: Router) {}

  ngOnInit(): void {
  }

  first_name = {text: "", isNotEmpty: false}
  last_name = {text: "", isNotEmpty: false}
  dob = {text: "", isNotEmpty: false}
  address_line1 = {text: "", isNotEmpty: false}
  address_line2 = {text: "", isNotEmpty: false}
  city = {text: "", isNotEmpty: false}
  state = {text: "", isNotEmpty: false}
  country = {text: "", isNotEmpty: false}
  primary_phone_number = {text: "", isNotEmpty: false}
  alternate_phone_number = {text: "", isNotEmpty: false}
  primary_email_address = {text: "", isNotEmpty: false}
  alternate_email_address = {text: "", isNotEmpty: false}
  affiliation_name = {text: "", isNotEmpty: false}
  affiliation_email_address = {text: "", isNotEmpty: false}
  username = {text: "", isNotEmpty: false}
  password = {text: "", isNotEmpty: false}
  confirm_password = {text: "", isNotEmpty: false}

  userInfo: RegisterUser = {
    first_name: "",
    last_name: "",
    dob: "",
    address_line1: "",
    address_line2: "",
    city: "",
    state: "",
    country: "",
    primary_phone_number: "",
    alternate_phone_number: "",
    primary_email_address: "",
    alternate_email_address: "",
    affiliation_name: "",
    affiliation_email_address: "",
    username: "",
    password: "",
  }

  buttonClicked() {
    this.btnClicked = true
    this.password_mismatch = false
    if (this.recaptcha_response.length == 0)
      this.isRecaptchaValid = false
    if (this.checkbox % 2 == 0)
      this.isCheckboxValid = false
    else
      this.isCheckboxValid = true
  }

  onChange() {
    this.checkbox++
  }

  resolved(captchaResponse: string) {
    this.recaptcha_response = captchaResponse
    this.isRecaptchaValid = true
  }

  inputData(e: any) {
    if (e.name === 'first_name') {
      if (!e.data) {
        this.first_name.isNotEmpty = false
      } else {
        this.first_name.text = e.data
        this.first_name.isNotEmpty = true
      }
    }
    if (e.name === 'last_name') {
      if (!e.data) {
        this.last_name.isNotEmpty = false
      } else {
        this.last_name.text = e.data
        this.last_name.isNotEmpty = true
      }
    }
    if (e.name === "dob") {
      if (!e.data) {
        this.dob.isNotEmpty = false
      } else {
        this.dob.text = e.data
        this.dob.isNotEmpty = true
      }
    }
    if (e.name === 'address_line1') {
      if (!e.data) {
        this.address_line1.isNotEmpty = false
      } else {
        this.address_line1.text = e.data
        this.address_line1.isNotEmpty = true
      }
    }
    if (e.name === 'address_line2') {
      this.address_line2.text = e.data
    }
    if (e.name === 'city') {
      if (!e.data) {
        this.city.isNotEmpty = false
      } else {
        this.city.text = e.data
        this.city.isNotEmpty = true
      }
    }
    if (e.name === 'state') {
      if (!e.data) {
        this.state.isNotEmpty = false
      } else {
        this.state.text = e.data
        this.state.isNotEmpty = true
      }
    }
    if (e.name === 'country') {
      if (!e.data) {
        this.country.isNotEmpty = false
      } else {
        this.country.text = e.data
        this.country.isNotEmpty = true
      }
    }
    if (e.name === 'primary_email_address') {
      if (!e.data) {
        this.primary_email_address.isNotEmpty = false
      } else {
        this.primary_email_address.text = e.data
        this.primary_email_address.isNotEmpty = true
      }
    }
    if (e.name === 'alternate_email_address') {
      if (!e.data) {
        this.alternate_email_address.isNotEmpty = false
      } else {
        this.alternate_email_address.text = e.data
        this.alternate_email_address.isNotEmpty = true
      }
    }
    if (e.name === 'alternate_phone_number') {
      if (!e.data) {
        this.alternate_phone_number.isNotEmpty = false
      } else {
        this.alternate_phone_number.text = e.data
        this.alternate_phone_number.isNotEmpty = true
      }
    }
    if (e.name === 'primary_phone_number') {
      if (!e.data) {
        this.primary_phone_number.isNotEmpty = false
      } else {
        this.primary_phone_number.text = e.data
        this.primary_phone_number.isNotEmpty = true
      }
    }
    if (e.name === 'affiliation_name') {
      if (!e.data) {
        this.affiliation_name.isNotEmpty = false
      } else {
        this.affiliation_name.text = e.data
        this.affiliation_name.isNotEmpty = true
      }
    }
    if (e.name === 'affiliation_email_address') {
      if (!e.data) {
        this.affiliation_email_address.isNotEmpty = false
      } else {
        this.affiliation_email_address.text = e.data
        this.affiliation_email_address.isNotEmpty = true
      }
    }
    if (e.name === 'username') {
      if (!e.data) {
        this.username.isNotEmpty = false
      } else {
        this.username.text = e.data
        this.username.isNotEmpty = true
      }
    }
    if (e.name === 'password') {
      if (!e.data) {
        this.password.isNotEmpty = false
      } else {
        this.password.text = e.data
        this.password.isNotEmpty = true
      }
    }
    if (e.name === 'confirm_password') {
      if (!e.data) {
        this.confirm_password.isNotEmpty = false
      } else {
        this.confirm_password.text = e.data
        this.confirm_password.isNotEmpty = true
      }
    }
  }

  registerUser() {
    if (
      this.first_name.isNotEmpty &&
      this.last_name.isNotEmpty &&
      this.dob.isNotEmpty &&
      this.address_line1.isNotEmpty &&
      this.city.isNotEmpty &&
      this.state.isNotEmpty &&
      this.country.isNotEmpty &&
      this.primary_phone_number.isNotEmpty &&
      this.primary_email_address.isNotEmpty &&
      this.affiliation_name.isNotEmpty &&
      this.affiliation_email_address.isNotEmpty &&
      this.username.isNotEmpty &&
      this.password.isNotEmpty &&
      this.confirm_password.isNotEmpty) {
        if (this.password.text !=this.confirm_password.text) {
          this.password_mismatch = true
        } else {
          this.userInfo.first_name = this.first_name.text
          this.userInfo.last_name = this.last_name.text
          this.userInfo.dob = this.dob.text
          this.userInfo.address_line1 = this.address_line1.text
          this.userInfo.address_line2 = this.address_line2.text
          this.userInfo.city = this.city.text
          this.userInfo.state = this.state.text
          this.userInfo.country = this.country.text
          this.userInfo.primary_email_address = this.primary_email_address.text
          this.userInfo.alternate_email_address = this.alternate_email_address.text
          this.userInfo.primary_phone_number = this.primary_phone_number.text
          this.userInfo.alternate_phone_number = this.alternate_phone_number.text
          this.userInfo.affiliation_name = this.affiliation_name.text
          this.userInfo.affiliation_email_address = this.affiliation_email_address.text
          this.userInfo.username = this.username.text
          this.userInfo.password = this.password.text
          console.log(this.userInfo)
          this.authService.createUser(this.userInfo).subscribe(
            data => {
              console.log(data)
              this.router.navigate(
                ['/signup/success', {text: 'Account Created. \n Please enter your email to verify your account.'}],
                { skipLocationChange: true }
              )
            },
            error => {
              this.errorText = error.error
              this.isInvalid = true
            }
          )
        }
    } else {
      this.btnClicked = false
    }
  }

}