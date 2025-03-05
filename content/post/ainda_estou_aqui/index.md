---
title: "Ainda Estou Aqui"
subtitle: "Oscar: Tendências, Emoções e Temas"

# Summary for listings and search engines
summary: "Com a ajuda da ciência de dados, analisamos 20 anos de discursos do Oscar para entender melhor as emoções, os temas mais abordados e as tendências que marcaram essas declarações ao longo do tempo."

# Link this post with a project
projects:
  - Mapeamento Legislativo e Análise de Políticas Públicas Brasil

# Date published
date: "2020-04-20T00:00:00Z"

# Date updated
lastmod: "2020-12-13T00:00:00Z"

# Is this an unpublished draft?
draft: false

# Show this page in the Featured widget?
featured: true

# Featured image
# Place an image named `featured.jpg/png` in this page's folder and customize its options here.
image:
  caption:
  focal_point: ""
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

Os discursos do Oscar não são apenas um momento de celebração individual – eles refletem tendências e mudanças na indústria do cinema. O aumento da diversidade nos temas abordados, a emoção crescente nas falas e a presença cada vez maior de discursos inspiradores mostram como o evento evoluiu ao longo do tempo.

Seja um agradecimento breve ou um discurso cheio de emoção, cada vencedor deixa sua marca no palco do Oscar.

Relatório de Pesquisa Completo

Clique no botão abaixo para baixar o relatório completo em formato PDF:

{{% callout note %}}
[Baixar Relatório Completo](/files/oscar_strategic_report.pdf)
{{% /callout %}}

[Tecnologia] Ferramentas utilizadas:

Para realizar a análise completa dos discursos do Oscar, utilizamos um conjunto diversificado de tecnologias e bibliotecas de **ciência de dados, processamento de linguagem natural (NLP) e aprendizado de máquina**. Abaixo estão os principais componentes do pipeline de análise:

### **Coleta de Dados**
**Tecnologias Utilizadas**:  
**Selenium e BeautifulSoup (Python)** – Para realizar **Web Scraping** automatizado e extrair discursos do site oficial do Oscar.  
**Pandas (Python)** – Para organizar e armazenar os dados extraídos em **CSV** e realizar as primeiras manipulações.  

**Processamento e Limpeza de Texto**
**Tecnologias Utilizadas**:  
**NLTK (Python)** – Tokenização, remoção de stopwords e lematização dos discursos.  
**Tidytext (R)** – Alternativa para processamento de texto em R, usada para segmentação de palavras e análise de frequência.  
**Stringr (R)** – Manipulação e padronização de texto para extrair informações-chave.  

**Análise de Sentimento e Emoções**
**Tecnologias Utilizadas**:  
**SentimentR (R)** – Modelo de análise de sentimentos aplicado aos discursos para calcular escores positivos/negativos.
**Syuzhet (R)** – Extração de **emoções** específicas nos discursos, baseando-se no modelo NRC (National Research Council).  
**Seaborn e Matplotlib (Python)** – Criação de **gráficos de distribuição de emoções** nos discursos ao longo do tempo.  

### **Modelagem de Tópicos**
**Tecnologias Utilizadas**:  
**Latent Dirichlet Allocation (LDA) (R e Python)** – Descoberta de temas predominantes nos discursos, usando o modelo probabilístico de tópicos.  
**Structural Topic Model (STM) (R)** – Para entender a evolução dos tópicos no tempo e como eles variam entre categorias e gênero.

### **Análise de Clusters e PCA**
**Tecnologias Utilizadas**:  
**K-Means Clustering (Python)** – Agrupamento dos discursos com base em métricas de emoção e sentimento.  
**PCA (Principal Component Analysis) (Python)** – Redução de dimensionalidade para visualizar a estrutura dos dados.  
**t-SNE (Python)** – Mapeamento de tópicos em um espaço bidimensional para melhor visualização da distribuição semântica dos discursos.  

### **Visualizações Avançadas**
**Tecnologias Utilizadas**:  
**GGStatsplot (R)** – Para gráficos estatísticos com testes ANOVA e T-Tests embutidos.  
**Heatmaps (Seaborn/Python)** – Para ilustrar a distribuição de tópicos por categoria e gênero ao longo dos anos.  

### **Comparação Temporal e Tendências**
**Tecnologias Utilizadas**:  
**Time-Series Analysis (Python e R)** – Análise de tendência das emoções e temas ao longo das décadas.  
**Seaborn FacetGrid (Python)** – Visualização da evolução dos sentimentos ao longo dos anos.  

### **Conclusão**
O relatório utilizou um conjunto robusto de ferramentas e técnicas para cobrir todas as etapas de um pipeline de ciência de dados:

**Web Scraping**: Extração de discursos  
**Processamento de Texto**: Limpeza e análise de palavras-chave  
**Análise de Sentimento**: Modelos para entender emoções  
**Modelagem de Tópicos**: Descoberta de padrões temáticos  
**Clusterização e PCA**: Agrupamento de discursos  
**Visualização Avançada**: Representação gráfica dos resultados  

Esse conjunto de tecnologias não apenas permite uma análise detalhada dos discursos do Oscar, mas também pode ser aplicado a outros contextos, como **análise de redes sociais, estudos culturais e investigações sobre narrativas cinematográficas**.
