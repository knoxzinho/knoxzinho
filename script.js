document.addEventListener('DOMContentLoaded', () => {
    let currentLang = 'pt';

    // DICIONÁRIO COMPLETO DE TRADUÇÕES (PT, EN, ES)
    const translations = {
        pt: {
            nav_about: 'Sobre',
            nav_skills: 'Skills',
            nav_experience: 'Experiência',
            nav_education: 'Formação',
            nav_hobbies: 'Hobbies',
            nav_contact: 'Contato',
            hero_badge: 'Disponível para novos desafios',
            hero_title: 'Quality Assurance Engineer & Bug Hunter',
            hero_subtitle: 'Especialista em automação de testes end-to-end, validação de APIs e qualidade de software com mais de 10 anos de experiência em grandes corporações.',
            hero_cta: 'Entrar em Contato',
            stat_exp: 'Anos de Experiência',
            stat_start: 'Início na Carreira Tech',
            stat_focus: 'Foco em Qualidade & Regressão',
            skills_title: 'Stack Tecnológica',
            skills_subtitle: 'Ferramentas e tecnologias que utilizo para garantir excelência em software.',
            skill_cat_1: 'Automação & E2E',
            skill_cat_2: 'APIs & Banco de Dados',
            skill_cat_3: 'Inteligência Artificial',
            skill_cat_4: 'DevOps & Gestão',
            exp_title: 'Experiência Profissional',
            exp_subtitle: 'Trajetória em empresas líderes de mercado e consultorias. Clique em uma empresa para ver os detalhes.',
            exp_click_more: 'Ver detalhes da atuação ↗',
            exp_deloitte_role: 'Analista de QA Pleno',
            exp_deloitte_date: 'Nov 2024 - Presente',
            exp_deloitte_short: 'Validação de soluções de IA conversacional (ChatPetrobras), CNPJ Alfanumérico e segurança financeira na Porto Seguro.',
            exp_ecs_role: 'Analista de QA Pleno',
            exp_ecs_date: 'Set 2022 - Jun 2024',
            exp_ecs_short: 'Ganho de 20% em cobertura de testes via automação em Cypress, validação de APIs/SQL e homologação no ecossistema Farma.',
            exp_indra_role: 'Analista de QA Pleno',
            exp_indra_date: 'Set 2021 - Set 2022',
            exp_indra_short: 'Aumento de 40% no volume de testes automatizados com Cypress e Robot Framework, métricas TMMi e gestão Jira/Azure.',
            exp_wati_role: 'Analista de QA',
            exp_wati_date: 'Jul 2020 - Set 2021',
            exp_wati_short: 'Execução em sistemas críticos de Urgência Hospitalar (PEP/SoulMV), regressão com Selenium e validação SQL Developer.',
            exp_accenture_role: 'Analista de QA',
            exp_accenture_date: 'Jun 2015 - Jul 2020',
            exp_accenture_short: '5 anos dedicados à qualidade em produtos web/mobile, scripts Oracle PL/SQL e homologação massiva em telecomunicações (Oi).',
            edu_title: 'Formação & Certificações',
            edu_subtitle: 'Clique em qualquer item abaixo para abrir o documento detalhado.',
            edu_1_type: 'Pós-Graduação (Em andamento)',
            edu_1_title: 'Qualidade e Teste de Software',
            edu_1_detail: 'Especialização focada em arquitetura de testes automatizados, engenharia de qualidade contínua, métricas ágeis, gestão de defeitos e validação avançada de sistemas críticos.',
            edu_2_type: 'Graduação',
            edu_2_title: 'Análise e Desenvolvimento de Sistemas',
            edu_2_detail: 'Formação superior abrangendo engenharia de software, arquitetura de banco de dados relacionais, algoritmos, desenvolvimento web e ciclo de vida completo de aplicações.',
            edu_3_type: 'Certificação',
            edu_3_title: 'Cyber Security & DevOps',
            edu_3_inst: 'Segurança da Informação Contínua',
            edu_3_detail: 'Práticas de DevSecOps, análise de vulnerabilidades em APIs, proteção de dados sensíveis, criptografia e integração segura em esteiras CI/CD (GitHub e Azure DevOps).',
            edu_stamp_progress: 'DOCUMENTO ACADÊMICO // EM CURSO',
            edu_stamp_done: 'DIPLOMA REGISTRADO // CONCLUÍDO',
            edu_stamp_cert: 'CERTIFICADO VERIFICADO // CONCLUÍDO',
            hobbies_title: 'Hobbies & Interesses',
            hobbies_subtitle: 'O que me inspira e movimenta fora das linhas de código e dos planos de teste.',
            hobby_1_title: 'Música & Violão',
            hobby_1_desc: 'Tocar violão, cantar e criar arranjos musicais ao vivo com setups de loop e camadas sonoras.',
            hobby_2_title: 'PC Gaming & Sci-Fi',
            hobby_2_desc: 'Explorar mundos imersivos, jogos táticos e narrativas cyberpunk nas horas vagas na Steam.',
            hobby_3_title: 'Praia & Corrida',
            hobby_3_desc: 'Aproveitar o litoral, atividades ao ar livre no mar e participar de corridas de rua.',
            hobby_4_title: 'Gastronomia & Cafés',
            hobby_4_desc: 'Conhecer novos restaurantes, apreciar bons pratos e descobrir cafeterias especiais.',
            contact_title: 'Vamos construir software com qualidade?',
            contact_subtitle: 'Entre em contato direto para oportunidades, projetos ou conexões profissionais.',
            btn_copy_email: 'Copiar E-mail ⎘',
            btn_copy_phone: 'Copiar Telefone ⎘',
            footer_rights: '© 2026 Rian Barbosa Dos Santos. Todos os direitos reservados.',
            toast_copied: 'Copiado:'
        },
        en: {
            nav_about: 'About',
            nav_skills: 'Skills',
            nav_experience: 'Experience',
            nav_education: 'Education',
            nav_hobbies: 'Hobbies',
            nav_contact: 'Contact',
            hero_badge: 'Available for new challenges',
            hero_title: 'Quality Assurance Engineer & Bug Hunter',
            hero_subtitle: 'Specialist in end-to-end test automation, API validation, and software quality with over 10 years of experience in leading corporations.',
            hero_cta: 'Get in Touch',
            stat_exp: 'Years of Experience',
            stat_start: 'Started in Tech',
            stat_focus: 'Focus on Quality & Regression',
            skills_title: 'Tech Stack',
            skills_subtitle: 'Tools and technologies I use to deliver software excellence.',
            skill_cat_1: 'Automation & E2E',
            skill_cat_2: 'APIs & Databases',
            skill_cat_3: 'Artificial Intelligence',
            skill_cat_4: 'DevOps & Management',
            exp_title: 'Professional Experience',
            exp_subtitle: 'Career path across market-leading companies and consultancies. Click on a company to view full details.',
            exp_click_more: 'View role details ↗',
            exp_deloitte_role: 'Mid-Senior QA Analyst',
            exp_deloitte_date: 'Nov 2024 - Present',
            exp_deloitte_short: 'Validation of conversational AI solutions (ChatPetrobras), Alphanumeric CNPJ compliance, and financial security at Porto Seguro.',
            exp_ecs_role: 'Mid-Senior QA Analyst',
            exp_ecs_date: 'Sep 2022 - Jun 2024',
            exp_ecs_short: '20% increase in test coverage via Cypress automation, API/SQL validation, and critical healthcare & pharma workflows.',
            exp_indra_role: 'Mid-Senior QA Analyst',
            exp_indra_date: 'Sep 2021 - Sep 2022',
            exp_indra_short: '40% boost in automated test volume using Cypress and Robot Framework, TMMi metrics, and Jira/Azure management.',
            exp_wati_role: 'QA Analyst',
            exp_wati_date: 'Jul 2020 - Sep 2021',
            exp_wati_short: 'Testing critical Hospital Emergency systems (PEP/SoulMV), cross-browser Selenium regression, and SQL Developer validation.',
            exp_accenture_role: 'QA Analyst',
            exp_accenture_date: 'Jun 2015 - Jul 2020',
            exp_accenture_short: '5 years dedicated to web/mobile quality assurance, Oracle PL/SQL scripts, and large-scale Telecom (Oi) end-to-end testing.',
            edu_title: 'Education & Certifications',
            edu_subtitle: 'Click on any item below to unfold the detailed academic document.',
            edu_1_type: 'Postgraduate (In progress)',
            edu_1_title: 'Software Quality and Testing',
            edu_1_detail: 'Specialization focused on automated testing architecture, continuous quality engineering, agile metrics, defect management, and critical systems validation.',
            edu_2_type: 'Bachelor / Degree',
            edu_2_title: 'Systems Analysis and Development',
            edu_2_detail: 'Higher education covering software engineering, relational database architecture, algorithms, web development, and full application lifecycle.',
            edu_3_type: 'Certification',
            edu_3_title: 'Cyber Security & DevOps',
            edu_3_inst: 'Continuous Information Security',
            edu_3_detail: 'DevSecOps practices, API vulnerability analysis, sensitive data protection, cryptography, and secure CI/CD pipelines (GitHub and Azure DevOps).',
            edu_stamp_progress: 'ACADEMIC RECORD // IN PROGRESS',
            edu_stamp_done: 'REGISTERED DIPLOMA // COMPLETED',
            edu_stamp_cert: 'VERIFIED CERTIFICATE // COMPLETED',
            hobbies_title: 'Hobbies & Interests',
            hobbies_subtitle: 'What inspires and drives me outside lines of code and test plans.',
            hobby_1_title: 'Music & Acoustic Guitar',
            hobby_1_desc: 'Playing acoustic guitar, singing, and building live musical arrangements with loop setups.',
            hobby_2_title: 'PC Gaming & Sci-Fi',
            hobby_2_desc: 'Exploring immersive worlds, tactical shooters, and cyberpunk narratives on Steam.',
            hobby_3_title: 'Beach & Running',
            hobby_3_desc: 'Enjoying the coast, ocean activities, and participating in street running events.',
            hobby_4_title: 'Gastronomy & Coffee',
            hobby_4_desc: 'Exploring restaurants, enjoying great dishes, and discovering specialty coffee shops.',
            contact_title: 'Let’s build high-quality software?',
            contact_subtitle: 'Reach out directly for opportunities, projects, or professional networking.',
            btn_copy_email: 'Copy Email ⎘',
            btn_copy_phone: 'Copy Phone ⎘',
            footer_rights: '© 2026 Rian Barbosa Dos Santos. All rights reserved.',
            toast_copied: 'Copied:'
        },
        es: {
            nav_about: 'Sobre mí',
            nav_skills: 'Skills',
            nav_experience: 'Experiencia',
            nav_education: 'Formación',
            nav_hobbies: 'Hobbies',
            nav_contact: 'Contacto',
            hero_badge: 'Disponible para nuevos desafíos',
            hero_title: 'Quality Assurance Engineer & Bug Hunter',
            hero_subtitle: 'Especialista en automatización de pruebas end-to-end, validación de APIs y calidad de software con más de 10 años de experiencia en grandes corporaciones.',
            hero_cta: 'Contactar',
            stat_exp: 'Años de Experiencia',
            stat_start: 'Inicio en Tecnología',
            stat_focus: 'Enfoque en Calidad y Regresión',
            skills_title: 'Stack Tecnológico',
            skills_subtitle: 'Herramientas y tecnologías que utilizo para garantizar la excelencia del software.',
            skill_cat_1: 'Automatización & E2E',
            skill_cat_2: 'APIs & Bases de Datos',
            skill_cat_3: 'Inteligencia Artificial',
            skill_cat_4: 'DevOps & Gestión',
            exp_title: 'Experiencia Profesional',
            exp_subtitle: 'Trayectoria en empresas líderes y consultoras. Haz clic en cada empresa para ver los detalles.',
            exp_click_more: 'Ver detalles del puesto ↗',
            exp_deloitte_role: 'Analista de QA Semi-Senior',
            exp_deloitte_date: 'Nov 2024 - Presente',
            exp_deloitte_short: 'Validación de soluciones de IA conversacional (ChatPetrobras), CNPJ Alfanumérico y seguridad financiera en Porto Seguro.',
            exp_ecs_role: 'Analista de QA Semi-Senior',
            exp_ecs_date: 'Sep 2022 - Jun 2024',
            exp_ecs_short: 'Aumento del 20% en cobertura mediante automatización en Cypress, validación de APIs/SQL y homologación en el sector Farma.',
            exp_indra_role: 'Analista de QA Semi-Senior',
            exp_indra_date: 'Sep 2021 - Sep 2022',
            exp_indra_short: 'Incremento del 40% en pruebas automatizadas con Cypress y Robot Framework, métricas TMMi y gestión en Jira/Azure.',
            exp_wati_role: 'Analista de QA',
            exp_wati_date: 'Jul 2020 - Sep 2021',
            exp_wati_short: 'Pruebas en sistemas críticos de Urgencia Hospitalaria (PEP/SoulMV), regresión con Selenium y validación en SQL Developer.',
            exp_accenture_role: 'Analista de QA',
            exp_accenture_date: 'Jun 2015 - Jul 2020',
            exp_accenture_short: '5 años dedicados a la calidad en productos web/móvil, scripts Oracle PL/SQL y homologación masiva en telecomunicaciones (Oi).',
            edu_title: 'Formación & Certificaciones',
            edu_subtitle: 'Haz clic en cualquier elemento para desplegar el documento detallado.',
            edu_1_type: 'Posgrado (En curso)',
            edu_1_title: 'Calidad y Pruebas de Software',
            edu_1_detail: 'Especialización enfocada en arquitectura de pruebas automatizadas, ingeniería de calidad continua, métricas ágiles y validación avanzada de sistemas críticos.',
            edu_2_type: 'Grado Universitario',
            edu_2_title: 'Análisis y Desarrollo de Sistemas',
            edu_2_detail: 'Formación superior en ingeniería de software, arquitectura de bases de datos relacionales, algoritmos, desarrollo web y ciclo de vida de aplicaciones.',
            edu_3_type: 'Certificación',
            edu_3_title: 'Cyber Security & DevOps',
            edu_3_inst: 'Seguridad de la Información Continua',
            edu_3_detail: 'Prácticas de DevSecOps, análisis de vulnerabilidades en APIs, protección de datos sensibles, criptografía e integración segura en CI/CD.',
            edu_stamp_progress: 'DOCUMENTO ACADÉMICO // EN CURSO',
            edu_stamp_done: 'DIPLOMA REGISTRADO // COMPLETADO',
            edu_stamp_cert: 'CERTIFICADO VERIFICADO // COMPLETADO',
            hobbies_title: 'Hobbies & Intereses',
            hobbies_subtitle: 'Lo que me inspira y motiva fuera de las líneas de código y los planes de prueba.',
            hobby_1_title: 'Música & Guitarra',
            hobby_1_desc: 'Tocar la guitarra acústica, cantar y crear arreglos musicales en vivo con setups de loop.',
            hobby_2_title: 'PC Gaming & Sci-Fi',
            hobby_2_desc: 'Explorar mundos inmersivos, juegos tácticos y narrativas cyberpunk en Steam.',
            hobby_3_title: 'Playa & Running',
            hobby_3_desc: 'Disfrutar de la costa, actividades en el mar y participar en carreras de calle.',
            hobby_4_title: 'Gastronomía & Cafés',
            hobby_4_desc: 'Conocer nuevos restaurantes, disfrutar de buenos platos y descubrir cafeterías especiales.',
            contact_title: '¿Construimos software con calidad?',
            contact_subtitle: 'Ponte en contacto directo para oportunidades, proyectos o conexiones profesionales.',
            btn_copy_email: 'Copiar Correo ⎘',
            btn_copy_phone: 'Copiar Teléfono ⎘',
            footer_rights: '© 2026 Rian Barbosa Dos Santos. Todos los derechos reservados.',
            toast_copied: 'Copiado:'
        }
    };

    // DETALHES DOS POPUPS DE EXPERIÊNCIA POR IDIOMA
    const expDetails = {
        deloitte: {
            company: 'Deloitte',
            pt: {
                role: 'Analista de QA Pleno',
                date: 'Nov 2024 - Presente',
                bullets: [
                    '<strong>ChatPetrobras:</strong> Validação minuciosa de solução de IA conversacional baseada em LLM integrada a dados operacionais e fluxos internos da Petrobras.',
                    '<strong>Adequação Federal:</strong> Homologação de ferramenta inteligente para análise e refatoração de código com foco nas normas do CNPJ Alfanumérico.',
                    '<strong>Porto Seguro:</strong> Ajuste estrutural e garantia de segurança/criptografia de dados no fluxo de emissão de boletos corporativos.'
                ]
            },
            en: {
                role: 'Mid-Senior QA Analyst',
                date: 'Nov 2024 - Present',
                bullets: [
                    '<strong>ChatPetrobras:</strong> Thorough validation of an LLM-based conversational AI solution integrated with Petrobras operational data and internal workflows.',
                    '<strong>Federal Compliance:</strong> QA sign-off for an intelligent code analysis and refactoring tool focused on Alphanumeric CNPJ regulations.',
                    '<strong>Porto Seguro:</strong> Structural validation and data encryption/security assurance for corporate billing slip issuance workflows.'
                ]
            },
            es: {
                role: 'Analista de QA Semi-Senior',
                date: 'Nov 2024 - Presente',
                bullets: [
                    '<strong>ChatPetrobras:</strong> Validación exhaustiva de una solución de IA conversacional basada en LLM integrada con datos operativos y flujos internos de Petrobras.',
                    '<strong>Adecuación Federal:</strong> Homologación de herramienta inteligente para análisis y refactorización de código enfocada en las normas del CNPJ Alfanumérico.',
                    '<strong>Porto Seguro:</strong> Ajuste estructural y garantía de seguridad/criptografía de datos en el flujo de emisión de boletos corporativos.'
                ]
            }
        },
        ecs: {
            company: 'ECS Inovação',
            pt: {
                role: 'Analista de QA Pleno',
                date: 'Set 2022 - Jun 2024',
                bullets: [
                    '<strong>Automação em Cypress:</strong> Ganho de 20% em novos cenários validados através da criação de scripts reutilizáveis e arquitetura escalável.',
                    '<strong>Testes de Backend:</strong> Consumo e validação integral de APIs REST (Postman/Swagger) combinados com consultas de consistência em MS SQL Server.',
                    '<strong>Ecossistema Farma:</strong> Homologação de regras críticas de negócio em fluxos de estoque, e-commerce de medicamentos e laudos laboratoriais.'
                ]
            },
            en: {
                role: 'Mid-Senior QA Analyst',
                date: 'Sep 2022 - Jun 2024',
                bullets: [
                    '<strong>Cypress Automation:</strong> 20% increase in validated test scenarios by building reusable scripts and scalable automation architecture.',
                    '<strong>Backend Testing:</strong> End-to-end REST API validation (Postman/Swagger) combined with data consistency queries in MS SQL Server.',
                    '<strong>Pharma Ecosystem:</strong> QA sign-off on critical business rules covering inventory, online medication sales, and clinical lab reports.'
                ]
            },
            es: {
                role: 'Analista de QA Semi-Senior',
                date: 'Sep 2022 - Jun 2024',
                bullets: [
                    '<strong>Automatización en Cypress:</strong> Ganancia del 20% en nuevos escenarios validados mediante scripts reutilizables y arquitectura escalable.',
                    '<strong>Pruebas de Backend:</strong> Consumo y validación integral de APIs REST (Postman/Swagger) combinados con consultas en MS SQL Server.',
                    '<strong>Ecosistema Farma:</strong> Homologación de reglas críticas en flujos de inventario, venta online de medicamentos e informes de laboratorio.'
                ]
            }
        },
        indra: {
            company: 'Indra',
            pt: {
                role: 'Analista de QA Pleno',
                date: 'Set 2021 - Set 2022',
                bullets: [
                    '<strong>Eficiência em Automação:</strong> Incremento de 40% no volume de testes validados por meio de automação com Cypress e Robot Framework.',
                    '<strong>Qualidade TMMi:</strong> Elaboração de relatórios e indicadores estruturados baseados no modelo TMMi para melhoria contínua.',
                    '<strong>Gestão de Defeitos:</strong> Rastreabilidade ponta a ponta em ecossistemas Jira, Azure DevOps e TestLink.'
                ]
            },
            en: {
                role: 'Mid-Senior QA Analyst',
                date: 'Sep 2021 - Sep 2022',
                bullets: [
                    '<strong>Automation Efficiency:</strong> 40% increase in validated test volume through Cypress and Robot Framework automation.',
                    '<strong>TMMi Quality Metrics:</strong> Built structured quality reports and KPIs based on the TMMi model to drive continuous improvement.',
                    '<strong>Defect Management:</strong> End-to-end defect traceability across Jira, Azure DevOps, and TestLink.'
                ]
            },
            es: {
                role: 'Analista de QA Semi-Senior',
                date: 'Sep 2021 - Sep 2022',
                bullets: [
                    '<strong>Eficiencia en Automatización:</strong> Incremento del 40% en el volumen de pruebas validadas mediante Cypress y Robot Framework.',
                    '<strong>Métricas TMMi:</strong> Construcción de informes estructurados basados en el modelo TMMi para soporte de mejora continua.',
                    '<strong>Gestión de Defectos:</strong> Trazabilidad de extremo a extremo en ecosistemas Jira, Azure DevOps y TestLink.'
                ]
            }
        },
        wati: {
            company: 'WATI Consultoria',
            pt: {
                role: 'Analista de QA',
                date: 'Jul 2020 - Set 2021',
                bullets: [
                    '<strong>Sistemas Hospitalares:</strong> Elaboração e execução de cenários críticos no TestLink focados em Urgência Hospitalar (PEP e SoulMV).',
                    '<strong>Regressão Web:</strong> Criação de scripts dinâmicos de regressão cross-browser utilizando Selenium e Robot Framework.',
                    '<strong>Banco de Dados:</strong> Manipulação, extração de dados e validação de regras de negócio utilizando SQL Developer.'
                ]
            },
            en: {
                role: 'QA Analyst',
                date: 'Jul 2020 - Sep 2021',
                bullets: [
                    '<strong>Healthcare Systems:</strong> Designed and executed critical test scenarios in TestLink focused on Hospital Emergency systems (PEP and SoulMV).',
                    '<strong>Web Regression:</strong> Created dynamic cross-browser regression scripts using Selenium and Robot Framework.',
                    '<strong>Database Validation:</strong> Data manipulation, extraction, and backend rule validation using SQL Developer.'
                ]
            },
            es: {
                role: 'Analista de QA',
                date: 'Jul 2020 - Sep 2021',
                bullets: [
                    '<strong>Sistemas Hospitalarios:</strong> Elaboración y ejecución de escenarios críticos en TestLink enfocados en Urgencia Hospitalaria (PEP y SoulMV).',
                    '<strong>Regresión Web:</strong> Creación de scripts dinámicos de regresión cross-browser utilizando Selenium y Robot Framework.',
                    '<strong>Bases de Datos:</strong> Manipulación, extracción de datos y validación de reglas de backend con SQL Developer.'
                ]
            }
        },
        accenture: {
            company: 'Accenture Brasil',
            pt: {
                role: 'Analista de QA',
                date: 'Jun 2015 - Jul 2020',
                bullets: [
                    '<strong>Consolidação em QA:</strong> 5 anos dedicados à garantia de qualidade em produtos web e mobile utilizando HP ALM e Azure DevOps.',
                    '<strong>Engenharia de Dados:</strong> Criação de scripts PL/SQL estruturados em bases Oracle para validação de integridade.',
                    '<strong>Telecom (Oi):</strong> Homologação de ponta a ponta em fluxos massivos de TV por assinatura, internet fibra/móvel e planos telefônicos.'
                ]
            },
            en: {
                role: 'QA Analyst',
                date: 'Jun 2015 - Jul 2020',
                bullets: [
                    '<strong>QA Foundation:</strong> 5 years dedicated to quality assurance across web and mobile products using HP ALM and Azure DevOps.',
                    '<strong>Data Engineering:</strong> Developed structured PL/SQL scripts on Oracle databases for data integrity validation.',
                    '<strong>Telecom (Oi):</strong> End-to-end testing for high-volume pay-TV, fiber/mobile internet, and telephony billing workflows.'
                ]
            },
            es: {
                role: 'Analista de QA',
                date: 'Jun 2015 - Jul 2020',
                bullets: [
                    '<strong>Consolidación en QA:</strong> 5 años dedicados al aseguramiento de calidad en productos web y móviles utilizando HP ALM y Azure DevOps.',
                    '<strong>Ingeniería de Datos:</strong> Creación de scripts PL/SQL estructurados en bases Oracle para consistencia de datos.',
                    '<strong>Telecom (Oi):</strong> Homologación de extremo a extremo en flujos masivos de TV de pago, internet fija/móvil y planes telefónicos.'
                ]
            }
        }
    };

    // 1. TROCA DE IDIOMA (PT / EN / ES)
    const langButtons = document.querySelectorAll('.lang-btn');
    const applyLanguage = (lang) => {
        currentLang = lang;
        document.documentElement.lang = lang === 'pt' ? 'pt-BR' : lang;

        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[lang] && translations[lang][key]) {
                el.textContent = translations[lang][key];
                if (el.classList.contains('nav-glitch')) {
                    el.setAttribute('data-text', translations[lang][key]);
                }
            }
        });

        langButtons.forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
        });
    };

    langButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            applyLanguage(btn.getAttribute('data-lang'));
        });
    });

    // 2. MODAL DE EXPERIÊNCIA PROFISSIONAL
    const expModalOverlay = document.getElementById('expModalOverlay');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const modalCompanyBadge = document.getElementById('modalCompanyBadge');
    const modalRoleTitle = document.getElementById('modalRoleTitle');
    const modalDate = document.getElementById('modalDate');
    const modalList = document.getElementById('modalList');

    const openExpModal = (expKey) => {
        const item = expDetails[expKey];
        if (!item) return;
        const localized = item[currentLang] || item.pt;

        modalCompanyBadge.textContent = item.company;
        modalRoleTitle.textContent = localized.role;
        modalDate.textContent = localized.date;
        modalList.innerHTML = localized.bullets.map(b => `<li>${b}</li>`).join('');

        expModalOverlay.classList.add('active');
        expModalOverlay.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    };

    const closeExpModal = () => {
        expModalOverlay.classList.remove('active');
        expModalOverlay.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    };

    document.querySelectorAll('.interactive-exp').forEach(card => {
        card.addEventListener('click', () => openExpModal(card.getAttribute('data-exp')));
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openExpModal(card.getAttribute('data-exp'));
            }
        });
    });

    closeModalBtn.addEventListener('click', closeExpModal);
    expModalOverlay.addEventListener('click', (e) => {
        if (e.target === expModalOverlay) closeExpModal();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeExpModal();
    });

    // 3. EFEITO DE FOLHA DE PAPEL ABRINDO EM FORMAÇÃO & CERTIFICAÇÕES
    document.querySelectorAll('.edu-card').forEach(card => {
        const togglePaper = () => {
            const isOpen = card.classList.toggle('open');
            card.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        };

        card.addEventListener('click', togglePaper);
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                togglePaper();
            }
        });
    });

    // 4. COPIAR CONTATO COM TOAST TRADUZIDO
    const copyButtons = document.querySelectorAll('[data-copy]');
    const toast = document.getElementById('toast');
    let toastTimeout = null;

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
            const prefix = translations[currentLang]?.toast_copied || 'Copiado:';

            try {
                await navigator.clipboard.writeText(valueToCopy);
                showToast(`${prefix} ${valueToCopy}`);
            } catch (err) {
                showToast(`${prefix} ${valueToCopy}`);
            }
        });
    });
});