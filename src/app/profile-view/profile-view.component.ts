import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FetchApiDataService } from '../fetch-api-data.service';
import { EditProfileViewComponent } from '../edit-profile-view/edit-profile-view.component';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { MatCard } from '@angular/material/card';

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

  ngOnInit(): void {
    this.getUserProfile();
  }

  getUserProfile(): void {
    let user = localStorage.getItem('Username');
    this.fetchApiData.getUserProfile(user).subscribe((res: any) => {
      this.user = res;
    });
  }

  openEditUserProfile(): void {
    this.dialog.open(EditProfileViewComponent, {
      width: '500px'
    })
  }

  deleteProfile(): void {
    if (confirm('Are you sure? This cannot be undone.')) {
      this.fetchApiData.deleteUserProfile().subscribe(() => {
        localStorage.clear();
        this.router.navigate(['welcome']);
        this.snackBar.open('Account Deleted', 'OK', {
          duration: 3000
        });
      });
    }
  }

}
