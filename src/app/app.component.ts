import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterOutlet } from '@angular/router';
import { databaseItems } from '../db/app.db';
import { CaravanChargePoint, IdentifiedCaravanChargePoint } from './app.model';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, MatIconModule, MatButtonModule, MatTooltipModule],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
})
export class AppComponent {
    protected title =
        'Charge points suitable for electric vehicles towing a caravan';

    private chargePoints: CaravanChargePoint[] = databaseItems;

    protected identifiedChargePoints: IdentifiedCaravanChargePoint[] =
        this.chargePoints.map((item, index) => ({ ...item, id: index }));
}
