export function formatDateTime(dateTime) {
    const d = new Date(dateTime);
    return d.toLocaleString('sk-SK', { weekday: 'long', month: 'long', day: 'numeric'})
}

export function durationInHours(duration) {
    return (duration / 1000 / 60 / 60).toFixed(2);
}

export function getTicketIdFromDescription(description) {
    const regex = /(?:https:\/\/tracker\.ait-themes\.com\/issues\/(\d+))|(?:#(\d+))/g;
    const matches = regex.exec(description);

    if (!matches) {
        return null;
    }
    if(matches[1]) {
        return matches[1];
    }
    if(matches[2]) {
        return matches[2];
    }
}