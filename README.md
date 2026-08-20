# Nutrivida

Site de nutrição com página inicial, comunidade, chatbot, calculadora de IMC, perfil e login.

## Páginas

- `/` — início com slider de atualizações
- `/comunidade` — feed de ideias de dieta, curtidas e comentários
- `/usuario/{nome}` — perfil público de cada pessoa
- `/chatbot` — assistente de nutrição
- `/imc` — calculadora de IMC
- `/perfil` — seus dados
- `/login` — entrar / criar conta

## Como rodar no seu computador

```sh
npm install
npm run dev
```

## Banco de dados (para os posts aparecerem em todos os dispositivos)

O site funciona sem banco: nesse caso cada pessoa vê só os posts salvos no
próprio navegador. Para deixar a comunidade de verdade:

1. Crie uma conta gratuita em https://supabase.com e um projeto novo.
2. Abra **SQL Editor**, cole o conteúdo de `banco/nutrivida.sql` e clique em **Run**.
3. Em **Project Settings > API**, copie a *Project URL* e a chave *anon public*.
4. Crie um arquivo `.env` na raiz (use o `.env.example` como modelo):

```
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=sua-chave-anon
```

Pronto: os posts, curtidas e comentários passam a ser salvos online.

## Publicar na Vercel

1. Mande o projeto para o GitHub.
2. Em https://vercel.com clique em **Add New > Project** e escolha o repositório.
3. A Vercel detecta o build sozinha (`npm run build`). Não mude nada.
4. Em **Environment Variables**, adicione as mesmas duas linhas do `.env`
   (`VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY`).
5. Clique em **Deploy**. O site sai em um endereço tipo `nutrivida.vercel.app`,
   e você pode ligar um domínio próprio em **Settings > Domains**.

Sempre que você der `git push`, a Vercel publica a nova versão automaticamente.
