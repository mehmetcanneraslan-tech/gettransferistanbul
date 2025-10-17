export interface BookingData {
  tripType: 'oneWay' | 'round';
  pickup: string;
  dropoff: string;
  date: string;
  time: string;
  returnDate?: string;
  returnTime?: string;
  passengers: number;
  luggage: number;
  flightNo?: string;
  vehicle: 'sedan' | 'minivan' | 'minibus';
  name: string;
  phone: string;
  email?: string;
  notes?: string;
  estimatedPrice: number;
}

export async function submitReservation(data: BookingData): Promise<{ success: boolean; message?: string }> {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('Booking submitted:', data);
      resolve({ success: true });
    }, 1000);
  });
}

export function generateWhatsAppLink(data: BookingData, language: string): string {
  const phoneNumber = '905364291221';

  const messages: Record<string, (data: BookingData) => string> = {
    en: (d) => `Hello! I would like to book an airport transfer:

Trip Type: ${d.tripType === 'oneWay' ? 'One Way' : 'Round Trip'}
From: ${d.pickup}
To: ${d.dropoff}
Date: ${d.date} at ${d.time}
${d.returnDate ? `Return: ${d.returnDate} at ${d.returnTime}` : ''}
Passengers: ${d.passengers}
Luggage: ${d.luggage}
Vehicle: ${d.vehicle}
${d.flightNo ? `Flight: ${d.flightNo}` : ''}

Name: ${d.name}
Phone: ${d.phone}
${d.email ? `Email: ${d.email}` : ''}
${d.notes ? `Notes: ${d.notes}` : ''}

Estimated Price: €${d.estimatedPrice}

Please confirm my booking. Thank you!`,

    tr: (d) => `Merhaba! Havaalanı transferi rezervasyonu yapmak istiyorum:

Transfer Tipi: ${d.tripType === 'oneWay' ? 'Tek Yön' : 'Gidiş-Dönüş'}
Nereden: ${d.pickup}
Nereye: ${d.dropoff}
Tarih: ${d.date} saat ${d.time}
${d.returnDate ? `Dönüş: ${d.returnDate} saat ${d.returnTime}` : ''}
Yolcu: ${d.passengers}
Bagaj: ${d.luggage}
Araç: ${d.vehicle}
${d.flightNo ? `Uçuş: ${d.flightNo}` : ''}

Ad Soyad: ${d.name}
Telefon: ${d.phone}
${d.email ? `E-posta: ${d.email}` : ''}
${d.notes ? `Notlar: ${d.notes}` : ''}

Tahmini Fiyat: €${d.estimatedPrice}

Lütfen rezervasyonumu onaylayın. Teşekkürler!`,

    de: (d) => `Hallo! Ich möchte einen Flughafentransfer buchen:

Fahrttyp: ${d.tripType === 'oneWay' ? 'Einfache Fahrt' : 'Hin- und Rückfahrt'}
Von: ${d.pickup}
Nach: ${d.dropoff}
Datum: ${d.date} um ${d.time}
${d.returnDate ? `Rückfahrt: ${d.returnDate} um ${d.returnTime}` : ''}
Passagiere: ${d.passengers}
Gepäck: ${d.luggage}
Fahrzeug: ${d.vehicle}
${d.flightNo ? `Flug: ${d.flightNo}` : ''}

Name: ${d.name}
Telefon: ${d.phone}
${d.email ? `E-Mail: ${d.email}` : ''}
${d.notes ? `Notizen: ${d.notes}` : ''}

Geschätzter Preis: €${d.estimatedPrice}

Bitte bestätigen Sie meine Buchung. Vielen Dank!`,

    fr: (d) => `Bonjour! Je souhaite réserver un transfert aéroport:

Type: ${d.tripType === 'oneWay' ? 'Aller Simple' : 'Aller-Retour'}
De: ${d.pickup}
À: ${d.dropoff}
Date: ${d.date} à ${d.time}
${d.returnDate ? `Retour: ${d.returnDate} à ${d.returnTime}` : ''}
Passagers: ${d.passengers}
Bagages: ${d.luggage}
Véhicule: ${d.vehicle}
${d.flightNo ? `Vol: ${d.flightNo}` : ''}

Nom: ${d.name}
Téléphone: ${d.phone}
${d.email ? `Email: ${d.email}` : ''}
${d.notes ? `Notes: ${d.notes}` : ''}

Prix Estimé: €${d.estimatedPrice}

Veuillez confirmer ma réservation. Merci!`,

    it: (d) => `Salve! Vorrei prenotare un trasferimento aeroportuale:

Tipo: ${d.tripType === 'oneWay' ? 'Solo Andata' : 'Andata e Ritorno'}
Da: ${d.pickup}
A: ${d.dropoff}
Data: ${d.date} alle ${d.time}
${d.returnDate ? `Ritorno: ${d.returnDate} alle ${d.returnTime}` : ''}
Passeggeri: ${d.passengers}
Bagagli: ${d.luggage}
Veicolo: ${d.vehicle}
${d.flightNo ? `Volo: ${d.flightNo}` : ''}

Nome: ${d.name}
Telefono: ${d.phone}
${d.email ? `Email: ${d.email}` : ''}
${d.notes ? `Note: ${d.notes}` : ''}

Prezzo Stimato: €${d.estimatedPrice}

Per favore confermate la mia prenotazione. Grazie!`
  };

  const getMessage = messages[language] || messages.en;
  const text = encodeURIComponent(getMessage(data));

  return `https://wa.me/${phoneNumber}?text=${text}`;
}
