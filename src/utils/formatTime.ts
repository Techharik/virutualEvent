export function formatTime(time: string): string {
    const [hourStr, minute] = time.split(":");
    let hour = parseInt(hourStr, 10);

    const suffix = hour >= 12 ? "PM" : "AM";
    hour = hour % 12 || 12; // convert 0 or 12

    return `${hour}:${minute} ${suffix}`;
}
