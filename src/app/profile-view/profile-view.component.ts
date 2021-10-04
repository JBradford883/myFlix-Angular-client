// Core modules
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Custom components
import { FetchApiDataService } from '../fetch-api-data.service';
import { EditProfileViewComponent } from '../edit-profile-view/edit-profile-view.component';

// Material modules
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.scss']
})
export class ProfileViewComponent implements OnInit {

  user: any = {};

  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    public router: Router
  ) { }

  /**
   * Gets the user when the component is opened
   */
  ngOnInit(): void {
    this.getUserProfile();
  }

  /**
   * Gets the user profile information from the backend
   */
  getUserProfile(): void {
    let user = localStorage.getItem('username');
    this.fetchApiData.getUserProfile(user).subscribe((res: any) => {
      this.user = res;
    });
  }

  /**
   * Opens a modal to edit the users profile information
   */
  openEditUserProfile(): void {
    this.dialog.open(EditProfileViewComponent, {
      width: '500px'
    })
  }

  /**
   * Allows the user to delete their profile
   * @returns confirm message to confirm user wants to remove their profile
   * @returns status message success/error
   */
  deleteProfile(): void {
    if (confirm('Are you sure? This cannot be undone.')) {
      this.fetchApiData.deleteUserProfile().subscribe(() => {
        localStorage.clear();
        this.router.navigate(['welcome']);
        this.snackBar.open('Your account was deleted', 'OK', {
          duration: 3000
        });
      });
    }
  }

  /**
   * logs out the user by clearing the localstorage (username, token) and reloads the page
   * then -> redirect to welcome page
   */
  logOut(): void {
    this.router.navigate(['welcome']);
    this.snackBar.open('Logout successful!', 'OK', {
      duration: 3000
    });
  }

}
