$(document).ready(function() {
    // Compétences techniques
    const technicalSkills = [
        { name: "HTML / CSS", percent: 90, level: "Avancé", color: "#667eea" },
        { name: "JavaScript", percent: 70, level: "Intermédiaire", color: "#764ba2" },
        { name: "React.js", percent: 45, level: "Débutante", color: "#8b5cf6" },
        { name: "Python", percent: 70, level: "Intermédiaire", color: "#7c3aed" },
        { name: "C / C++", percent: 68, level: "Intermédiaire", color: "#6d28d9" },
        { name: "SQL & BD", percent: 65, level: "Intermédiaire", color: "#5b21b6" },
        { name: "UML / Modélisation", percent: 65, level: "Intermédiaire", color: "#4c1d95" },
        { name: "Assembleur", percent: 25, level: "Notions", color: "#3b0764" },
        { name: "Linux", percent: 70, level: "Intermédiaire", color: "#2e1065" }
    ];
    
    let pieChart = null;
    let chartAnimated = false;
    
    // Fonction pour créer le diagramme circulaire
    function createPieChart() {
        const ctx = document.getElementById('skillsPieChart').getContext('2d');
        
        pieChart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: technicalSkills.map(s => s.name),
                datasets: [{
                    data: technicalSkills.map(s => s.percent),
                    backgroundColor: technicalSkills.map(s => s.color),
                    borderColor: 'white',
                    borderWidth: 2,
                    hoverOffset: 15,
                    offset: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const label = context.label || '';
                                const value = context.raw || 0;
                                const skill = technicalSkills.find(s => s.name === label);
                                return `${label}: ${value}% - ${skill ? skill.level : ''}`;
                            }
                        },
                        backgroundColor: 'rgba(0,0,0,0.8)',
                        titleColor: 'white',
                        bodyColor: '#ddd',
                        padding: 10,
                        cornerRadius: 8
                    }
                },
                onClick: function(event, activeElements) {
                    if (activeElements.length > 0) {
                        const index = activeElements[0].dataIndex;
                        const skill = technicalSkills[index];
                        alert(`${skill.name}\nNiveau: ${skill.percent}% - ${skill.level}`);
                    }
                },
                onHover: function(event, activeElements) {
                    if (activeElements.length > 0) {
                        event.native.target.style.cursor = 'pointer';
                        // Effet d'agrandissement de la portion survolée
                        if (pieChart) {
                            const index = activeElements[0].dataIndex;
                            // Réinitialiser tous les offsets
                            pieChart.data.datasets[0].offset = technicalSkills.map(() => 0);
                            // Mettre en évidence la portion survolée
                            pieChart.data.datasets[0].offset[index] = 10;
                            pieChart.update();
                        }
                    } else {
                        event.native.target.style.cursor = 'default';
                        // Réinitialiser tous les offsets
                        if (pieChart) {
                            pieChart.data.datasets[0].offset = technicalSkills.map(() => 0);
                            pieChart.update();
                        }
                    }
                }
            }
        });
    }
    
    // Fonction pour générer la légende interactive
    function generateLegend() {
        const legendContainer = document.getElementById('pieLegend');
        if (!legendContainer) return;
        
        let legendHtml = '';
        technicalSkills.forEach((skill, index) => {
            legendHtml += `
                <div class="legend-item" data-index="${index}">
                    <div class="legend-color" style="background: ${skill.color}"></div>
                    <div class="legend-text">
                        <div class="legend-skill">${skill.name}</div>
                        <div class="legend-percent">${skill.percent}% - ${skill.level}</div>
                    </div>
                </div>
            `;
        });
        legendContainer.innerHTML = legendHtml;
        
        // Ajouter les événements de survol sur la légende
        $('.legend-item').on('mouseenter', function() {
            const index = $(this).data('index');
            if (pieChart) {
                pieChart.data.datasets[0].offset = technicalSkills.map(() => 0);
                pieChart.data.datasets[0].offset[index] = 15;
                pieChart.update();
                $(this).css({
                    'transform': 'translateX(8px)',
                    'background': '#ede9fe'
                });
            }
        }).on('mouseleave', function() {
            if (pieChart) {
                pieChart.data.datasets[0].offset = technicalSkills.map(() => 0);
                pieChart.update();
                $(this).css({
                    'transform': 'translateX(0)',
                    'background': 'white'
                });
            }
        }).on('click', function() {
            const index = $(this).data('index');
            const skill = technicalSkills[index];
            alert(`${skill.name}\nNiveau: ${skill.percent}% - ${skill.level}`);
        });
    }
    
    // Animation du diagramme circulaire au scroll
    function animateChart() {
        if (chartAnimated) return;
        if (pieChart) {
            chartAnimated = true;
        }
    }
    
    // Créer le diagramme au chargement de la page
    createPieChart();
    generateLegend();
    
    // Détection du scroll pour l'animation
    let personalAnimated = false;
    
    function animatePersonalSkills() {
        if (personalAnimated) return;
        
        $('.skill-progress').each(function() {
            const targetWidth = $(this).css('width');
            $(this).css('width', '0%');
            setTimeout(() => {
                $(this).animate({ width: targetWidth }, 800);
            }, 100);
        });
        personalAnimated = true;
    }
    
    $(window).on('scroll', function() {
        const skillsSection = $('.skills-section');
        if (skillsSection.length) {
            const scrollPos = $(window).scrollTop() + $(window).height();
            const sectionTop = skillsSection.offset().top;
            
            if (scrollPos > sectionTop + 100) {
                animateChart();
                animatePersonalSkills();
            }
        }
    });
    
    // Animation de la timeline
    let timelineAnimated = false;
    function animateTimeline() {
        if (timelineAnimated) return;
        $('.timeline-item').each(function(index) {
            $(this).css('opacity', '0');
            $(this).css('transform', 'translateX(-20px)');
            setTimeout(() => {
                $(this).animate({ opacity: 1 }, 400);
                $(this).animate({ transform: 'translateX(0)' }, 400);
            }, index * 200);
        });
        timelineAnimated = true;
    }
    
    $(window).on('scroll', function() {
        const timelineSection = $('.education-section');
        if (timelineSection.length && !timelineAnimated) {
            const scrollPos = $(window).scrollTop() + $(window).height();
            const sectionTop = timelineSection.offset().top;
            if (scrollPos > sectionTop + 100) {
                animateTimeline();
            }
        }
    });
    
    // Animation d'apparition des sections
    $('.section').each(function(index) {
        $(this).css('animation-delay', `${index * 0.1}s`);
    });
    
    // Validation du formulaire
    $('#contact-form').on('submit', function(e) {
        e.preventDefault();
        
        let isValid = true;
        
        const name = $('#name').val().trim();
        if (name === '') {
            showError('name', 'Le nom est requis');
            isValid = false;
        } else if (name.length < 2) {
            showError('name', 'Le nom doit contenir au moins 2 caractères');
            isValid = false;
        } else {
            clearError('name');
        }
        
        const email = $('#email').val().trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email === '') {
            showError('email', 'L\'email est requis');
            isValid = false;
        } else if (!emailRegex.test(email)) {
            showError('email', 'Format d\'email invalide');
            isValid = false;
        } else {
            clearError('email');
        }
        
        const message = $('#message').val().trim();
        if (message === '') {
            showError('message', 'Le message est requis');
            isValid = false;
        } else if (message.length < 10) {
            showError('message', 'Le message doit contenir au moins 10 caractères');
            isValid = false;
        } else {
            clearError('message');
        }
        
        if (isValid) {
            $('#contact-form').slideUp(300);
            $('#form-success').slideDown(300);
            
            setTimeout(() => {
                $('#contact-form')[0].reset();
                $('#contact-form').slideDown(300);
                $('#form-success').slideUp(300);
            }, 3000);
        } else {
            $('.form-group.error').addClass('shake');
            setTimeout(() => $('.form-group.error').removeClass('shake'), 500);
        }
    });
    
    function showError(field, message) {
        const group = $(`#${field}`).closest('.form-group');
        group.addClass('error');
        group.find('.error-message').text(message);
    }
    
    function clearError(field) {
        const group = $(`#${field}`).closest('.form-group');
        group.removeClass('error');
        group.find('.error-message').text('');
    }
    
    // Effet de survol sur les cartes de compétences personnelles
    $('.skill-card').on('mouseenter', function() {
        $(this).find('.skill-progress').css('filter', 'brightness(1.1)');
    }).on('mouseleave', function() {
        $(this).find('.skill-progress').css('filter', 'brightness(1)');
    });
});