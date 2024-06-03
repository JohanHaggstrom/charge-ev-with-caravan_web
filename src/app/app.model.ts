export interface CaravanChargePoint {
    title: string;
    address1: string;
    address2?: string;
    postalCode: string;
    city: string;
    country: string;
    comments?: string;
    mapCoordinates: string;
    numberOfChargePoints: number;
    capacity: string;
}

export interface IdentifiedCaravanChargePoint extends CaravanChargePoint {
    id: number;
}
