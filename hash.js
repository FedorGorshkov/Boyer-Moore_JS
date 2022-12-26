function find_matches(substring) {
    for (j = 0; j < pattern.length; j++)
        if (pattern[j] != substring[j])
            return false;
    return true;
}

fs = require('fs'); arg = process.argv;
input = fs.readFileSync(arg[2]).toString();
pattern = fs.readFileSync(arg[3]).toString();
match_indexes = new Array();
pattern_hash = 0; substr_hash = 0;
for(i = 0; i < pattern.length; i++) {
    pattern_hash += pattern.charCodeAt(i);
    substr_hash += input.charCodeAt(i);
}
console.time('Time');
for (i = 0; i < input.length - pattern.length; i++) {
    if (pattern_hash == substr_hash) {
        if (find_matches(input.substring(i, i + pattern.length)))
            match_indexes.push(i + 1);
    }
    substr_hash -= input.charCodeAt(i);
    substr_hash += input.charCodeAt(i + pattern.length);
}
console.timeEnd('Time');
console.log('Number of matches:', match_indexes.length);