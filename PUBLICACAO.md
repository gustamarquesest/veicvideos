# Publicacao automatica da home

## Ativacao unica, somente quando autorizada

Em Settings > Pages > Build and deployment, selecione Source: GitHub Actions.
Isso substitui a publicacao direta da branch, que nao executa nossas verificacoes.
Preserve o dominio veicvideos.com. Nenhuma mudanca no Cloudflare e necessaria.

## Processo automatico

O workflow .github/workflows/pages.yml executa em cada push para main:

1. Validacao de sintaxe de script.js.
2. Geracao dos hashes e verificacao com node tools/version-assets.cjs --check.
3. Copia dos arquivos rastreados e das duas versoes geradas para um artefato.
4. Nova verificacao --check dentro do artefato antes do upload.
5. Deploy dependente do sucesso do build.

Pull requests validam sem publicar. Nao sao criados commits automaticos.
Referencias antigas no fonte sao atualizadas pelo gerador. Se o artefato ainda
estiver desatualizado, incompleto ou divergente, o build falha e bloqueia o deploy.
Rascunhos, compactados, ferramentas e arquivos ocultos nao entram no artefato.
As demais paginas, fontes originais, assets, CNAME, sitemap e robots sao preservados.

## Previa local opcional

Edite `script.js` e `styles.css`, nunca as copias com hash no nome.
Para revisar localmente o resultado antes de um commit, execute:

```sh
node tools/version-assets.cjs
node tools/version-assets.cjs --check
node --check script.js
git diff --check
```

O primeiro comando calcula SHA-256 dos arquivos, cria copias com os primeiros
16 caracteres do hash no nome e atualiza somente as referencias da home.
As copias ficam na raiz para preservar os caminhos relativos usados pelo CSS.
As quebras de linha das copias sao padronizadas em LF, inclusive no Git,
para manter os mesmos bytes e hashes no Windows e na hospedagem.
Sem mudanca de conteudo, o comando nao altera os arquivos nem suas URLs.

Inclua os fontes alterados no commit. O workflow gera as copias e o HTML final
automaticamente; nao depende de executar os comandos locais nem de commitar copias.
O modo `--check` falha se o HTML estiver desatualizado ou se faltar uma copia.
Copias antigas rastreadas permanecem no artefato. O checkout usa fetch-depth: 0.
tools/preserve-assets.cjs reconstrui todas as versoes de script.js e styles.css
alcancaveis pelo historico de HEAD, com a mesma normalizacao LF e SHA-256.
Assim, inclusive copias geradas exclusivamente no CI voltam em cada artefato.
Conteudo identico produz um unico nome. Nao ha commits automaticos nem dependencia
de caches do Actions, arquivos locais ignorados ou downloads de builds anteriores.
As outras paginas continuam usando os arquivos originais.

Depois do push, aguarde o workflow do GitHub Pages terminar com sucesso.
Confira os hashes das URLs exatas referenciadas pelo HTML publico antes de
considerar a publicacao concluida. Nao consulte antecipadamente URLs futuras
na CDN. O GitHub Pages publica o artefato validado pelo workflow.
O comando local tools/prepare-pages.cjs recebe um diretorio de saida inexistente
e reproduz o empacotamento sem fazer deploy.

Cada URL com hash identifica um conteudo fixo. O preparo grava as copias antes
de atualizar o HTML e ambos sao publicados juntos. Durante propagacao entre
servidores, ainda pode ocorrer indisponibilidade temporaria; isso nao garante
atualizacao simultanea de todos os caches. Um endereco novo nunca deve conter
uma versao anterior do arquivo. Nao e necessario desativar o cache no Cloudflare.

## Dependencias, limites e falhas

Use Git com historico completo e Node 22 ou posterior, sem pacotes adicionais.
Nao reescreva o historico publicado da main (force push, reset ou squash de
commits ja publicados). Para desfazer conteudo, prefira um novo commit de reversao
mantendo os ancestrais. Nao execute novamente um deploy de commit antigo: ele nao
conhece as versoes publicadas depois dele. Reverta o conteudo sobre a main atual.
Nao renomeie os fontes raiz nem altere o algoritmo de nomes/normalizacao sem uma
migracao que preserve os nomes antigos. Esta garantia cobre os assets com hash
gerados por este sistema; nao torna imutaveis URLs legadas sem hash.

