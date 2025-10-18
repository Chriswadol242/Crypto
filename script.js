// Three.js Scene Setup
let scene, camera, renderer, controls;
let heroShoe, productShoes = [];
let animationId;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initThreeJS();
    initNavigation();
    initScrollAnimations();
    initProduct3D();
    initTech3D();
    animate();
});

// Three.js Initialization
function initThreeJS() {
    const container = document.getElementById('three-container');
    
    // Scene setup
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);
    
    // Camera setup
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 2, 5);
    
    // Renderer setup
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1;
    container.appendChild(renderer.domElement);
    
    // Controls
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.5;
    
    // Lighting
    setupLighting();
    
    // Create hero shoe
    createHeroShoe();
    
    // Handle window resize
    window.addEventListener('resize', onWindowResize);
}

function setupLighting() {
    // Ambient light
    const ambientLight = new THREE.AmbientLight(0x404040, 0.3);
    scene.add(ambientLight);
    
    // Main directional light
    const directionalLight = new THREE.DirectionalLight(0x00ff88, 1);
    directionalLight.position.set(5, 10, 5);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    directionalLight.shadow.camera.near = 0.5;
    directionalLight.shadow.camera.far = 50;
    scene.add(directionalLight);
    
    // Point lights for accent
    const pointLight1 = new THREE.PointLight(0x0088ff, 0.5, 100);
    pointLight1.position.set(-5, 3, 5);
    scene.add(pointLight1);
    
    const pointLight2 = new THREE.PointLight(0xff0088, 0.5, 100);
    pointLight2.position.set(5, 3, -5);
    scene.add(pointLight2);
}

function createHeroShoe() {
    const group = new THREE.Group();
    
    // Shoe body
    const shoeGeometry = new THREE.BoxGeometry(2, 0.8, 4);
    const shoeMaterial = new THREE.MeshPhongMaterial({
        color: 0x00ff88,
        shininess: 100,
        transparent: true,
        opacity: 0.9
    });
    const shoeBody = new THREE.Mesh(shoeGeometry, shoeMaterial);
    shoeBody.position.y = 0.4;
    shoeBody.castShadow = true;
    group.add(shoeBody);
    
    // Shoe sole
    const soleGeometry = new THREE.BoxGeometry(2.2, 0.3, 4.2);
    const soleMaterial = new THREE.MeshPhongMaterial({
        color: 0x333333,
        shininess: 50
    });
    const sole = new THREE.Mesh(soleGeometry, soleMaterial);
    sole.position.y = -0.15;
    sole.castShadow = true;
    group.add(sole);
    
    // Shoe upper
    const upperGeometry = new THREE.BoxGeometry(1.8, 1.2, 3.5);
    const upperMaterial = new THREE.MeshPhongMaterial({
        color: 0x0088ff,
        shininess: 80,
        transparent: true,
        opacity: 0.8
    });
    const upper = new THREE.Mesh(upperGeometry, upperMaterial);
    upper.position.y = 0.8;
    upper.castShadow = true;
    group.add(upper);
    
    // Laces
    const laceGeometry = new THREE.CylinderGeometry(0.02, 0.02, 2);
    const laceMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff });
    
    for (let i = 0; i < 4; i++) {
        const lace = new THREE.Mesh(laceGeometry, laceMaterial);
        lace.position.set(-0.3 + i * 0.2, 1.2, -0.5 + i * 0.3);
        lace.rotation.z = Math.PI / 2;
        lace.castShadow = true;
        group.add(lace);
    }
    
    // Logo
    const logoGeometry = new THREE.PlaneGeometry(0.5, 0.3);
    const logoMaterial = new THREE.MeshBasicMaterial({
        color: 0xff0088,
        transparent: true,
        opacity: 0.8
    });
    const logo = new THREE.Mesh(logoGeometry, logoMaterial);
    logo.position.set(0, 1.1, 1.2);
    logo.rotation.x = -Math.PI / 6;
    group.add(logo);
    
    // Add floating particles
    createFloatingParticles(group);
    
    scene.add(group);
    heroShoe = group;
}

