function find_matches(substr) {
    for (j = 0; j < pattern.length; j++)
        if (pattern[j] != substr[j])
            return false;
    return true;
}

fs = require('fs'); args = process.argv;
input = fs.readFileSync(args[2]).toString();
pattern = fs.readFileSync(args[3]).toString();
match_indexes = new Array(); console.time('Time');
for (i = 0; i <= input.length - pattern.length; i++)
    if (find_matches(input.substr(i, i + pattern.length)))
        match_indexes.push(i+1);
console.timeEnd('Time');
console.log('Number of matches:', match_indexes.length);
