interface PricingParams {
  pickup: string;
  dropoff: string;
  vehicle: 'sedan' | 'minivan' | 'minibus';
  date: string;
  time: string;
  isRoundTrip: boolean;
}

const VEHICLE_BASE_RATES = {
  sedan: 50,
  minivan: 80,
  minibus: 120
};

const DISTANCE_MULTIPLIER = 0.5;

const PEAK_HOUR_MULTIPLIER = 1.2;

function estimateDistance(pickup: string, dropoff: string): number {
  const commonRoutes: Record<string, number> = {
    'istanbul airport-taksim': 40,
    'istanbul airport-sultanahmet': 45,
    'istanbul airport-besiktas': 35,
    'sabiha airport-kadikoy': 30,
    'sabiha airport-taksim': 50,
    'antalya airport-lara': 15,
    'antalya airport-kemer': 45,
    'izmir airport-alsancak': 20
  };

  const key = `${pickup.toLowerCase()}-${dropoff.toLowerCase()}`;
  const reverseKey = `${dropoff.toLowerCase()}-${pickup.toLowerCase()}`;

  if (commonRoutes[key]) return commonRoutes[key];
  if (commonRoutes[reverseKey]) return commonRoutes[reverseKey];

  const pickupLength = pickup.length;
  const dropoffLength = dropoff.length;
  return Math.max(20, Math.min(100, (pickupLength + dropoffLength) * 2));
}

function isPeakHour(time: string): boolean {
  const hour = parseInt(time.split(':')[0]);
  return (hour >= 6 && hour <= 9) || (hour >= 17 && hour <= 20);
}

export function getEstimate(params: PricingParams): number {
  const baseRate = VEHICLE_BASE_RATES[params.vehicle];
  const distance = estimateDistance(params.pickup, params.dropoff);
  const distanceCost = distance * DISTANCE_MULTIPLIER;

  let total = baseRate + distanceCost;

  if (isPeakHour(params.time)) {
    total *= PEAK_HOUR_MULTIPLIER;
  }

  if (params.isRoundTrip) {
    total *= 1.8;
  }

  return Math.round(total);
}

export function formatPrice(amount: number, currency: string = '€'): string {
  return `${currency}${amount}`;
}
