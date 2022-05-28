var database = require("../database/config");

function buscarUltimasMedidas(idPlantacao, limite_linhas) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select top ${limite_linhas}
        umidade, temperatura, dtCaptura,
                        CONVERT(varchar, dtCaptura, 108) as momento_grafico
                    from dadosdht11 join sensor on dadosdht11.fkSensor = sensor.idSensor
                    where sensor.fkPlantacao = ${idPlantacao}
                    order by sensor.fkPlantacao desc`;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `select umidade, temperatura, dtCaptura from dadosdht11 join sensor on dadosdht11.fkSensor = sensor.idSensor
        where sensor.fkPlantacao = ${idPlantacao} order by dtCaptura desc;`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMedidasEmTempoReal(idPlantacao) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select umidade, temperatura, dtCaptura, 
                        CONVERT(varchar, dtCaptura, 108) as momento_grafico , sensor.fkPlantacao
                        from dadosdht11 join sensor on dadosdht11.fkSensor = sensor.idSensor
                        where sensor.fkPlantacao = ${idPlantacao} order by sensor.fkPlantacao desc`;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `select 
        umidade, temperatura,
                        DATE_FORMAT(dadosdht11.dtCaptura,'%H:%i:%s') as momento_grafico,
                        sensor.fkPlantacao
                        from dadosdht11 join sensor on dadosdht11.fkSensor = sensor.idSensor 
                        where sensor.fkPlantacao = ${idPlantacao} order by sensor.fkPlantacao desc`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


module.exports = {
    buscarUltimasMedidas,
    buscarMedidasEmTempoReal
}
