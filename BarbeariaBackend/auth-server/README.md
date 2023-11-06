
CREATE TABLE public.oauth_access_token (
token_id varchar(256) NULL,
token bytea NULL,
authentication_id varchar(256) NOT NULL,
user_name varchar(256) NULL,
client_id varchar(256) NULL,
authentication bytea NULL,
refresh_token varchar(256) NULL,
CONSTRAINT oauth_access_token_pk PRIMARY KEY (authentication_id)
);

CREATE TABLE public.oauth_approvals (
userid varchar(256) NULL,
clientid varchar(256) NULL,
"scope" varchar(256) NULL,
status varchar(10) NULL,
expiresat timestamp NULL,
lastmodifiedat timestamp NULL
);

CREATE TABLE public.oauth_client_details (
client_id varchar(256) NOT NULL,
resource_ids varchar(256) NULL,
client_secret varchar(256) NULL,
"scope" varchar(256) NULL,
authorized_grant_types varchar(256) NULL,
web_server_redirect_uri varchar(256) NULL,
authorities varchar(256) NULL,
access_token_validity int4 NULL,
refresh_token_validity int4 NULL,
additional_information varchar(4096) NULL,
autoapprove varchar(256) NULL,
CONSTRAINT oauth_client_details_pkey PRIMARY KEY (client_id)
);

CREATE TABLE public.oauth_client_token (
token_id varchar(256) NULL,
token bytea NULL,
authentication_id varchar(256) NULL,
user_name varchar(256) NULL,
client_id varchar(256) NULL
);


CREATE TABLE public.oauth_code (
code varchar(256) NULL,
authentication bytea NULL
);

CREATE TABLE public.oauth_refresh_token (
token_id varchar(256) NULL,
token bytea NULL,
authentication bytea NULL
);

insert into user_auth (login, "password", roles, tenant, active)
values
('teste', 'ba3253876aed6bc22d4a6ff53d8406c6ad864195ed144ab5c87621b6c233b548baeae6956df346ec8c17f5ea10f35ee3cbc514797ed7ddd3145464e2a0bab413', 'ROLE_ADMIN', 'teste', true);


insert into oauth_client_details (client_id, client_secret, "scope", authorized_grant_types, access_token_validity, refresh_token_validity)
values
('teste', 'ba3253876aed6bc22d4a6ff53d8406c6ad864195ed144ab5c87621b6c233b548baeae6956df346ec8c17f5ea10f35ee3cbc514797ed7ddd3145464e2a0bab413', 'read,write', 'password,authorization_code,refresh_token', 15552000, 15552000);


select * from user_auth;
select * from oauth_client_details;