const axios = require('axios');

async function execute(id){

    // Função que percorre uma lista de validadores e retorna o validador que tem o id fornecido;
    
    const validatorsInfo = axios.create({
        baseURL: `https://staking-api.polygon.technology/api/v2/validators?limit=0&offset=100`
    })
    let validatorsData = await validatorsInfo.get();
    const validators = validatorsData.data.result;
    let validatorName;
    await validators.map( validator => {
        if(validator.id == id){
            // console.log(validator.name);
            validatorName =  validator.name;
        }
    })

    return validatorName;
}


module.exports = { execute };
