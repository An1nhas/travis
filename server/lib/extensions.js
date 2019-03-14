Array.prototype.matchInArray = function (string) {

    const len = this.length;


    let i = 0;

    for (; i < len; i++) {
        if (string.match(this[i])) {
            return true;
        }
    }

    return false;
};
