function get_badchar_table(pattern){
    let badchar_table;
    if (language == "Russian")
        badchar_table = new Array(1104).fill(pattern.length);
    if(language == "English")
        badchar_table =  new Array(257).fill(pattern.length);
    for(i = 0; i < pattern.length - 1; i++)
        badchar_table[pattern.charCodeAt(i)] = pattern.length - i - 1;
    return badchar_table;
}

function get_suff_len(pattern, index) {
    suff_len = 0;
    for (i = index, j = pattern.length - 1; i >= 0 && pattern[i] === pattern[j]; i--, j--) suff_len++;
    return suff_len;
}

function get_good_suff_table(pattern) {
    good_suff_table = new Array(pattern.length).fill(0);
    pref_index = pattern.length; index = 0;
    for(i = pattern.length; i > 0; i--) {
        index = i;
        for(i = index, j = 0; i < pattern.length; i++, j++)
            if (pattern[i] == pattern[j])
                pref_index = i;
        good_suff_table[pattern.length - i] = pref_index + pattern.length - 1;
    }
    for(i = 0; i < pattern.length - 1; i++) {
        suff_len = get_suff_len(pattern, i);
        good_suff_table[suff_len] = pattern.length - i + suff_len - 1;
        good_suff_table[suff_len] = good_suff_table[suff_len] > pattern.length ? pattern.length : good_suff_table[suff_len];
    }
    return good_suff_table;
}


ps = require('prompt-sync'); prompt = ps();
input = prompt("Enter the string: ");
pattern = prompt("Enter the substring to search: ");
language = prompt("Enter the language (English/Russian): ");
result = new Array(); delta = 0;
i = pattern.length - 1;
badchar_table = get_badchar_table(pattern);
good_suff_table = get_good_suff_table(pattern);
for (i = 0; i < input.length; i++) {
    j = pattern.length - 1;
    while (pattern[j] === input[i]) {
        if (j === 0) {
            result.push(i);
            i += 1;
        }
        i--; j--;
    }
    delta = (j == -1) ? pattern.length : Math.max(good_suff_table[pattern.length - 1 - j], badchar_table[input.charCodeAt(i)]);;
}
console.log(result);