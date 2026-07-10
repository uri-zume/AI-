-- Supabase/PostgreSQL production schema
create type app_role as enum ('candidate','admin','corporate_manager');
create table profiles(id uuid primary key references auth.users on delete cascade, display_name text not null, role app_role not null default 'candidate', organization_id uuid, created_at timestamptz default now());
create table organizations(id uuid primary key default gen_random_uuid(), name text not null, created_at timestamptz default now());
create table questions(id uuid primary key default gen_random_uuid(), category text not null, prompt text not null, options jsonb, rubric jsonb, difficulty numeric, is_active boolean default true, created_at timestamptz default now());
create table exam_forms(id uuid primary key default gen_random_uuid(), version text unique not null, published_at timestamptz, settings jsonb not null default '{}');
create table attempts(id uuid primary key default gen_random_uuid(), user_id uuid references profiles(id), exam_form_id uuid references exam_forms(id), raw_score numeric, scaled_score numeric, percentile numeric, level text, status text default 'started', proctor_flags jsonb default '[]', started_at timestamptz default now(), submitted_at timestamptz);
create table responses(id uuid primary key default gen_random_uuid(), attempt_id uuid references attempts(id) on delete cascade, question_id uuid references questions(id), response jsonb, raw_points numeric, ai_feedback jsonb);
create table certificates(id uuid primary key default gen_random_uuid(), attempt_id uuid unique references attempts(id), certificate_no text unique not null, pdf_path text, issued_at timestamptz default now(), revoked_at timestamptz);
create table payments(id uuid primary key default gen_random_uuid(), user_id uuid references profiles(id), stripe_session_id text unique, amount integer, status text, created_at timestamptz default now());
alter table profiles enable row level security; alter table attempts enable row level security; alter table responses enable row level security; alter table certificates enable row level security;
create policy "own profile" on profiles for select using (auth.uid()=id);
create policy "own attempts" on attempts for select using (auth.uid()=user_id);
create policy "own responses" on responses for select using (exists(select 1 from attempts a where a.id=attempt_id and a.user_id=auth.uid()));
create policy "own certificates" on certificates for select using (exists(select 1 from attempts a where a.id=attempt_id and a.user_id=auth.uid()));
