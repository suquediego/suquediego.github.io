# DESIGN_GUIDE.md - Portfolio Diego Suque

Este guia define as regras visuais obrigatorias para tarefas de UI, design, responsividade, paginas de case e componentes de interface neste projeto.

## Direcao visual

- Manter uma estetica clara, madura, premium e neumorfica.
- Priorizar interfaces editoriais, respiradas e bem hierarquizadas.
- Usar composicoes limpas, com bastante espaco negativo e blocos bem definidos.
- Evitar aparencia generica de template, landing page artificial ou interface gerada por IA.
- Evitar excesso de ornamentos, gradientes chamativos, tags coloridas e badges genericos.
- Para cases, privilegiar narrativa editorial, blocos grandes, placeholders neutros e leitura progressiva.

## Paleta

Use a paleta atual do portfolio:

- Fundos: `#E8E8E8`, `#F2F2F2`, `#F7F7F7`
- Texto principal: `#303030`
- Texto secundario: `#727272`
- Texto auxiliar: `#777777`, `#787878`
- Bordas: `#D0D0D0`, `#DDDDDD`, `#E2E2E2`

Nao introduzir uma nova paleta sem necessidade clara e autorizacao.

## Layout e responsividade

- Mobile deve funcionar em uma coluna, sem overflow horizontal.
- Tablet nao deve parecer espremido; evite grids complexos cedo demais.
- Desktop pode usar duas colunas quando houver espaco suficiente.
- Testar mentalmente os principais breakpoints: `430px`, `768px`, `1024px` e `1280px`.
- Usar `min-w-0`, `max-w`, `clamp`, grids responsivos e espacamentos fluidos quando necessario.
- Respeitar a navbar fixa com respiro superior adequado em paginas novas.
- Textos nao podem estourar, sobrepor elementos ou depender de largura rigida.

## Componentes e blocos

- Reutilizar padroes existentes antes de criar novos componentes.
- Nao criar componentes novos se a tarefa puder ser resolvida no arquivo autorizado.
- Cards devem ser limpos, com borda sutil, fundo claro e sombra suave.
- Nao usar cards dentro de cards.
- Evitar badges/pills decorativos sem funcao.
- Botoes, quando existirem, devem ser claros, consistentes e com affordance objetiva.
- Usar icones Lucide quando fizer sentido e ja houver padrao para isso.

## Placeholders e imagens

- Para mockups ainda nao disponiveis, usar placeholders brancos ou cinza claro.
- Placeholders devem ter borda `#DDDDDD`, cantos arredondados grandes e sombra suave/neumorfica.
- Texto de placeholder deve ser discreto, centralizado e nao parecer conteudo final.
- Nao usar imagens reais, nomes de clientes, merchants, CPF, CNPJ, bancos ou parceiros sem autorizacao.
- Verificar caminhos de imagens considerando `basePath` antes de alterar assets.

## Movimento

- Usar Framer Motion com animacoes suaves e discretas.
- Animacoes devem apoiar hierarquia e entrada de conteudo, nao competir com a leitura.
- Em mobile, preferir movimento vertical leve para evitar overflow.
- Evitar deslocamentos horizontais agressivos em telas pequenas.

## Conteudo e posicionamento

- O portfolio deve posicionar Diego como Product Designer / UX UI Designer com dominio de produto, operacao, dados e tecnologia.
- Em produtos financeiros, enfatizar clareza, rastreabilidade, autonomia, seguranca operacional e tomada de decisao.
- Nao destacar betting/iGaming.
- Nao expor informacoes sensiveis, nomes de clientes, merchants, documentos ou parceiros.
- Preservar copy aprovada, salvo quando a tarefa pedir explicitamente revisao.

## Validacao visual

Antes de finalizar alteracoes de UI:

- Conferir se a pagina nao cria overflow horizontal.
- Conferir se a hierarquia de titulos esta clara.
- Conferir se os blocos respiram bem em mobile e desktop.
- Conferir se cores, bordas e sombras seguem a paleta.
- Conferir se nao foram criadas tags, badges ou elementos coloridos fora do estilo do projeto.
