export const getLevelTitle = (level: number = 1): string => {
    if (level >= 50) return 'LEGENDARY EATER';
    if (level >= 30) return 'CAMPUS GOURMET';
    if (level >= 20) return 'MASTER CHEF';
    if (level >= 10) return 'SNACK SENSEI';
    if (level >= 5) return 'FOODIE';
    if (level >= 2) return 'HUNGRY EXPLORER';
    return 'ROOKIE';
};

export const getNextLevelXp = (level: number): number => {
    return level * 500;
};
