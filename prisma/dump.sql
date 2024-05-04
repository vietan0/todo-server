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
    "userId" uuid NOT NULL
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
    "parentTaskId" uuid
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

COPY public."Project" (id, name, "createdAt", "updatedAt", "userId") FROM stdin;
65f38cc9-13e3-49b4-92eb-ad01aedd94ad	Practical Frozen Car	2024-05-02 05:01:17.88	2024-05-02 05:01:17.88	224501b9-11b6-4bdc-9953-cfc5ef5fdfd4
057c17a4-c96c-40fb-8e3b-422865f1d0d2	Practical Cotton Cheese	2024-05-02 05:02:34.15	2024-05-02 05:02:34.15	da94b4b6-8234-4698-a493-c96433c61aa3
acdd0c13-ad06-4596-8026-d62fc7e25b02	Fantastic Cotton Chips	2024-05-02 05:02:34.844	2024-05-02 05:02:34.844	da94b4b6-8234-4698-a493-c96433c61aa3
\.


--
-- Data for Name: Task; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Task" (id, name, completed, "createdAt", "updatedAt", "projectId", "parentTaskId") FROM stdin;
8a59655d-ea8a-4323-a877-1a5b8084f284	compress the port	f	2024-05-02 05:01:32.484	2024-05-02 05:01:32.484	65f38cc9-13e3-49b4-92eb-ad01aedd94ad	\N
bec8c750-95f8-46c2-a6a3-b9aa456a8982	bypass the driver	f	2024-05-02 05:01:43.842	2024-05-02 05:01:43.842	65f38cc9-13e3-49b4-92eb-ad01aedd94ad	8a59655d-ea8a-4323-a877-1a5b8084f284
ac2882fc-648f-4c6c-a3da-c821c6c7a53a	copy the panel	f	2024-05-02 05:01:45.798	2024-05-02 05:01:45.798	65f38cc9-13e3-49b4-92eb-ad01aedd94ad	8a59655d-ea8a-4323-a877-1a5b8084f284
9d44af76-3abf-491d-9087-cc68ecc6bcc0	index the feed	f	2024-05-02 05:02:57.352	2024-05-02 05:02:57.352	acdd0c13-ad06-4596-8026-d62fc7e25b02	\N
837a9979-a06a-4587-933a-cb1310283e22	navigate the protocol	f	2024-05-02 05:02:59.055	2024-05-02 05:02:59.055	acdd0c13-ad06-4596-8026-d62fc7e25b02	9d44af76-3abf-491d-9087-cc68ecc6bcc0
77355ead-5d66-425d-806e-a2fbd5cb770e	bypass the monitor	f	2024-05-02 05:04:07.61	2024-05-02 05:04:07.61	057c17a4-c96c-40fb-8e3b-422865f1d0d2	\N
4f1cbf6f-20b2-4a32-b4d3-dc5ba7d02698	quantify the microchip	f	2024-05-02 05:04:12.717	2024-05-02 05:04:12.717	057c17a4-c96c-40fb-8e3b-422865f1d0d2	\N
e8865efd-54c1-4fe2-9520-af76d0c5bb78	parse the transmitter	f	2024-05-02 05:04:15.912	2024-05-02 05:04:15.912	057c17a4-c96c-40fb-8e3b-422865f1d0d2	4f1cbf6f-20b2-4a32-b4d3-dc5ba7d02698
8ada3d13-438c-4d50-9d7f-f2cef95bb566	reboot the transmitter	f	2024-05-02 05:04:19.554	2024-05-02 05:04:19.554	057c17a4-c96c-40fb-8e3b-422865f1d0d2	4f1cbf6f-20b2-4a32-b4d3-dc5ba7d02698
8e2f61fa-a0f4-45a4-9dd1-27d7dcba3642	reboot the matrix	f	2024-05-02 05:04:11.687	2024-05-02 05:06:10.655	057c17a4-c96c-40fb-8e3b-422865f1d0d2	77355ead-5d66-425d-806e-a2fbd5cb770e
9e33670d-157f-4ca7-88dc-4ade6d18db45	buy the cat	f	2024-05-04 09:52:20.106	2024-05-04 09:52:01.348	acdd0c13-ad06-4596-8026-d62fc7e25b02	\N
83eea42f-556a-4302-a79b-c9be015400eb	disport the antiquity	f	2024-05-04 10:33:42.802	2024-05-04 10:33:42.802	acdd0c13-ad06-4596-8026-d62fc7e25b02	\N
7bb88df7-5a75-43c0-a201-2dbf60ba80c4	undulate the goodbye	f	2024-05-04 10:33:42.822	2024-05-04 10:33:42.822	acdd0c13-ad06-4596-8026-d62fc7e25b02	\N
92d2adc2-d785-4d99-9c65-8ef126feb818	charge the harmonica	t	2024-05-02 05:02:49.889	2024-05-04 10:33:42.909	acdd0c13-ad06-4596-8026-d62fc7e25b02	\N
5bf97843-4e24-46c6-ba88-1f4da98d7b95	navigate the alarm	t	2024-05-02 05:02:52.454	2024-05-04 10:33:42.909	acdd0c13-ad06-4596-8026-d62fc7e25b02	92d2adc2-d785-4d99-9c65-8ef126feb818
f22a5e2c-c115-4335-8466-28b9d8c3758c	postulate the space	t	2024-05-04 10:33:42.841	2024-05-04 10:33:42.909	acdd0c13-ad06-4596-8026-d62fc7e25b02	92d2adc2-d785-4d99-9c65-8ef126feb818
2de8dcad-2a0f-43b8-b3e7-a6c3492fd66f	minus the bottle	f	2024-05-04 11:01:07.56	2024-05-04 11:00:41.395	acdd0c13-ad06-4596-8026-d62fc7e25b02	9d44af76-3abf-491d-9087-cc68ecc6bcc0
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

