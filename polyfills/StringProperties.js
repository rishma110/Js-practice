//polyfill for string
String.prototype.startsWith = function(start){
    return (this.substr(0, start.length) === start)
}

String.prototype.myEndsWith = function(end){
    let startIndex = this.length - end.length;
    return (this.substr(startIndex, end.length) === end)
}