export function toPercent(num: number): number {
    return num / 100;
}

export function percent(percent_num: number, num: number): number {
    return num * toPercent(percent_num);
}
