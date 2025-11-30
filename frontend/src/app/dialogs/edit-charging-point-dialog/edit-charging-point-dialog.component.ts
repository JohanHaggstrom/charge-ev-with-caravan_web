import { AfterViewInit, Component, Inject, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as L from 'leaflet';
import { ChargingPoint, ChargingStationService } from '../../services/charging-station.service';

@Component({
  selector: 'app-edit-charging-point-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule
  ],
  templateUrl: './edit-charging-point-dialog.component.html',
  styleUrl: './edit-charging-point-dialog.component.scss'
})
export class EditChargingPointDialogComponent implements AfterViewInit {
  form: FormGroup;
  private chargingStationService = inject(ChargingStationService);
  private snackBar = inject(MatSnackBar);
  private map: L.Map | undefined;
  private marker: L.Marker | undefined;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditChargingPointDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ChargingPoint
  ) {
    this.form = this.fb.group({
      id: [data.id],
      title: [data.title, Validators.required],
      address1: [data.address1, Validators.required],
      address2: [data.address2],
      postalCode: [data.postalCode, Validators.required],
      city: [data.city, Validators.required],
      country: [data.country, Validators.required],
      comments: [data.comments],
      mapCoordinates: [data.mapCoordinates, Validators.required],
      numberOfChargePoints: [data.numberOfChargePoints],
      capacity: [data.capacity, Validators.required]
    });
  }

  ngAfterViewInit(): void {
    this.initMap();
  }

  private initMap(): void {
    const coords = this.parseCoordinates(this.data.mapCoordinates);
    const center: L.LatLngExpression = coords ? coords : [62.0, 15.0]; // Default to center of Sweden if no coords
    const zoom = coords ? 13 : 5;

    this.map = L.map('edit-map').setView(center, zoom);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(this.map);

    // Fix for default marker icons
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
      shadowSize: [41, 41]
    });
    L.Marker.prototype.options.icon = iconDefault;

    if (coords) {
      this.marker = L.marker(coords, { draggable: true }).addTo(this.map);

      // Update form when marker is dragged
      this.marker.on('dragend', () => {
        if (this.marker) {
          const position = this.marker.getLatLng();
          this.updateCoordinates(position.lat, position.lng);
        }
      });
    }

    // Update marker and form on map click
    this.map.on('click', (e: L.LeafletMouseEvent) => {
      const { lat, lng } = e.latlng;

      if (this.marker) {
        this.marker.setLatLng([lat, lng]);
      } else {
        this.marker = L.marker([lat, lng], { draggable: true }).addTo(this.map!);
        this.marker.on('dragend', () => {
            if (this.marker) {
              const position = this.marker.getLatLng();
              this.updateCoordinates(position.lat, position.lng);
            }
        });
      }

      this.updateCoordinates(lat, lng);
    });

    // Invalidate size after a short delay to ensure map renders correctly in dialog
    setTimeout(() => {
        this.map?.invalidateSize();
    }, 100);
  }

  private parseCoordinates(coordString: string): [number, number] | null {
    try {
      const parts = coordString.split(',').map(s => parseFloat(s.trim()));
      if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
        return [parts[0], parts[1]];
      }
    } catch (e) {
      console.error('Failed to parse coordinates:', coordString);
    }
    return null;
  }

  private updateCoordinates(lat: number, lng: number): void {
    const coordString = `${lat}, ${lng}`;
    this.form.patchValue({ mapCoordinates: coordString });
    this.form.markAsDirty();
  }

  onSubmit(): void {
    if (this.form.valid) {
      const updatedPoint: ChargingPoint = this.form.value;
      this.chargingStationService.updateChargingPoint(updatedPoint.id, updatedPoint).subscribe({
        next: () => {
          this.snackBar.open('Laddstation uppdaterad!', 'Stäng', { duration: 3000 });
          this.dialogRef.close(true);
        },
        error: (err) => {
          console.error('Error updating charging point:', err);
          this.snackBar.open('Kunde inte uppdatera laddstation.', 'Stäng', { duration: 3000 });
        }
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
