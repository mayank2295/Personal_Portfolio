/* ===== CONTACT FORM ===== */

const contactForm = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const formMessage = document.getElementById('formMessage');

// Real-time form validation feedback
contactForm.querySelectorAll('.form-control').forEach(input => {
    input.addEventListener('blur', function() {
        if (this.value.trim() && this.checkValidity()) {
            this.classList.remove('invalid');
            this.classList.add('valid');
        } else if (this.value.trim()) {
            this.classList.remove('valid');
            this.classList.add('invalid');
        }
    });

    input.addEventListener('input', function() {
        if (this.classList.contains('invalid') && this.checkValidity()) {
            this.classList.remove('invalid');
            this.classList.add('valid');
        }
    });
});

// Form AJAX submission
contactForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    submitBtn.disabled = true;
    submitBtn.innerHTML = 'Sending... <i class="fas fa-spinner fa-spin"></i>';
    formMessage.innerHTML = '';
    formMessage.className = 'form-message';

    const formData = new FormData(contactForm);

    try {
        const response = await fetch(contactForm.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            formMessage.innerHTML = '✅ Message sent successfully! I\'ll get back to you soon.';
            formMessage.className = 'form-message success';
            contactForm.reset();
            contactForm.querySelectorAll('.form-control').forEach(input => {
                input.classList.remove('valid', 'invalid');
            });
        } else {
            const data = await response.json();
            throw new Error(data.error || 'Something went wrong');
        }
    } catch (error) {
        formMessage.innerHTML = '❌ Oops! Something went wrong. Please try again.';
        formMessage.className = 'form-message error';
    } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Send Message <i class="fas fa-paper-plane"></i>';
    }
});

// Copy email to clipboard
function copyEmail() {
    const email = 'mayankgupta23081@gmail.com';
    const toast = document.getElementById('copyToast');
    
    navigator.clipboard.writeText(email).then(() => {
        toast.classList.add('show');
        
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }).catch(() => {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = email;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        
        toast.classList.add('show');
        
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    });
}

// Make copyEmail available globally
window.copyEmail = copyEmail;
