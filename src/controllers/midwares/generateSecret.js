function generateSecret(){ // Gera uma nova private key aleatoriamente toda vez que a API é iniciada
    let secret = "";
    for(let i=0; i<15; i++){
        secret += Math.random().toString(36).slice(-11);
    }
    return secret;
}

module.exports = generateSecret();