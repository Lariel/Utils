calculaDV = (numbersparam) => {
    numbers = numbersparam;
    sum = 0;
    // Cálculo da soma dos pesos de acordo com a posição
    for (i = 10; i > 1; i--) {
        sum += numbers.charAt(10 - i) * i;
    }
    firstdv = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    console.log('Primeiro DV: ', firstdv)
    numbers = numbersparam+firstdv;
    sum = 0;
    for (i = 11; i > 1; i--) {
        sum += numbers.charAt(11 - i) * i;
    }
    secdv = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    console.log('Segundo DV: ', secdv)
    return firstdv+''+secdv
}

generateSeed = () => {
    //console.log('Math.random: ',Math.random());
    //console.log('Date.now: ',Date.now());
    newSeed = Math.random() * Date.now();
    newSeed = newSeed.toString().replace(/[^0-9]+/g,'').substring(0, 9);
    //newSeed = newSeed.replace(/[^0-9]+/g,'');
    //newSeed = newSeed.substring(0, 9)
    //console.log('newSeed: ',newSeed);
    return newSeed
}

const validator = (cpf) => {
    if (cpf.length != 11){
        console.log(cpf+' é inválido')
        return false
    }
    let digits, i, equalDigits;
    equalDigits = 1;
    // Verificação da sequência de números iguais
    for (i = 0; i < cpf.length - 1; i++) {
        if (cpf.charAt(i) !== cpf.charAt(i + 1)) {
            equalDigits = 0;
            break;
        }
    }
    if (!equalDigits) {
        dvCalculado = calculaDV(cpf.substring(0, 9))
        digits = cpf.substring(9);
        if(dvCalculado == digits){
            console.log(cpf+' é válido')
            return true
        } else{    
            console.log(cpf+' é inválido')
            return false
        }
    } else {
        console.log(cpf+' é inválido')
        return false
    }
}

const generator = (qtd) => {
    /**
     * @TODO implementar loop
     */
    
    results = [];
    for(var i=0;i<qtd;i++){
        semente = generateSeed()
        results.push({'CPF':semente+calculaDV(semente)})
    }
    console.log(results)
    return results
    /*
    semente = generateSeed()
    cpfresult = calculaDV(semente)
    console.log('CPF: ',semente+cpfresult)
    return semente+cpfresult;
    */
}

module.exports = {
    validator,
    generator
}