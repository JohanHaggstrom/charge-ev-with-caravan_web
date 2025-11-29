import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterOutlet } from '@angular/router';
import { IdentifiedCaravanChargePoint } from './app.model';
import { MapComponent } from './map/map.component';
import { ChargingStationService } from './services/charging-station.service';

@Component({
    selector: 'app-root',
    imports: [
        RouterOutlet,
        MatIconModule,
        MatButtonModule,
        MatTooltipModule,
        MapComponent,
        MatButtonToggleModule,
        MatInputModule,
        MatFormFieldModule,
        FormsModule
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
    protected title = 'Elbil. Husvagn. Ladda.';
    protected viewMode: 'map' | 'list' = 'map';
    protected searchText = '';
    protected identifiedChargePoints: IdentifiedCaravanChargePoint[] = [];

    protected get filteredChargePoints(): IdentifiedCaravanChargePoint[] {
        if (!this.searchText) {
            return this.identifiedChargePoints;
        }
        const lowerSearch = this.searchText.toLowerCase();
        return this.identifiedChargePoints.filter(point =>
            point.title.toLowerCase().includes(lowerSearch) ||
            point.city.toLowerCase().includes(lowerSearch) ||
            (point.address1 && point.address1.toLowerCase().includes(lowerSearch))
        );
    }

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

