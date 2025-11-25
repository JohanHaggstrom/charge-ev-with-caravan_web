import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterOutlet } from '@angular/router';
import { databaseItems } from '../db/app.db';
import { CaravanChargePoint, IdentifiedCaravanChargePoint } from './app.model';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, MatIconModule, MatButtonModule, MatTooltipModule],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
    protected title = 'Laddstationer';

    private chargePoints: CaravanChargePoint[] = databaseItems;

    protected identifiedChargePoints: IdentifiedCaravanChargePoint[] =
        this.chargePoints.map((item, index) => ({ ...item, id: index }));
}
