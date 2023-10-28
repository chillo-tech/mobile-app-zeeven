export const toTitleCase = (str) => {
    let title = str

    title = title.replace(/^\w+/g, function(word) {
        return word[0].toUpperCase() + word.slice(1).toLowerCase();
    });

    return title
}

export const truncateTitle = (str, length = 100) => {
    let title = str

    title = title.toString().length > length
        ? title.toString().slice(0, length) + "[...]"
        : title

    return title
}
