const ProjectCard = ({ title, description, technologies, objectives, link, icon, index }) => {
    const [isHovered, setIsHovered] = React.useState(false);
    
    const colors = ['#667eea', '#764ba2', '#8b5cf6', '#7c3aed'];
    const iconColor = colors[index % colors.length];
    
    return (
        <div 
            className="project-card"
            style={{
                background: 'white',
                borderRadius: '16px',
                overflow: 'hidden',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                transform: isHovered ? 'translateY(-8px)' : 'translateY(0)',
                boxShadow: isHovered ? '0 20px 40px rgba(102, 126, 234, 0.15)' : '0 4px 15px rgba(0, 0, 0, 0.08)',
                height: '100%',
                display: 'flex',
                flexDirection: 'column'
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}>
        
            <div style={{
                background: `linear-gradient(135deg, ${iconColor}, #764ba2)`,
                padding: '1.5rem',
                textAlign: 'center',
                position: 'relative'
            }}>
                <i className={icon} style={{ fontSize: '2.5rem', color: 'white' }}></i>
            </div>
            
            <div style={{ padding: '1.5rem', flex: 1 }}>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '0.75rem', color: '#333', fontWeight: '600' }}>{title}</h3>
                <p style={{ color: '#666', lineHeight: '1.6', marginBottom: '1rem', fontSize: '0.9rem' }}>{description}</p>
                
                <div style={{ marginBottom: '1rem' }}>
                    <h4 style={{ fontSize: '0.8rem', color: '#667eea', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                        <i className="fas fa-tags"></i> Technologies
                    </h4>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                        {technologies.map((tech, idx) => (
                            <span key={idx} style={{
                                background: '#ede9fe',
                                padding: '0.25rem 0.75rem',
                                borderRadius: '20px',
                                fontSize: '0.75rem',
                                color: '#667eea',
                                fontWeight: '500'
                            }}>{tech}</span>
                        ))}
                    </div>
                </div>
                
                {objectives && objectives.length > 0 && (
                    <div style={{ marginBottom: '1rem' }}>
                        <h4 style={{ fontSize: '0.8rem', color: '#667eea', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                            <i className="fas fa-bullseye"></i> Objectifs
                        </h4>
                        <ul style={{ paddingLeft: '1rem', color: '#666', fontSize: '0.85rem' }}>
                            {objectives.map((obj, idx) => (
                                <li key={idx} style={{ marginBottom: '0.25rem' }}>{obj}</li>
                            ))}
                        </ul>
                    </div>
                )}
                
                {link && (
                    <a href={link} target="_blank" style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        color: '#667eea',
                        textDecoration: 'none',
                        fontWeight: '500',
                        fontSize: '0.85rem',
                        marginTop: '0.5rem',
                        transition: 'gap 0.3s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.gap = '0.75rem'}
                    onMouseLeave={(e) => e.currentTarget.style.gap = '0.5rem'}>
                        Voir le projet <i className="fas fa-external-link-alt"></i>
                    </a>
                )}
            </div>
        </div>
    );
};

const projectsData = [
    {
        title: "Site Web Touristique",
        description: "Conception d'une plateforme web mettant en valeur des destinations touristiques avec une interface moderne et intuitive.",
        technologies: ["HTML", "CSS", "JavaScript"],
        objectives: [
            "Création d'interfaces responsives",
            "Structuration de contenu dynamique",
            "Amélioration de l'expérience utilisateur"
        ],
        link: "https://github.com/hibaregragui/A-Mgoune.git",
        icon: "fas fa-map-marked-alt"
    },
    {
        title: "Jeu Vidéo",
        description: "Développement d'un mini-jeu interactif dans le cadre d'un projet académique, axé sur la logique algorithmique.",
        technologies: ["C", "C++"],
        objectives: [
            "Mise en pratique des algorithmes",
            "Gestion des événements",
            "Structuration logique d'une application"
        ],
        link: "https://github.com/hiba/jeu-video",
        icon: "fas fa-gamepad"
    },
    {
        title: "Portfolio Professionnel",
        description: "Création d'un portfolio personnel destiné à présenter mon parcours, mes compétences et mes projets.",
        technologies: ["HTML", "CSS", "JavaScript", "React.js"],
        objectives: [
            "Présentation professionnelle",
            "Intégration de composants dynamiques",
            "Design responsive"
        ],
        link: "https://github.com/hibaregragui/hibaregragui.github.io",
        icon: "fas fa-briefcase"
    }
];

const ProjectsList = () => {
    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '2rem',
            marginTop: '1rem'
        }}>
            {projectsData.map((project, index) => (
                <ProjectCard key={index} {...project} index={index} />
            ))}
        </div>
    );
};

ReactDOM.render(<ProjectsList />, document.getElementById('react-projects'));