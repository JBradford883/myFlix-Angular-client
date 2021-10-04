// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';

// import { ProfileViewComponent } from '../profile-view/profile-view.component';

// import { MatSnackBar } from '@angular/material/snack-bar';
// import { MatDialog } from '@angular/material/dialog';

// const user = localStorage.getItem('username')

// @Component({
//   selector: 'app-navbar',
//   templateUrl: './navbar.component.html',
//   styleUrls: ['./navbar.component.scss']
// })
// export class NavbarComponent implements OnInit {

//   constructor(
//     public snackBar: MatSnackBar,
//     public dialog: MatDialog,
//     public router: Router,
//   ) { }

//   ngOnInit(): void {
//   }

//   /**
//    * logs out the user by clearing the localstorage (username, token) and reloads the page
//    * then -> redirect to welcome page
//    */
//   logOut(): void {
//     this.router.navigate(['welcome']);
//     this.snackBar.open('Logout successful!', 'OK', {
//       duration: 3000
//     });
//   }

// }
