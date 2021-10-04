// Core modules
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Custom Components
import { FetchApiDataService } from '../fetch-api-data.service';
import { GenreViewComponent } from '../genre-view/genre-view.component';
import { DirectorViewComponent } from '../director-view/director-view.component';
import { SynopsisViewComponent } from '../synopsis-view/synopsis-view.component';

// Material modules
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';


// Declare global variables
const user = localStorage.getItem('username');

@Component({
  selector: 'app-favorites-view',
  templateUrl: './favorites-view.component.html',
  styleUrls: ['./favorites-view.component.scss']
})
export class FavoritesViewComponent implements OnInit {
  user: any = {};
  favorites: any = [];
  movies: any[] = [];
  favs: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    public router: Router,
  ) { }

  ngOnInit(): void {
    this.getMovies();
    this.getUsersFavs();
  }

  /**
   * This component gets all the movies form the server and then compares the users favorite movies (favs) with the movie array.
   * The movies from the users favorites will then be pushed to a new array (favorites).
   * The favorites-view component is not dependant on the movie-card view,
   * but movies can only be added to the fav movies array from the movie-card component.
   * Movies can be removed from the fav movies array from the favorites-view component.
   */

  /**
   * Gets all movies
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.filterFavorites();
    });
  }

  /**
   * Get the users favorite movies
   */
  getUsersFavs(): void {
    this.fetchApiData.getUserProfile(user).subscribe((resp: any) => {
      this.favs = resp.FavoriteMovies;
      console.log(this.favs);
      return this.favs;
    });
  }

  /**
   * Filters movies to display only the users favorites
   * @returns array of movies to be displayed in the component
  */
  filterFavorites(): void {
    this.movies.forEach((movies: any) => {
      if (this.favs.includes(movies._id)) {
        this.favorites.push(movies);
      } console.log(this.favorites, 'favorites');
    });
    return this.favorites;
  }

  /**
   * opens the genre modal with information about the specific genre
   * @param name (genre name)
   * @param description (genre description)
   */
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

  /**
   * opens the director modal with informaiton about the specific director
   * @param name (director name)
   * @param bio (director bio)
   * @param birth (director birth year)
   * @param death (director death year)
   */
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

  /**
   * open the synopsis modal with information about the specific movie
   * @param title (movie title)
   * @param imagePath (movie poster)
   * @param description (movie description)
   */
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

  /**
   * adds the movie to the users favorite movies array
   * @param id (movie._id - unique identifier)
   * @param Title (movie title)
   * @returns a status message -succes/error
   */
  postFavoriteMovies(id: string, Title: string): void {
    this.fetchApiData.postFavoriteMovies(id).subscribe((res: any) => {
      this.snackBar.open(`${Title} has been added to favorties`, 'OK', {
        duration: 3000,
      })
      return this.getUsersFavs();
    })
  }

  /**
   * removes a movie from the users favorite movies array
   * @param id (movie._id - unique identifier)
   * @param Title (movie title)
   * @returns a status message - success/error
   */
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
   * Compares the movie id's with getUserFavs to display the favorite movie icon correctly
   * red heart - movie is in favorties list / white heart with outline - movie is not in favorites list
   * @param id 
   * @returns 
   */
  setFavStatus(id: any): any {
    if (this.favs.includes(id)) {
      return true;
    } else {
      return false;
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
