# Trabalho I.A. - 4

Este trabalho tem como objetivo desenvolver um algoritmo genético capaz de solucionar problemas no escopo do "Problema da Mochila"

## Sobre o problema

O problema da mochila é um exercício mental no qual um ladrão possui uma mochila de dimensões irrelevantes mas com um limite definido de peso máximo. O objetivo do ladrão é entrar em um local com bens valiosos e roubar a maior quantia de dinheiro carregando uma quantidade de peso limitada pela mochila. 

## Cenário escolhido

Um avião possui uma capacidade máxima de itens que ele pode levar, bem como uma quantidade máxima de peso e volume que ele pode carregar de uma vez. O objetivo do programa é encontrar a melhor combinação possível, dado um número finito de itens, de massas e volumes que maximize a quantidade de itens dentro do avião. O algoritmo considera que a melhor solução foi encontrada após atingido um certo número de gerações.

Todos os itens são exibidos em uma lista onde os selecionados pelo algoritmo são marcados com a cor verde. A seleção ocorre em tempo real

### Limites definidos

* Capacidade máxima de itens: 100 unidades
* Capacidade máxima de massa: 14.000 Kg
* Capacidade máxima de volume: 17,63 m³

### Parâmetros configuráveis

* Tamanho da população
* Taxa de mutação
* Número máximo de gerações

## Como executar
* Abra o arquivo index.html em qualquer navegador que suporte JavaScript
* Defina as configurações de sua preferência (caso queira)
* Clique no botão "Iniciar"

## Ferramentas utilizadas
* JavaScript
* CSS
* HTML

## Estrutura
* index.html - Responsável pela renderização do algoritmo
* public/css/style.css - Responsável pela estilização dos elementos do algoritmo
* script.js - Responsável pela execução do algoritmo com toda a lógica de programação
* app/Cargo.js - Contém uma classe com o método estático responsável por gerar os itens a serem escolhidos, bem como as propriedades estáticas responsáveis pelos limites do sistema
* app/DNA.js - Contém a classe responsável por codificar os cromossomos. Nela são encontrados os métodos responsáveis pelo <i>crossover</i>, muitação e a função para calcular o <i>fitness</i>
* app/Helpers.js - Contém algumas funções globais utilizadas dentro do algoritmo
* app/Population.js - Contém a classe responsável por armazenar o conjunto de cromossomos (aqui chamados de "população"). Nela são encontrados os métodos responsáveis por realizar a seleção natural e realizar o cruzamento dos cromossomos.

## Desenvolvido por

* Victor de Oliveria Martins Azevedo | 20190018746
* Pedro Raposo Felix de Sousa | 20190004642
