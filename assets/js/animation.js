document.addEventListener('DOMContentLoaded', function () {
    var typedElement = document.getElementById('typed-text');
    if (typedElement) {
        new Typed('#typed-text', {
            strings: ['Secure, Scalable Keycloak Hosting.<br>Ready in Minutes.'],
            typeSpeed: 40,
            loop: false,
            showCursor: true
        });
    }
});
