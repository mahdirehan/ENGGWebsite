// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on a nav link
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
    
    // Sticky Navigation
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Active Navigation Link on Scroll
    const sections = document.querySelectorAll('.section');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });
    
    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Form Submission
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const formValues = Object.fromEntries(formData.entries());
            
            // Here you would typically send the form data to a server
            // For now, we'll just log it and show a success message
            console.log('Form submitted:', formValues);
            
            // Show success message
            const formGroups = contactForm.querySelectorAll('.form-group');
            formGroups.forEach(group => {
                const input = group.querySelector('input, textarea');
                if (input) {
                    input.value = '';
                }
            });
            
            // Create and show success message
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.textContent = 'Thank you for your message! I will get back to you soon.';
            successMessage.style.color = 'var(--success-color)';
            successMessage.style.marginTop = '20px';
            successMessage.style.padding = '10px';
            successMessage.style.borderRadius = '4px';
            successMessage.style.backgroundColor = 'rgba(46, 204, 113, 0.1)';
            
            contactForm.appendChild(successMessage);
            
            // Remove success message after 5 seconds
            setTimeout(() => {
                successMessage.remove();
            }, 5000);
        });
    }
    
    // Project Image Hover Effect
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        const image = card.querySelector('.project-image img');
        
        if (image) {
            card.addEventListener('mouseenter', function() {
                image.style.transform = 'scale(1.05)';
            });
            
            card.addEventListener('mouseleave', function() {
                image.style.transform = 'scale(1)';
            });
        }
    });
    
    // Animate elements on scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.section-title, .project-card, .timeline-item, .skill-item, .publication-item');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial styles for animation
    const elementsToAnimate = document.querySelectorAll('.section-title, .project-card, .timeline-item, .skill-item, .publication-item');
    
    elementsToAnimate.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Run animation on load and scroll
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);
    
    // Typing effect for tagline (optional)
    const tagline = document.querySelector('.tagline');
    
    if (tagline) {
        const text = tagline.textContent;
        tagline.textContent = '';
        
        let i = 0;
        const typeWriter = function() {
            if (i < text.length) {
                tagline.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        };
        
        // Start typing effect after a short delay
        setTimeout(typeWriter, 1000);
    }
    
    // Project Details Modal
    const modal = document.getElementById('project-modal');
    const modalContent = document.getElementById('modal-content-container');
    const closeModal = document.querySelector('.close-modal');
    const viewDetailsButtons = document.querySelectorAll('.view-details-btn');
    
    // Project details data
    const projectDetails = {
        'hand-gripper': {
            title: 'Hand Gripper 3D Modelling',
            description: `
                <p>This project focused on designing and developing a robotic hand gripper with advanced mechanical capabilities. The design process involved careful consideration of load distribution, actuator integration, and overall mechanical efficiency.</p>
                
                <h3>Key Features:</h3>
                <ul>
                    <li>Precision-engineered finger joints for smooth movement</li>
                    <li>Optimized load distribution across all components</li>
                    <li>Integrated actuator system for precise control</li>
                    <li>Ergonomic design for comfortable operation</li>
                    <li>Modular construction for easy maintenance</li>
                </ul>
                
                <h3>Technical Specifications:</h3>
                <ul>
                    <li>Maximum grip force: 50N</li>
                    <li>Finger travel range: 0-90 degrees</li>
                    <li>Response time: < 100ms</li>
                    <li>Material: Aluminum alloy for durability</li>
                </ul>
                
                <h3>Design Process:</h3>
                <p>The project followed a systematic approach to design and development:</p>
                <ol>
                    <li>Initial concept development and requirements analysis</li>
                    <li>3D modeling and simulation in SolidWorks</li>
                    <li>Finite Element Analysis (FEA) for stress testing</li>
                    <li>Prototype development and testing</li>
                    <li>Design refinement based on test results</li>
                </ol>
            `
        }
    };
    
    // Open modal with project details
    viewDetailsButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const projectId = this.getAttribute('data-project');
            const project = projectDetails[projectId];
            
            if (project) {
                modalContent.innerHTML = `
                    <div class="project-details">
                        <h2>${project.title}</h2>
                        ${project.description}
                    </div>
                `;
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
            }
        });
    });
    
    // Close modal when clicking the close button
    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Re-enable scrolling
    });
    
    // Close modal when clicking outside the content
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
});
