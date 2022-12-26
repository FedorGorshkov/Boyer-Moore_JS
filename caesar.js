fs = require('fs'); arg = process.argv;
input = fs.readFileSync(arg[3]).toString(); mode = arg[2]; shift = Number(arg[4]);

function encode(input, shift) {
    encoded_str = "";
    for (i = 0; i < input.length; i++) {
        if (input.charCodeAt(i) > 64 && input.charCodeAt(i) < 91) {
            code_char = input.charCodeAt(i) + shift;
            if (code_char > 90)
                code_char = code_char - 26;
            encoded_str += String.fromCharCode(code_char);
        }
        else if (input.charCodeAt(i) > 96 && input.charCodeAt(i) < 123) {
            code_char = input.charCodeAt(i) + shift;
            if (code_char > 122)
                code_char = code_char - 26;
            encoded_str += String.fromCharCode(code_char);
        }
        else 
            encoded_str += input[i];
    }
    return encoded_str;
}


function decode (encoded_str, shift) {
    decoded = "";
    for(i = 0; i < encoded_str.length; i++) {
        if (encoded_str.charCodeAt(i) > 64 && encoded_str.charCodeAt(i) < 91) {
            code_char = encoded_str.charCodeAt(i) - shift;
            if (code_char < 65)
                code_char = code_char + 90 - 64;
            decoded += String.fromCharCode(code_char);
        }
        else if (encoded_str.charCodeAt(i) > 96 && encoded_str.charCodeAt(i) < 123) {
            code_char = encoded_str.charCodeAt(i) - shift;
            if (code_char < 97)
                code_char = code_char + 122 - 96;
            decoded += String.fromCharCode(code_char);
        }
        else
            decoded += encoded_str[i];
    }
    return decoded;
}

function find_most_freq_elem(arr) {
    count = 0; max = 0; most_freq_elem = 0;
    arr.sort((a, b) => a - b);
    for(i = 1; i < arr.length; i++) {
        if(arr[i - 1] == arr[i])
            count++;
        else {
            if(count > max) {
                max = count;
                most_freq_elem = arr[i - 1];
            }
            count = 0;
        }
    }
    return most_freq_elem;
}

function hack(encoded_str) {
    real_freqs = {'a': 8.17, 'b': 1.49, 'c': 2.78, 'd': 4.25, 'e': 12.7, 'f': 2.23, 'g': 2.02, 'h': 6.09, 'i': 6.97, 'j': 0.15, 'k': 0.77, 'l': 4.03, 'm': 2.41, 'n': 6.75, 'o': 7.51, 'p': 1.93, 'q': 0.1, 'r': 5.99, 's': 6.33, 't': 9.06, 'u': 2.76, 'v': 0.98, 'w': 2.36, 'x': 0.15, 'y': 1.97, 'z': 0.05};
    text_freqs = {'a': 0, 'b': 0, 'c': 0, 'd': 0, 'e': 0, 'f': 0, 'g': 0, 'h': 0, 'i': 0, 'j': 0, 'k': 0, 'l': 0, 'm': 0, 'n': 0, 'o': 0, 'p': 0, 'q': 0, 'r': 0, 's': 0, 't': 0, 'u': 0, 'v': 0, 'w': 0, 'x': 0, 'y': 0, 'z': 0};
    encoded_str = encoded_str.toLowerCase();
    for (i = 0; i < encoded_str.length; i++)
        text_freqs[encoded_str[i]] += (encoded_str.charCodeAt(i) > 122 || encoded_str.charCodeAt(i) < 97) ? 0 : 1;
    for(key in text_freqs) {
        text_freqs[key] /= encoded_str.length;
        text_freqs[key] *= 100;
    }
    delta = 0.25; shifts = new Array();
    for(i in text_freqs) {
        for(j in real_freqs){
            if((text_freqs[i] >= real_freqs[j] - delta) && (text_freqs[i] <= real_freqs[j] + delta)){
                if (i.charCodeAt(0) - j.charCodeAt(0) > 0)
                    shifts.push(i.charCodeAt(0) - j.charCodeAt(0));
            }
        }
    }
    shift = find_most_freq_elem(shifts);
    return shift;
}   

if (mode == 'encode') {
    console.log(encode(input, shift));
}
if(mode == 'decode') {
    console.log(decode(input,shift));
}
if(mode == 'hack') {
    shift = hack(input);
    console.log(decode(input, shift));
}