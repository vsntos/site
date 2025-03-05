---
title: "Ainda Estou Aqui"
subtitle: "Oscar: Tendências, Emoções e Temas"

# Summary for listings and search engines
summary: "Com a ajuda da ciência de dados, analisamos 20 anos de discursos do Oscar para entender melhor as emoções, os temas mais abordados e as tendências que marcaram essas declarações ao longo do tempo."

# Link this post with a project
projects:
  - "Mapeamento Legislativo e Análise de Políticas Públicas Brasil"

# Date published
date: "2020-04-20T00:00:00Z"

# Date updated
lastmod: "2020-12-13T00:00:00Z"

# Is this an unpublished draft?
draft: false

# Show this page in the Featured widget?
featured: false

# Featured image
image:
  caption: "Imagem representativa do estudo"
  focal_point: "center"
  placement: 2
  preview_only: false

authors:
  - admin

tags:
  - Oscar
  - Inteligência Artificial
  - Ciência de Dados

categories:
  - Políticas Públicas
  - Tecnologia
---


## **Os Discursos do Oscar: O Que a Ciência de Dados Nos Conta?**

O Oscar é muito mais do que uma simples cerimônia de premiação. Além de celebrar os melhores filmes do ano, o palco do Dolby Theatre também se transforma em um espaço de discursos memoráveis, repletos de emoções, mensagens de impacto e agradecimentos. Mas será que existe um padrão por trás dessas falas? O que os vencedores realmente dizem ao segurar a tão cobiçada estatueta dourada?

Com a ajuda da ciência de dados, analisamos 20 anos de discursos do Oscar para entender melhor as emoções, os temas mais abordados e as tendências que marcaram essas declarações ao longo do tempo.

## **1. A Evolução dos Discursos ao Longo dos Anos**

A análise mostrou que os discursos se tornaram mais longos e mais emocionantes nas últimas décadas. Enquanto nos anos 2000 as falas eram mais curtas e formais, a partir de 2010 houve um crescimento no número de discursos inspiradores e engajados. Em algumas categorias principais, como Melhor Filme e Melhor Ator/Atriz, os vencedores têm aproveitado o tempo no palco para transmitir mensagens poderosas sobre diversidade, inclusão e desafios da indústria cinematográfica.

## **2. Quais Emoções São Mais Expressadas?**

Com a análise de sentimentos baseada em NLP (Processamento de Linguagem Natural), descobrimos quais são as emoções mais presentes nos discursos:

Alegria (45%): A emoção dominante, refletindo o entusiasmo e gratidão pela conquista.

Confiança (20%): Comum em discursos que destacam o trabalho em equipe e a jornada profissional.

Surpresa (15%): Muitos vencedores demonstram choque e incredulidade ao receber o prêmio.

Medo e Tristeza (10%): Mais presentes em falas carregadas de emoção, geralmente ligadas a homenagens ou reflexões sobre dificuldades enfrentadas.

## **3. Os Três Perfis de Discursos do Oscar**

A análise de clusters revelou três principais estilos de discurso:

O Tradicionalista – Curto e objetivo, focado em agradecimentos protocolares para família, equipe e colegas de profissão.

O Inspirador – Motivacional, cheio de reflexões sobre superação, sonhos e o impacto da arte na sociedade.

O Engajado – Com forte viés político ou social, abordando temas como igualdade de gênero, diversidade e sustentabilidade na indústria do entretenimento.

## **4. O Tamanho do Discurso Importa?**

Sim! Quanto maior o discurso, maior a carga emocional envolvida. Nossa análise mostrou que discursos mais longos tendem a conter mais expressões de alegria (+0.81), surpresa (+0.79) e confiança (+0.86). Por outro lado, emoções como raiva (+0.69) e medo (+0.72) também são mais frequentes em falas extensas, sugerindo que discursos com forte impacto emocional, sejam positivos ou negativos, geralmente se estendem por mais tempo.

## **5. Quais São os Tópicos Mais Frequentes?**

A modelagem de tópicos revelou que os discursos do Oscar geralmente se encaixam em cinco grandes temas:

Agradecimentos ao time e referências ao cinema/música – O tema mais comum em todas as categorias.
Reflexões sobre o tempo e o impacto do prêmio – Presente em discursos honorários.
Amor pelo cinema e família – Comum entre diretores e roteiristas.
Trabalho da equipe e emoção – Forte em categorias técnicas, como Efeitos Visuais e Edição.
Discussões sobre a indústria e o futuro – Bastante presente em discursos de Melhor Filme e Documentário.

