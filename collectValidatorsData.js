const createValidatorService = require('./services/createValidatorService');
const axios = require('axios')
const fs = require('fs');
async function collectData() {

    try {
        // 1) Obter o checkpoint Atual;
        const checkCurrentCheckpoint = axios.create({
            baseURL: `https://heimdall-api.polygon.technology/checkpoints/latest`
        });
        const { data } = await checkCurrentCheckpoint.get();
        let checkpointId = data.result.id;

        // 2) Consulta checkpoint do arquivo;
        const checkpoint = fs.readFileSync('tmp/checkpointInfo.json', 'utf8');
        const checkpointInFile = JSON.parse(checkpoint);

        console.log('consultando checkpoint do arquivo..');
        // 3) Verifica se os checkpoints são iguais
        if(checkpointId == checkpointInFile.checkpointId){
            console.log("checkpoint atual: " + checkpointId);
            console.log("checkpoint do arquivo: " + checkpointInFile.checkpointId);
            return
        }else{
            // 4) Obter informação sobre os validadores que assinaram o checkpoint;
            const  signedValidators = axios.create({
                baseURL: `https://staking-api.polygon.technology/api/v2/monitor/checkpoint-signatures/checkpoint/${checkpointId}`
            });
            let response = await signedValidators.get();
            const signedCheckpointsValidators =  response.data.result;
            
            // Verificar se tem pelo menos 50 ativos;
            // Caso não tenha, aguardar um tempo e verificar novamente;
            // Só deixa verificar se atender a condição;

            var validatorsTrue = 0;
            await signedCheckpointsValidators.map( async validator => {
                const id = validator.validatorId;
                const hasSigned = validator.hasSigned;
                const hasNotified = false;
                if(hasSigned){
                    validatorsTrue +=1;
                }
                // await createValidatorService.run(id, hasSigned, hasNotified, checkpointId);
            })

            if(validatorsTrue >= 50){
                console.log("Checkpoint diferente e validadores suficientes. Iniciando verificação nos validadores..")
                await signedCheckpointsValidators.map( async validator => {
                    const id = validator.validatorId;
                    const hasSigned = validator.hasSigned;
                    const hasNotified = false;
                    await createValidatorService.run(id, hasSigned, hasNotified, checkpointId);
                })  

                // 5) Alterar o checkpoint no arquivo.
                console.log("checkpoint diferente");
                checkpointInFile.checkpointId = checkpointId;
                
                
                fs.writeFileSync('./tmp/checkpointInfo.json', JSON.stringify(checkpointInFile), 'utf-8');
            }else{
                console.log("checkpoint diferente, porém não tem validadores true o suficiente. Aguardando mais 10 segundos...")
            }
        }
        // notifyNewCheckpoint.run(checkpointId, duration);
       
        

        
    
        
        


       


    } catch (err) {
        console.error(err)
    }


}

module.exports = {
    collectData,
}
