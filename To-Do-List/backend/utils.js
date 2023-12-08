function toSentenceCase(string) {
    let str = string;
    str = str.split(".");
    str = str.map((element) => {
        if (element) return element.trim();
    });
    str = str.map((element) => {
        if (element) return element[0].toUpperCase() + element.slice(1);
    });
    str = str.join(". ");
    return str.trim();
}

module.exports = { toSentenceCase };