## **Conclusão: O Oscar é um Espelho da Indústria Cinematográfica**

Os discursos do Oscar não são apenas um momento de celebração individual – eles refletem tendências e mudanças na indústria do cinema. O aumento da diversidade nos temas abordados, a emoção crescente nas falas e a presença cada vez maior de discursos inspiradores mostram como o evento evoluiu ao longo do tempo.

Seja um agradecimento breve ou um discurso cheio de emoção, cada vencedor deixa sua marca no palco do Oscar.

Relatório de Pesquisa Completo

Clique no botão abaixo para baixar o relatório completo em formato PDF:

{{% callout note %}}
[Baixar Relatório Completo](/files/oscar_strategic_report.pdf)
{{% /callout %}}

[Tecnologia] Ferramentas utilizadas:

## **Resumo das Tecnologias Utilizadas no Relatório**

Para realizar a análise completa dos discursos do Oscar, utilizamos um conjunto diversificado de tecnologias e bibliotecas de **ciência de dados, processamento de linguagem natural (NLP) e aprendizado de máquina**. Abaixo estão os principais componentes do pipeline de análise:

### **Coleta de Dados**
**Tecnologias Utilizadas**:  
**Selenium e BeautifulSoup (Python)** – Para realizar **Web Scraping** automatizado e extrair discursos do site oficial do Oscar.  
**Pandas (Python)** – Para organizar e armazenar os dados extraídos em **CSV** e realizar as primeiras manipulações.  

---

**Processamento e Limpeza de Texto**
**Tecnologias Utilizadas**:  
**NLTK (Python)** – Tokenização, remoção de stopwords e lematização dos discursos.  
**Tidytext (R)** – Alternativa para processamento de texto em R, usada para segmentação de palavras e análise de frequência.  
**Stringr (R)** – Manipulação e padronização de texto para extrair informações-chave.  

---

**Análise de Sentimento e Emoções**
**Tecnologias Utilizadas**:  
**SentimentR (R)** – Modelo de análise de sentimentos aplicado aos discursos para calcular escores positivos/negativos.
**Syuzhet (R)** – Extração de **emoções** específicas nos discursos, baseando-se no modelo NRC (National Research Council).  
**Seaborn e Matplotlib (Python)** – Criação de **gráficos de distribuição de emoções** nos discursos ao longo do tempo.  
---

### **Modelagem de Tópicos**
**Tecnologias Utilizadas**:  
**Latent Dirichlet Allocation (LDA) (R e Python)** – Descoberta de temas predominantes nos discursos, usando o modelo probabilístico de tópicos.  
**Structural Topic Model (STM) (R)** – Para entender a evolução dos tópicos no tempo e como eles variam entre categorias e gênero.
---

### **Análise de Clusters e PCA**
**Tecnologias Utilizadas**:  
**K-Means Clustering (Python)** – Agrupamento dos discursos com base em métricas de emoção e sentimento.  
**PCA (Principal Component Analysis) (Python)** – Redução de dimensionalidade para visualizar a estrutura dos dados.  
**t-SNE (Python)** – Mapeamento de tópicos em um espaço bidimensional para melhor visualização da distribuição semântica dos discursos.  

---

### **Visualizações Avançadas**
**Tecnologias Utilizadas**:  
**GGStatsplot (R)** – Para gráficos estatísticos com testes ANOVA e T-Tests embutidos.  
**Heatmaps (Seaborn/Python)** – Para ilustrar a distribuição de tópicos por categoria e gênero ao longo dos anos.  

---

### **Comparação Temporal e Tendências**
**Tecnologias Utilizadas**:  
**Time-Series Analysis (Python e R)** – Análise de tendência das emoções e temas ao longo das décadas.  
**Seaborn FacetGrid (Python)** – Visualização da evolução dos sentimentos ao longo dos anos.  

---

### **Conclusão**
O relatório utilizou um conjunto robusto de ferramentas e técnicas para cobrir todas as etapas de um pipeline de ciência de dados:

**Web Scraping**: Extração de discursos  
**Processamento de Texto**: Limpeza e análise de palavras-chave  
**Análise de Sentimento**: Modelos para entender emoções  
**Modelagem de Tópicos**: Descoberta de padrões temáticos  
**Clusterização e PCA**: Agrupamento de discursos  
**Visualização Avançada**: Representação gráfica dos resultados  

Esse conjunto de tecnologias não apenas permite uma análise detalhada dos discursos do Oscar, mas também pode ser aplicado a outros contextos, como **análise de redes sociais, estudos culturais e investigações sobre narrativas cinematográficas**.
