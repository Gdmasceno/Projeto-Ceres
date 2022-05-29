var database = require("../database/config")

function entrar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucao = `
        SELECT usuario.idUsuario, usuario.email, usuario.senha, usuario.tipo, empresa.nome FROM usuario JOIN empresa ON usuario.fkEmpresa = empresa.idEmpresa WHERE usuario.email = '${email}' AND senha = '${senha}' AND tipo = 'empresa';
    `;
    // SELECT * FROM usuario WHERE email = '${email}' AND senha = '${senha}' AND tipo = 'empresa';
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function entrarAdm(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucao = `
        SELECT adm.*, empresa.nome FROM usuario adm JOIN empresa ON adm.fkEmpresa = empresa.idEmpresa WHERE email = '${email}' AND senha = '${senha}';`;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}


// Coloque os mesmos parâmetros aqui. Vá para a var instrucao
function cadastrar(nome, email, cnpj, senha) {
    tipo = 'empresa';
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, email, cnpj, senha);

    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucao = `
        INSERT INTO empresa (nome, cnpj) VALUES ('${nome}', '${cnpj}');
    `;

    database.executar(instrucao);

    var instrucao = `
    INSERT INTO usuario (email, senha, tipo, fkEmpresa) VALUES ('${email}','${senha}','empresa',(SELECT idEmpresa FROM empresa WHERE cnpj = '${cnpj}' ));
    `;
    database.executar(instrucao);


    var instrucao = `
        INSERT INTO anotacao VALUES (1,1,(SELECT idEmpresa FROM empresa WHERE cnpj = '${cnpj}'),null,null),
        (2,1,(SELECT idEmpresa FROM empresa WHERE cnpj = '${cnpj}'),null,null),
        (3,1,(SELECT idEmpresa FROM empresa WHERE cnpj = '${cnpj}'),null,null);
    `;

    database.executar(instrucao);

    var instrucao = `
    insert into plantacao values(1,'08461200','Linha Ramos',1);
    `;

    database.executar(instrucao);

    var instrucao = `
    insert into plantacao values(2,'05674553','Ponte Flores',1);
    `;

    database.executar(instrucao);

    var instrucao = `
    insert into plantacao values(3,'08445777','Flor Mobi',1);
    `;

    database.executar(instrucao);

    var instrucao = `
    insert into sensor values (1,'dht11',1),(2,'dht11',2),(3,'dht11',3);
    `;

    return database.executar(instrucao);

}


function cadastrarAdm(nome, email, senha, fkEmpresa) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, email, senha, fkEmpresa);

    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.

    var instrucao = `
    INSERT INTO usuario (email, senha, tipo, fkEmpresa) VALUES ('${email}','${senha}','admin',${fkEmpresa});
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}



function cadastrarMural(id, numero, descricao, descricao2, descricao3, cor, cor2, cor3) {
    // console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, email, senha, fkEmpresa);

    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.

    if (numero == 1) {
        var instrucao = `
    UPDATE anotacao SET fkUsuario = ${id} WHERE idAnotacao = ${numero}  and fkEmpresa = (select fkEmpresa from usuario where idUsuario = ${id});
    `;

    database.executar(instrucao);

    var instrucao = `
    UPDATE anotacao SET descricao = '${descricao}' WHERE idAnotacao = ${numero} and fkEmpresa = (select fkEmpresa from usuario where idUsuario = ${id})
    `;

    database.executar(instrucao);

    var instrucao = `
    UPDATE anotacao SET cor = '${cor}' WHERE idAnotacao = ${numero} and fkEmpresa = (select fkEmpresa from usuario where idUsuario = ${id})
    `;

    database.executar(instrucao);

    }

    else if (numero == 2){

        var instrucao = `
    UPDATE anotacao SET fkUsuario = ${id} WHERE idAnotacao = ${numero}  and fkEmpresa = (select fkEmpresa from usuario where idUsuario = ${id});
    `;

    database.executar(instrucao);

    var instrucao = `
    UPDATE anotacao SET descricao = '${descricao2}' WHERE idAnotacao = ${numero} and fkEmpresa = (select fkEmpresa from usuario where idUsuario = ${id})
    `;

    database.executar(instrucao);

    var instrucao = `
    UPDATE anotacao SET cor = '${cor2}' WHERE idAnotacao = ${numero} and fkEmpresa = (select fkEmpresa from usuario where idUsuario = ${id})
    `;

    database.executar(instrucao);


    }

    else if(numero == 3){
        var instrucao = `
    UPDATE anotacao SET fkUsuario = ${id} WHERE idAnotacao = ${numero}  and fkEmpresa = (select fkEmpresa from usuario where idUsuario = ${id});
    `;

    database.executar(instrucao);

    var instrucao = `
    UPDATE anotacao SET descricao = '${descricao3}' WHERE idAnotacao = ${numero} and fkEmpresa = (select fkEmpresa from usuario where idUsuario = ${id})
    `;

    database.executar(instrucao);

    var instrucao = `
    UPDATE anotacao SET cor = '${cor3}' WHERE idAnotacao = ${numero} and fkEmpresa = (select fkEmpresa from usuario where idUsuario = ${id})
    `;

    database.executar(instrucao);

    }
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}


function listarAdm(id) {
    console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucao = `
        SELECT email from usuario where tipo = 'admin' and fkEmpresa = ${id};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}


function listarPlantacao(id) {
    console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucao = `
        SELECT idPlantacao, cep from plantacao where fkEmpresa = (select fkEmpresa from usuario where idUsuario = ${id});
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function listarCard(id) {
    console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucao = `
    select umidade, temperatura, dtCaptura from dadosdht11 
    join sensor on fkSensor = idSensor 
    join plantacao on plantacao.idPlantacao = sensor.fkPlantacao 
where plantacao.idPlantacao = ${id} and dadosdht11.idDadosDHT11 = 
(select max(iddadosdht11) from dadosdht11 
    join sensor on fkSensor = idSensor 
    join plantacao on plantacao.idPlantacao = sensor.fkPlantacao 
where plantacao.idPlantacao = ${id});
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    entrar,
    entrarAdm,
    cadastrar,
    cadastrarAdm,
    cadastrarMural,
    listarAdm,
    listarPlantacao,
    listarCard,
};