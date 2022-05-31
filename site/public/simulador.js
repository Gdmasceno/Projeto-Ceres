var hectares = 0;
var producao = 0;

function trocarTela() {
    hectares = Number(ipt_hec.value);
    producao = Number(ipt_producao.value);
    page_one.style.display = "none";
    page_two.style.display = "flex";
    let totalAno = calcular(hectares, producao) * 12;
    // totalAno = lucro com 100% da safra anual
    console.log(totalAno + ' LUCRO TOTAL');

    // Calculando perda máxima do usuário:

    res_perda_cliente.innerHTML = (totalAno * 0.8).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}) + ' a.a.';

    // Isso Resultaria no lucro de apenas:

    res_lucro_cliente.innerHTML = (totalAno * 0.2).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}) + ' a.a.';
    

    // Resultado Lucro Total Possível com Ceres abaixo

    res_lucro_ceres.innerHTML = (totalAno * 0.95).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}) + ' a.a.';
    // 95% de produtividade total

    // Resultado saldo:

    var atual = totalAno - totalAno * 0.05

    var f = atual.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});

    // console.log(f)

    res_novo_saldo.innerHTML = ': ' + f;
    
}

function calcular(hec, prod) {

    var total = prod * hec
    // produção total ao mês
    return total;
    
}