document.addEventListener('DOMContentLoaded', () => {
    const copyButtons = document.querySelectorAll('[data-copy]');
    const toast = document.getElementById('toast');
    const langSelect = document.getElementById('langSelect');
    const techTags = document.querySelectorAll('.tech-tag');
    const filterBtns = document.querySelectorAll('.edu-filter-btn');
    const eduCards = document.querySelectorAll('.edu-card');
    let toastTimeout = null;

    // Modais de Experiência e Stack
    const expModal = document.getElementById('expModal');
    const closeExpModal = expModal.querySelector('.close-modal');
    const modalCompanyTag = document.getElementById('modalCompanyTag');
    const modalCompanyTitle = document.getElementById('modalCompanyTitle');
    const modalCompanyContent = document.getElementById('modalCompanyContent');
    const interactiveExps = document.querySelectorAll('.interactive-exp');

    // Modais de Papel (Diploma/Certificado)
    const paperModal = document.getElementById('paperModal');
    const closePaperModal = paperModal.querySelector('.close-paper');
    const paperTriggers = document.querySelectorAll('.paper-trigger');
    const paperTitle = document.getElementById('paperTitle');
    const paperInstitution = document.getElementById('paperInstitution');
    const paperDesc = document.getElementById('paperDesc');
    const paperDate = document.getElementById('paperDate');

    let currentLang = 'pt';
    let activeCompanyKey = null;
    let activeEduKey = null;

    // Dicionário de Traduções (PT, EN, ES)
    const translations = {
        pt: {
            logo: "Rian Santos",
            nav_about: "Sobre",
            nav_skills: "Skills",
            nav_experience: "Experiência",
            nav_hobbies: "Hobbies",
            nav_education: "Formação",
            nav_contact: "Contato",
            hero_badge: "Garantindo qualidade e caçando bugs",
            hero_title: "Quality Assurance Engineer & Bug Hunter",
            hero_subtitle: "Especialista em automação de testes end-to-end, validação de APIs e qualidade de software com mais de 10 anos de experiência em grandes corporações.",
            btn_contact: "Entrar em Contato",
            stat_exp: "Anos de Experiência",
            stat_certs: "Certificações & Cursos",
            stat_focus: "Foco em Qualidade & Regressão",
            skills_title: "Stack Tecnológica",
            skills_subtitle: "Clique em qualquer tecnologia para inspecionar o status e ver os detalhes.",
            skill_cat1: "Automação & E2E",
            skill_cat2: "APIs & Banco de Dados",
            skill_cat3: "Inteligência Artificial",
            skill_cat4: "DevOps & Gestão",
            exp_title: "Experiência Profissional",
            exp_subtitle: "Clique em uma empresa para inspecionar o dossiê da operação.",
            exp_deloitte_short: "Validação de soluções de IA conversacional (ChatPetrobras), homologação de ferramentas inteligentes para refatoração de código e segurança financeira.",
            exp_ecs_short: "Ganho de 20% em cobertura de testes via automação em Cypress, consumo de APIs e ecossistema Farma.",
            exp_indra_short: "Aumento de 40% no volume de testes automatizados com Cypress e Robot Framework, aplicação de métricas TMMi.",
            exp_wati_short: "Execução em sistemas de Urgência Hospitalar (PEP/SoulMV), regressão cross-browser e SQL Developer.",
            exp_accenture_short: "5 anos dedicados à qualidade em produtos web/mobile, scripts Oracle PL/SQL e telecomunicações.",
            inspect_hint: "Ver Detalhes da Operação →",
            hobbies_title: "Hobbies & Interesses",
            hobbies_subtitle: "O que me mantém energizado fora das telas de teste e automação.",
            hobby1_title: "Violão & Música ao Vivo",
            hobby1_desc: "Criação de arranjos musicais e experimentos com setups inspirados em Loop Sessions.",
            hobby2_title: "Jogos de Aventura & RPG",
            hobby2_desc: "Exploração de mundos imersivos como Cyberpunk 2077, Far Cry e PUBG.",
            hobby3_title: "Praia & Natureza",
            hobby3_desc: "Momentos de lazer e renovação em áreas costeiras e trilhas ao ar livre.",
            hobby4_title: "Projetos Indie & Dev",
            hobby4_desc: "Desenvolvimento de jogos de cartas em navegador e extensões customizadas.",
            edu_title: "Formação & Certificações",
            edu_subtitle: "Clique em qualquer formação ou certificado abaixo para abrir o documento oficial.",
            filter_all: "Todas (12)",
            filter_academic: "Acadêmico",
            filter_qa: "QA & Automação",
            filter_sec: "Segurança & Cloud",
            filter_eng: "Engenharia & Dev",
            edu_post_type: "Pós-Graduação (Em andamento)",
            edu_post_title: "Qualidade e Teste de Software",
            edu_post_desc: "Especialização Lato Sensu em Engenharia da Qualidade",
            edu_deg_type: "Graduação Superior",
            edu_deg_title: "Análise e Desenvolvimento de Sistemas",
            edu_deg_desc: "Concluído em 2024 • Diploma Superior de Tecnologia",
            cyp_type: "Automação E2E",
            cyp_title: "Testes Automatizados com Cypress (Básico ao Intermediário)",
            cyp_desc: "Arquitetura de testes, Page Objects e integração contínua",
            alqa_type: "Gestão da Qualidade",
            alqa_title: "Quality Assurance: Plano de Testes e Gestão de Bugs",
            alqa_desc: "Estratégias de validação, rastreabilidade e ciclo de vida de defeitos",
            it_type: "Preparatório & Prática",
            it_title: "Certificações em Teste de Software e QA",
            it_desc: "Fundamentos de testes baseados no syllabus BSTQB / ISTQB",
            jas_type: "Testes Unitários",
            jas_title: "Angular e Jasmine: Testes de Unidade",
            jas_desc: "Validação de componentes front-end e cobertura de código",
            cap_type: "Certificação Internacional",
            cap_title: "Cybersecurity Awareness Professional (CAPC™)",
            cap_desc: "Emitido em Ago 2024 • Credencial Oficial CertiProf",
            cyb_type: "Segurança Ofensiva & Defensiva",
            cyb_title: "Curso Completo em Cyber Security",
            cyb_desc: "Segurança da Informação, Blindagem e DevOps Contínuo",
            dyn_type: "Observabilidade & APM",
            dyn_title: "Dynatrace Masterclass (2026)",
            dyn_desc: "Monitoramento de performance, logs e análise de causa raiz",
            azu_type: "Cloud Computing",
            azu_title: "Microsoft Azure Cloud Native",
            azu_desc: "Emitido em 2025 • Arquitetura em nuvem e ecossistema Azure",
            swe_type: "Trilha Completa",
            swe_title: "Formação Engenharia de Software",
            swe_desc: "Arquitetura, ciclo de vida de sistemas, agilidade e boas práticas",
            net_type: "Infraestrutura & Protocolos",
            net_title: "Redes de Computadores & Lifelong Learning Badge",
            net_desc: "Protocolos HTTP/TCP-IP, infraestrutura e aprendizado contínuo",
            paper_hint: "📄 Abrir Documento",
            paper_seal: "★ CREDENCIAL VERIFICADA",
            paper_verify: "Verificar no LinkedIn ↗",
            btn_all_certs: "Ver todas as +35 licenças e certificados no LinkedIn ↗",
            contact_title: "Vamos construir software com qualidade?",
            contact_subtitle: "Entre em contato direto para oportunidades, projetos ou conexões profissionais.",
            btn_copy_email: "Copiar E-mail ⎘",
            btn_copy_phone: "Copiar Telefone ⎘",
            footer_text: "© 2026 Rian Barbosa Dos Santos. Todos os direitos reservados."
        },
        en: {
            logo: "Rian Santos",
            nav_about: "About",
            nav_skills: "Skills",
            nav_experience: "Experience",
            nav_hobbies: "Hobbies",
            nav_education: "Education",
            nav_contact: "Contact",
            hero_badge: "Ensuring quality and hunting bugs",
            hero_title: "Quality Assurance Engineer & Bug Hunter",
            hero_subtitle: "Specialist in end-to-end test automation, API validation, and software quality with over 10 years of experience in major corporations.",
            btn_contact: "Get in Touch",
            stat_exp: "Years of Experience",
            stat_certs: "Certifications & Courses",
            stat_focus: "Focus on Quality & Regression",
            skills_title: "Tech Stack",
            skills_subtitle: "Click on any technology to inspect its status and details.",
            skill_cat1: "Automation & E2E",
            skill_cat2: "APIs & Databases",
            skill_cat3: "Artificial Intelligence",
            skill_cat4: "DevOps & Management",
            exp_title: "Professional Experience",
            exp_subtitle: "Click on any company to inspect the operation dossier.",
            exp_deloitte_short: "Validation of conversational AI solutions (ChatPetrobras), smart tools homologation for code refactoring, and financial security.",
            exp_ecs_short: "20% increase in test coverage via Cypress automation, API consumption, and Farma ecosystem.",
            exp_indra_short: "40% increase in automated test volume using Cypress and Robot Framework, TMMi metrics application.",
            exp_wati_short: "Execution in Hospital Emergency systems (PEP/SoulMV), cross-browser regression, and SQL Developer.",
            exp_accenture_short: "5 years dedicated to quality in web/mobile products, Oracle PL/SQL scripts, and telecommunications.",
            inspect_hint: "View Operation Details →",
            hobbies_title: "Hobbies & Interests",
            hobbies_subtitle: "What keeps me energized outside testing and automation screens.",
            hobby1_title: "Acoustic Guitar & Live Music",
            hobby1_desc: "Creating musical arrangements and experimenting with setups inspired by Loop Sessions.",
            hobby2_title: "Adventure Games & RPG",
            hobby2_desc: "Exploring immersive worlds like Cyberpunk 2077, Far Cry, and PUBG.",
            hobby3_title: "Beach & Nature",
            hobby3_desc: "Leisure moments and renewal in coastal areas and outdoor trails.",
            hobby4_title: "Indie & Dev Projects",
            hobby4_desc: "Developing browser card games and custom browser extensions.",
            edu_title: "Education & Certifications",
            edu_subtitle: "Click on any degree or certificate below to open the official document.",
            filter_all: "All (12)",
            filter_academic: "Academic",
            filter_qa: "QA & Automation",
            filter_sec: "Security & Cloud",
            filter_eng: "Engineering & Dev",
            edu_post_type: "Post-Graduate (In Progress)",
            edu_post_title: "Software Quality and Testing",
            edu_post_desc: "Lato Sensu Specialization in Quality Engineering",
            edu_deg_type: "Bachelor / Technologist",
            edu_deg_title: "Systems Analysis and Development",
            edu_deg_desc: "Completed in 2024 • Higher Technology Diploma",
            cyp_type: "E2E Automation",
            cyp_title: "Automated Testing with Cypress (Basic to Intermediate)",
            cyp_desc: "Test architecture, Page Objects, and continuous integration",
            alqa_type: "Quality Management",
            alqa_title: "Quality Assurance: Test Plans and Bug Management",
            alqa_desc: "Validation strategies, traceability, and defect lifecycle",
            it_type: "Preparatory & Practice",
            it_title: "Software Testing & QA Certifications",
            it_desc: "Testing fundamentals based on BSTQB / ISTQB syllabus",
            jas_type: "Unit Testing",
            jas_title: "Angular and Jasmine: Unit Testing",
            jas_desc: "Front-end component validation and code coverage",
            cap_type: "International Cert",
            cap_title: "Cybersecurity Awareness Professional (CAPC™)",
            cap_desc: "Issued Aug 2024 • Official CertiProf Credential",
            cyb_type: "Offensive & Defensive Security",
            cyb_title: "Complete Cyber Security Course",
            cyb_desc: "Information Security, Hardening, and Continuous DevOps",
            dyn_type: "Observability & APM",
            dyn_title: "Dynatrace Masterclass (2026)",
            dyn_desc: "Performance monitoring, logs, and root cause analysis",
            azu_type: "Cloud Computing",
            azu_title: "Microsoft Azure Cloud Native",
            azu_desc: "Issued 2025 • Cloud architecture and Azure ecosystem",
            swe_type: "Complete Track",
            swe_title: "Software Engineering Track",
            swe_desc: "Architecture, systems lifecycle, agility, and best practices",
            net_type: "Infrastructure & Protocols",
            net_title: "Computer Networks & Lifelong Learning Badge",
            net_desc: "HTTP/TCP-IP protocols, infrastructure, and continuous learning",
            paper_hint: "📄 Open Document",
            paper_seal: "★ VERIFIED CREDENTIAL",
            paper_verify: "Verify on LinkedIn ↗",
            btn_all_certs: "View all 35+ licenses and certifications on LinkedIn ↗",
            contact_title: "Let's build quality software together?",
            contact_subtitle: "Get in touch directly for opportunities, projects, or professional networking.",
            btn_copy_email: "Copy Email ⎘",
            btn_copy_phone: "Copy Phone ⎘",
            footer_text: "© 2026 Rian Barbosa Dos Santos. All rights reserved."
        },
        es: {
            logo: "Rian Santos",
            nav_about: "Sobre mí",
            nav_skills: "Skills",
            nav_experience: "Experiencia",
            nav_hobbies: "Pasatiempos",
            nav_education: "Educación",
            nav_contact: "Contacto",
            hero_badge: "Garantizando calidad y cazando bugs",
            hero_title: "Quality Assurance Engineer & Bug Hunter",
            hero_subtitle: "Especialista en automatización de pruebas end-to-end, validación de APIs y calidad de software con más de 10 años de experiencia en grandes corporaciones.",
            btn_contact: "Ponerse en Contacto",
            stat_exp: "Años de Experiencia",
            stat_certs: "Certificaciones & Cursos",
            stat_focus: "Enfoque en Calidad & Regresión",
            skills_title: "Stack Tecnológico",
            skills_subtitle: "Haz clic en cualquier tecnología para inspeccionar su estado y detalles.",
            skill_cat1: "Automatización & E2E",
            skill_cat2: "APIs & Base de Datos",
            skill_cat3: "Inteligencia Artificial",
            skill_cat4: "DevOps & Gestión",
            exp_title: "Experiencia Profesional",
            exp_subtitle: "Haz clic en cualquier empresa para inspeccionar el dossier de la operación.",
            exp_deloitte_short: "Validación de soluciones de IA conversacional (ChatPetrobras), homologación de herramientas inteligentes para refatorización de código y seguridad financiera.",
            exp_ecs_short: "Ganancia del 20% en cobertura de pruebas vía automatización en Cypress, consumo de APIs y ecosistema Farma.",
            exp_indra_short: "Aumento del 40% en volumen de pruebas automatizadas con Cypress y Robot Framework, aplicación de métricas TMMi.",
            exp_wati_short: "Ejecución en sistemas de Urgencia Hospitalaria (PEP/SoulMV), regresión cross-browser y SQL Developer.",
            exp_accenture_short: "5 años dedicados a la calidad en productos web/móvil, scripts Oracle PL/SQL y telecomunicaciones.",
            inspect_hint: "Ver Detalles de la Operación →",
            hobbies_title: "Pasatiempos & Intereses",
            hobbies_subtitle: "Lo que me mantiene energizado fuera de las pantallas de pruebas y automatización.",
            hobby1_title: "Guitarra & Música en Vivo",
            hobby1_desc: "Creación de arreglos musicales y experimentos con configuraciones inspiradas en Loop Sessions.",
            hobby2_title: "Juegos de Aventura & RPG",
            hobby2_desc: "Exploración de mundos inmersivos como Cyberpunk 2077, Far Cry y PUBG.",
            hobby3_title: "Playa & Naturaleza",
            hobby3_desc: "Momentos de ocio y renovación en áreas costeras y senderos al aire libre.",
            hobby4_title: "Proyectos Indie & Dev",
            hobby4_desc: "Desarrollo de juegos de cartas en navegador y extensiones personalizadas.",
            edu_title: "Educación & Certificaciones",
            edu_subtitle: "Haz clic en cualquier formación o certificado para abrir el documento oficial.",
            filter_all: "Todas (12)",
            filter_academic: "Académico",
            filter_qa: "QA & Automatización",
            filter_sec: "Seguridad & Cloud",
            filter_eng: "Ingeniería & Dev",
            edu_post_type: "Posgrado (En curso)",
            edu_post_title: "Calidad y Pruebas de Software",
            edu_post_desc: "Especialización Lato Sensu en Ingeniería de Calidad",
            edu_deg_type: "Grado Superior",
            edu_deg_title: "Análisis y Desarrollo de Sistemas",
            edu_deg_desc: "Completado en 2024 • Diploma Superior de Tecnología",
            cyp_type: "Automatización E2E",
            cyp_title: "Pruebas Automatizadas con Cypress (Básico a Intermedio)",
            cyp_desc: "Arquitectura de pruebas, Page Objects e integración continua",
            alqa_type: "Gestión de Calidad",
            alqa_title: "Quality Assurance: Plan de Pruebas y Gestión de Bugs",
            alqa_desc: "Estrategias de validación, trazabilidad y ciclo de vida de defectos",
            it_type: "Preparatorio & Práctica",
            it_title: "Certificaciones en Pruebas de Software y QA",
            it_desc: "Fundamentos de pruebas basados en el syllabus BSTQB / ISTQB",
            jas_type: "Pruebas Unitarias",
            jas_title: "Angular y Jasmine: Pruebas Unitarias",
            jas_desc: "Validación de componentes front-end y cobertura de código",
            cap_type: "Certificación Internacional",
            cap_title: "Cybersecurity Awareness Professional (CAPC™)",
            cap_desc: "Emitido Ago 2024 • Credencial Oficial CertiProf",
            cyb_type: "Seguridad Ofensiva & Defensiva",
            cyb_title: "Curso Completo en Cyber Security",
            cyb_desc: "Seguridad de la Información, Blindaje y DevOps Continuo",
            dyn_type: "Observabilidad & APM",
            dyn_title: "Dynatrace Masterclass (2026)",
            dyn_desc: "Monitoreo de rendimiento, logs y análisis de causa raíz",
            azu_type: "Cloud Computing",
            azu_title: "Microsoft Azure Cloud Native",
            azu_desc: "Emitido 2025 • Arquitectura en nube y ecosistema Azure",
            swe_type: "Ruta Completa",
            swe_title: "Formación Ingeniería de Software",
            swe_desc: "Arquitectura, ciclo de vida de sistemas, agilidad y buenas prácticas",
            net_type: "Infraestructura & Protocolos",
            net_title: "Redes de Computadoras & Lifelong Learning Badge",
            net_desc: "Protocolos HTTP/TCP-IP, infraestructura y aprendizaje continuo",
            paper_hint: "📄 Abrir Documento",
            paper_seal: "★ CREDENCIAL VERIFICADA",
            paper_verify: "Verificar en LinkedIn ↗",
            btn_all_certs: "Ver las +35 licencias y certificaciones en LinkedIn ↗",
            contact_title: "¿Construimos software con calidad?",
            contact_subtitle: "Ponte en contacto directo para oportunidades, proyectos o conexiones profesionales.",
            btn_copy_email: "Copiar Correo ⎘",
            btn_copy_phone: "Copiar Teléfono ⎘",
            footer_text: "© 2026 Rian Barbosa Dos Santos. Todos los derechos reservados."
        }
    };

    // Dados detalhados das Tecnologias multilíngue
    const techDetailsMulti = {
        pt: {
            cypress: { tag: "AUTOMAÇÃO E2E // FRONT-END & API", title: "Cypress", content: "<p>Desenvolvimento de arquiteturas escaláveis utilizando padrão <strong>Page Objects</strong>, comandos customizados, interceptação de rotas e integração contínua para regressão rápida e confiável.</p>" },
            robot: { tag: "AUTOMAÇÃO KEYWORD-DRIVEN", title: "Robot Framework", content: "<p>Criação de suítes de testes legíveis e modulares para validação Web e APIs, facilitando a manutenção e geração de relatórios executivos detalhados.</p>" },
            selenium: { tag: "AUTOMAÇÃO CROSS-BROWSER", title: "Selenium WebDriver", content: "<p>Execução de baterias de regressão em múltiplos navegadores e sistemas legados críticos de alta disponibilidade.</p>" },
            playwright: { tag: "AUTOMAÇÃO MODERNA MULTI-TAB", title: "Playwright", content: "<p>Automação veloz com auto-wait nativo, rastreamento de execução (Trace Viewer) e testes paralelos de ponta a ponta.</p>" },
            postman: { tag: "TESTES DE INTEGRAÇÃO & CONTRATO", title: "Postman", content: "<p>Validação de endpoints REST/GraphQL, automação de coleções, scripts de pré-requisição e asserções de payload/status code.</p>" },
            swagger: { tag: "DOCUMENTAÇÃO & CONTRATO DE API", title: "Swagger / OpenAPI", content: "<p>Análise de contratos de API, validação de schemas e testes exploratórios diretamente nas especificações de serviços backend.</p>" },
            sqlserver: { tag: "BANCO DE DADOS RELACIONAL", title: "Microsoft SQL Server", content: "<p>Elaboração de queries complexas (JOINs, Subqueries, Views) para validação de integridade de dados e preparação de massa de testes.</p>" },
            oracle: { tag: "BANCO DE DADOS CORPORATIVO", title: "Oracle PL/SQL", content: "<p>Cinco anos de experiência manipulando bases massivas em Telecom e Saúde, validando procedures, triggers e consistência transacional.</p>" },
            copilot: { tag: "IA ASSISTIDA PARA ENGENHARIA", title: "GitHub Copilot", content: "<p>Aceleração na escrita de scripts de automação, refatoração de Page Objects e geração inteligente de cenários Gherkin/BDD.</p>" },
            gemini: { tag: "LARGE LANGUAGE MODELS", title: "Google Gemini", content: "<p>Validação de fluxos conversacionais, engenharia de prompts para criação de casos de teste e análise estrutural de respostas de IA.</p>" },
            openai: { tag: "ECOSSISTEMA DE IA GENERATIVA", title: "OpenAI APIs", content: "<p>Testes de confiabilidade, prevenção de alucinações e homologação de assistentes corporativos integrados a dados críticos.</p>" },
            azure: { tag: "GESTÃO DE CICLO DE VIDA & CI/CD", title: "Azure DevOps", content: "<p>Gerenciamento de Test Plans, abertura e rastreabilidade de bugs, e execução automatizada de pipelines de qualidade.</p>" },
            github: { tag: "CONTROLE DE VERSÃO & ACTIONS", title: "GitHub", content: "<p>Versionamento de repositórios de automação, revisão de Pull Requests e configuração de workflows de testes em GitHub Actions.</p>" },
            jira: { tag: "GESTÃO ÁGIL & DEFEITOS", title: "Atlassian Jira", content: "<p>Rastreabilidade ponta a ponta de histórias de usuário, triagem de defeitos, métricas de qualidade e ritos Scrum/Kanban.</p>" },
            testlink: { tag: "GESTÃO DE CASOS DE TESTE", title: "TestLink", content: "<p>Modelagem estruturada de cadernos de teste, controle de versões de casos de teste e relatórios de cobertura de requisitos.</p>" },
            cicd: { tag: "QUALIDADE CONTÍNUA", title: "Pipelines CI/CD", content: "<p>Integração de testes automatizados diretamente na esteira de deploy para bloqueio preventivo de regressões em produção.</p>" }
        },
        en: {
            cypress: { tag: "E2E AUTOMATION // FRONT-END & API", title: "Cypress", content: "<p>Development of scalable architectures using <strong>Page Objects</strong> pattern, custom commands, route interception, and CI/CD integration for fast, reliable regression.</p>" },
            robot: { tag: "KEYWORD-DRIVEN AUTOMATION", title: "Robot Framework", content: "<p>Creation of readable, modular test suites for Web and API validation, streamlining maintenance and detailed executive reports.</p>" },
            selenium: { tag: "CROSS-BROWSER AUTOMATION", title: "Selenium WebDriver", content: "<p>Execution of regression suites across multiple browsers and high-availability legacy critical systems.</p>" },
            playwright: { tag: "MODERN MULTI-TAB AUTOMATION", title: "Playwright", content: "<p>High-speed automation with native auto-wait, execution tracing (Trace Viewer), and end-to-end parallel testing.</p>" },
            postman: { tag: "INTEGRATION & CONTRACT TESTING", title: "Postman", content: "<p>Validation of REST/GraphQL endpoints, collection automation, pre-request scripts, and payload/status code assertions.</p>" },
            swagger: { tag: "API DOCUMENTATION & CONTRACT", title: "Swagger / OpenAPI", content: "<p>API contract analysis, schema validation, and exploratory testing directly on backend service specifications.</p>" },
            sqlserver: { tag: "RELATIONAL DATABASE", title: "Microsoft SQL Server", content: "<p>Drafting complex queries (JOINs, Subqueries, Views) for data integrity validation and test data preparation.</p>" },
            oracle: { tag: "ENTERPRISE DATABASE", title: "Oracle PL/SQL", content: "<p>Five years of experience handling massive databases in Telecom and Healthcare, validating procedures, triggers, and transactional consistency.</p>" },
            copilot: { tag: "AI-ASSISTED ENGINEERING", title: "GitHub Copilot", content: "<p>Accelerating automation script writing, Page Objects refactoring, and smart Gherkin/BDD scenario generation.</p>" },
            gemini: { tag: "LARGE LANGUAGE MODELS", title: "Google Gemini", content: "<p>Validation of conversational flows, prompt engineering for test case creation, and structural analysis of AI responses.</p>" },
            openai: { tag: "GENERATIVE AI ECOSYSTEM", title: "OpenAI APIs", content: "<p>Reliability testing, hallucination prevention, and homologation of corporate assistants integrated with critical data.</p>" },
            azure: { tag: "LIFECYCLE MANAGEMENT & CI/CD", title: "Azure DevOps", content: "<p>Test Plans management, bug tracking and triage, and automated execution of quality pipelines.</p>" },
            github: { tag: "VERSION CONTROL & ACTIONS", title: "GitHub", content: "<p>Version control for automation repositories, Pull Request reviews, and GitHub Actions test workflows configuration.</p>" },
            jira: { tag: "AGILE & DEFECT MANAGEMENT", title: "Atlassian Jira", content: "<p>End-to-end traceability of user stories, defect triage, quality metrics, and Scrum/Kanban rituals.</p>" },
            testlink: { tag: "TEST CASE MANAGEMENT", title: "TestLink", content: "<p>Structured modeling of test suites, test case version control, and requirements coverage reports.</p>" },
            cicd: { tag: "CONTINUOUS QUALITY", title: "CI/CD Pipelines", content: "<p>Integration of automated tests directly into deployment pipelines for preventive blocking of production regressions.</p>" }
        },
        es: {
            cypress: { tag: "AUTOMATIZACIÓN E2E // FRONT-END & API", title: "Cypress", content: "<p>Desarrollo de arquitecturas escalables utilizando el patrón <strong>Page Objects</strong>, comandos personalizados, interceptación de rutas e integración continua para regresiones rápidas y confiables.</p>" },
            robot: { tag: "AUTOMATIZACIÓN KEYWORD-DRIVEN", title: "Robot Framework", content: "<p>Creación de suites de pruebas legibles y modulares para validación Web y APIs, facilitando el mantenimiento y reportes ejecutivos detallados.</p>" },
            selenium: { tag: "AUTOMATIZACIÓN CROSS-BROWSER", title: "Selenium WebDriver", content: "<p>Ejecución de baterías de regresión en múltiples navegadores y sistemas heredados críticos de alta disponibilidad.</p>" },
            playwright: { tag: "AUTOMATIZACIÓN MODERNA MULTI-TAB", title: "Playwright", content: "<p>Automatización veloz con auto-wait nativo, rastreo de ejecución (Trace Viewer) y pruebas paralelas de extremo a extremo.</p>" },
            postman: { tag: "PRUEBAS DE INTEGRACIÓN & CONTRATO", title: "Postman", content: "<p>Validación de endpoints REST/GraphQL, automatización de colecciones, scripts de pre-solicitud y aserciones de payload/status code.</p>" },
            swagger: { tag: "DOCUMENTACIÓN & CONTRATO DE API", title: "Swagger / OpenAPI", content: "<p>Análisis de contratos de API, validación de schemas y pruebas exploratorias directamente en las especificaciones de servicios backend.</p>" },
            sqlserver: { tag: "BASE DE DATOS RELACIONAL", title: "Microsoft SQL Server", content: "<p>Elaboración de consultas complejas (JOINs, Subqueries, Views) para validación de integridad de datos y preparación de masas de prueba.</p>" },
            oracle: { tag: "BASE DE DATOS CORPORATIVA", title: "Oracle PL/SQL", content: "<p>Cinco años de experiencia manipulando bases masivas en Telecom y Salud, validando procedures, triggers y consistencia transaccional.</p>" },
            copilot: { tag: "IA ASISTIDA PARA INGENIERÍA", title: "GitHub Copilot", content: "<p>Aceleración en la escritura de scripts de automatización, refactorización de Page Objects y generación inteligente de escenarios Gherkin/BDD.</p>" },
            gemini: { tag: "LARGE LANGUAGE MODELS", title: "Google Gemini", content: "<p>Validación de flujos conversacionales, ingeniería de prompts para creación de casos de prueba y análisis estructural de respuestas de IA.</p>" },
            openai: { tag: "ECOSISTEMA DE IA GENERATIVA", title: "OpenAI APIs", content: "<p>Pruebas de confiabilidad, prevención de alucinaciones y homologación de asistentes corporativos integrados a datos críticos.</p>" },
            azure: { tag: "GESTIÓN DE CICLO DE VIDA & CI/CD", title: "Azure DevOps", content: "<p>Gestión de Test Plans, apertura y trazabilidad de bugs, y ejecución automatizada de pipelines de calidad.</p>" },
            github: { tag: "CONTROL DE VERSIÓN & ACTIONS", title: "GitHub", content: "<p>Versionado de repositorios de automatización, revisión de Pull Requests y configuración de flujos de prueba en GitHub Actions.</p>" },
            jira: { tag: "GESTIÓN ÁGIL & DEFECTOS", title: "Atlassian Jira", content: "<p>Trazabilidad de extremo a extremo de historias de usuario, triaje de defectos, métricas de calidad y ritos Scrum/Kanban.</p>" },
            testlink: { tag: "GESTIÓN DE CASOS DE PRUEBA", title: "TestLink", content: "<p>Modelado estructurado de cuadernos de prueba, control de versiones de casos de prueba y reportes de cobertura de requisitos.</p>" },
            cicd: { tag: "CALIDAD CONTINUA", title: "Pipelines CI/CD", content: "<p>Integración de pruebas automatizadas directamente en el pipeline de despliegue para el bloqueo preventivo de regresiones en producción.</p>" }
        }
    };

    // Dados detalhados das empresas para o Popup multilíngue
    const companyDataMulti = {
        pt: {
            deloitte: { tag: "DELOITTE // QA PLENO", title: "Deloitte (Nov 2024 - Presente)", content: `<p>Atuação em projetos de alta criticidade e validação de soluções baseadas em Inteligência Artificial e segurança de dados:</p><ul><li><strong>ChatPetrobras:</strong> Validação minuciosa de solução de IA conversacional baseada em LLM integrada a dados operacionais e fluxos internos.</li><li><strong>Adequação Federal:</strong> Homologação de ferramenta inteligente para análise e refatoração de código com foco nas normas do CNPJ Alfanumérico.</li><li><strong>Porto Seguro:</strong> Ajuste estrutural e garantia de segurança e criptografia de dados no fluxo de emissão de boletos corporativos.</li></ul>` },
            ecs: { tag: "ECS INOVAÇÃO // QA PLENO", title: "ECS Inovação (Set 2022 - Jun 2024)", content: `<p>Garantia de qualidade e automação de processos críticos no ecossistema de saúde e farma:</p><ul><li><strong>Automação Cypress:</strong> Ganho de 20% em novos cenários validados via scripts reutilizáveis e robustos.</li><li><strong>APIs & Banco de Dados:</strong> Consumo integral de APIs (Postman/Swagger) combinados com consultas de consistência via Microsoft SQL Server.</li><li><strong>Ecossistema Farma:</strong> Homologação de regras críticas em fluxos de estoque, vendas online de medicamentos e laudos laboratoriais.</li></ul>` },
            indra: { tag: "INDRA // QA PLENO", title: "Indra (Set 2021 - Set 2022)", content: `<p>Foco em eficiência de testes e implementação de frameworks escaláveis:</p><ul><li><strong>Automação Avançada:</strong> Incremento massivo de 40% no volume de testes validados por meio de automação com Cypress e Robot Framework.</li><li><strong>Métricas TMMi:</strong> Construção de relatórios estruturados baseados no modelo TMMi para suporte de melhoria contínua.</li><li><strong>Gestão Ágil:</strong> Rastreabilidade ponta a ponta de defeitos em ecossistemas Jira, Azure DevOps e TestLink.</li></ul>` },
            wati: { tag: "WATI CONSULTORIA // QA", title: "WATI Consultoria (Jul 2020 - Set 2021)", content: `<p>Homologação em sistemas de saúde de alta criticidade:</p><ul><li><strong>Urgência Hospitalar:</strong> Elaboração e execução de cenários no TestLink focados nos sistemas PEP e SoulMV.</li><li><strong>Regressão Web:</strong> Criação de scripts dinâmicos de regressão cross-browser utilizando Selenium e Robot Framework.</li><li><strong>Backend:</strong> Manipulação, extração de dados e validação de regras de backend utilizando SQL Developer.</li></ul>` },
            accenture: { tag: "ACCENTURE BRASIL // QA", title: "Accenture Brasil (Jun 2015 - Jul 2020)", content: `<p>Consolidação de 5 anos de experiência em operações massivas de telecomunicações e grandes sistemas:</p><ul><li><strong>Telecom (Oi):</strong> Homologação de ponta a ponta em fluxos massivos de TV por assinatura, internet fixa/móvel e planos telefônicos.</li><li><strong>Banco de Dados:</strong> Criação de scripts PL/SQL estruturados em bases Oracle para consistência de dados.</li><li><strong>Ferramental:</strong> Gestão de qualidade utilizando ALM e Azure DevOps.</li></ul>` }
        },
        en: {
            deloitte: { tag: "DELOITTE // MID QA", title: "Deloitte (Nov 2024 - Present)", content: `<p>Working on high-criticality projects and validating AI-based solutions and data security:</p><ul><li><strong>ChatPetrobras:</strong> Thorough validation of an LLM conversational AI solution integrated with operational data and internal workflows.</li><li><strong>Federal Compliance:</strong> Homologation of an intelligent tool for code analysis and refactoring focusing on Alphanumeric CNPJ rules.</li><li><strong>Porto Seguro:</strong> Structural adjustments and data encryption security assurance in corporate billing flows.</li></ul>` },
            ecs: { tag: "ECS INOVAÇÃO // MID QA", title: "ECS Inovação (Sep 2022 - Jun 2024)", content: `<p>Quality assurance and automation of critical processes in the health and pharma ecosystem:</p><ul><li><strong>Cypress Automation:</strong> 20% gain in new scenarios validated via reusable and robust scripts.</li><li><strong>APIs & Databases:</strong> Full consumption of APIs (Postman/Swagger) combined with consistency queries via Microsoft SQL Server.</li><li><strong>Farma Ecosystem:</strong> Homologation of critical rules in inventory flows, online medicine sales, and laboratory reports.</li></ul>` },
            indra: { tag: "INDRA // MID QA", title: "Indra (Sep 2021 - Sep 2022)", content: `<p>Focus on test efficiency and implementation of scalable frameworks:</p><ul><li><strong>Advanced Automation:</strong> Massive 40% increase in validated test volume using Cypress and Robot Framework.</li><li><strong>TMMi Metrics:</strong> Building structured reports based on the TMMi model to support continuous improvement.</li><li><strong>Agile Management:</strong> End-to-end defect traceability across Jira, Azure DevOps, and TestLink ecosystems.</li></ul>` },
            wati: { tag: "WATI CONSULTORIA // QA", title: "WATI Consultoria (Jul 2020 - Sep 2021)", content: `<p>Homologation in high-criticality healthcare systems:</p><ul><li><strong>Hospital Emergency:</strong> Creation and execution of scenarios in TestLink focused on PEP and SoulMV systems.</li><li><strong>Web Regression:</strong> Dynamic cross-browser regression scripts using Selenium and Robot Framework.</li><li><strong>Backend:</strong> Data extraction, manipulation, and backend rules validation using SQL Developer.</li></ul>` },
            accenture: { tag: "ACCENTURE BRASIL // QA", title: "Accenture Brasil (Jun 2015 - Jul 2020)", content: `<p>Consolidation of 5 years of experience in massive telecommunications operations and large-scale systems:</p><ul><li><strong>Telecom (Oi):</strong> End-to-end homologation in massive flows of pay TV, fixed/mobile internet, and phone plans.</li><li><strong>Database:</strong> Creation of structured PL/SQL scripts in Oracle databases for data consistency.</li><li><strong>Tooling:</strong> Quality management using ALM and Azure DevOps.</li></ul>` }
        },
        es: {
            deloitte: { tag: "DELOITTE // QA PLENO", title: "Deloitte (Nov 2024 - Presente)", content: `<p>Participación en proyectos de alta criticidad y validación de soluciones basadas en Inteligencia Artificial y seguridad de datos:</p><ul><li><strong>ChatPetrobras:</strong> Validación minuciosa de solución de IA conversacional basada en LLM integrada a datos operativos y flujos internos.</li><li><strong>Adecuación Federal:</strong> Homologación de herramienta inteligente para análisis y refactorización de código enfocada en las normas del CNPJ Alfanumérico.</li><li><strong>Porto Seguro:</strong> Ajuste estructural y garantía de seguridad y encriptación de datos en el flujo de emisión de boletos corporativos.</li></ul>` },
            ecs: { tag: "ECS INOVAÇÃO // QA PLENO", title: "ECS Inovação (Sep 2022 - Jun 2024)", content: `<p>Garantía de calidad y automatización de procesos críticos en el ecosistema de salud y farma:</p><ul><li><strong>Automatización Cypress:</strong> Ganancia del 20% en nuevos escenarios validados mediante scripts reutilizables y robustos.</li><li><strong>APIs & Base de Datos:</strong> Consumo integral de APIs (Postman/Swagger) combinados con consultas de consistencia vía Microsoft SQL Server.</li><li><strong>Ecosistema Farma:</strong> Homologación de reglas críticas en flujos de inventario, ventas online de medicamentos y reportes de laboratorio.</li></ul>` },
            indra: { tag: "INDRA // QA PLENO", title: "Indra (Sep 2021 - Sep 2022)", content: `<p>Enfoque en la eficiencia de pruebas e implementación de frameworks escalables:</p><ul><li><strong>Automatización Avanzada:</strong> Incremento masivo del 40% en volumen de pruebas validadas con Cypress y Robot Framework.</li><li><strong>Métricas TMMi:</strong> Construcción de reportes estructurados basados en el modelo TMMi para soporte de mejora continua.</li><li><strong>Gestión Ágil:</strong> Trazabilidad de extremo a extremo de defectos en ecosistemas Jira, Azure DevOps y TestLink.</li></ul>` },
            wati: { tag: "WATI CONSULTORIA // QA", title: "WATI Consultoria (Jul 2020 - Sep 2021)", content: `<p>Homologación en sistemas de salud de alta criticidade:</p><ul><li><strong>Urgencia Hospitalaria:</strong> Elaboración y ejecución de escenarios en TestLink enfocados en sistemas PEP y SoulMV.</li><li><strong>Regresión Web:</strong> Creación de scripts dinámicos de regresión cross-browser utilizando Selenium y Robot Framework.</li><li><strong>Backend:</strong> Manipulación, extracción de datos y validación de reglas de backend utilizando SQL Developer.</li></ul>` },
            accenture: { tag: "ACCENTURE BRASIL // QA", title: "Accenture Brasil (Jun 2015 - Jul 2020)", content: `<p>Consolidación de 5 años de experiencia en operaciones masivas de telecomunicaciones y grandes sistemas:</p><ul><li><strong>Telecom (Oi):</strong> Homologación de extremo a extremo en flujos masivos de TV por suscripción, internet fija/móvil y planes telefónicos.</li><li><strong>Base de Datos:</strong> Creación de scripts PL/SQL estructurados en bases Oracle para consistencia de datos.</li><li><strong>Herramientas:</strong> Gestión de calidad utilizando ALM y Azure DevOps.</li></ul>` }
        }
    };

    // Dados dos Diplomas / Certificações multilíngue
    const paperDataMulti = {
        pt: {
            post: { date: "PÓS-GRADUAÇÃO LATO SENSU • EM ANDAMENTO", title: "Qualidade e Teste de Software", institution: "UniCesumar", desc: "Especialização acadêmica focada em arquitetura de testes, governança de qualidade (TMMi/MPS.BR), automação em larga escala, testes de performance e gestão estratégica de defeitos." },
            degree: { date: "CONCLUÍDO EM 2024 • DIPLOMA SUPERIOR", title: "Análise e Desenvolvimento de Sistemas", institution: "Universidade Estácio de Sá", desc: "Graduação tecnológica superior abrangendo engenharia de software, arquitetura de sistemas, bancos de dados relacionais, estruturas de dados, segurança da informação e metodologias ágeis." },
            cypress_udemy: { date: "EMITIDO EM 2022 • CREDENCIAL UDEMY", title: "Testes Automatizados com Cypress (Básico ao Intermediário)", institution: "Udemy Academy", desc: "Certificação prática em automação de testes End-to-End (E2E) e testes de API com Cypress, aplicando seletores resilientes, Page Objects, comandos customizados e relatórios de execução." },
            qa_alura: { date: "CERTIFICADO OFICIAL • ALURA", title: "Quality Assurance: Plano de Testes e Gestão de Bugs", institution: "Alura Tecnologia", desc: "Formação focada no planejamento estratégico de testes, elaboração de critérios de aceite em BDD/Gherkin, análise de riscos, matriz de rastreabilidade e ciclo de vida de bugs." },
            iterasys_qa: { date: "EMITIDO EM 2021 • CREDENCIAL ITERASYS", title: "Certificações em Teste de Software e QA", institution: "Iterasys", desc: "Treinamento intensivo fundamentado nas diretrizes internacionais do ISTQB / BSTQB (CTFL), técnicas de caixa-preta, caixa-branca, partição de equivalência e análise de valor limite." },
            jasmine_alura: { date: "CERTIFICADO OFICIAL • ALURA", title: "Angular e Jasmine: Testes de Unidade", institution: "Alura Tecnologia", desc: "Capacitação técnica na construção de testes unitários automatizados no front-end utilizando o framework Jasmine e Karma, garantindo alta cobertura e prevenção de regressões na base de código." },
            capc_certiprof: { date: "EMITIDO EM AGOSTO DE 2024 • BADGE OFICIAL", title: "Cybersecurity Awareness Professional Certificate (CAPC™)", institution: "CertiProf International", desc: "Certificação internacional que atesta domínio sobre políticas de segurança cibernética, proteção de dados corporativos, mitigação de ameaças, engenharia social e conformidade de segurança." },
            cyber_udemy: { date: "EMITIDO EM 2022 • CREDENCIAL UDEMY", title: "Curso Completo em Cyber Security", institution: "Udemy Academy", desc: "Formação abrangente em Segurança da Informação, análise de vulnerabilidades em aplicações web (OWASP Top 10), práticas de DevSecOps e proteção de ambientes de teste e produção." },
            dynatrace: { date: "EMITIDO EM 2026 • MASTERCLASS", title: "Dynatrace Masterclass — Observability & APM", institution: "Dynatrace", desc: "Especialização no monitoramento avançado de aplicações em tempo real, rastreamento distribuído, análise de gargalos de performance e diagnóstico automatizado de incidentes em nuvem." },
            azure_dio: { date: "EMITIDO EM 2025 • CREDENCIAL DIO", title: "Introdução à Experiência Microsoft Azure Cloud Native", institution: "DIO (Digital Innovation One)", desc: "Certificação focada na infraestrutura em nuvem da Microsoft Azure, serviços Cloud Native, esteiras de integração contínua (Azure DevOps) e escalabilidade de ambientes corporativos." },
            swe_alura: { date: "FORMAÇÃO COMPLETA • ALURA", title: "Formação Engenharia de Software", institution: "Alura Tecnologia", desc: "Trilha completa de Engenharia de Software abordando arquitetura limpa, padrões de projeto, modelagem de sistemas, qualidade contínua, agilidade (Scrum/Kanban) e cultura DevOps." },
            redes_alura: { date: "CREDENCIAL VERIFICADA • ALURA & CERTIPROF", title: "Redes de Computadores & Lifelong Learning Badge", institution: "Alura / CertiProf", desc: "Domínio da arquitetura de redes TCP/IP, modelo OSI, protocolos HTTP/HTTPS, DNS, diagnóstico de comunicação entre microsserviços e compromisso com o aprendizado contínuo (Lifelong Learner)." }
        },
        en: {
            post: { date: "LATO SENSU POST-GRADUATE • IN PROGRESS", title: "Software Quality and Testing", institution: "UniCesumar", desc: "Academic specialization focused on test architecture, quality governance (TMMi), large-scale automation, performance testing, and strategic defect management." },
            degree: { date: "COMPLETED 2024 • HIGHER DIPLOMA", title: "Systems Analysis and Development", institution: "Estácio University", desc: "Higher technological degree covering software engineering, systems architecture, relational databases, data structures, information security, and agile methodologies." },
            cypress_udemy: { date: "ISSUED 2022 • UDEMY CREDENTIAL", title: "Automated Testing with Cypress (Basic to Intermediate)", institution: "Udemy Academy", desc: "Practical certification in End-to-End (E2E) test automation and API testing with Cypress, applying resilient selectors, Page Objects, custom commands, and execution reports." },
            qa_alura: { date: "OFFICIAL CERTIFICATE • ALURA", title: "Quality Assurance: Test Plans and Bug Management", institution: "Alura Technology", desc: "Training focused on strategic test planning, BDD/Gherkin acceptance criteria elaboration, risk analysis, traceability matrix, and bug lifecycle." },
            iterasys_qa: { date: "ISSUED 2021 • ITERASYS CREDENTIAL", title: "Software Testing & QA Certifications", institution: "Iterasys", desc: "Intensive training based on international ISTQB / BSTQB (CTFL) guidelines, black-box and white-box techniques, equivalence partitioning, and boundary value analysis." },
            jasmine_alura: { date: "OFFICIAL CERTIFICATE • ALURA", title: "Angular and Jasmine: Unit Testing", institution: "Alura Technology", desc: "Technical training in building automated front-end unit tests using the Jasmine and Karma frameworks, ensuring high code coverage and regression prevention." },
            capc_certiprof: { date: "ISSUED AUGUST 2024 • OFFICIAL BADGE", title: "Cybersecurity Awareness Professional Certificate (CAPC™)", institution: "CertiProf International", desc: "International certification attesting proficiency in cybersecurity policies, corporate data protection, threat mitigation, social engineering, and security compliance." },
            cyber_udemy: { date: "ISSUED 2022 • UDEMY CREDENTIAL", title: "Complete Cyber Security Course", institution: "Udemy Academy", desc: "Comprehensive training in Information Security, web vulnerability analysis (OWASP Top 10), DevSecOps practices, and test/production environment hardening." },
            dynatrace: { date: "ISSUED 2026 • MASTERCLASS", title: "Dynatrace Masterclass — Observability & APM", institution: "Dynatrace", desc: "Specialization in advanced real-time application monitoring, distributed tracing, performance bottleneck analysis, and automated cloud incident diagnosis." },
            azure_dio: { date: "ISSUED 2025 • DIO CREDENTIAL", title: "Introduction to Microsoft Azure Cloud Native Experience", institution: "DIO (Digital Innovation One)", desc: "Certification focused on Microsoft Azure cloud infrastructure, Cloud Native services, continuous integration pipelines (Azure DevOps), and enterprise environment scalability." },
            swe_alura: { date: "COMPLETE TRACK • ALURA", title: "Software Engineering Track", institution: "Alura Technology", desc: "Complete Software Engineering track covering clean architecture, design patterns, systems modeling, continuous quality, agility (Scrum/Kanban), and DevOps culture." },
            redes_alura: { date: "VERIFIED CREDENTIAL • ALURA & CERTIPROF", title: "Computer Networks & Lifelong Learning Badge", institution: "Alura / CertiProf", desc: "Mastery of TCP/IP network architecture, OSI model, HTTP/HTTPS protocols, DNS, microservices communication diagnosis, and commitment to continuous learning (Lifelong Learner)." }
        },
        es: {
            post: { date: "POSGRADO LATO SENSU • EN CURSO", title: "Calidad y Pruebas de Software", institution: "UniCesumar", desc: "Especialización académica centrada en arquitectura de pruebas, gobernanza de calidad (TMMi), automatización a gran escala, pruebas de rendimiento y gestión estratégica de defectos." },
            degree: { date: "COMPLETADO 2024 • TÍTULO SUPERIOR", title: "Análisis y Desarrollo de Sistemas", institution: "Universidad Estácio de Sá", desc: "Grado tecnológico superior que abarca ingeniería de software, arquitectura de sistemas, bases de datos relacionales, estructuras de datos, seguridad de la información y metodologías ágiles." },
            cypress_udemy: { date: "EMITIDO 2022 • CREDENCIAL UDEMY", title: "Pruebas Automatizadas con Cypress (Básico a Intermedio)", institution: "Udemy Academy", desc: "Certificación práctica en automatización de pruebas End-to-End (E2E) y pruebas de API con Cypress, aplicando selectores resilientes, Page Objects, comandos personalizados y reportes de ejecución." },
            qa_alura: { date: "CERTIFICADO OFICIAL • ALURA", title: "Quality Assurance: Plan de Pruebas y Gestión de Bugs", institution: "Alura Tecnología", desc: "Formación enfocada en la planificación estratégica de pruebas, elaboración de criterios de aceptación en BDD/Gherkin, análisis de riesgos, matriz de trazabilidad y ciclo de vida de bugs." },
            iterasys_qa: { date: "EMITIDO 2021 • CREDENCIAL ITERASYS", title: "Certificaciones en Pruebas de Software y QA", institution: "Iterasys", desc: "Entrenamiento intensivo fundamentado en las directrices internacionales de ISTQB / BSTQB (CTFL), técnicas de caja negra, caja blanca, partición de equivalencia y análisis de valores límite." },
            jasmine_alura: { date: "CERTIFICADO OFICIAL • ALURA", title: "Angular y Jasmine: Pruebas Unitarias", institution: "Alura Tecnología", desc: "Capacitación técnica en la construcción de pruebas unitarias automatizadas en front-end utilizando los frameworks Jasmine y Karma, garantizando alta cobertura y prevención de regresiones." },
            capc_certiprof: { date: "EMITIDO AGOSTO 2024 • BADGE OFICIAL", title: "Cybersecurity Awareness Professional Certificate (CAPC™)", institution: "CertiProf International", desc: "Certificación internacional que acredita dominio sobre políticas de ciberseguridad, protección de datos corporativos, mitigación de amenazas, ingeniería social y cumplimiento de seguridad." },
            cyber_udemy: { date: "EMITIDO 2022 • CREDENCIAL UDEMY", title: "Curso Completo en Cyber Security", institution: "Udemy Academy", desc: "Formación integral en Seguridad de la Información, análisis de vulnerabilidades web (OWASP Top 10), prácticas de DevSecOps y blindaje de entornos de prueba y producción." },
            dynatrace: { date: "EMITIDO 2026 • MASTERCLASS", title: "Dynatrace Masterclass — Observability & APM", institution: "Dynatrace", desc: "Especialización en monitoreo avanzado de aplicaciones en tiempo real, rastreo distribuido, análisis de cuellos de botella de rendimiento y diagnóstico automatizado de incidentes en la nube." },
            azure_dio: { date: "EMITIDO 2025 • CREDENCIAL DIO", title: "Introducción a la Experiencia Microsoft Azure Cloud Native", institution: "DIO (Digital Innovation One)", desc: "Certificación centrada en la infraestructura en la nube de Microsoft Azure, servicios Cloud Native, pipelines de integración continua (Azure DevOps) y escalabilidad de entornos corporativos." },
            swe_alura: { date: "RUTA COMPLETA • ALURA", title: "Formación Ingeniería de Software", institution: "Alura Tecnología", desc: "Ruta completa de Ingeniería de Software que aborda arquitectura limpia, patrones de diseño, modelado de sistemas, calidad continua, agilidad (Scrum/Kanban) y cultura DevOps." },
            redes_alura: { date: "CREDENCIAL VERIFICADA • ALURA & CERTIPROF", title: "Redes de Computadoras & Lifelong Learning Badge", institution: "Alura / CertiProf", desc: "Dominio de la arquitectura de redes TCP/IP, modelo OSI, protocolos HTTP/HTTPS, DNS, diagnóstico de comunicación entre microservicios y compromiso con el aprendizaje continuo." }
        }
    };

    // Filtro de Categorias em Formação & Certificações
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterVal = btn.getAttribute('data-filter');
            eduCards.forEach(card => {
                if (filterVal === 'all' || card.getAttribute('data-category') === filterVal) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });

    // Função de Tradução do Site e Popups Ativos
    const setLanguage = (lang) => {
        currentLang = lang;
        const t = translations[lang];
        if (!t) return;

        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (t[key]) {
                if (key === 'logo') {
                    el.innerHTML = t[key] + '<span class="terminal-cursor">_</span>';
                } else {
                    el.textContent = t[key];
                }
            }
        });

        // Atualiza modal aberto se houver algum
        if (expModal.classList.contains('active') && activeCompanyKey) {
            const data = companyDataMulti[currentLang][activeCompanyKey];
            if (data) {
                modalCompanyTag.textContent = data.tag;
                modalCompanyTitle.textContent = data.title;
                modalCompanyContent.innerHTML = data.content;
            }
        }

        if (paperModal.classList.contains('active') && activeEduKey) {
            const data = paperDataMulti[currentLang][activeEduKey];
            if (data) {
                paperDate.textContent = data.date;
                paperTitle.textContent = data.title;
                paperInstitution.textContent = (currentLang === 'en' ? 'Issuing Institution: ' : currentLang === 'es' ? 'Institución Emisora: ' : 'Instituição Emisora: ') + data.institution;
                paperDesc.textContent = data.desc;
            }
        }
    };

    langSelect.addEventListener('change', (e) => {
        setLanguage(e.target.value);
    });

    // Interatividade nas Tech Tags
    techTags.forEach(tag => {
        tag.addEventListener('click', () => {
            tag.classList.add('clicked');
            const techKey = tag.getAttribute('data-tech');
            activeCompanyKey = null;
            const data = techDetailsMulti[currentLang][techKey];

            setTimeout(() => {
                tag.classList.remove('clicked');
                if (data) {
                    modalCompanyTag.textContent = data.tag;
                    modalCompanyTitle.textContent = data.title;
                    modalCompanyContent.innerHTML = data.content;
                    expModal.classList.add('active');
                    document.body.style.overflow = 'hidden';
                }
            }, 180);
        });
    });

    // Abrir Modal de Experiência
    interactiveExps.forEach(item => {
        item.addEventListener('click', () => {
            activeCompanyKey = item.getAttribute('data-company');
            const data = companyDataMulti[currentLang][activeCompanyKey];
            if (!data) return;

            modalCompanyTag.textContent = data.tag;
            modalCompanyTitle.textContent = data.title;
            modalCompanyContent.innerHTML = data.content;

            expModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    closeExpModal.addEventListener('click', () => {
        expModal.classList.remove('active');
        document.body.style.overflow = '';
    });

    expModal.addEventListener('click', (e) => {
        if (e.target === expModal) {
            expModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Abrir Modal de Papel (Diploma/Certificado)
    paperTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            activeEduKey = trigger.getAttribute('data-edu');
            const data = paperDataMulti[currentLang][activeEduKey];
            if (!data) return;

            paperDate.textContent = data.date;
            paperTitle.textContent = data.title;
            paperInstitution.textContent = (currentLang === 'en' ? 'Issuing Institution: ' : currentLang === 'es' ? 'Institución Emisora: ' : 'Instituição Emisora: ') + data.institution;
            paperDesc.textContent = data.desc;

            paperModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    closePaperModal.addEventListener('click', () => {
        paperModal.classList.remove('active');
        document.body.style.overflow = '';
    });

    paperModal.addEventListener('click', (e) => {
        if (e.target === paperModal) {
            paperModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Fechar com ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            expModal.classList.remove('active');
            paperModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Cópia para Clipboard
    const showToast = (message) => {
        toast.textContent = message;
        toast.classList.add('show');

        if (toastTimeout) clearTimeout(toastTimeout);
        toastTimeout = setTimeout(() => {
            toast.classList.remove('show');
        }, 2500);
    };

    copyButtons.forEach(btn => {
        btn.addEventListener('click', async () => {
            const valueToCopy = btn.getAttribute('data-copy');
            if (!valueToCopy) return;

            try {
                await navigator.clipboard.writeText(valueToCopy);
                showToast(`Copiado: ${valueToCopy}`);
            } catch (err) {
                showToast(`Copiado: ${valueToCopy}`);
            }
        });
    });
});