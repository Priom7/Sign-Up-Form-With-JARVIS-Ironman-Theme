document.addEventListener('DOMContentLoaded', function() {
    // Loading Screen Animation
    const loadingScreen = document.querySelector('.loading-screen');
    const loadingBar = document.querySelector('.loading-bar');
    const loadingPercentage = document.querySelector('.loading-percentage');
    
    let progress = 0;
    const loadingInterval = setInterval(() => {
        progress += Math.random() * 10;
        if (progress > 100) progress = 100;
        
        loadingBar.style.width = `${progress}%`;
        loadingPercentage.textContent = `${Math.floor(progress)}%`;
        
        if (progress === 100) {
            clearInterval(loadingInterval);
            setTimeout(() => {
                loadingScreen.style.opacity = '0';
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                    animateLogin();
                }, 500);
            }, 500);
        }
    }, 200);
    
    // Initialize 3D elements and animations
    function animateLogin() {
        const loginContainer = document.querySelector('.login-container');
        const screens = document.querySelector('.screens');
        
        // Apply 3D float animation
        loginContainer.style.animation = 'float 6s ease-in-out infinite';
        
        // Particle system
        createParticles();
        
        // Sound effects
        initSoundEffects();
        
        // Form interactions
        initFormInteractions();
    }
    
    // Particle system
    function createParticles() {
        const particlesContainer = document.querySelector('.particles');
        const containerWidth = window.innerWidth;
        const containerHeight = window.innerHeight;
        
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            
            // Random size
            const size = Math.random() * 5 + 1;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            
            // Random position
            const posX = Math.random() * containerWidth;
            const posY = Math.random() * containerHeight;
            particle.style.left = `${posX}px`;
            particle.style.top = `${posY}px`;
            
            // Random color (Iron Man theme)
            const colors = ['#FF5722', '#4FC3F7', '#FFC107'];
            const color = colors[Math.floor(Math.random() * colors.length)];
            particle.style.backgroundColor = color;
            particle.style.boxShadow = `0 0 ${size * 2}px ${color}`;
            
            // Random animation
            const duration = Math.random() * 20 + 10;
            const delay = Math.random() * 5;
            
            particle.style.animation = `floatParticle ${duration}s linear infinite`;
            particle.style.animationDelay = `${delay}s`;
            
            // Add to container
            particlesContainer.appendChild(particle);
            
            // Create CSS animation for the particle
            const style = document.createElement('style');
            style.textContent = `
                @keyframes floatParticle {
                    0% {
                        transform: translate(0, 0);
                        opacity: ${Math.random() * 0.5 + 0.5};
                    }
                    25% {
                        transform: translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px);
                        opacity: ${Math.random() * 0.3 + 0.2};
                    }
                    50% {
                        transform: translate(${Math.random() * 400 - 200}px, ${Math.random() * 400 - 200}px);
                        opacity: ${Math.random() * 0.5 + 0.5};
                    }
                    75% {
                        transform: translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px);
                        opacity: ${Math.random() * 0.3 + 0.2};
                    }
                    100% {
                        transform: translate(0, 0);
                        opacity: ${Math.random() * 0.5 + 0.5};
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    // Sound effects
    function initSoundEffects() {
        const hoverSound = document.getElementById('hover-sound');
        const clickSound = document.getElementById('click-sound');
        
        const buttons = document.querySelectorAll('button, a, .input-container, .checkbox');
        
        buttons.forEach(button => {
            button.addEventListener('mouseenter', () => {
                if (hoverSound) {
                    hoverSound.currentTime = 0;
                    hoverSound.volume = 0.2;
                    hoverSound.play().catch(() => {});
                }
            });
            
            button.addEventListener('click', () => {
                if (clickSound) {
                    clickSound.currentTime = 0;
                    clickSound.volume = 0.3;
                    clickSound.play().catch(() => {});
                }
            });
        });
    }
    
    // Form interactions
    function initFormInteractions() {
        const loginScreen = document.querySelector('.login-screen');
        const registerScreen = document.querySelector('.register-screen');
        const screens = document.querySelector('.screens');
        
        const registerLink = document.querySelector('.register-link');
        const loginLink = document.querySelector('.login-link');
        
        const inputs = document.querySelectorAll('input');
        
        // Form switching animation
        registerLink.addEventListener('click', (e) => {
            e.preventDefault();
            loginScreen.classList.remove('active');
            
            // 3D flip animation
            screens.style.transform = 'rotateY(180deg)';
            
            setTimeout(() => {
                registerScreen.classList.add('active');
            }, 300);
        });
        
        loginLink.addEventListener('click', (e) => {
            e.preventDefault();
            registerScreen.classList.remove('active');
            
            // 3D flip animation
            screens.style.transform = 'rotateY(0deg)';
            
            setTimeout(() => {
                loginScreen.classList.add('active');
            }, 300);
        });
        
        // Input animations and validation
        inputs.forEach(input => {
            // Focus animation
            input.addEventListener('focus', () => {
                const container = input.closest('.input-container');
                if (container) {
                    container.style.transform = 'translateY(-5px)';
                    container.style.transition = 'transform 0.3s ease';
                }
                
                // Visual feedback
                const icon = container.querySelector('i');
                if (icon) {
                    icon.style.color = '#FF5722';
                    icon.style.transition = 'color 0.3s ease';
                }
            });
            
            // Blur animation
            input.addEventListener('blur', () => {
                const container = input.closest('.input-container');
                if (container) {
                    container.style.transform = 'translateY(0)';
                }
                
                // Reset visual feedback
                const icon = container.querySelector('i');
                if (icon) {
                    icon.style.color = '#4FC3F7';
                }
            });
            
            // Input validation
            input.addEventListener('input', () => {
                if (input.value.trim() !== '') {
                    input.classList.add('valid');
                } else {
                    input.classList.remove('valid');
                }
            });
        });
        
        // Form submission with JARVIS animation
        const loginBtn = document.querySelector('.login-btn');
        const registerBtn = document.querySelector('.register-btn');
        
        loginBtn.addEventListener('click', (e) => {
            e.preventDefault();
            simulateAuthentication('login');
        });
        
        if (registerBtn) {
            registerBtn.addEventListener('click', (e) => {
                e.preventDefault();
                simulateAuthentication('register');
            });
        }
        
        // Social media buttons
        const socialBtns = document.querySelectorAll('.social-btn');
        
        socialBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Create ripple effect
                const ripple = document.createElement('span');
                ripple.classList.add('ripple-effect');
                btn.appendChild(ripple);
                
                const rect = btn.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                
                ripple.style.width = ripple.style.height = `${size}px`;
                ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
                ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
                
                setTimeout(() => ripple.remove(), 600);
                
                // Simulate social login
                simulateAuthentication('social');
            });
        });
    }
    
    // Authentication simulation
    function simulateAuthentication(type) {
        // Create JARVIS-like authentication overlay
        const overlay = document.createElement('div');
        overlay.className = 'auth-overlay';
        overlay.innerHTML = `
            <div class="auth-container">
                <div class="auth-circle"></div>
                <div class="auth-scan"></div>
                <div class="auth-text">${type === 'login' ? 'AUTHENTICATING USER' : type === 'register' ? 'CREATING USER PROFILE' : 'CONNECTING TO EXTERNAL SERVICE'}</div>
                <div class="auth-progress">
                    <div class="auth-bar"></div>
                </div>
            </div>
        `;
        
        document.body.appendChild(overlay);
        
        // Add animations with CSS
        const style = document.createElement('style');
        style.textContent = `
            .auth-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.8);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 1000;
                opacity: 0;
                transition: opacity 0.5s ease;
            }
            
            .auth-container {
                position: relative;
                width: 300px;
                height: 300px;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
            }
            
            .auth-circle {
                position: absolute;
                width: 200px;
                height: 200px;
                border: 3px solid rgba(79, 195, 247, 0.5);
                border-radius: 50%;
                animation: pulse-circle 2s infinite;
            }
            
            .auth-scan {
                position: absolute;
                width: 220px;
                height: 5px;
                background: linear-gradient(90deg, transparent, #4FC3F7, transparent);
                top: 50%;
                transform: translateY(-50%);
                animation: scan-line 1.5s ease-in-out infinite;
            }
            
            .auth-text {
                color: #4FC3F7;
                font-size: 18px;
                margin-bottom: 20px;
                text-align: center;
                letter-spacing: 1px;
            }
            
            .auth-progress {
                width: 250px;
                height: 5px;
                background-color: rgba(255, 255, 255, 0.1);
                border-radius: 3px;
                overflow: hidden;
            }
            
            .auth-bar {
                height: 100%;
                width: 0;
                background-color: #FF5722;
                animation: progress-bar 3s ease forwards;
            }
            
            @keyframes pulse-circle {
                0% {
                    transform: scale(0.95);
                    box-shadow: 0 0 0 0 rgba(79, 195, 247, 0.5);
                }
                70% {
                    transform: scale(1);
                    box-shadow: 0 0 0 20px rgba(79, 195, 247, 0);
                }
                100% {
                    transform: scale(0.95);
                    box-shadow: 0 0 0 0 rgba(79, 195, 247, 0);
                }
            }
            
            @keyframes scan-line {
                0% {
                    top: 10%;
                }
                50% {
                    top: 90%;
                }
                100% {
                    top: 10%;
                }
            }
            
            @keyframes progress-bar {
                0% {
                    width: 0;
                }
                50% {
                    width: 70%;
                }
                100% {
                    width: 100%;
                }
            }
        `;
        document.head.appendChild(style);
        
        // Fade in overlay
        setTimeout(() => {
            overlay.style.opacity = '1';
        }, 10);
        
        // Simulate completion after animation
        setTimeout(() => {
            // Success message
            const authText = overlay.querySelector('.auth-text');
            authText.innerHTML = 
                type === 'login' ? 'AUTHENTICATION SUCCESSFUL<br>WELCOME BACK' :
                type === 'register' ? 'REGISTRATION COMPLETE<br>PROFILE CREATED' :
                'EXTERNAL SERVICE CONNECTED<br>AUTHENTICATION COMPLETE';
            authText.style.color = '#00FF00';
            
            // Change circle color
            const authCircle = overlay.querySelector('.auth-circle');
            authCircle.style.borderColor = '#00FF00';
            authCircle.style.boxShadow = '0 0 20px rgba(0, 255, 0, 0.5)';
            
            // Fade out and remove
            setTimeout(() => {
                overlay.style.opacity = '0';
                setTimeout(() => {
                    overlay.remove();
                    style.remove();
                    
                    // Redirect or other action
                    showSuccessMessage(type);
                }, 500);
            }, 1500);
        }, 3000);
    }
    
    // Success message after authentication
    function showSuccessMessage(type) {
        const messageOverlay = document.createElement('div');
        messageOverlay.className = 'message-overlay';
        
        const message = type === 'login' ? 
            'Welcome back, user. The JARVIS system is at your disposal.' :
            type === 'register' ? 
            'New user registered. Welcome to Stark Industries.' :
            'External authentication successful. Access granted.';
        
        messageOverlay.innerHTML = `
            <div class="message-container">
                <div class="message-icon">
                    <i class="fas fa-check-circle"></i>
                </div>
                <div class="message-text">${message}</div>
            </div>
        `;
        
        document.body.appendChild(messageOverlay);
        
        // Add style
        const style = document.createElement('style');
        style.textContent = `
            .message-overlay {
                position: fixed;
                top: 30px;
                right: -350px;
                width: 350px;
                background-color: rgba(30, 30, 47, 0.9);
                border-left: 3px solid #00FF00;
                padding: 20px;
                box-shadow: 0 0 20px rgba(0, 255, 0, 0.3);
                z-index: 1000;
                animation: slide-in 0.5s forwards, slide-out 0.5s forwards 4s;
            }
            
            .message-container {
                display: flex;
                align-items: center;
            }
            
            .message-icon {
                margin-right: 15px;
                color: #00FF00;
                font-size: 24px;
            }
            
            .message-text {
                color: #FFFFFF;
                font-size: 16px;
                letter-spacing: 1px;
            }
            
            @keyframes slide-in {
                to {
                    right: 0;
                }
            }
            
            @keyframes slide-out {
                to {
                    right: -350px;
                }
            }
        `;
        document.head.appendChild(style);
        
        // Remove after animation
        setTimeout(() => {
            messageOverlay.remove();
            style.remove();
        }, 5000);
    }
    
    // Add CSS styles for particles dynamically (missing from CSS file)
    const particleStyle = document.createElement('style');
    particleStyle.textContent = `
        .particle {
            position: absolute;
            border-radius: 50%;
            pointer-events: none;
            z-index: -1;
        }
        
        @keyframes ripple-effect {
            0% {
                transform: scale(0);
                opacity: 1;
            }
            100% {
                transform: scale(2);
                opacity: 0;
            }
        }
        
        .ripple-effect {
            position: absolute;
            border-radius: 50%;
            background-color: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: ripple-effect 0.6s linear;
            pointer-events: none;
        }
    `;
    document.head.appendChild(particleStyle);
    
    // Handle window resize for responsive design
    window.addEventListener('resize', () => {
        // Clear existing particles
        const particlesContainer = document.querySelector('.particles');
        if (particlesContainer) {
            particlesContainer.innerHTML = '';
        }
        
        // Recreate particles for new window size
        createParticles();
    });
});
