-- Canonical dynamic-data boundary for the QJC personal website.
-- The D_E website continues to use its existing public tables unchanged.

create schema if not exists "QJC_website";

grant usage on schema "QJC_website" to anon, authenticated, service_role;

create table if not exists "QJC_website".editors (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

create table if not exists "QJC_website".thoughts (
  id uuid primary key default gen_random_uuid(),
  author_id uuid not null default auth.uid() references auth.users(id) on delete restrict,
  title text not null default '',
  body text not null,
  status text not null default 'published' check (status in ('draft', 'published')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint thoughts_body_not_blank check (length(btrim(body)) > 0)
);

create index if not exists thoughts_status_created_at_idx
  on "QJC_website".thoughts (status, created_at desc);

create index if not exists thoughts_author_id_idx
  on "QJC_website".thoughts (author_id);

alter table "QJC_website".editors enable row level security;
alter table "QJC_website".thoughts enable row level security;

revoke all on "QJC_website".editors from anon, authenticated;
revoke all on "QJC_website".thoughts from anon, authenticated;

grant select on "QJC_website".editors to authenticated;
grant select on "QJC_website".thoughts to anon, authenticated;
grant insert, update, delete on "QJC_website".thoughts to authenticated;
grant all on "QJC_website".editors, "QJC_website".thoughts to service_role;

create policy "QJC editors can read own membership"
on "QJC_website".editors
for select
to authenticated
using ((select auth.uid()) = user_id);

create policy "Published QJC thoughts are public"
on "QJC_website".thoughts
for select
to anon, authenticated
using (
  status = 'published'
  or exists (
    select 1
    from "QJC_website".editors e
    where e.user_id = (select auth.uid())
  )
);

create policy "QJC editors can insert thoughts"
on "QJC_website".thoughts
for insert
to authenticated
with check (
  author_id = (select auth.uid())
  and exists (
    select 1
    from "QJC_website".editors e
    where e.user_id = (select auth.uid())
  )
);

create policy "QJC editors can update thoughts"
on "QJC_website".thoughts
for update
to authenticated
using (
  exists (
    select 1
    from "QJC_website".editors e
    where e.user_id = (select auth.uid())
  )
)
with check (
  author_id = (select auth.uid())
  and exists (
    select 1
    from "QJC_website".editors e
    where e.user_id = (select auth.uid())
  )
);

create policy "QJC editors can delete thoughts"
on "QJC_website".thoughts
for delete
to authenticated
using (
  exists (
    select 1
    from "QJC_website".editors e
    where e.user_id = (select auth.uid())
  )
);

-- The hosted project exposes only public and QJC_website through PostgREST.
alter role authenticator set pgrst.db_schemas = 'public, QJC_website';
notify pgrst, 'reload config';
