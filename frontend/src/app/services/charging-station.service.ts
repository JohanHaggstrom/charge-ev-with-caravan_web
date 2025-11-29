import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface ChargingPoint {
    id: number;
    title: string;
    address1: string;
    address2?: string;
    postalCode: string;
    city: string;
    country: string;
    comments?: string;
    mapCoordinates: string;
    numberOfChargePoints?: number;
    capacity: number;
}

@Injectable({
    providedIn: 'root'
})
export class ChargingStationService {
    private http = inject(HttpClient);
    private apiUrl = `${environment.apiUrl}/api/chargingpoints`;

    private getHeaders() {
        return {
            headers: {
                'X-API-Key': environment.apiKey
            }
        };
    }

    getChargingPoints(): Observable<ChargingPoint[]> {
        return this.http.get<ChargingPoint[]>(this.apiUrl, this.getHeaders());
    }

    getChargingPoint(id: number): Observable<ChargingPoint> {
        return this.http.get<ChargingPoint>(`${this.apiUrl}/${id}`, this.getHeaders());
    }
}
