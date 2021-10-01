import { Component, OnInit } from '@angular/core';

import { FetchApiDataService } from '../fetch-api-data.service';
import { GenreViewComponent } from '../genre-view/genre-view.component';
import { DirectorViewComponent } from '../director-view/director-view.component';
import { SynopsisViewComponent } from '../synopsis-view/synopsis-view.component';

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

const user = localStorage.getItem('username');

@Component({
  selector: 'app-favorites-view',
  templateUrl: './favorites-view.component.html',
  styleUrls: ['./favorites-view.component.scss']
})
export class FavoritesViewComponent implements OnInit {
  user: any = {};
  favorites: any = [];
  movie: any[] = [];
  favs: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.getMovies();
    this.getUsersFavs();
  }

  // Gets all Movies
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movie = resp;
      console.log(this.movie);
      return this.filterFavorites();
    });
  }

  // Gets the users Favorite Movies
  getUsersFavs(): void {
    this.fetchApiData.getUserProfile(user).subscribe((resp: any) => {
      this.favs = resp.FavoriteMovies;
      console.log(this.favs);
      return this.favs;
    });
  }

  // getUser(): void {
  //   let user = localStorage.getItem('username');
  //   this.fetchApiData.getUserProfile(user).subscribe((res: any) => {
  //     this.user = res;
  //     this.getMovies();
  //   });
  // }

  /**
   * Filters movies to display only the users favorites
  */
  filterFavorites(): void {
    this.movie.forEach((movies: any) => {
      if (this.favs.includes(movies._id)) {
        this.favorites.push(movies);
      } console.log(this.favorites, 'favorites');
    });
    return this.favorites;
  }

  openGenre(name: string,
    description: string,
  ): void {
    this.dialog.open(GenreViewComponent, {
      data: {
        Name: name,
        Description: description,
      },
      width: '500px'
    });
  }

  openDirector(name: string, bio: string, birth: string, death: string
  ): void {
    this.dialog.open(DirectorViewComponent, {
      data: {
        Name: name,
        Bio: bio,
        Birth: birth,
        Death: death
      },
      width: '500px'
    });
  }

  openSynopsis(title: string, imagePath: any, description: string
  ): void {
    this.dialog.open(SynopsisViewComponent, {
      data: {
        Title: title,
        ImagePath: imagePath,
        Description: description,
      },
      width: '500px'
    });
  }

  postFavoriteMovies(id: string, Title: string): void {
    this.fetchApiData.postFavoriteMovies(id).subscribe((res: any) => {
      this.snackBar.open(`${Title} has been added to favorties`, 'OK', {
        duration: 3000,
      })
      return this.getUsersFavs();
    })
  }

  deleteFavoriteMovies(id: string, Title: string): void {
    this.fetchApiData.deleteFavoriteMovies(id).subscribe((res: any) => {
      this.snackBar.open(`${Title} has been removed from favorties`, 'OK', {
        duration: 3000,
      })
      setTimeout(function () {
        window.location.reload();
      }, 3500);
      return this.getUsersFavs();
    })
  }

  /**
   * Allows for dynamic loading of favorites icon to display on/off of favorites
  */
  setFavStatus(id: any): any {
    if (this.favs.includes(id)) {
      return true;
    } else {
      return false;
    }
  }

}
