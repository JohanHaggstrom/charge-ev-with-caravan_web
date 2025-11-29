import { Component, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterOutlet } from '@angular/router';
import { IdentifiedCaravanChargePoint } from './app.model';
import { MapComponent } from './map/map.component';
import { ChargingStationService } from './services/charging-station.service';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, MatIconModule, MatButtonModule, MatTooltipModule, MapComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
    protected title = 'Laddstationer';
    protected identifiedChargePoints: IdentifiedCaravanChargePoint[] = [];

    private chargingStationService = inject(ChargingStationService);

    ngOnInit(): void {
        this.loadChargingPoints();
    }

    private loadChargingPoints(): void {
        this.chargingStationService.getChargingPoints().subscribe({
            next: (points) => {
                this.identifiedChargePoints = points.map((point) => ({
                    id: point.id,
                    title: point.title,
                    address1: point.address1,
                    address2: point.address2 || '',
                    postalCode: point.postalCode,
                    city: point.city,
                    country: point.country,
                    comments: point.comments || '',
                    mapCoordinates: point.mapCoordinates,
                    numberOfChargePoints: point.numberOfChargePoints,
                    capacity: point.capacity
                }));
            },
            error: (error) => {
                console.error('Error loading charging points:', error);
            }
        });
    }
}

