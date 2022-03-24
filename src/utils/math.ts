export function toPercent(num: number): number {
    if (num <= 0) throw Error('Cannot have a percentage lower than 1');
    return num / 100;
}

export function percent(percent_num: number, num: number): number {
    return num * toPercent(percent_num);
}
