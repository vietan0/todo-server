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
    lexorank text NOT NULL
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
    lexorank text NOT NULL,
    body text
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
258255b1-829b-4181-b088-2ce5ddeb327c	Project for Frontend	2025-03-03 08:53:26.436	2025-03-03 08:54:49.587	da94b4b6-8234-4698-a493-c96433c61aa3	0|28zzzz:
acdd0c13-ad06-4596-8026-d62fc7e25b02	Project for Testing[1]	2024-05-02 05:02:34.844	2025-03-03 08:55:30.194	da94b4b6-8234-4698-a493-c96433c61aa3	0|1oqzzz:
7760fd08-cbab-4fb1-9698-db00bcaca014	Project for Testing[0]	2025-03-03 08:53:26.472	2025-03-03 08:55:38.457	da94b4b6-8234-4698-a493-c96433c61aa3	0|14hzzz:
508fac0c-fde0-4288-aee2-9d7ae22012b9	Project for Testing[2]	2025-03-03 10:39:36.752	2025-03-03 10:39:36.752	da94b4b6-8234-4698-a493-c96433c61aa3	0|0k8zzz:
\.


--
-- Data for Name: Task; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Task" (id, name, completed, "createdAt", "updatedAt", "projectId", "parentTaskId", lexorank, body) FROM stdin;
ee0c7d8a-95ee-487e-8d66-3589faacb883	guys' apartment	f	2025-03-03 08:57:07.006	2025-03-03 08:57:07.006	7760fd08-cbab-4fb1-9698-db00bcaca014	\N	0|4hzzzz:	
7ac58372-fcb0-49e7-8326-80ae5882cd6a	joey tribbiani	f	2025-03-03 08:56:34.771	2025-03-03 08:57:08.515	7760fd08-cbab-4fb1-9698-db00bcaca014	ee0c7d8a-95ee-487e-8d66-3589faacb883	0|hzzzzz:	
c04336a9-85e6-4a43-a84d-801eb27ed3e3	chandler bing	f	2025-03-03 08:56:15.52	2025-03-03 08:57:10.205	7760fd08-cbab-4fb1-9698-db00bcaca014	ee0c7d8a-95ee-487e-8d66-3589faacb883	0|hzzzzr:	
443edac1-e763-4d70-b605-03f35cf60299	girls' apartment	f	2025-03-03 08:57:24.26	2025-03-03 08:57:24.26	7760fd08-cbab-4fb1-9698-db00bcaca014	\N	0|28zzzz:	
697c5127-ec2f-4390-8a3f-408ed742681a	monica geller	f	2025-03-03 08:57:28.113	2025-03-03 08:57:46.04	7760fd08-cbab-4fb1-9698-db00bcaca014	443edac1-e763-4d70-b605-03f35cf60299	0|hzzzzz:	
deff9eba-003a-4897-9906-eef2fccc3782	rachel green	f	2025-03-03 08:57:43.655	2025-03-03 08:57:47.664	7760fd08-cbab-4fb1-9698-db00bcaca014	443edac1-e763-4d70-b605-03f35cf60299	0|i00007:	
827e8b48-e748-4dc1-ba15-8a93874504d0	nicolas cage	f	2025-03-03 09:16:14.082	2025-03-03 09:16:14.082	acdd0c13-ad06-4596-8026-d62fc7e25b02	\N	0|14hzzz:	in ghost rider
6edb4bb4-beb8-4bf0-a02c-90cd9ceef95e	blaze the glory	f	2025-03-03 09:13:47.644	2025-03-03 09:16:17.254	acdd0c13-ad06-4596-8026-d62fc7e25b02	827e8b48-e748-4dc1-ba15-8a93874504d0	0|hzzzzz:	
3c34634f-f6a4-41e4-9bf8-5c46e68f1d23	standalone	f	2025-03-03 09:16:42.797	2025-03-03 09:16:42.797	acdd0c13-ad06-4596-8026-d62fc7e25b02	\N	0|0k8zzz:	
0c23434a-b6a8-4161-803a-0562b3ffc249	a task	f	2025-03-03 10:39:49.056	2025-03-03 10:39:49.056	508fac0c-fde0-4288-aee2-9d7ae22012b9	\N	0|hzzzzz:	
7dcfd443-6800-4432-9817-f443e5d5cea3	impact the comma	f	2024-06-16 05:48:29.637	2025-03-04 08:54:41.884	acdd0c13-ad06-4596-8026-d62fc7e25b02	\N	0|4hzzzz:	
8ae29c43-3acf-4cc5-ab29-d896164e8320	stray the set	f	2024-06-16 05:42:44.744	2025-03-04 08:54:47.424	acdd0c13-ad06-4596-8026-d62fc7e25b02	7dcfd443-6800-4432-9817-f443e5d5cea3	0|hzzzzz:	
83eea42f-556a-4302-a79b-c9be015400eb	disport the antiquity	f	2024-05-04 10:33:42.802	2025-03-04 08:54:56.943	acdd0c13-ad06-4596-8026-d62fc7e25b02	7dcfd443-6800-4432-9817-f443e5d5cea3	0|i0000n:	
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."User" (id, email, password, "createdAt", "updatedAt") FROM stdin;
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
1d246fe0-0561-432c-b28d-096ccd7ff0f8	96b8c9e6ccf0c23da83a2ebc91c2df202002e91d46dc027d2f661982c68abc8c	2025-03-02 17:52:00.239982+07	20250216100932_add_body_to_tasks	\N	\N	2025-03-02 17:52:00.23644+07	1
935388ba-6fa7-4bbe-ba8e-c6a7bd3a0f9c	e37f1be8c23b81476efef8633195a5aa3311c7813f661c0df6cd7b92f431b3d3	2025-03-04 14:36:50.903804+07	20250304073650_make_lexorank_required	\N	\N	2025-03-04 14:36:50.894722+07	1
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

