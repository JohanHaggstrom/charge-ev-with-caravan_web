import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';

export interface LoginRequest {
    username: string;
    password: string;
}

export interface LoginResponse {
    token: string;
    username: string;
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private http = inject(HttpClient);
    private apiUrl = `${environment.apiUrl}/api/auth`;

    // Signal to track authentication state
    isAuthenticated = signal(false);
    currentUser = signal<string | null>(null);

    constructor() {
        // Check if user is already logged in
        const token = this.getToken();
        if (token) {
            this.isAuthenticated.set(true);
            this.currentUser.set(localStorage.getItem('username'));
        }
    }

    login(credentials: LoginRequest): Observable<LoginResponse> {
        return this.http.post<LoginResponse>(`${this.apiUrl}/login`, credentials).pipe(
            tap(response => {
                localStorage.setItem('token', response.token);
                localStorage.setItem('username', response.username);
                this.isAuthenticated.set(true);
                this.currentUser.set(response.username);
            })
        );
    }

    logout(): void {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        this.isAuthenticated.set(false);
        this.currentUser.set(null);
    }

    getToken(): string | null {
        return localStorage.getItem('token');
    }
}
