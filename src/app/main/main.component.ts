import { Component, OnInit } from '@angular/core';
import { faHome, faUser, faSignOut } from '@fortawesome/free-solid-svg-icons';
import { MovieService } from '../services/movie.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  showUserMenu: boolean;
  faHome = faHome;
  faUser = faUser;
  faSignOut = faSignOut;

  userData: any = { name: 'Guest', email: 'guest@gmail' }; // Default values for user data
  constructor(  private movieService: MovieService, private router: Router) {
  
    this.showUserMenu = false;
   
  }

  ngOnInit() {
    // this.movieService.userProfile$.subscribe(
    //   (profile) => {
    //     if (profile) {
    //       this.userData = profile;
    //     }
    //   }
    // );
    // this.getprofileData(); // Fetch user profile data when the component initializes
  
    this.movieService.userProfile$.subscribe((data) => {
      if (data) {
        this.userData = data; // Update immediately when BehaviorSubject updates
        console.log("User data updated in MainComponent:", this.userData);
      }
    });
  
    
  }

  toggleUserMenu() {
    this.showUserMenu = !this.showUserMenu;
  }
  getprofileData(): void {
    this.movieService.getUserProfile().subscribe(
      (response: any) => {
        this.userData = response; 
        console.log(this.userData,"userdata")
      },
      (error) => {
        this.userData = { name: 'Guest', email: '' }; // Fallback in case of error
        this.handleInvalidSession();
        console.error('Error fetching user profile:', error); // Handle the error
        alert('Failed to load profile. Please try again later.'); // Show error message
      }
    );
  }
  private handleInvalidSession(): void {
    sessionStorage.clear(); // Clear the session storage
    alert('Your session has expired. You will be redirected to the login page.'); // Optional user notification
    this.router.navigate(['/auth']); // Automatically redirect to the login page
  }

}
