import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterOutlet } from '@angular/router';
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

    private chargePoints: CaravanChargePoint[] = [
        {
            title: 'Vattenfall InCharge, M2 Center',
            address1: 'Vattenfall - M2 Center',
            address2: '',
            postalCode: '553 03',
            city: 'Jönköping',
            country: 'Sweden',
            comments: 'An unknown places are dedicated for large vehicles',
            mapCoordinates: '57.7617016947237, 14.19194294601759',
            numberOfChargePoints: 12,
            capacity: '150',
        },
        {
            title: 'IONITY, Mellerud',
            address1: 'Snickargatan',
            address2: '',
            postalCode: '464 30',
            city: 'Mellerud',
            country: 'Sweden',
            comments: 'No dedicated spots, but works in many cases.',
            mapCoordinates: '58.7058060636534, 12.454113738931984',
            numberOfChargePoints: 6,
            capacity: '350',
        },
        {
            title: 'Circle K Truck',
            address1: 'Nyponvägen 3',
            address2: '',
            postalCode: '341 32',
            city: 'Ljungby',
            country: 'Sweden',
            comments: 'Seem to be large charge points, but not confirmed.',
            mapCoordinates: '56.81218919027184, 13.909877973820073',
            numberOfChargePoints: NaN,
            capacity: '300',
        },
        {
            title: 'OKQ8',
            address1: 'Norra vägen 1',
            address2: '',
            postalCode: '546 34',
            city: 'Karlsborg',
            country: 'Sweden',
            comments: 'Unknown number of charging points and placement.',
            mapCoordinates: '58.544494784622344, 14.502399970551915',
            numberOfChargePoints: NaN,
            capacity: '150',
        },
        {
            title: 'Allego charging station',
            address1: 'Ulvarydsvägen 2',
            address2: '',
            postalCode: '285 35',
            city: 'Markaryd',
            country: 'Sweden',
            comments: '',
            mapCoordinates: '56.44481279040068, 13.60326467913148',
            numberOfChargePoints: 8,
            capacity: '300',
        },
        {
            title: 'Rifil E.ON',
            address1: 'Verkstadsgatan 3B',
            address2: '',
            postalCode: '284 34',
            city: 'Perstorp',
            country: 'Sweden',
            comments: 'Toilett and coffe machine.',
            mapCoordinates: '56.13384948475831, 13.388062564117424',
            numberOfChargePoints: 8,
            capacity: '240',
        },
        {
            title: 'Quickcharge',
            address1: 'Stridslyckegatan 4',
            address2: '',
            postalCode: '595 35',
            city: 'Mjölby',
            country: 'Sweden',
            comments: '',
            mapCoordinates: '58.322298745345044, 15.092630394912435',
            numberOfChargePoints: 6,
            capacity: '300',
        },
    ];

    protected identifiedChargePoints: IdentifiedCaravanChargePoint[] =
        this.chargePoints.map((item, index) => ({ ...item, id: index }));
}
