import { HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface AppError {
    message: string;
    details?: string;
    timestamp: Date;
    type: 'network' | 'server' | 'client' | 'unknown';
}

@Injectable({
    providedIn: 'root'
})
export class ErrorService {
    private snackBar = inject(MatSnackBar);
    private errors: AppError[] = [];

    handleError(error: any, context?: string): void {
        const appError = this.parseError(error, context);
        this.errors.push(appError);

        // Keep only last 50 errors
        if (this.errors.length > 50) {
            this.errors.shift();
        }

        this.showErrorMessage(appError);
        this.logError(appError);
    }

    private parseError(error: any, context?: string): AppError {
        const timestamp = new Date();

        if (error instanceof HttpErrorResponse) {
            // HTTP errors
            if (error.status === 0) {
                return {
                    message: 'Kan inte ansluta till servern',
                    details: 'Kontrollera din internetanslutning eller att backend-servern körs.',
                    timestamp,
                    type: 'network'
                };
            }

            if (error.status >= 500) {
                return {
                    message: 'Serverfel',
                    details: error.error?.message || 'Ett oväntat fel uppstod på servern.',
                    timestamp,
                    type: 'server'
                };
            }

            if (error.status >= 400) {
                return {
                    message: 'Felaktig förfrågan',
                    details: error.error?.message || error.message,
                    timestamp,
                    type: 'client'
                };
            }
        }

        // Generic errors
        return {
            message: context || 'Ett oväntat fel uppstod',
            details: error?.message || error?.toString() || 'Okänt fel',
            timestamp,
            type: 'unknown'
        };
    }

    private showErrorMessage(error: AppError): void {
        const message = error.details
            ? `${error.message}: ${error.details}`
            : error.message;

        this.snackBar.open(message, 'Stäng', {
            duration: error.type === 'network' ? 10000 : 5000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: ['error-snackbar']
        });
    }

    private logError(error: AppError): void {
        console.error(`[${error.type.toUpperCase()}] ${error.message}`, {
            details: error.details,
            timestamp: error.timestamp
        });
    }

    getRecentErrors(): AppError[] {
        return [...this.errors];
    }

    clearErrors(): void {
        this.errors = [];
    }
}
