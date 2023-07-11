const { collectData } = require('./collectValidatorsData');
const COLLECT_INFORMATION_VALIDATORS_INTERVAL = 10;
// Coleta os dados dos validadores e insere o endereço de consenso
setInterval(async () => {
    collectData().then(result => {
        console.log("Finish collect data!!!");
       
    }).catch(err => {
        console.log(err.message)
    })

}, COLLECT_INFORMATION_VALIDATORS_INTERVAL * 1000);
