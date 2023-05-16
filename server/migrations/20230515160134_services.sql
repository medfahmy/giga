create table services (
    id int primary key,
    name varchar(255) not null,
    category_id int not null,
    provider_id int not null,
    consumer_id int not null,
    image_url varchar(255) not null,
    created_at timestamp not null,
    updated_at timestamp not null
);
