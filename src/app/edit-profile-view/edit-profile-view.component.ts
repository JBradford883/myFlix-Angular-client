// Core modules
import { Component, OnInit, Input } from '@angular/core';

// components
import { FetchApiDataService } from '../fetch-api-data.service';

// Material modules
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-profile-view',
  templateUrl: './edit-profile-view.component.html',
  styleUrls: ['./edit-profile-view.component.scss']
})
export class EditProfileViewComponent implements OnInit {

  /**
   * Required fields to update the user profile
  */
  @Input() userDetails = {
    Username: '',
    Password: '',
    Email: '',
    Birthday: '',
  };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<EditProfileViewComponent>,
    public snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void { }

  /**
   * Update user details
  */
  editUserProfile(): void {
    this.fetchApiData.editUserProfile(this.userDetails).subscribe((res) => {
      // Logic for successful user registration needs to be implemented here!
      this.dialogRef.close();
      localStorage.setItem('username', res.Username)
      console.log(res)
      this.snackBar.open(this.userDetails.Username, 'Successfully updated user details!', {
        duration: 3000
      });
    }, (res) => {
      this.snackBar.open(res, 'OK', {
        duration: 3000
      });
      // setTimeout(function () {
      //   window.location.reload();
      // }, 3500);
    })
  }
}