function createFloatingParticles(parent) {
    const particleCount = 50;
    const particles = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * 20;
        positions[i + 1] = Math.random() * 10;
        positions[i + 2] = (Math.random() - 0.5) * 20;
    }
    
    particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    
    const particleMaterial = new THREE.PointsMaterial({
        color: 0x00ff88,
        size: 0.1,
        transparent: true,
        opacity: 0.6
    });
    
    const particleSystem = new THREE.Points(particles, particleMaterial);
    parent.add(particleSystem);
}

function initProduct3D() {
    const productContainers = document.querySelectorAll('.product-3d');
    
    productContainers.forEach((container, index) => {
        const productScene = new THREE.Scene();
        const productCamera = new THREE.PerspectiveCamera(75, 300 / 300, 0.1, 1000);
        const productRenderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        
        productRenderer.setSize(300, 300);
        productRenderer.setClearColor(0x000000, 0);
        container.appendChild(productRenderer.domElement);
        
        // Lighting
        const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
        productScene.add(ambientLight);
        
        const directionalLight = new THREE.DirectionalLight(0x00ff88, 0.8);
        directionalLight.position.set(5, 5, 5);
        productScene.add(directionalLight);
        
        // Create different shoe models
        const shoe = createProductShoe(index);
        productScene.add(shoe);
        
        productCamera.position.set(0, 2, 5);
        productCamera.lookAt(0, 0, 0);
        
        // Store references
        productShoes.push({
            scene: productScene,
            camera: productCamera,
            renderer: productRenderer,
            shoe: shoe
        });
        
        // Animate product shoes
        animateProductShoe(index);
    });
}

function createProductShoe(index) {
    const group = new THREE.Group();
    
    // Different colors for different products
    const colors = [0x00ff88, 0x0088ff, 0xff0088];
    const color = colors[index];
    
    // Shoe body
    const shoeGeometry = new THREE.BoxGeometry(1.5, 0.6, 3);
    const shoeMaterial = new THREE.MeshPhongMaterial({
        color: color,
        shininess: 100,
        transparent: true,
        opacity: 0.9
    });
    const shoeBody = new THREE.Mesh(shoeGeometry, shoeMaterial);
    shoeBody.position.y = 0.3;
    shoeBody.castShadow = true;
    group.add(shoeBody);
    
    // Shoe sole
    const soleGeometry = new THREE.BoxGeometry(1.6, 0.2, 3.1);
    const soleMaterial = new THREE.MeshPhongMaterial({
        color: 0x222222,
        shininess: 30
    });
    const sole = new THREE.Mesh(soleGeometry, soleMaterial);
    sole.position.y = -0.1;
    sole.castShadow = true;
    group.add(sole);
    
    // Shoe upper
    const upperGeometry = new THREE.BoxGeometry(1.3, 0.8, 2.5);
    const upperMaterial = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        shininess: 80,
        transparent: true,
        opacity: 0.7
    });
    const upper = new THREE.Mesh(upperGeometry, upperMaterial);
    upper.position.y = 0.7;
    upper.castShadow = true;
    group.add(upper);
    
    return group;
}

function initTech3D() {
    const techContainer = document.getElementById('tech-3d');
    if (!techContainer) return;
    
    const techScene = new THREE.Scene();
    const techCamera = new THREE.PerspectiveCamera(75, 400 / 400, 0.1, 1000);
    const techRenderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    techRenderer.setSize(400, 400);
    techRenderer.setClearColor(0x000000, 0);
    techContainer.appendChild(techRenderer.domElement);
    
    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
    techScene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0x00ff88, 1);
    directionalLight.position.set(5, 5, 5);
    techScene.add(directionalLight);
    
    // Create 3D printer model
    create3DPrinter(techScene);
    
    techCamera.position.set(0, 3, 8);
    techCamera.lookAt(0, 0, 0);
    
    // Animate tech scene
    function animateTech() {
        requestAnimationFrame(animateTech);
        techScene.rotation.y += 0.01;
        techRenderer.render(techScene, techCamera);
    }
    animateTech();
}

