function encode() {
    str = document.getElementById('input').value.split('');
    for (i = 0; i < str.length; i++) str[i] *= 1;
    document.getElementById('encoded').value = str.join('') + (str[0] + str[1]+ str[2]) % 2 + (str[1] + str[2]+ str[3]) % 2 + (str[0] + str[1]+ str[3]) % 2;
}

function decode() {
    str = document.getElementById('encoded').value.split('');
    for (  i = 0; i < str.length; i++) str[i] *= 1;
    first_synd = (str[0] + str[1] + str[2] + str[4]) % 2;
    second_synd = (str[1] + str[2] + str[3] + str[5]) % 2;
    third_synd = (str[0] + str[1] + str[3] + str[6]) % 2;
    if (first_synd !=0 && second_synd == 0 && third_synd !=0) {
        str[0] = (str[0]) ? 0: 1;
        document.getElementById('bError').textContent = 'Error on first bit';
    }
    if (first_synd !=0 && second_synd !=0 && third_synd  !=0) {
        str[1] = (str[1]) ? 0: 1;
        document.getElementById('bError').textContent = 'Error on second bit';    
    }
    if (first_synd !=0 && second_synd !=0 && third_synd == 0) {
        str[2] = (str[2]) ? 0: 1;
        document.getElementById('bError').textContent = 'Error on third bit';        
    }
    if (first_synd == 0 && second_synd !=0 && third_synd  !=0) {
        str[3] = (str[3]) ? 0: 1;
        document.getElementById('bError').textContent = 'Error on fourth bit';      
    }
    if (first_synd !=0 && second_synd == 0 && third_synd == 0)
        document.getElementById('bError').textContent = 'Error on first control bit';
    if (first_synd == 0 && second_synd !=0 && third_synd == 0)    
        document.getElementById('bError').textContent = 'Error on second control bit';
    if (third_synd !=0 && first_synd == 0 && second_synd == 0)      
        document.getElementById('bError').textContent = 'Error on third control bit';
    document.getElementById('destr').value = str[0] + '' + str[1] + '' + str[2] + '' + str[3];   
}
    