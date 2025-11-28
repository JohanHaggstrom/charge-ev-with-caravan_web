import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {
    AfterViewInit,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    Output,
    SimpleChanges,
    inject,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import * as L from 'leaflet';
import 'leaflet.markercluster';
import { IdentifiedCaravanChargePoint } from '../app.model';

@Component({
    selector: 'app-map',
    imports: [CommonModule, FormsModule],
    templateUrl: './map.component.html',
    styleUrl: './map.component.scss',
})
export class MapComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {
    @Input() chargePoints: IdentifiedCaravanChargePoint[] = [];
    @Output() chargePointSelected = new EventEmitter<IdentifiedCaravanChargePoint>();

    private map: L.Map | null = null;
    private markerClusterGroup: L.MarkerClusterGroup | null = null;
    private userLocationMarker: L.Marker | null = null;
    private http = inject(HttpClient);

    public searchQuery: string = '';
    public searchResults: any[] = [];
    public isSearching: boolean = false;

    ngOnInit(): void {
        // Fix for default marker icons in Leaflet with webpack
        const iconRetinaUrl = 'assets/marker-icon-2x.png';
        const iconUrl = 'assets/marker-icon.png';
        const shadowUrl = 'assets/marker-shadow.png';
        const iconDefault = L.icon({
            iconRetinaUrl,
            iconUrl,
            shadowUrl,
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            tooltipAnchor: [16, -28],
            shadowSize: [41, 41],
        });
        L.Marker.prototype.options.icon = iconDefault;
    }

    ngAfterViewInit(): void {
        this.initMap();
        this.addMarkers();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['chargePoints'] && !changes['chargePoints'].firstChange) {
            this.addMarkers();
        }
    }

    ngOnDestroy(): void {
        if (this.map) {
            this.map.remove();
        }
    }

    private initMap(): void {
        // Center map on Sweden (approximately)
        this.map = L.map('map', {
            center: [62.0, 15.0],
            zoom: 5,
        });

        // Add OpenStreetMap tiles
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution:
                '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        }).addTo(this.map);

        // Initialize marker cluster group
        this.markerClusterGroup = L.markerClusterGroup({
            chunkedLoading: true,
            spiderfyOnMaxZoom: true,
            showCoverageOnHover: false,
            zoomToBoundsOnClick: true,
        });
        this.map.addLayer(this.markerClusterGroup);
    }

    private addMarkers(): void {
        if (!this.map || !this.markerClusterGroup) return;

        // Clear existing markers
        this.markerClusterGroup.clearLayers();

        // Add marker for each charge point
        this.chargePoints.forEach((point) => {
            const coords = this.parseCoordinates(point.mapCoordinates);
            if (coords && this.markerClusterGroup) {
                const icon = this.getMarkerIcon(point.capacity);
                const marker = L.marker(coords, { icon })
                    .bindPopup(this.createPopupContent(point));

                marker.on('click', () => {
                    this.chargePointSelected.emit(point);
                });

                this.markerClusterGroup.addLayer(marker);
            }
        });

        // Fit map to show all markers if there are any
        if (this.markerClusterGroup.getLayers().length > 0 && this.map) {
            const bounds = this.markerClusterGroup.getBounds();
            this.map.fitBounds(bounds.pad(0.1));
        }
    }

    private getMarkerIcon(capacity: number): L.DivIcon {
        let colorClass: string;

        // Color code based on capacity
        if (capacity > 50) {
            colorClass = 'green'; // High capacity
        } else if (capacity >= 22) {
            colorClass = 'yellow'; // Medium capacity
        } else {
            colorClass = 'red'; // Low capacity
        }

        return L.divIcon({
            className: 'custom-div-icon',
            html: `<div class="pin-marker ${colorClass}"></div>`,
            iconSize: [30, 42],
            iconAnchor: [15, 36],
            popupAnchor: [0, -36],
        });
    }

    private parseCoordinates(coordString: string): [number, number] | null {
        try {
            const parts = coordString.split(',').map((s) => parseFloat(s.trim()));
            if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
                return [parts[0], parts[1]];
            }
        } catch (e) {
            console.error('Failed to parse coordinates:', coordString);
        }
        return null;
    }

    private createPopupContent(point: IdentifiedCaravanChargePoint): string {
        const capacityColor = point.capacity > 50 ? '#10b981' : point.capacity >= 22 ? '#f59e0b' : '#ef4444';

        return `
            <div class="popup-content">
                <h3>${point.title}</h3>
                <p><strong>${point.city}</strong></p>
                <p>${point.address1}</p>
                ${point.address2 ? `<p>${point.address2}</p>` : ''}
                <p>${point.postalCode} ${point.city}</p>
                <div class="popup-info">
                    <p><strong>Laddare:</strong> ${point.numberOfChargePoints || 'Okänt antal'}</p>
                    <p><strong>Kapacitet:</strong> <span style="color: ${capacityColor}; font-weight: bold;">${point.capacity} kW</span></p>
                </div>
                ${point.comments ? `<p class="popup-comments"><em>${point.comments}</em></p>` : ''}
                <a href="https://www.google.com/maps/place/${point.mapCoordinates}"
                   target="_blank"
                   rel="noopener"
                   class="map-link">
                    📍 Öppna i Google Maps
                </a>
            </div>
        `;
    }

    public showUserLocation(): void {
        if (!this.map) return;

        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    const userCoords: [number, number] = [latitude, longitude];

                    // Remove existing user location marker
                    if (this.userLocationMarker) {
                        this.userLocationMarker.remove();
                    }

                    // Create custom icon for user location
                    const userIcon = L.divIcon({
                        className: 'user-location-marker',
                        html: '<div class="user-location-dot"></div>',
                        iconSize: [20, 20],
                        iconAnchor: [10, 10],
                    });

                    // Add marker for user location
                    this.userLocationMarker = L.marker(userCoords, { icon: userIcon })
                        .addTo(this.map!)
                        .bindPopup('Din position')
                        .openPopup();

                    // Center map on user location
                    this.map!.setView(userCoords, 12);
                },
                (error) => {
                    console.error('Error getting user location:', error);
                    alert('Kunde inte hämta din position. Kontrollera att du har gett tillåtelse för platsåtkomst.');
                }
            );
        } else {
            alert('Geolocation stöds inte av din webbläsare.');
        }
    }
    public searchLocation(): void {
        if (!this.searchQuery || this.searchQuery.length < 3) return;

        this.isSearching = true;
        const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(this.searchQuery)}`;

        this.http.get<any[]>(url).subscribe({
            next: (results) => {
                this.isSearching = false;
                if (results && results.length > 0) {
                    const firstResult = results[0];
                    const lat = parseFloat(firstResult.lat);
                    const lon = parseFloat(firstResult.lon);

                    if (this.map) {
                        this.map.setView([lat, lon], 12);
                    }
                    this.searchResults = []; // Clear results after selection (or handle list if we want to show multiple)
                } else {
                    alert('Inga platser hittades.');
                }
            },
            error: (err) => {
                this.isSearching = false;
                console.error('Search error:', err);
                alert('Ett fel uppstod vid sökning.');
            }
        });
    }
}
