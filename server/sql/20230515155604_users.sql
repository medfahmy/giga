-- Add migration script here
create table users (
    id int primary key,
    -- email varchar(255) not null,
    phone varchar(255) not null,
    password_hash varchar(255) not null,
    -- role_id int not null,
    -- first_name varchar(255) not null,
    -- last_name varchar(255) not null,
    -- image_url varchar(255) not null,
    -- location varchar(255) not null,
    created_at timestamp not null default now(),
    updated_at timestamp not null default now()
);
