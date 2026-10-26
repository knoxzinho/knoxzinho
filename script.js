document.addEventListener('DOMContentLoaded', () => {
    const copyButtons = document.querySelectorAll('[data-copy]');
    const toast = document.getElementById('toast');
    const langSelect = document.getElementById('langSelect');
    const techTags = document.querySelectorAll('.tech-tag');
    let toastTimeout = null;

    // Modais de Experiência e Stack
    const expModal = document.getElementById('expModal');
    const closeExpModal = expModal.querySelector('.close-modal');
    const modalCompanyTag = document.getElementById('modalCompanyTag');
    const modalCompanyTitle = document.getElementById('modalCompanyTitle');
    const modalCompanyContent = document.getElementById('modalCompanyContent');
    const interactiveExps = document.querySelectorAll('.interactive-exp');

    // Modais de Papel (Diploma)
    const paperModal = document.getElementById('paperModal');
    const closePaperModal = paperModal.querySelector('.close-paper');
    const paperTriggers = document.querySelectorAll('.paper-trigger');
    const paperTitle = document.getElementById('paperTitle');
    const paperInstitution = document.getElementById('paperInstitution');
    const paperDesc = document.getElementById('paperDesc');
    const paperDate = document.getElementById('paperDate');

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
            stat_start: "Início na Carreira Tech",
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
            edu_subtitle: "Clique em qualquer credencial para abrir o diploma em formato de pergaminho/papel.",
            edu1_type: "Pós-Graduação (Em andamento)",
            edu2_type: "Graduação",
            edu3_type: "Especialização",
            paper_hint: "📄 Abrir Documento",
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
            stat_start: "Started in Tech",
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
            edu_subtitle: "Click on any credential to open the document in paper scroll format.",
            edu1_type: "Post-Graduate (In Progress)",
            edu2_type: "Undergraduate",
            edu3_type: "Specialization",
            paper_hint: "📄 Open Document",
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
            stat_start: "Inicio en Carrera Tech",
            stat_focus: "Enfoque en Calidad & Regresión",
            skills_title: "Stack Tecnológico",
            skills_subtitle: "Haz clic en cualquier tecnología para inspeccionar su estado y detalles.",
            skill_cat1: "Automatización & E2E",
            skill_cat2: "APIs & Base de Datos",
            skill_cat3: "Inteligencia Artificial",
            skill_cat4: "DevOps & Gestión",
            exp_title: "Experiencia Profesional",
            exp_subtitle: "Haz clic en cualquier empresa para inspeccionar el dossier de la operación.",
            exp_deloitte_short: "Validación de soluciones de IA conversacional (ChatPetrobras), homologación de herramientas inteligentes para refactorización de código y seguridad financiera.",
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
            edu_subtitle: "Haz clic en cualquier credencial para abrir el diploma en formato de pergamino.",
            edu1_type: "Posgrado (En curso)",
            edu2_type: "Grado",
            edu3_type: "Especialización",
            paper_hint: "📄 Abrir Documento",
            contact_title: "¿Construimos software con calidad?",
            contact_subtitle: "Ponte en contacto directo para oportunidades, proyectos o conexiones profesionales.",
            btn_copy_email: "Copiar Correo ⎘",
            btn_copy_phone: "Copiar Teléfono ⎘",
            footer_text: "© 2026 Rian Barbosa Dos Santos. Todos los derechos reservados."
        }
    };

    // Dados detalhados das Tecnologias para o Popup
    const techDetails = {
        cypress: {
            tag: "AUTOMAÇÃO E2E // FRONT-END & API",
            title: "Cypress",
            content: "<p>Desenvolvimento de arquiteturas escaláveis utilizando padrão <strong>Page Objects</strong>, comandos customizados, interceptação de rotas e integração contínua para regressão rápida e confiável.</p>"
        },
        robot: {
            tag: "AUTOMAÇÃO KEYWORD-DRIVEN",
            title: "Robot Framework",
            content: "<p>Criação de suítes de testes legíveis e modulares para validação Web e APIs, facilitando a manutenção e geração de relatórios executivos detalhados.</p>"
        },
        selenium: {
            tag: "AUTOMAÇÃO CROSS-BROWSER",
            title: "Selenium WebDriver",
            content: "<p>Execução de baterias de regressão em múltiplos navegadores e sistemas legados críticos de alta disponibilidade.</p>"
        },
        playwright: {
            tag: "AUTOMAÇÃO MODERNA MULTI-TAB",
            title: "Playwright",
            content: "<p>Automação veloz com auto-wait nativo, rastreamento de execução (Trace Viewer) e testes paralelos de ponta a ponta.</p>"
        },
        postman: {
            tag: "TESTES DE INTEGRAÇÃO & CONTRATO",
            title: "Postman",
            content: "<p>Validação de endpoints REST/GraphQL, automação de coleções, scripts de pré-requisição e asserções de payload/status code.</p>"
        },
        swagger: {
            tag: "DOCUMENTAÇÃO & CONTRATO DE API",
            title: "Swagger / OpenAPI",
            content: "<p>Análise de contratos de API, validação de schemas e testes exploratórios diretamente nas especificações de serviços backend.</p>"
        },
        sqlserver: {
            tag: "BANCO DE DADOS RELACIONAL",
            title: "Microsoft SQL Server",
            content: "<p>Elaboração de queries complexas (JOINs, Subqueries, Views) para validação de integridade de dados e preparação de massa de testes.</p>"
        },
        oracle: {
            tag: "BANCO DE DADOS CORPORATIVO",
            title: "Oracle PL/SQL",
            content: "<p>Cinco anos de experiência manipulando bases massivas em Telecom e Saúde, validando procedures, triggers e consistência transacional.</p>"
        },
        copilot: {
            tag: "IA ASSISTIDA PARA ENGENHARIA",
            title: "GitHub Copilot",
            content: "<p>Aceleração na escrita de scripts de automação, refatoração de Page Objects e geração inteligente de cenários Gherkin/BDD.</p>"
        },
        gemini: {
            tag: "LARGE LANGUAGE MODELS",
            title: "Google Gemini",
            content: "<p>Validação de fluxos conversacionais, engenharia de prompts para criação de casos de teste e análise estrutural de respostas de IA.</p>"
        },
        openai: {
            tag: "ECOSSISTEMA DE IA GENERATIVA",
            title: "OpenAI APIs",
            content: "<p>Testes de confiabilidade, prevenção de alucinações e homologação de assistentes corporativos integrados a dados críticos.</p>"
        },
        azure: {
            tag: "GESTÃO DE CICLO DE VIDA & CI/CD",
            title: "Azure DevOps",
            content: "<p>Gerenciamento de Test Plans, abertura e rastreabilidade de bugs, e execução automatizada de pipelines de qualidade.</p>"
        },
        github: {
            tag: "CONTROLE DE VERSÃO & ACTIONS",
            title: "GitHub",
            content: "<p>Versionamento de repositórios de automação, revisão de Pull Requests e configuração de workflows de testes em GitHub Actions.</p>"
        },
        jira: {
            tag: "GESTÃO ÁGIL & DEFEITOS",
            title: "Atlassian Jira",
            content: "<p>Rastreabilidade ponta a ponta de histórias de usuário, triagem de defeitos, métricas de qualidade e ritos Scrum/Kanban.</p>"
        },
        testlink: {
            tag: "GESTÃO DE CASOS DE TESTE",
            title: "TestLink",
            content: "<p>Modelagem estruturada de cadernos de teste, controle de versões de casos de teste e relatórios de cobertura de requisitos.</p>"
        },
        cicd: {
            tag: "QUALIDADE CONTÍNUA",
            title: "Pipelines CI/CD",
            content: "<p>Integração de testes automatizados diretamente na esteira de deploy para bloqueio preventivo de regressões em produção.</p>"
        }
    };

    // Dados detalhados das empresas para o Popup
    const companyData = {
        deloitte: {
            tag: "DELOITTE // QA PLENO",
            title: "Deloitte (Nov 2024 - Presente)",
            content: `
                <p>Atuação em projetos de alta criticidade e validação de soluções baseadas em Inteligência Artificial e segurança de dados:</p>
                <ul>
                    <li><strong>ChatPetrobras:</strong> Validação minuciosa de solução de IA conversacional baseada em LLM integrada a dados operacionais e fluxos internos.</li>
                    <li><strong>Adequação Federal:</strong> Homologação de ferramenta inteligente para análise e refatoração de código com foco nas normas do CNPJ Alfanumérico.</li>
                    <li><strong>Porto Seguro:</strong> Ajuste estrutural e garantia de segurança e criptografia de dados no fluxo de emissão de boletos corporativos.</li>
                </ul>
            `
        },
        ecs: {
            tag: "ECS INOVAÇÃO // QA PLENO",
            title: "ECS Inovação (Set 2022 - Jun 2024)",
            content: `
                <p>Garantia de qualidade e automação de processos críticos no ecossistema de saúde e farma:</p>
                <ul>
                    <li><strong>Automação Cypress:</strong> Ganho de 20% em novos cenários validados via scripts reutilizáveis e robustos.</li>
                    <li><strong>APIs & Banco de Dados:</strong> Consumo integral de APIs (Postman/Swagger) combinados com consultas de consistência via Microsoft SQL Server.</li>
                    <li><strong>Ecossistema Farma:</strong> Homologação de regras críticas em fluxos de estoque, vendas online de medicamentos e laudos laboratoriais.</li>
                </ul>
            `
        },
        indra: {
            tag: "INDRA // QA PLENO",
            title: "Indra (Set 2021 - Set 2022)",
            content: `
                <p>Foco em eficiência de testes e implementação de frameworks escaláveis:</p>
                <ul>
                    <li><strong>Automação Avançada:</strong> Incremento massivo de 40% no volume de testes validados por meio de automação com Cypress e Robot Framework.</li>
                    <li><strong>Métricas TMMi:</strong> Construção de relatórios estruturados baseados no modelo TMMi para suporte de melhoria contínua.</li>
                    <li><strong>Gestão Ágil:</strong> Rastreabilidade ponta a ponta de defeitos em ecossistemas Jira, Azure DevOps e TestLink.</li>
                </ul>
            `
        },
        wati: {
            tag: "WATI CONSULTORIA // QA",
            title: "WATI Consultoria (Jul 2020 - Set 2021)",
            content: `
                <p>Homologação em sistemas de saúde de alta criticidade:</p>
                <ul>
                    <li><strong>Urgência Hospitalar:</strong> Elaboração e execução de cenários no TestLink focados nos sistemas PEP e SoulMV.</li>
                    <li><strong>Regressão Web:</strong> Criação de scripts dinâmicos de regressão cross-browser utilizando Selenium e Robot Framework.</li>
                    <li><strong>Backend:</strong> Manipulação, extração de dados e validação de regras de backend utilizando SQL Developer.</li>
                </ul>
            `
        },
        accenture: {
            tag: "ACCENTURE BRASIL // QA",
            title: "Accenture Brasil (Jun 2015 - Jul 2020)",
            content: `
                <p>Consolidação de 5 anos de experiência em operações massivas de telecomunicações e grandes sistemas:</p>
                <ul>
                    <li><strong>Telecom (Oi):</strong> Homologação de ponta a ponta em fluxos massivos de TV por assinatura, internet fixa/móvel e planos telefônicos.</li>
                    <li><strong>Banco de Dados:</strong> Criação de scripts PL/SQL estruturados em bases Oracle para consistência de dados.</li>
                    <li><strong>Ferramental:</strong> Gestão de qualidade utilizando ALM e Azure DevOps.</li>
                </ul>
            `
        }
    };

    // Dados dos Diplomas / Certificações para o Popup de Papel
    const paperData = {
        post: {
            date: "REGISTRADO EM 2026",
            title: "Qualidade e Teste de Software",
            institution: "UniCesumar (Pós-Graduação - Em andamento)",
            desc: "Certificado de capacitação avançada em engenharia de software, métricas de qualidade, metodologias ágeis de teste, testes de carga, automação avançada e governança de qualidade corporativa."
        },
        degree: {
            date: "CONCLUÍDO",
            title: "Análise e Desenvolvimento de Sistemas",
            institution: "Estácio (Ensino Superior)",
            desc: "Diploma superior em Análise e Desenvolvimento de Sistemas, cobrindo arquitetura de software, algoritmos, engenharia de dados, segurança da informação e gestão de projetos tecnológicos."
        },
        cert: {
            date: "CERTIFICADO DE ESPECIALIZAÇÃO",
            title: "Cyber Security & DevOps Contínuo",
            institution: "Instituto de Segurança da Informação",
            desc: "Certificação em práticas de segurança defensiva, auditoria de código, análise de vulnerabilidades, integração contínua (CI/CD) segura e blindagem de ambientes corporativos em nuvem."
        }
    };

    // Função de Tradução do Site
    const setLanguage = (lang) => {
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
    };

    langSelect.addEventListener('change', (e) => {
        setLanguage(e.target.value);
    });

    // Interatividade nas Tech Tags (Hover & Click Animations + Abre Modal da Tech)
    techTags.forEach(tag => {
        tag.addEventListener('click', () => {
            tag.classList.add('clicked');
            const techKey = tag.getAttribute('data-tech');
            const data = techDetails[techKey];

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
            const companyKey = item.getAttribute('data-company');
            const data = companyData[companyKey];
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

    // Abrir Modal de Papel (Diploma)
    paperTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const eduKey = trigger.getAttribute('data-edu');
            const data = paperData[eduKey];
            if (!data) return;

            paperDate.textContent = data.date;
            paperTitle.textContent = data.title;
            paperInstitution.textContent = `Instituição: ${data.institution}`;
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