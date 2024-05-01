// Function to organize classes hierarchically
export const organizeClasses = (classes:any) => {
    const organizedClasses:any = {};

    classes.forEach((cls:any) => {
        let hierarchy;
        if (cls.type === "Primary") {
            hierarchy = `Primary_Level_${cls.level}`;
        } else {
            hierarchy = `${cls.type}_Level_${cls.level}`;
        }

        if (!organizedClasses[hierarchy]) {
            organizedClasses[hierarchy] = [];
        }
        organizedClasses[hierarchy].push(cls);
    });

    return organizedClasses;
};