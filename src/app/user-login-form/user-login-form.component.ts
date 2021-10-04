// Core modules
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

// Custom components
import { FetchApiDataService } from '../fetch-api-data.service';

// Material components
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})
export class UserLoginFormComponent implements OnInit {

  /**
   * Required fields for the login form
   */
  @Input() userDetails = { Username: '', Password: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public router: Router,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  /**
   * Send a request to login the user, if successful,
   * saves the username to the local storage
   * save a token to local storage
   * redirects the user to the movies endpoint
   */
  loginUser(): void {
    this.fetchApiData.userLogin(this.userDetails).subscribe((response) => {

      // Logic for successful user login
      this.dialogRef.close();
      console.log(this.userDetails);

      // Set username and password to local storage
      localStorage.setItem('username', response.user.Username);
      localStorage.setItem('token', response.token);

      this.snackBar.open('User login successful!', 'OK', {
        duration: 2000
      });
      this.router.navigate(['movies']);
    }, (response) => {
      console.log(response);
      this.snackBar.open(response, 'OK', {
        duration: 2000
      });
    });
  }

}
