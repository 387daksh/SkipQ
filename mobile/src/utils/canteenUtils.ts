
export const isCanteenOpen = (canteen: any) => {
    // 0. Server-Side Priority
    if (canteen.isOpen !== undefined) {
        return canteen.isOpen;
    }

    // 1. Manual Mode Override
    if (!canteen.autoMode) {
        return canteen.manualIsOpen;
    }

    // 2. Auto Mode (Time Check)
    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes();

    let openTime = 0;
    let closeTime = 0;

    // Parse times (assuming "HH:mm" string or Date object)
    // Prisma Date/DateTime is normally ISO string. If String "09:00", we parse.
    // If it's a full Date object, we extract hours/minutes.
    
    // Helper to get minutes from midnight
    const getMinutes = (timeVal: string | Date | null) => {
        if (!timeVal) return 0;
        if (typeof timeVal === 'string') {
            // Check if ISO date
            if (timeVal.includes('T')) {
                const d = new Date(timeVal);
                return d.getUTCHours() * 60 + d.getUTCMinutes(); 
                // Careful with Timezones. Usually backend sends UTC.
                // For simplicity, if the string is just "HH:mm", parse it.
            }
            // "HH:mm" format
            const [h, m] = timeVal.split(':').map(Number);
            return h * 60 + m;
        }
        // If Date object
        if (timeVal instanceof Date) {
            return timeVal.getHours() * 60 + timeVal.getMinutes();
        }
        return 0;
    };

    openTime = getMinutes(canteen.openingTime);
    closeTime = getMinutes(canteen.closingTime);

    // Handle overnight (e.g. 11 PM to 2 AM)
    if (closeTime < openTime) {
        return currentTime >= openTime || currentTime < closeTime;
    }

    return currentTime >= openTime && currentTime < closeTime;
};
