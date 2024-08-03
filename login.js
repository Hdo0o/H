// login.js
const encryptionKey = 'your-encryption-key'; // يجب أن يكون هذا المفتاح متطابقًا مع المفتاح المستخدم في الخادم

// تشفير النص
function encryptText(text) {
    return CryptoJS.AES.encrypt(text, encryptionKey).toString();
}

// التعامل مع تقديم النموذج
document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // الحصول على رمز الدخول من المدخلات
    const accessCode = document.getElementById('access-code').value;
    const encryptedCode = encryptText(accessCode);

    // إرسال الرمز المشفر إلى الخادم للتحقق
    fetch('http://localhost:3000/validate-code', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ code: encryptedCode })
    })
    .then(response => response.json())
    .then(data => {
        if (data.valid) {
            // تعيين ملف تعريف الارتباط للدخول
            setCookie('loggedIn', 'true', 365);
            // إعادة التوجيه إلى الصفحة الرئيسية
            window.location.href = 'index.html';
        } else {
            alert('الرمز غير صحيح. حاول مرة أخرى.');
        }
    });
});

// تعيين ملف تعريف الارتباط
function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = `${name}=${value || ""}${expires}; path=/; Secure; HttpOnly; SameSite=Strict`;
}