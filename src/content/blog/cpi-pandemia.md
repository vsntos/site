---
title: "Os Temas da CPI da Pandemia: Quem está falando sobre o quê?"
date: 2021-05-25
tag: NLP
summary: "A CPI da pandemia tem sido amplamente repercutida. Orientados à análise de dados, cobrimos a Comissão por meio de mineração de textos das notas taquigráficas das sessões."
readTime: "5 min"
---

A Comissão Parlamentar de Inquérito (CPI) sobre a atuação do governo ao longo da pandemia tem recebido grande atenção da opinião pública. Os depoimentos bateram recordes de visualizações no canal da TV Senado no YouTube, chegando ao pico de 1,1 milhão de visualizações no depoimento do ex-ministro Eduardo Pazuello.

A CPI é o instrumento que assegura aos parlamentares o direito de exercer sua função fiscalizadora. Para ser estabelecida, três requisitos precisam ser preenchidos: assinatura de um terço dos integrantes da Casa; indicação de fato determinado a ser apurado; e definição de prazo certo para duração.

A CPI da Pandemia foi instaurada a partir de uma decisão do STF, especificamente do Ministro Barroso, atendendo a um pedido feito pelos senadores Alessandro Vieira (Cidadania-SE) e Jorge Kajuru (Cidadania-GO). O escopo da investigação visava "apurar as ações e omissões do governo federal no enfrentamento da pandemia da covid-19 no Brasil e, em especial, no agravamento da crise sanitária no Amazonas com a ausência de oxigênio para os pacientes internados".

## Coleta de Dados

No site do Senado Federal coletamos todas as notas taquigráficas referentes às sessões da CPI em que estiveram para depor:

- Luiz Henrique Mandetta (04/05)
- Nelson Teich (05/05)
- Marcelo Queiroga (06/05)
- Antonio Barra Torres (11/05)
- Fabio Wajngarten (12/05)
- Carlos Murillo (13/05)
- Ernesto Araújo (18/05)
- Eduardo Pazuello (19 e 20/05)

## Análise dos Dados

Analisamos os dados utilizando **Modelagem de Tópicos Estruturais (STM)**, algoritmo de machine learning para identificar os temas predominantes em cada sessão e por depoente.

## Relatório Completo

<iframe src="https://docs.google.com/presentation/d/e/2PACX-1vRG6IOBZbDAtG8Tx3PIJFsrHrK1w4qvYSA8foZ1WL9DuNyGd3mudAUalZNYfCXfOw/embed?start=false&loop=false&delayms=3000" frameborder="0" width="100%" height="500" allowfullscreen="true"></iframe>

## Tecnologias Utilizadas

- **Linguagem**: R
- **IDE**: RStudio
- **Pacotes**: `tm`, `stringr`, `dplyr`, `tidyverse`, `stm`
