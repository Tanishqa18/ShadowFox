document.addEventListener('DOMContentLoaded', () => {
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');

    mobileMenu.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when a link is clicked
    document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        navMenu.classList.remove('active');
    }));

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', () => {
                // Close other open items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });
                item.classList.toggle('active');
            });
        }
    });

    // Contact Form Validation
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            let isValid = true;

            // Name Validation
            const name = document.getElementById('name');
            if (name.value.trim() === '') {
                setError(name, 'Name is required');
                isValid = false;
            } else {
                setSuccess(name);
            }

            // Email Validation
            const email = document.getElementById('email');
            if (email.value.trim() === '') {
                setError(email, 'Email is required');
                isValid = false;
            } else if (!isValidEmail(email.value.trim())) {
                setError(email, 'Provide a valid email address');
                isValid = false;
            } else {
                setSuccess(email);
            }

            // Phone Validation
            const phone = document.getElementById('phone');
            if (phone.value.trim() === '') {
                setError(phone, 'Phone number is required');
                isValid = false;
            } else {
                setSuccess(phone);
            }

            if (isValid) {
                const formData = {
                    name: name.value.trim(),
                    email: email.value.trim(),
                    phone: phone.value.trim(),
                    message: document.getElementById('message').value.trim()
                };

                try {
                    const response = await fetch('http://localhost:3000/api/contact', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(formData)
                    });

                    if (response.ok) {
                        alert('Thank you for contacting us! We will get back to you soon.');
                        contactForm.reset();
                        document.querySelectorAll('.success-border').forEach(el => el.classList.remove('success-border'));
                    } else {
                        alert('Something went wrong. Please try again later.');
                    }
                } catch (error) {
                    console.error('Error:', error);
                    alert('Failed to connect to the server.');
                }
            }
        });
    }

    function setError(element, message) {
        const formGroup = element.parentElement;
        const errorDisplay = formGroup.querySelector('.error-msg');
        errorDisplay.innerText = message;
        element.classList.add('error-border');
        element.classList.remove('success-border');
    }

    function setSuccess(element) {
        const formGroup = element.parentElement;
        const errorDisplay = formGroup.querySelector('.error-msg');
        errorDisplay.innerText = '';
        element.classList.add('success-border');
        element.classList.remove('error-border');
    }

    function isValidEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
});