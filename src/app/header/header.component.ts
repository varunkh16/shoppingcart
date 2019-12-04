import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  isLogin = false;
  private loginSub: Subscription;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.isLogin = this.authService.getIsAuth();
    this.loginSub = this.authService.getAuthStatusListener().subscribe(isLogin=>{
      this.isLogin = isLogin;
    })
  }

  logOut() {
    this.isLogin = false;
    this.router.navigate(["/login"]);
    this.authService.setIsAuth(this.isLogin);
  }

  ngOnDestroy() {
    this.loginSub.unsubscribe();
  }

}
