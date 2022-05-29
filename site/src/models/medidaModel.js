var database = require("../database/config");

function buscarUltimasMedidas(idPlantacao, limite_linhas) {
    // console.log("AAAAAAAAAAAAAAAAAA");

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `
        select top ${limite_linhas}
        temperatura as temperatura, 
        umidade as umidade,  
                        dtCaptura,
                        CONVERT(varchar, dtCaptura, 108) as momento_grafico
                    from dadosdht11 join sensor on idSensor = fkSensor
                    where sensor.fkPlantacao = ${idPlantacao}
                    order by idDadosDHT11 desc;`;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `select 
        temperatura as temperatura, 
        umidade as umidade,
                        dtCaptura,
                        DATE_FORMAT(dtCaptura,'%H:%i:%s') as momento_grafico
                    from dadosdht11 join sensor on idSensor = fkSensor
                    where sensor.fkPlantacao = ${idPlantacao}
                    order by idDadosDHT11 desc limit ${limite_linhas}`;
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
        instrucaoSql = `select top 1
        temperatura as temperatura, 
        umidade as umidade,  
                        CONVERT(varchar, dtCaptura, 108) as momento_grafico, 
                        sensor.fkPlantacao 
                        from dadosdht11 join sensor on idSensor = fkSensor where sensor.fkPlantacao = ${idPlantacao} 
                    order by idDadosDHT11 desc`;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `select 
        temperatura as temperatura, 
        umidade as umidade,
                        DATE_FORMAT(dtCaptura,'%H:%i:%s') as momento_grafico, 
                        sensor.fkPlantacao 
                        from dadosdht11 join sensor on idSensor = fkSensor where sensor.fkPlantacao = ${idPlantacao} 
                    order by idDadosDHT11 desc limit 1`;
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
