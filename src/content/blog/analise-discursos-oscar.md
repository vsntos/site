---
title: "Ainda Estou Aqui: Oscar — Tendências, Emoções e Temas"
date: 2020-04-20
tag: Dados
summary: "Com a ajuda da ciência de dados, analisamos 20 anos de discursos do Oscar para entender melhor as emoções, os temas mais abordados e as tendências que marcaram essas declarações ao longo do tempo."
readTime: "10 min"
---

Os discursos do Oscar não são apenas um momento de celebração individual – eles refletem tendências e mudanças na indústria do cinema. O aumento da diversidade nos temas abordados, a emoção crescente nas falas e a presença cada vez maior de discursos inspiradores mostram como o evento evoluiu ao longo do tempo.

Seja um agradecimento breve ou um discurso cheio de emoção, cada vencedor deixa sua marca no palco do Oscar.

> [Baixar Relatório Completo (PDF)](/files/oscar_strategic_report.pdf)

## Ferramentas utilizadas

### Coleta de Dados

**Selenium e BeautifulSoup (Python)** — Web Scraping automatizado para extrair discursos do site oficial do Oscar.

**Pandas (Python)** — Organização e armazenamento dos dados extraídos em CSV.

### Processamento e Limpeza de Texto

**NLTK (Python)** — Tokenização, remoção de stopwords e lematização.

**Tidytext (R)** — Processamento de texto para segmentação de palavras e análise de frequência.

**Stringr (R)** — Manipulação e padronização de texto.

### Análise de Sentimento e Emoções

**SentimentR (R)** — Cálculo de escores positivos/negativos nos discursos.

**Syuzhet (R)** — Extração de emoções específicas com base no modelo NRC (National Research Council).

**Seaborn e Matplotlib (Python)** — Gráficos de distribuição de emoções ao longo do tempo.

### Modelagem de Tópicos

**Latent Dirichlet Allocation (LDA)** — Descoberta de temas predominantes nos discursos.

**Structural Topic Model (STM) (R)** — Evolução dos tópicos no tempo e variação entre categorias e gênero.

### Análise de Clusters e PCA

**K-Means Clustering (Python)** — Agrupamento dos discursos com base em métricas de emoção e sentimento.

**PCA (Python)** — Redução de dimensionalidade para visualizar a estrutura dos dados.

**t-SNE (Python)** — Mapeamento de tópicos em espaço bidimensional para visualização da distribuição semântica.

### Visualizações

**GGStatsplot (R)** — Gráficos estatísticos com testes ANOVA e T-Tests.

**Heatmaps (Seaborn/Python)** — Distribuição de tópicos por categoria e gênero ao longo dos anos.

## Conclusão

O pipeline utilizou um conjunto robusto de ferramentas cobrindo todas as etapas:

- **Web Scraping** — Extração de discursos
- **Processamento de Texto** — Limpeza e análise de palavras-chave
- **Análise de Sentimento** — Modelos para entender emoções
- **Modelagem de Tópicos** — Descoberta de padrões temáticos
- **Clusterização e PCA** — Agrupamento de discursos
- **Visualização Avançada** — Representação gráfica dos resultados

Esse conjunto de tecnologias pode ser aplicado a outros contextos: análise de redes sociais, estudos culturais e investigações sobre narrativas cinematográficas.
