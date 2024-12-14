import { Component, OnInit } from '@angular/core';
import { faHome, faUser, faSignOut } from '@fortawesome/free-solid-svg-icons';

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

  constructor() {
    this.showUserMenu = false;
  }

  ngOnInit() {
  }

  toggleUserMenu() {
    this.showUserMenu = !this.showUserMenu;
  }

}
