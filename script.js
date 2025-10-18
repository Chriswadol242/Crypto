// APEX Website - 3D Interactive Experience
class ApexWebsite {
    constructor() {
        this.scenes = {};
        this.renderers = {};
        this.cameras = {};
        this.controls = {};
        this.animationFrames = {};
        
        this.init();
    }

    init() {
        // Initialize GSAP plugins
        gsap.registerPlugin(ScrollTrigger);
        
        // Initialize components
        this.initNavigation();
        this.initHero3D();
        this.initProducts3D();
        this.initTechnology3D();
        this.initAnimations();
        this.initScrollEffects();
        
        // Start render loops
        this.startRenderLoops();
        
        console.log('APEX Website initialized successfully');
    }

    // Navigation functionality
    initNavigation() {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        const navLinks = document.querySelectorAll('.nav-link');

        // Mobile menu toggle
        hamburger?.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Smooth scrolling for navigation links
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
                
                // Close mobile menu
                hamburger?.classList.remove('active');
                navMenu?.classList.remove('active');
            });
        });

        // Navbar background on scroll
        window.addEventListener('scroll', () => {
            const navbar = document.querySelector('.navbar');
            if (window.scrollY > 100) {
                navbar.style.background = 'rgba(0, 0, 0, 0.98)';
            } else {
                navbar.style.background = 'rgba(0, 0, 0, 0.95)';
            }
        });
    }

    // Hero 3D Scene
    initHero3D() {
        const canvas = document.getElementById('hero-canvas');
        if (!canvas) return;

        // Scene setup
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
        
        renderer.setSize(canvas.clientWidth, canvas.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setClearColor(0x000000, 0);

        // Store references
        this.scenes.hero = scene;
        this.cameras.hero = camera;
        this.renderers.hero = renderer;

        // Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xff6b35, 1);
        directionalLight.position.set(5, 5, 5);
        scene.add(directionalLight);

        const pointLight = new THREE.PointLight(0xf7931e, 0.8);
        pointLight.position.set(-5, 3, 2);
        scene.add(pointLight);

        // Create 3D shoe geometry
        const shoeGroup = new THREE.Group();
        
        // Shoe sole
        const soleGeometry = new THREE.BoxGeometry(3, 0.3, 1.2);
        const soleMaterial = new THREE.MeshPhongMaterial({ 
            color: 0x333333,
            shininess: 100 
        });
        const sole = new THREE.Mesh(soleGeometry, soleMaterial);
        sole.position.y = -0.5;
        shoeGroup.add(sole);

        // Shoe upper
        const upperGeometry = new THREE.CylinderGeometry(0.6, 0.8, 1.5, 8);
        const upperMaterial = new THREE.MeshPhongMaterial({ 
            color: 0xff6b35,
            shininess: 80 
        });
        const upper = new THREE.Mesh(upperGeometry, upperMaterial);
        upper.position.y = 0.2;
        upper.rotation.x = Math.PI / 6;
        shoeGroup.add(upper);

        // Shoe details
        const detailGeometry = new THREE.SphereGeometry(0.1, 8, 8);
        const detailMaterial = new THREE.MeshPhongMaterial({ 
            color: 0xffffff,
            shininess: 100 
        });
        
        for (let i = 0; i < 5; i++) {
            const detail = new THREE.Mesh(detailGeometry, detailMaterial);
            detail.position.set(
                -1 + i * 0.5,
                0.5,
                0.6
            );
            shoeGroup.add(detail);
        }

        // Add floating particles
        const particleGeometry = new THREE.BufferGeometry();
        const particleCount = 100;
        const positions = new Float32Array(particleCount * 3);
        
        for (let i = 0; i < particleCount * 3; i += 3) {
            positions[i] = (Math.random() - 0.5) * 20;
            positions[i + 1] = (Math.random() - 0.5) * 20;
            positions[i + 2] = (Math.random() - 0.5) * 20;
        }
        
        particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        
        const particleMaterial = new THREE.PointsMaterial({
            color: 0xff6b35,
            size: 0.1,
            transparent: true,
            opacity: 0.6
        });
        
        const particles = new THREE.Points(particleGeometry, particleMaterial);
        scene.add(particles);

        scene.add(shoeGroup);
        camera.position.set(0, 2, 8);

        // Store objects for animation
        this.heroObjects = { shoeGroup, particles };

        // Mouse interaction
        this.initMouseInteraction(canvas, camera, shoeGroup);

        // Resize handler
        window.addEventListener('resize', () => {
            camera.aspect = canvas.clientWidth / canvas.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(canvas.clientWidth, canvas.clientHeight);
        });
    }

    // Mouse interaction for hero 3D
    initMouseInteraction(canvas, camera, shoeGroup) {
        const mouse = new THREE.Vector2();
        
        canvas.addEventListener('mousemove', (event) => {
            const rect = canvas.getBoundingClientRect();
            mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
            mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
            
            // Rotate shoe based on mouse position
            gsap.to(shoeGroup.rotation, {
                duration: 0.5,
                y: mouse.x * 0.5,
                x: mouse.y * 0.3
            });
        });

        canvas.addEventListener('mouseleave', () => {
            gsap.to(shoeGroup.rotation, {
                duration: 1,
                y: 0,
                x: 0
            });
        });
    }

    // Products 3D scenes
    initProducts3D() {
        const productCards = document.querySelectorAll('.product-card');
        
        productCards.forEach((card, index) => {
            const canvas = card.querySelector('.product-canvas');
            if (!canvas) return;

            const scene = new THREE.Scene();
            const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 1000);
            const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
            
            renderer.setSize(canvas.clientWidth, canvas.clientHeight);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            renderer.setClearColor(0x000000, 0);

            // Lighting
            const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
            scene.add(ambientLight);

            const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
            directionalLight.position.set(3, 3, 3);
            scene.add(directionalLight);

            // Create different shoe models for each product
            const shoeGroup = this.createShoeModel(index);
            scene.add(shoeGroup);

            camera.position.set(0, 1, 4);

            // Store references
            this.scenes[`product-${index}`] = scene;
            this.cameras[`product-${index}`] = camera;
            this.renderers[`product-${index}`] = renderer;

            // Auto-rotation
            this.animationFrames[`product-${index}`] = () => {
                shoeGroup.rotation.y += 0.01;
                renderer.render(scene, camera);
            };

            // Hover effects
            card.addEventListener('mouseenter', () => {
                gsap.to(shoeGroup.scale, {
                    duration: 0.3,
                    x: 1.1,
                    y: 1.1,
                    z: 1.1
                });
            });

            card.addEventListener('mouseleave', () => {
                gsap.to(shoeGroup.scale, {
                    duration: 0.3,
                    x: 1,
                    y: 1,
                    z: 1
                });
            });
        });
    }

    // Create different shoe models
    createShoeModel(type) {
        const group = new THREE.Group();
        
        // Base colors for different models
        const colors = [
            { primary: 0xff6b35, secondary: 0x333333 }, // Runner Pro
            { primary: 0x667eea, secondary: 0x764ba2 }, // Trainer X
            { primary: 0x000000, secondary: 0xff6b35 }  // Elite
        ];
        
        const color = colors[type] || colors[0];

        // Sole
        const soleGeometry = new THREE.BoxGeometry(2.5, 0.25, 1);
        const soleMaterial = new THREE.MeshPhongMaterial({ 
            color: color.secondary,
            shininess: 100 
        });
        const sole = new THREE.Mesh(soleGeometry, soleMaterial);
        sole.position.y = -0.4;
        group.add(sole);

        // Upper part
        const upperGeometry = new THREE.CylinderGeometry(0.5, 0.7, 1.2, 12);
        const upperMaterial = new THREE.MeshPhongMaterial({ 
            color: color.primary,
            shininess: 80 
        });
        const upper = new THREE.Mesh(upperGeometry, upperMaterial);
        upper.position.y = 0.1;
        upper.rotation.x = Math.PI / 8;
        group.add(upper);

        // Laces
        const laceGeometry = new THREE.CylinderGeometry(0.02, 0.02, 0.8, 6);
        const laceMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff });
        
        for (let i = 0; i < 4; i++) {
            const lace = new THREE.Mesh(laceGeometry, laceMaterial);
            lace.position.set(-0.3 + i * 0.2, 0.3, 0.5);
            lace.rotation.z = Math.PI / 2;
            group.add(lace);
        }

        return group;
    }

    // Technology 3D scene
    initTechnology3D() {
        const canvas = document.getElementById('tech-canvas');
        if (!canvas) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
        
        renderer.setSize(canvas.clientWidth, canvas.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setClearColor(0x000000, 0);

        // Store references
        this.scenes.tech = scene;
        this.cameras.tech = camera;
        this.renderers.tech = renderer;

        // Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xff6b35, 1.5);
        directionalLight.position.set(5, 5, 5);
        scene.add(directionalLight);

        // Create tech visualization
        const techGroup = new THREE.Group();

        // Central core
        const coreGeometry = new THREE.SphereGeometry(1, 32, 32);
        const coreMaterial = new THREE.MeshPhongMaterial({ 
            color: 0xff6b35,
            transparent: true,
            opacity: 0.8,
            shininess: 100
        });
        const core = new THREE.Mesh(coreGeometry, coreMaterial);
        techGroup.add(core);

        // Orbiting elements
        const orbitElements = [];
        for (let i = 0; i < 8; i++) {
            const elementGeometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
            const elementMaterial = new THREE.MeshPhongMaterial({ 
                color: 0xffffff,
                shininess: 100
            });
            const element = new THREE.Mesh(elementGeometry, elementMaterial);
            
            const angle = (i / 8) * Math.PI * 2;
            element.position.set(
                Math.cos(angle) * 2,
                Math.sin(angle * 0.5),
                Math.sin(angle) * 2
            );
            
            orbitElements.push({ mesh: element, angle, radius: 2 });
            techGroup.add(element);
        }

        // DNA-like helix
        const helixGeometry = new THREE.CylinderGeometry(0.05, 0.05, 4, 8);
        const helixMaterial = new THREE.MeshPhongMaterial({ 
            color: 0xf7931e,
            transparent: true,
            opacity: 0.6
        });
        
        for (let i = 0; i < 20; i++) {
            const helix = new THREE.Mesh(helixGeometry, helixMaterial);
            const angle = (i / 20) * Math.PI * 4;
            helix.position.set(
                Math.cos(angle) * 0.5,
                -2 + (i / 20) * 4,
                Math.sin(angle) * 0.5
            );
            helix.rotation.z = angle;
            techGroup.add(helix);
        }

        scene.add(techGroup);
        camera.position.set(0, 0, 6);

        // Store for animation
        this.techObjects = { techGroup, core, orbitElements };

        // Resize handler
        window.addEventListener('resize', () => {
            camera.aspect = canvas.clientWidth / canvas.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(canvas.clientWidth, canvas.clientHeight);
        });
    }

    // Initialize animations
    initAnimations() {
        // Hero text animations
        gsap.timeline()
            .from('.hero-title .title-line', {
                duration: 1,
                y: 100,
                opacity: 0,
                stagger: 0.2,
                ease: 'power3.out'
            })
            .from('.hero-description', {
                duration: 1,
                y: 50,
                opacity: 0,
                ease: 'power3.out'
            }, '-=0.5')
            .from('.hero-buttons .btn', {
                duration: 0.8,
                y: 30,
                opacity: 0,
                stagger: 0.1,
                ease: 'power3.out'
            }, '-=0.3');

        // Floating elements animation
        gsap.to('.floating-element', {
            duration: 6,
            y: -50,
            rotation: 360,
            repeat: -1,
            yoyo: true,
            ease: 'power2.inOut',
            stagger: 0.5
        });
    }

    // Scroll-triggered animations
    initScrollEffects() {
        // Section title animations
        gsap.utils.toArray('.section-title').forEach(title => {
            gsap.from(title, {
                scrollTrigger: {
                    trigger: title,
                    start: 'top 80%',
                    end: 'bottom 20%',
                    toggleActions: 'play none none reverse'
                },
                duration: 1,
                y: 50,
                opacity: 0,
                ease: 'power3.out'
            });
        });

        // Product cards animation
        gsap.utils.toArray('.product-card').forEach((card, index) => {
            gsap.from(card, {
                scrollTrigger: {
                    trigger: card,
                    start: 'top 80%',
                    end: 'bottom 20%',
                    toggleActions: 'play none none reverse'
                },
                duration: 0.8,
                y: 100,
                opacity: 0,
                delay: index * 0.2,
                ease: 'power3.out'
            });
        });

        // Tech features animation
        gsap.utils.toArray('.tech-feature').forEach((feature, index) => {
            gsap.from(feature, {
                scrollTrigger: {
                    trigger: feature,
                    start: 'top 80%',
                    end: 'bottom 20%',
                    toggleActions: 'play none none reverse'
                },
                duration: 0.8,
                x: -100,
                opacity: 0,
                delay: index * 0.1,
                ease: 'power3.out'
            });
        });

        // Stats counter animation
        gsap.utils.toArray('.stat-number').forEach(stat => {
            const finalValue = stat.textContent;
            gsap.from(stat, {
                scrollTrigger: {
                    trigger: stat,
                    start: 'top 80%',
                    end: 'bottom 20%',
                    toggleActions: 'play none none reverse'
                },
                duration: 2,
                textContent: 0,
                snap: { textContent: 1 },
                ease: 'power2.out',
                onUpdate: function() {
                    stat.textContent = Math.ceil(this.targets()[0].textContent) + (finalValue.includes('+') ? '+' : '');
                }
            });
        });

        // Parallax effect for shapes
        gsap.utils.toArray('.shape').forEach(shape => {
            gsap.to(shape, {
                scrollTrigger: {
                    trigger: shape,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true
                },
                y: -100,
                rotation: 180,
                ease: 'none'
            });
        });
    }

    // Start all render loops
    startRenderLoops() {
        // Hero scene animation
        const animateHero = () => {
            if (this.scenes.hero && this.renderers.hero && this.cameras.hero) {
                const { shoeGroup, particles } = this.heroObjects;
                
                // Auto-rotate shoe
                shoeGroup.rotation.y += 0.005;
                
                // Animate particles
                particles.rotation.y += 0.002;
                particles.rotation.x += 0.001;
                
                this.renderers.hero.render(this.scenes.hero, this.cameras.hero);
            }
            requestAnimationFrame(animateHero);
        };
        animateHero();

        // Tech scene animation
        const animateTech = () => {
            if (this.scenes.tech && this.renderers.tech && this.cameras.tech) {
                const { techGroup, core, orbitElements } = this.techObjects;
                
                // Rotate core
                core.rotation.y += 0.01;
                core.rotation.x += 0.005;
                
                // Animate orbiting elements
                orbitElements.forEach((element, index) => {
                    element.angle += 0.02;
                    element.mesh.position.x = Math.cos(element.angle) * element.radius;
                    element.mesh.position.z = Math.sin(element.angle) * element.radius;
                    element.mesh.position.y = Math.sin(element.angle * 2) * 0.5;
                    element.mesh.rotation.y += 0.05;
                });
                
                this.renderers.tech.render(this.scenes.tech, this.cameras.tech);
            }
            requestAnimationFrame(animateTech);
        };
        animateTech();

        // Product scenes animation
        Object.keys(this.animationFrames).forEach(key => {
            if (key.startsWith('product-')) {
                const animate = () => {
                    this.animationFrames[key]();
                    requestAnimationFrame(animate);
                };
                animate();
            }
        });
    }
}

