// الانتقال من صفحة البداية إلى الصفحة الرئيسية
function startApp() {
    const customMessage = document.getElementById("customMessageInput").value;
    const defaultMessage = "تأكد من قرائتك لجميع الأسئلة والإجابة عليها | لاتتسرع في الإجابة | راجع إجاباتك | وفقكم الله وجعل الامتياز رفيقكم";
    document.getElementById("animatedMessage").textContent = customMessage || defaultMessage;

    const year = document.getElementById("yearSelect").value;
    const semester = document.getElementById("semesterSelect").value;
    const session = document.getElementById("sessionSelect").value;
    const committee = document.getElementById("committeeSelect").value;

    document.getElementById("yearDisplay").textContent = convertToArabicNumbers(year);
    document.getElementById("semesterDisplay").textContent = semester;
    document.getElementById("sessionDisplay").textContent = session;
    document.getElementById("committeeDisplay").textContent = committee;

    document.getElementById("start-page").style.display = "none";
    document.getElementById("main-page").style.display = "block";
}


// دالة لتحويل الأرقام إلى أرقام عربية
function convertToArabicNumbers(number) {
    return number.toString().replace(/\d/g, d => '٠١٢٣٤٥٦٧٨٩'[d]);
}

// حساب الأيام المتبقية حتى الأربعاء بعد القادم
function calculateRemainingDays() {
    const today = new Date();
    const nextWednesday = new Date();
    
    // ضبط التاريخ ليكون الأربعاء بعد القادم
    nextWednesday.setDate(today.getDate() + ((10 - today.getDay()) % 7 + 7));
    
    // حساب الفرق بالأيام
    const differenceInDays = Math.ceil((nextWednesday - today) / (1000 * 60 * 60 * 24));
    document.getElementById("remainingDays").textContent = convertToArabicNumbers(differenceInDays);
}

// تحديث الوقت الفعلي في الساعة الرقمية
function updateDigitalClock() {
    const now = new Date();
    const hours = convertToArabicNumbers(String(now.getHours()).padStart(2, '0'));
    const minutes = convertToArabicNumbers(String(now.getMinutes()).padStart(2, '0'));
    const seconds = convertToArabicNumbers(String(now.getSeconds()).padStart(2, '0'));
    document.getElementById('digital-clock').textContent = `${hours}:${minutes}:${seconds}`;
}

// تحديث اليوم والتاريخ الهجري
function updateTime() {
    const date = new Date();
    const dayOptions = { weekday: 'long', numberingSystem: 'arab' };
    document.getElementById('dayName').textContent = date.toLocaleDateString('ar-EG', dayOptions);
}

function updateHijriDate() {
    const date = new Date();
    const hijriDate = new Intl.DateTimeFormat('ar-SA-u-ca-islamic', { day: 'numeric', month: 'long', year: 'numeric' }).format(date);
    document.getElementById('hijriDate').textContent = convertToArabicNumbers(hijriDate);
}

// تحديث كل ثانية
setInterval(() => {
    updateDigitalClock();
    updateTime();
    updateHijriDate();
    calculateRemainingDays();
}, 1000);

// تشغيل التحديث عند التحميل
document.addEventListener("DOMContentLoaded", () => {
    updateDigitalClock();
    updateTime();
    updateHijriDate();
    calculateRemainingDays();
});
