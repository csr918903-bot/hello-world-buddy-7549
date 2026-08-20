-- Nutrivida — estrutura do banco de dados
-- Cole tudo isso no SQL Editor do seu projeto Supabase e clique em "Run".

create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  autor text not null,
  titulo text not null,
  texto text not null,
  curtidas integer not null default 0,
  criado_em timestamptz not null default now()
);

create table if not exists public.comentarios (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references public.posts(id) on delete cascade,
  autor text not null,
  texto text not null,
  criado_em timestamptz not null default now()
);

create index if not exists comentarios_post_id_idx on public.comentarios(post_id);

-- Permissões de acesso pela API (obrigatório no Supabase)
grant select, insert, update, delete on public.posts to anon, authenticated;
grant select, insert, delete on public.comentarios to anon, authenticated;
grant all on public.posts to service_role;
grant all on public.comentarios to service_role;

alter table public.posts enable row level security;
alter table public.comentarios enable row level security;

-- O site ainda não tem login de verdade, então a comunidade é aberta:
-- qualquer visitante pode ler e postar. Quando você adicionar login,
-- troque estas políticas por regras baseadas em auth.uid().
create policy "comunidade le posts" on public.posts for select using (true);
create policy "comunidade cria posts" on public.posts for insert with check (true);
create policy "comunidade curte posts" on public.posts for update using (true) with check (true);
create policy "comunidade apaga posts" on public.posts for delete using (true);

create policy "comunidade le comentarios" on public.comentarios for select using (true);
create policy "comunidade cria comentarios" on public.comentarios for insert with check (true);
create policy "comunidade apaga comentarios" on public.comentarios for delete using (true);

-- Alguns posts de exemplo para a página não nascer vazia
insert into public.posts (autor, titulo, texto, curtidas) values
  ('Marina Alves', 'Café da manhã que me segura até o almoço', 'Ovos mexidos com 2 fatias de pão integral, meio abacate e um café sem açúcar. Simples, barato e eu não sinto fome antes do meio-dia.', 12),
  ('Rafael Lima', 'Marmita de domingo para a semana toda', 'Faço arroz integral, frango desfiado e legumes assados no domingo à noite. Divido em 5 potes. Gasto 1h e paro de pedir delivery na correria.', 27),
  ('Bianca Souza', 'Truque para beber mais água', 'Deixo uma garrafa de 1L na mesa e marco com caneta os horários. Se está atrasado eu bebo. Já cheguei em 2,5L por dia sem sofrimento.', 8);
