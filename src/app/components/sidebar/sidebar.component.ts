import { Component, OnInit } from '@angular/core';
import {
  faBars, faTimes, faHome, faSignIn, faUserPlus,
  faLock, faLockOpen, faUserCheck, faUser,
  faDashboard, faSignOut
} from '@fortawesome/free-solid-svg-icons';
import { MovieService } from '../../services/movie.service'; // Import MovieService
import { Router } from '@angular/router'; // Import Router for navigation

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  showUserMenu: boolean;
  collapseShow = "hidden";
  faBars = faBars;
  faTimes = faTimes;
  faHome = faHome;
  faSignIn = faSignIn;
  faUserPlus = faUserPlus;
  faLock = faLock;
  faLockOpen = faLockOpen;
  faUserCheck = faUserCheck;
  faUser = faUser;
  faDashboard = faDashboard;
  faSignOut = faSignOut;

  userData: any = {}

  constructor(
    private movieService: MovieService, // Inject MovieService
    private _router: Router // Inject Router
  ) {
    this.showUserMenu = false;
  }

  ngOnInit() {
    this.movieService.userProfile$.subscribe(
      (profile) => {
        if (profile) {
          this.userData = profile;  // Automatically update user data from the service
        }
      }
    );
  }

  toggleCollapseShow(classes: any) {
    this.collapseShow = classes;
  }

  toggleUserMenu() {
    this.showUserMenu = !this.showUserMenu;
  }

  // Fetch profile and navigate to the profile page
  navigateToProfile(): void {
    this.movieService.getUserProfile().subscribe(
      (response: any) => {
        this.userData = response; 
        console.log(this.userData,"userdata")
        console.log('User profile fetched successfully:', response); // Log the response (optional)
        this._router.navigateByUrl('/profile'); // Navigate to the profile page
      },
      (error) => {
        this.userData = { name: 'Guest', email: '' }; // Fallback in case of error
        console.error('Error fetching user profile:', error); // Handle the error
        alert('Failed to load profile. Please try again later.'); // Show error message
      }
    );
  }
}
