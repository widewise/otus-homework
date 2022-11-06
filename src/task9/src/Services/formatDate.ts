const padTo2Digits = (num: number) => {
    return num.toString().padStart(2, '0');
}

export function formatDate(date: Date): string {
    const aDate = new Date(date);
    if(!aDate) {
        return "";
    }

    return `${padTo2Digits(aDate.getDate())}:${padTo2Digits(aDate.getMonth() + 1)}:${aDate.getFullYear()}`;
}