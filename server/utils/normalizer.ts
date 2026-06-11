const locationMap: Record<string, string> = {
  'comunidad de madrid': 'Madrid',
  'madrid': 'Madrid',
  'barcelona': 'Barcelona',
  'cataluña': 'Barcelona',
  'valencia': 'Valencia',
  'comunidad valenciana': 'Valencia',
  'sevilla': 'Sevilla',
  'andalucía': 'Sevilla',
  'bilbao': 'Bilbao',
  'país vasco': 'Bilbao',
  'málaga': 'Málaga',
  'zaragoza': 'Zaragoza',
  'alicante': 'Alicante',
  'murcia': 'Murcia',
  'granada': 'Granada',
  'remoto': 'Remoto',
  'teletrabajo': 'Remoto',
};

export function normalizeLocation(raw: string): string {
  const lower = raw.toLowerCase().trim();
  for (const [key, value] of Object.entries(locationMap)) {
    if (lower.includes(key)) return value;
  }
  return raw.trim();
}

export function parseSalary(text: string): { min: number | null; max: number | null } {
  // Patrones: "25.000€ - 35.000€", "25000-35000", "25K-35K"
  const patterns = [
    /(\d{1,3}(?:\.\d{3})*)\s*€?\s*[-–a]\s*(\d{1,3}(?:\.\d{3})*)\s*€?/,
    /(\d{2,3})[kK]\s*[-–a]\s*(\d{2,3})[kK]/,
    /(\d{4,6})\s*[-–a]\s*(\d{4,6})/,
  ];

  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match) {
      let min = parseInt(match[1].replace(/\./g, ''), 10);
      let max = parseInt(match[2].replace(/\./g, ''), 10);
      // Si son valores en K (ej: 25K)
      if (min < 1000) min *= 1000;
      if (max < 1000) max *= 1000;
      return { min, max };
    }
  }

  return { min: null, max: null };
}

export function normalizeCompany(name: string): string {
  return name.trim().replace(/\s+/g, ' ');
}
