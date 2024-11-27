function formatDate(dateString) {
    const now = new Date();
    const postDate = new Date(dateString);
    const differenceInSeconds = Math.floor((now - postDate) / 1000);

    if (differenceInSeconds < 60) {
        return `${differenceInSeconds} seconds ago`;
    }

    const differenceInMinutes = Math.floor(differenceInSeconds / 60);
    if (differenceInMinutes < 60) {
        return `${differenceInMinutes} minutes ago`;
    }

    const differenceInHours = Math.floor(differenceInMinutes / 60);
    if (differenceInHours < 24) {
        return `${differenceInHours} hours ago`;
    }

    const differenceInDays = Math.floor(differenceInHours / 24);
    if (differenceInDays === 1) {
        return `yesterday`;
    }
    if (differenceInDays < 7) {
        return `${differenceInDays} days ago`;
    }

    const differenceInWeeks = Math.floor(differenceInDays / 7);
    if (differenceInWeeks < 4) {
        return `${differenceInWeeks} ${differenceInWeeks == 1 ? 'week' : 'weeks'} ago`;
    }

    // For dates older than a month, return formatted as "MMM D, YYYY"
    return postDate.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: now.getFullYear() === postDate.getFullYear() ? undefined : 'numeric',
    });
}

export default formatDate