// Form handling
document.addEventListener('DOMContentLoaded', () => {
    // Initialize website
    new ApexWebsite();

    // Contact form
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Simulate form submission
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Envoi en cours...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                submitBtn.textContent = 'Message envoyé !';
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    contactForm.reset();
                }, 2000);
            }, 1500);
        });
    }

    // Product exploration buttons
    document.querySelectorAll('.product-card .btn').forEach(btn => {
        btn.addEventListener('click', () => {
            // Simulate product exploration
            gsap.to(btn, {
                duration: 0.2,
                scale: 0.95,
                yoyo: true,
                repeat: 1
            });
            
            // You could add modal or page navigation here
            console.log('Exploring product...');
        });
    });

    // Smooth reveal on load
    gsap.from('body', {
        duration: 1,
        opacity: 0,
        ease: 'power2.out'
    });
});

// Performance optimization
window.addEventListener('beforeunload', () => {
    // Clean up Three.js resources
    Object.values(this.renderers || {}).forEach(renderer => {
        renderer.dispose();
    });
});

// Intersection Observer for performance
const observerOptions = {
    threshold: 0.1,
    rootMargin: '50px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
        }
    });
}, observerOptions);

// Observe elements for animations
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.product-card, .tech-feature, .stat').forEach(el => {
        observer.observe(el);
    });
});

console.log('APEX 3D Website loaded successfully! 🚀');