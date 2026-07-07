import { isValidStellarAddress } from '@/lib/stellar';

/**
 * Validate Stellar address
 */
export function validateAddress(address: string): boolean {
  if (!address || typeof address !== 'string') {
    return false;
  }
  return isValidStellarAddress(address);
}

/**
 * Validate amount
 */
export function validateAmount(amount: string | number): boolean {
  try {
    const num = typeof amount === 'string' ? parseFloat(amount) : amount;
    return !isNaN(num) && num > 0 && isFinite(num);
  } catch {
    return false;
  }
}

/**
 * Validate email
 */
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate memo
 */
export function validateMemo(memo: string): boolean {
  if (!memo) return true; // Memo is optional
  return memo.length <= 28 && /^[a-zA-Z0-9\s]*$/.test(memo);
}

/**
 * Validate URL
 */
export function validateUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Sanitize input to prevent XSS
 */
export function sanitizeInput(input: string): string {
  const div = document.createElement('div');
  div.textContent = input;
  return div.innerHTML;
}

/**
 * Validate form data
 */
export function validateFormData(data: Record<string, any>, schema: Record<string, any>): { valid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};

  for (const [field, rule] of Object.entries(schema)) {
    const value = data[field];

    if (rule.required && !value) {
      errors[field] = `${field} is required`;
    }

    if (rule.minLength && value?.length < rule.minLength) {
      errors[field] = `${field} must be at least ${rule.minLength} characters`;
    }

    if (rule.maxLength && value?.length > rule.maxLength) {
      errors[field] = `${field} must be at most ${rule.maxLength} characters`;
    }

    if (rule.pattern && !rule.pattern.test(value)) {
      errors[field] = `${field} format is invalid`;
    }
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}