Historico raso, objeto Git irrecuperavel, arquivo rastreado ausente, referencia
invalida ou hash divergente causam erro e bloqueiam o deploy. As copias historicas
tambem sao verificadas. O build informa o tamanho final e bloqueia acima de
900 MiB: nao descarta versoes antigas para caber. O armazenamento cresce conforme
o conteudo muda; deduplicacao evita repeticoes, mas retencao permanente nao pode
ter tamanho constante. Ao atingir o limite, revisar armazenamento antes de publicar.

Os testes automaticos simulam tres publicacoes independentes e validam retencao,
referencias, integridade, repeticao, LF/CRLF e copia das paginas secundarias/SEO:

```sh
node tools/test-assets.cjs
```

As imagens bs1.jpg a bs9.jpg ausentes em Cervejarias/ sao uma pendencia
preexistente, fora desta tarefa. Preservar a pagina nao corrige essas referencias.

## Ativar e verificar

1. Somente apos autorizacao, incluir no repositorio os fontes, ferramentas,
   workflow, .gitattributes e referencias/copias atuais. Revisar o diff.
2. Aguardar ou cancelar publicacoes anteriores em andamento. Em Settings > Pages,
   mudar Source para GitHub Actions, preservando o dominio personalizado.
3. Habilitar/executar Validate and publish Pages na main atual. Nao manter outro
   workflow de deploy habilitado. A fonte Actions substitui o publicador da branch.
4. Conferir build e deploy verdes no commit desejado, inclusive testes, --check,
   verificacao historica e tamanho. Falha no build impede upload/deploy.
5. No HTML publico conferir as URLs e baixar os arquivos exatos: comparar SHA-256
   integral com as copias no artefato, nao apenas confiar no status verde.
   Verificar home, paginas secundarias, sitemap, robots e dominio. Caches podem
   propagar em tempos diferentes; nao anunciar conclusao antes dessa verificacao.

## Reversao segura para main / (root)

Nao basta trocar a fonte: arquivos criados apenas no CI precisam estar na branch.

1. Interromper novas publicacoes. Em Actions, desabilitar especificamente
   Validate and publish Pages e aguardar/cancelar execucoes em andamento.
   Manter a fonte Pages em Actions durante a preparacao.
2. Usar um checkout completo da main mais recente, contendo todo o historico ja
   publicado. Conferir sincronizacao com origin/main; nao voltar a um commit velho.
3. Na raiz executar os comandos abaixo. A preservacao gera tambem as copias antigas
   na raiz, para que HTML ainda em cache continue encontrando seus arquivos.

```sh
node tools/version-assets.cjs
node tools/preserve-assets.cjs .
node tools/version-assets.cjs --check
node tools/preserve-assets.cjs --check .
node --check script.js
git diff --check
git status
```

4. Revisar e, com autorizacao, commitar e enviar index.html, todas as copias
   script.<hash>.js/styles.<hash>.css geradas e qualquer fonte aprovado necessario.
   Confirmar no GitHub que os arquivos existem na main, incluindo CNAME, paginas,
   imagens, sitemap e robots. Nenhum arquivo necessario pode ficar apenas local.
5. So entao selecionar Settings > Pages > Source: Deploy from a branch,
   branch main, pasta / (root). Manter o workflow customizado desabilitado.
6. Aguardar o publicador da branch e verificar URLs atuais E antigas no site.
   Preservar a configuracao do dominio e nao alterar Cloudflare.

Na modalidade branch, os comandos de geracao/verificacao e suas copias devem ser
incluidos em cada commit de atualizacao: nao existe a automacao deste workflow.
Para voltar a Actions, aguardar o publicador da branch terminar, trocar a fonte
para Actions e somente depois reabilitar o workflow. Nunca usar dois publicadores
concorrentes. A reversao nao remove as copias historicas do repositorio.
