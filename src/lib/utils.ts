export function cn(...inputs: (string | undefined | null | boolean)[]): string {
  return inputs.filter(Boolean).join(' ');
}

export function getPriceClass(isFree: boolean, hasPaidPlan: boolean): string {
  if (isFree && !hasPaidPlan) return 'bg-green-100 text-green-700';
  if (isFree && hasPaidPlan) return 'bg-blue-100 text-blue-700';
  return 'bg-orange-100 text-orange-700';
}
