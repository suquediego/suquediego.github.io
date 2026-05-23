# AGENTS.md — Portfolio Diego Suque

Este arquivo define as instruções obrigatórias para o Codex neste repositório.

Antes de qualquer alteração, leia este arquivo.

Antes de qualquer alteração visual, layout, UI, responsividade, página de case ou componente de interface, leia também:

- `DESIGN_GUIDE.md`

## Objetivo do projeto

Este projeto é o portfólio pessoal de Diego Suque, Product Designer / UX UI Designer, com foco em:

- produtos financeiros;
- dashboards operacionais;
- gateway de pagamento;
- PIX;
- Payin e Payout;
- KYC;
- ledger;
- sistemas B2B;
- produtos white label;
- interfaces para dados complexos;
- front-end.

O portfólio deve vender Diego como Product Designer que entende produto, UX, UI, dados, operação e tecnologia.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Framer Motion
- Componentes próprios
- Lucide icons
- SafeImage component

## Regras obrigatórias

- Não faça commit sem autorização explícita.
- Não rode `git add`, `git commit` ou `git push` sem autorização explícita.
- Não instale dependências sem autorização explícita.
- Não altere arquivos fora do escopo pedido.
- Não refatore o projeto inteiro sem autorização.
- Não altere visual aprovado sem necessidade.
- Não altere copy aprovada sem necessidade.
- Não mude rotas sem autorização.
- Não altere `next.config.ts` sem autorização.
- Não altere caminhos de imagens sem verificar `basePath`.
- Não criar componentes novos se a tarefa puder ser feita no arquivo autorizado.

## Validação obrigatória

Depois de qualquer alteração de código, rode:

```bash
npm run lint
npm run build
```

Se a tarefa alterar apenas documentação, textos de guia ou arquivos sem impacto em código, não rode lint/build a menos que o usuário peça.
