-- ============================================================
-- Steadfast Student Services — Supabase Database Setup
-- Run this in your Supabase SQL Editor to initialize the schema
-- ============================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ===== LEADS =====
create table if not exists leads (
  id uuid primary key default uuid_generate_v4(),
  email text unique not null,
  full_name text,
  source text check (source in ('chatbot', 'quiz', 'contact', 'blog', 'whatsapp')) default 'contact',
  quiz_data jsonb,
  converted boolean default false,
  created_at timestamptz default now()
);

-- ===== ADVISORS =====
create table if not exists advisors (
  id uuid primary key default uuid_generate_v4(),
  full_name text not null,
  email text unique not null,
  specialization text[],
  active boolean default true,
  created_at timestamptz default now()
);

-- ===== STUDENTS =====
create table if not exists students (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  email text unique not null,
  phone text,
  country_of_origin text,
  risk_tier text check (risk_tier in ('low', 'moderate', 'high')),
  risk_score integer check (risk_score >= 0 and risk_score <= 100),
  service_package text check (service_package in ('standard', 'premium', 'elite')),
  status text check (status in ('lead', 'active', 'enrolled', 'alumni')) default 'lead',
  advisor_id uuid references advisors(id),
  last_active_at timestamptz,
  created_at timestamptz default now()
);

-- ===== APPLICATIONS =====
create table if not exists applications (
  id uuid primary key default uuid_generate_v4(),
  student_id uuid not null references students(id) on delete cascade,
  institution_name text not null,
  program text,
  status text check (status in ('draft', 'submitted', 'decision', 'enrolled')) default 'draft',
  deadline date,
  decision text check (decision in ('accepted', 'rejected', 'waitlist')),
  notes text,
  updated_at timestamptz default now(),
  created_at timestamptz default now()
);

-- Auto-update updated_at
create or replace function update_updated_at()
returns trigger as $$
begin new.updated_at = now(); return new; end;
$$ language plpgsql;

create trigger applications_updated_at
  before update on applications
  for each row execute procedure update_updated_at();

-- ===== DOCUMENTS =====
create table if not exists documents (
  id uuid primary key default uuid_generate_v4(),
  student_id uuid not null references students(id) on delete cascade,
  doc_type text not null,
  file_path text,
  status text check (status in ('pending', 'reviewing', 'approved', 'rejected')) default 'pending',
  advisor_notes text,
  uploaded_at timestamptz default now()
);

-- ===== WHATSAPP SESSIONS =====
-- Stores per-phone conversation history for the Sofia WhatsApp bot
create table if not exists whatsapp_sessions (
  phone text primary key,
  messages jsonb default '[]',
  lead_captured boolean default false,
  updated_at timestamptz default now()
);
create index if not exists idx_whatsapp_sessions_updated on whatsapp_sessions(updated_at desc);

-- If you already ran the schema, add the whatsapp source to the leads table with:
-- alter table leads drop constraint leads_source_check;
-- alter table leads add constraint leads_source_check check (source in ('chatbot', 'quiz', 'contact', 'blog', 'whatsapp'));

-- ===== CHAT SESSIONS =====
-- Stores the full running conversation for every website Sofia chat (not
-- just ones that convert to a lead), so all applicant questions can be
-- reviewed weekly on /admin.
create table if not exists chat_sessions (
  id uuid primary key default uuid_generate_v4(),
  session_key text not null unique,
  student_id uuid references students(id),
  messages jsonb default '[]',
  lead_captured boolean default false,
  started_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- If you already ran this schema before the updated_at/unique additions:
-- alter table chat_sessions add column if not exists updated_at timestamptz default now();
-- alter table chat_sessions add constraint chat_sessions_session_key_key unique (session_key);

-- ===== ROW LEVEL SECURITY =====
alter table students enable row level security;
alter table applications enable row level security;
alter table documents enable row level security;
alter table chat_sessions enable row level security;

-- Students can only read/update their own record
create policy "Students: own row" on students
  for all using (auth.uid() = id);

-- Students can only see their own applications
create policy "Applications: own student" on applications
  for all using (student_id = auth.uid());

-- Students can only see their own documents
create policy "Documents: own student" on documents
  for all using (student_id = auth.uid());

-- Admins (service role) bypass RLS — no additional policy needed

-- ===== STORAGE BUCKET =====
-- Create in Supabase dashboard: Storage > New Bucket > "student-documents" (private)

-- ===== INDEXES =====
create index if not exists idx_students_email on students(email);
create index if not exists idx_students_status on students(status);
create index if not exists idx_applications_student on applications(student_id);
create index if not exists idx_documents_student on documents(student_id);
create index if not exists idx_leads_email on leads(email);
create index if not exists idx_leads_source on leads(source);
create index if not exists idx_leads_created on leads(created_at desc);
create index if not exists idx_chat_sessions_updated on chat_sessions(updated_at desc);
create index if not exists idx_chat_sessions_session_key on chat_sessions(session_key);
