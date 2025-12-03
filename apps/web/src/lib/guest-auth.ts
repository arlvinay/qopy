import { v4 as uuidv4 } from 'uuid';

const GUEST_KEY = 'qopy_guest_id';

export function getGuestId(): string {
    if (typeof window === 'undefined') return '';

    let guestId = localStorage.getItem(GUEST_KEY);
    if (!guestId) {
        guestId = uuidv4();
        localStorage.setItem(GUEST_KEY, guestId);
    }
    return guestId;
}

export function clearGuestSession() {
    if (typeof window !== 'undefined') {
        localStorage.removeItem(GUEST_KEY);
    }
}
