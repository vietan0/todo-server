--
-- PostgreSQL database dump
--

-- Dumped from database version 16.2
-- Dumped by pg_dump version 16.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

DROP DATABASE "todo-server";
--
-- Name: todo-server; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE "todo-server" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_United States.1252';


ALTER DATABASE "todo-server" OWNER TO postgres;

\connect -reuse-previous=on "dbname='todo-server'"

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Project; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Project" (
    id uuid NOT NULL,
    name character varying(255) NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "userId" uuid NOT NULL,
    lexorank text
);


ALTER TABLE public."Project" OWNER TO postgres;

--
-- Name: Task; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Task" (
    id uuid NOT NULL,
    name character varying(255) NOT NULL,
    completed boolean DEFAULT false NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "projectId" uuid NOT NULL,
    "parentTaskId" uuid,
    lexorank text
);


ALTER TABLE public."Task" OWNER TO postgres;

--
-- Name: User; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."User" (
    id uuid NOT NULL,
    email character varying(255) NOT NULL,
    password text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."User" OWNER TO postgres;

--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO postgres;

--
-- Data for Name: Project; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Project" (id, name, "createdAt", "updatedAt", "userId", lexorank) FROM stdin;
acdd0c13-ad06-4596-8026-d62fc7e25b02	Fantastic Cotton Chips	2024-05-02 05:02:34.844	2024-06-16 05:46:17.294	da94b4b6-8234-4698-a493-c96433c61aa3	0|i0000v:
65f38cc9-13e3-49b4-92eb-ad01aedd94ad	Practical Frozen Car	2024-05-02 05:01:17.88	2024-06-16 05:54:38.39	da94b4b6-8234-4698-a493-c96433c61aa3	0|hzzzzz:
\.


--
-- Data for Name: Task; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Task" (id, name, completed, "createdAt", "updatedAt", "projectId", "parentTaskId", lexorank) FROM stdin;
6da9d06d-7fe7-4d52-b84d-23da38ac24be	simulate the ambassador	f	2024-06-16 05:48:29.603	2024-06-16 05:48:29.603	acdd0c13-ad06-4596-8026-d62fc7e25b02	\N	0|8zzzzz:
7dcfd443-6800-4432-9817-f443e5d5cea3	impact the comma	f	2024-06-16 05:48:29.637	2024-06-16 05:48:29.637	acdd0c13-ad06-4596-8026-d62fc7e25b02	\N	0|4hzzzz:
7bb88df7-5a75-43c0-a201-2dbf60ba80c4	undulate the goodbye	f	2024-05-04 10:33:42.822	2024-06-16 05:55:50.806	acdd0c13-ad06-4596-8026-d62fc7e25b02	6da9d06d-7fe7-4d52-b84d-23da38ac24be	0|i0000f:
9d44af76-3abf-491d-9087-cc68ecc6bcc0	index the feed	f	2024-05-02 05:02:57.352	2024-06-16 05:46:19.727	65f38cc9-13e3-49b4-92eb-ad01aedd94ad	\N	0|hzzzzz:
8a59655d-ea8a-4323-a877-1a5b8084f284	compress the port	f	2024-05-02 05:01:32.484	2024-06-16 05:46:19.727	65f38cc9-13e3-49b4-92eb-ad01aedd94ad	\N	0|i00007:
a9cad9a7-53e3-472d-ab98-5d0d6d3eb94f	militarize the variant	f	2024-06-16 05:42:44.715	2024-06-16 05:46:19.727	acdd0c13-ad06-4596-8026-d62fc7e25b02	\N	0|i00007:
ac2882fc-648f-4c6c-a3da-c821c6c7a53a	copy the panel	f	2024-05-02 05:01:45.798	2024-06-16 05:46:19.738	65f38cc9-13e3-49b4-92eb-ad01aedd94ad	8a59655d-ea8a-4323-a877-1a5b8084f284	0|hzzzzz:
2de8dcad-2a0f-43b8-b3e7-a6c3492fd66f	minus the bottle	f	2024-05-04 11:01:07.56	2024-06-16 05:46:19.739	65f38cc9-13e3-49b4-92eb-ad01aedd94ad	9d44af76-3abf-491d-9087-cc68ecc6bcc0	0|hzzzzz:
837a9979-a06a-4587-933a-cb1310283e22	navigate the protocol	f	2024-05-02 05:02:59.055	2024-06-16 05:46:19.739	65f38cc9-13e3-49b4-92eb-ad01aedd94ad	9d44af76-3abf-491d-9087-cc68ecc6bcc0	0|i00007:
bec8c750-95f8-46c2-a6a3-b9aa456a8982	bypass the driver	f	2024-05-02 05:01:43.842	2024-06-16 05:46:19.738	65f38cc9-13e3-49b4-92eb-ad01aedd94ad	8a59655d-ea8a-4323-a877-1a5b8084f284	0|i00007:
83eea42f-556a-4302-a79b-c9be015400eb	disport the antiquity	f	2024-05-04 10:33:42.802	2024-06-16 06:07:33.331	acdd0c13-ad06-4596-8026-d62fc7e25b02	7dcfd443-6800-4432-9817-f443e5d5cea3	0|i0000n:
8ae29c43-3acf-4cc5-ab29-d896164e8320	stray the set	f	2024-06-16 05:42:44.744	2024-06-16 06:07:33.331	acdd0c13-ad06-4596-8026-d62fc7e25b02	7dcfd443-6800-4432-9817-f443e5d5cea3	0|hzzzzz:
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."User" (id, email, password, "createdAt", "updatedAt") FROM stdin;
f09e3088-d756-44ea-8195-4d30a27644fe	Avery.Mills@hotmail.com	$2b$05$td/mTwx5b.0CzfU1Dsexxeg4q5CnjFpO4vc8I6J7tmWmhDBfp.sUy	2024-05-02 04:59:30.019	2024-05-02 04:59:30.019
224501b9-11b6-4bdc-9953-cfc5ef5fdfd4	Mac_Walker@hotmail.com	$2b$05$l5HcAL6YLb81uJRNlh3Qd.g7ye6Vfs.99ZbTaOD9x0c6yGWeU6ena	2024-05-02 04:59:31.281	2024-05-02 04:59:31.281
da94b4b6-8234-4698-a493-c96433c61aa3	postman@gmail.com	$2b$05$j9xQPocVilzoi/eqSFXJj.O6cpm6hBZhMqklSesOaVhNRWafSxhaG	2024-05-02 05:00:15.696	2024-05-02 05:00:15.696
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
91551d69-eaf3-4c78-8b29-57130975f2be	860ad83ccc0d1021e4eca7cbe86276d57eceab5f20b7df865bfacb00c54e2d82	2024-04-25 21:47:37.836946+07	20240425144737_init	\N	\N	2024-04-25 21:47:37.809377+07	1
5781667e-1e84-4884-a61e-3f3414e465c7	15a7da4a4095e25d1094462b3219050c1a71db0459ca02e4bbf6d4abb8c03afc	2024-05-01 16:57:52.966626+07	20240501095752_add_cascade	\N	\N	2024-05-01 16:57:52.941578+07	1
b3fcf403-9ab5-49e0-8871-52780e5964f8	d184c87477b9ab1ee5ec537dcaa05a58269125ca2340b3f8f8c89accc61192fa	2024-06-16 12:21:45.892008+07	20240612042410_add_lexorank	\N	\N	2024-06-16 12:21:45.886543+07	1
68186a20-7655-4a57-bb82-a69ae2da6d96	0d9ff0e628147478a973fad6533d30b6db38d453801b4267cd4155ff3fd5a103	2024-06-16 12:21:45.90498+07	20240615035700_remove_lexorank_length_constraint	\N	\N	2024-06-16 12:21:45.893042+07	1
\.


--
-- Name: Project Project_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Project"
    ADD CONSTRAINT "Project_pkey" PRIMARY KEY (id);


--
-- Name: Task Task_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Task"
    ADD CONSTRAINT "Task_pkey" PRIMARY KEY (id);


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: User_email_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);


--
-- Name: Project Project_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Project"
    ADD CONSTRAINT "Project_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Task Task_parentTaskId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Task"
    ADD CONSTRAINT "Task_parentTaskId_fkey" FOREIGN KEY ("parentTaskId") REFERENCES public."Task"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Task Task_projectId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Task"
    ADD CONSTRAINT "Task_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES public."Project"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

