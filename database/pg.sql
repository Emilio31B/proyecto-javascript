create table users(
    id serial primary key not null,
    username varchar(16) not null,
    password varchar(60) not null,
    fullname varchar(100) not null
);

create table links (
    id serial primary key not null,
    tittle varchar(150) not null,
    url varchar(255) not null,
    description text,
    user_id int,
    created_at timestamp not null default current_timestamp,
    constraint fk_user foreign key (user_id) references users(id)
);