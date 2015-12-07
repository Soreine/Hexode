// t: total units
// r: current round
// x: remaning units
// return: units played
var f = function (t, r, x) {
    function find(xs, as, t, m) {
        if (m === 0) {
            var sum = xs.reduce(function (s, x) { return s + x }, 0)
            return sum === t ? xs : null
        }
        return as.map(function (a, i) {
            return find(xs.concat(a), as.slice(0, i).concat(as.slice(i+1, as.length)), t, m-1)
        }).filter(function (x) { return x })[0]
    }

    var i = (Math.sqrt(1 + 8 * t) - 1) / 2
    var as = []
    for (var k = 1; k <= i; k += 1) {
        as.push(k)
    }
    return find([], as, x, r)
}
console.log(f (21, 3, 12))
