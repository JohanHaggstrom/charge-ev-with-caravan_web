import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
    selector: 'app-login',
    imports: [
        FormsModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule
    ],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss'
})
export class LoginComponent {
    private authService = inject(AuthService);
    private router = inject(Router);
    private snackBar = inject(MatSnackBar);

    username = '';
    password = '';
    isLoading = false;

    async onSubmit(): Promise<void> {
        if (!this.username || !this.password) {
            this.snackBar.open('Vänligen fyll i både användarnamn och lösenord', 'Stäng', {
                duration: 3000
            });
            return;
        }

        this.isLoading = true;
        try {
            await firstValueFrom(this.authService.login({ username: this.username, password: this.password }));
            this.snackBar.open('Inloggning lyckades!', 'Stäng', {
                duration: 2000
            });
            this.router.navigate(['/']);
        } catch (error) {
            console.error('Login error:', error);
            this.snackBar.open('Felaktigt användarnamn eller lösenord', 'Stäng', {
                duration: 3000
            });
            this.isLoading = false;
        }
    }

    onCancel(): void {
        this.router.navigate(['/']);
    }
}
