create database Ceres;

use Ceres;

create table empresa(
idEmpresa int primary key auto_increment,
nome varchar(45),
cnpj varchar(18)
);

create table usuario(
idUsuario int primary key auto_increment,
email varchar(45),
senha varchar(20),
tipo varchar(20),
 constraint chkTipo check(tipo = 'empresa' or tipo = 'admin'),
fkEmpresa int, foreign key (fkEmpresa) references empresa (idEmpresa)
);

create table plantacao(
idPlantacao int primary key auto_increment,
cep char(8),
complemento varchar(45),
fkEmpresa int, foreign key (fkEmpresa) references empresa (idEmpresa)
);

create table sensor(
idSensor int primary key auto_increment,
nome varchar(45),
fkPlantacao int, foreign key (fkPlantacao) references plantacao (idPlantacao)
);

create table dadosDHT11(
idDadosDHT11 int auto_increment,
fkSensor int, foreign key (fkSensor) references sensor (idSensor),
primary key (idDadosDHT11, fkSensor),
dtCaptura datetime default current_timestamp,
umidade double,
temperatura double
);

create table anotacao(
idAnotacao int,
fkUsuario int, foreign key (fkUsuario) references usuario(idUsuario),
fkEmpresa int, foreign key (fkEmpresa) references empresa(idEmpresa),
primary key (idAnotacao,fkUsuario,fkEmpresa),
descricao varchar(45),
cor varchar (45)
);







/* AZURE */

create table empresa(
idEmpresa int primary key identity(1,1),
nome varchar(45),
cnpj varchar(18)
);

create table usuario(
idUsuario int primary key identity(1,1),
email varchar(45),
senha varchar(20),
nome varchar(20),
fkEmpresa int, foreign key (fkEmpresa) references empresa (idEmpresa)
);

create table plantacao(
idPlantacao int primary key identity(1,1),
cep char(8),
complemento varchar(45),
fkEmpresa int, foreign key (fkEmpresa) references empresa (idEmpresa)
);

create table sensor(
idSensor int primary key identity(1,1),
nome varchar(45),
fkPlantacao int, foreign key (fkPlantacao) references plantacao (idPlantacao)
);

create table dadosDHT11(
idDadosDHT11 int,
fkSensor int, foreign key (fkSensor) references sensor (idSensor),
primary key (idDadosDHT11, fkSensor),
dtCaptura datetime default current_timestamp,
umidade float,
temperatura float
);

create table anotacao(
idAnotacao int,
fkUsuario int, foreign key (fkUsuario) references usuario(idUsuario),
fkEmpresa int, foreign key (fkEmpresa) references empresa(idEmpresa),
primary key (idAnotacao,fkUsuario,fkEmpresa),
descricao varchar(45),
cor varchar (45)
);