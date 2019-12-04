import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { User } from './user.model';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({providedIn: "root"})
export class AuthService {

    private isAuthenticated = false;
    private authStatusListener = new Subject<boolean>();

    constructor(private http: HttpClient, public router: Router) {}

    getIsAuth() {
        return this.isAuthenticated;
    }

    setIsAuth(authValue) {
        this.isAuthenticated = authValue;
    }

    addUser(email: string, password: string) {
        const user: User = {id:null, email:email, password:password};

        this.http.post<{ message: string; user: User }>(
            "http://localhost:3000/api/users/signup",
            user
        ).subscribe(userdata=>{
            this.router.navigate(["/login"]);;
        });
    }

    checkUser(email: string, password: string) {
        const user: User = {id:null, email:email, password:password};

        this.http.post<{ message: string; user: User }>(
            "http://localhost:3000/api/users/login",
            user
        ).subscribe(userdata=>{
            if(userdata.message == "Auth Successful!!") {
                this.isAuthenticated = true;
                this.authStatusListener.next(true);
                this.router.navigate(["/"]);
            }
        });
    }

    getAuthStatusListener() {
        return this.authStatusListener.asObservable();
    }

}