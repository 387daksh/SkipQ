export const calculateStreak = (orders: any[]): number => {
    if (!orders || orders.length === 0) return 0;

    // 1. Extract dates (YYYY-MM-DD), unique sorted desc
    const dates = orders
        .map(o => new Date(o.createdAt).toISOString().split('T')[0])
        .filter((value, index, self) => self.indexOf(value) === index)
        .sort((a, b) => new Date(b).getTime() - new Date(a).getTime());

    if (dates.length === 0) return 0;

    // 2. Check Logic
    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
    
    let currentStreak = 0;
    
    // Streak is valid if last order was Today OR Yesterday
    // If last order was before yesterday, streak is broken -> 0 (unless we just started)
    // Actually, "Streak" means consecutive days ending Today or Yesterday.
    
    let pointerDate = new Date();
    // Normalize logic
    const hasOrderToday = dates.includes(today);
    const hasOrderYesterday = dates.includes(yesterday);
    
    if (!hasOrderToday && !hasOrderYesterday) {
        return 0; // Streak broken
    }
    
    // Start counting
    // If today exists, start from today. If not, start from yesterday (streak preserved but not incremented today yet).
    let checkDate = hasOrderToday ? new Date() : new Date(Date.now() - 86400000);
    
    // Loop back
    for (let i = 0; i < dates.length; i++) {
        const dateStr = checkDate.toISOString().split('T')[0];
        if (dates.includes(dateStr)) {
            currentStreak++;
            // Move checkDate back by 1 day
            checkDate.setDate(checkDate.getDate() - 1);
        } else {
            break; 
        }
    }

    return currentStreak;
};