function create3DPrinter(scene) {
    const group = new THREE.Group();
    
    // Printer base
    const baseGeometry = new THREE.BoxGeometry(4, 0.5, 3);
    const baseMaterial = new THREE.MeshPhongMaterial({ color: 0x333333 });
    const base = new THREE.Mesh(baseGeometry, baseMaterial);
    base.position.y = -1;
    group.add(base);
    
    // Printer frame
    const frameGeometry = new THREE.BoxGeometry(0.2, 3, 0.2);
    const frameMaterial = new THREE.MeshPhongMaterial({ color: 0x666666 });
    
    const frame1 = new THREE.Mesh(frameGeometry, frameMaterial);
    frame1.position.set(-1.8, 0.5, -1.3);
    group.add(frame1);
    
    const frame2 = new THREE.Mesh(frameGeometry, frameMaterial);
    frame2.position.set(1.8, 0.5, -1.3);
    group.add(frame2);
    
    const frame3 = new THREE.Mesh(frameGeometry, frameMaterial);
    frame3.position.set(-1.8, 0.5, 1.3);
    group.add(frame3);
    
    const frame4 = new THREE.Mesh(frameGeometry, frameMaterial);
    frame4.position.set(1.8, 0.5, 1.3);
    group.add(frame4);
    
    // Print head
    const headGeometry = new THREE.BoxGeometry(0.5, 0.3, 0.5);
    const headMaterial = new THREE.MeshPhongMaterial({ color: 0x00ff88 });
    const head = new THREE.Mesh(headGeometry, headMaterial);
    head.position.y = 1.5;
    group.add(head);
    
    // Printing shoe (being printed)
    const shoeGeometry = new THREE.BoxGeometry(1, 0.4, 2);
    const shoeMaterial = new THREE.MeshPhongMaterial({
        color: 0x0088ff,
        transparent: true,
        opacity: 0.7
    });
    const printingShoe = new THREE.Mesh(shoeGeometry, shoeMaterial);
    printingShoe.position.y = -0.3;
    group.add(printingShoe);
    
    scene.add(group);
}

function animateProductShoe(index) {
    const product = productShoes[index];
    if (!product) return;
    
    function animate() {
        requestAnimationFrame(animate);
        product.shoe.rotation.y += 0.01;
        product.renderer.render(product.scene, product.camera);
    }
    animate();
}

function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                navMenu.classList.remove('active');
            }
        });
    });
}

function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for scroll animations
    document.querySelectorAll('.product-card, .tech-text, .about-text, .contact-form').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

function animate() {
    animationId = requestAnimationFrame(animate);
    
    // Animate hero shoe
    if (heroShoe) {
        heroShoe.rotation.y += 0.005;
        heroShoe.position.y = Math.sin(Date.now() * 0.001) * 0.1;
    }
    
    // Update controls
    controls.update();
    
    // Render
    renderer.render(scene, camera);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// CTA Button functionality
document.addEventListener('DOMContentLoaded', function() {
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', function() {
            document.getElementById('products').scrollIntoView({
                behavior: 'smooth'
            });
        });
    }
    
    // Product card hover effects
    document.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Form submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Merci pour votre message ! Nous vous contacterons bientôt.');
            this.reset();
        });
    }
});

// Parallax effect for hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.three-container');
    if (parallax) {
        const speed = scrolled * 0.5;
        parallax.style.transform = `translateY(${speed}px)`;
    }
});

// Add loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Animate hero content
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(50px)';
        
        setTimeout(() => {
            heroContent.style.transition = 'opacity 1s ease, transform 1s ease';
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 500);
    }
});