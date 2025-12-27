// ===== دالة فتح واتساب =====
function openWhatsApp(phoneNumber) {
    const message = "مرحباً، أريد الاستفسار عن خدمات راوند تريب";
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        window.location.href = whatsappUrl;
    } else {
        window.open(whatsappUrl, '_blank');
    }
}

// ===== إصلاح مساحة الهيدر ديناميكياً =====
function adjustHeaderSpace() {
    const header = document.querySelector('.header');
    const main = document.querySelector('main');
    
    if (header && main) {
        const headerHeight = header.offsetHeight;
        
        // تحديد padding-top بناءً على حجم الشاشة
        if (window.innerWidth <= 767) {
            // للجوال - مساحة أكبر
            main.style.paddingTop = (headerHeight + 30) + 'px';
        } else if (window.innerWidth <= 992) {
            // للأجهزة اللوحية
            main.style.paddingTop = (headerHeight + 20) + 'px';
        } else {
            // لأجهزة الكمبيوتر
            main.style.paddingTop = (headerHeight + 10) + 'px';
        }
    }
}

// ===== إخفاء الهيدر والبانر عند التمرير =====
let lastScrollTop = 0;
const header = document.querySelector('.header');
const banner = document.querySelector('.banner');

window.addEventListener('scroll', function() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop && scrollTop > 100) {
        // التمرير لأسفل - إخفاء
        if (header) {
            header.classList.add('hidden');
            header.style.transform = 'translateY(-100%)';
        }
        if (banner) {
            banner.classList.add('hidden');
            banner.style.transform = 'translateY(-100%)';
        }
    } else {
        // التمرير لأعلى - إظهار
        if (header) {
            header.classList.remove('hidden');
            header.style.transform = 'translateY(0)';
        }
        if (banner) {
            banner.classList.remove('hidden');
            banner.style.transform = 'translateY(0)';
        }
    }
    
    // إظهار الهيدر عند الوصول لأعلى الصفحة
    if (scrollTop <= 50) {
        if (header) {
            header.classList.remove('hidden');
            header.style.transform = 'translateY(0)';
        }
        if (banner) {
            banner.classList.remove('hidden');
            banner.style.transform = 'translateY(0)';
        }
    }
    
    lastScrollTop = scrollTop;
});

// ===== تهيئة الصفحة عند التحميل =====
document.addEventListener('DOMContentLoaded', function() {
    // إصلاح مساحة الهيدر
    adjustHeaderSpace();
    
    // تحميل صورة البانر في حالة عدم وجودها
    const banner = document.querySelector('.banner');
    if (banner) {
        const img = new Image();
        img.src = 'images/banner.jpg';
        img.onerror = function() {
            banner.style.backgroundImage = `linear-gradient(rgba(85, 104, 89, 0.85), rgba(175, 181, 152, 0.8)), url('https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80')`;
        };
    }
    
    // تحميل صورة اللوجو في حالة عدم وجودها
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.onerror = function() {
            this.style.display = 'none';
        };
    }
    
    // تعيين الحد الأدنى للتاريخ على اليوم الحالي
    const today = new Date().toISOString().split('T')[0];
    const dateFields = [
        'pickupDate', 'returnDate', 'hotelCheckIn', 'hotelCheckOut',
        'honeymoonStartDate', 'toursStartDate', 'visaTravelDate'
    ];
    
    dateFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (field) {
            field.min = today;
        }
    });
});

// ===== تعديل مساحة الهيدر عند تغيير حجم النافذة =====
window.addEventListener('resize', function() {
    // تأخير التعديل قليلاً لاستقرار التغيير
    setTimeout(adjustHeaderSpace, 100);
});

// ===== تحسين اختيار التاريخ والوقت - يمكن النقر في أي مكان =====
document.addEventListener('DOMContentLoaded', function() {
    // جعل حقول التاريخ والوقت قابلة للنقر في أي مكان
    const dateTimeInputs = document.querySelectorAll('.date-time-input');
    dateTimeInputs.forEach(container => {
        const input = container.querySelector('input');
        if (input) {
            container.addEventListener('click', function(e) {
                if (e.target !== input) {
                    input.focus();
                    if (input.type === 'date' || input.type === 'time') {
                        input.showPicker ? input.showPicker() : input.click();
                    }
                }
            });
        }
    });
    
    // تعبئة خيارات العمر في صفحة تأجير السيارات (19-65)
    const driverAgeSelect = document.getElementById('driverAge');
    if (driverAgeSelect) {
        for (let i = 19; i <= 65; i++) {
            const option = document.createElement('option');
            option.value = i;
            option.textContent = i + ' سنة';
            driverAgeSelect.appendChild(option);
        }
    }
    
    // تعبئة خيارات عدد البالغين (1-9)
    const totalAdultsSelect = document.getElementById('totalAdults');
    if (totalAdultsSelect) {
        for (let i = 1; i <= 9; i++) {
            const option = document.createElement('option');
            option.value = i;
            option.textContent = i + ' شخص';
            totalAdultsSelect.appendChild(option);
        }
    }
    
    // تعبئة خيارات عدد الأطفال (1-7)
    const childrenCountSelect = document.getElementById('childrenCount');
    if (childrenCountSelect) {
        for (let i = 1; i <= 7; i++) {
            const option = document.createElement('option');
            option.value = i;
            option.textContent = i + ' طفل';
            childrenCountSelect.appendChild(option);
        }
    }
    
    // تعبئة خيارات عدد الغرف (1-8)
    const hotelRoomsSelect = document.getElementById('hotelRooms');
    if (hotelRoomsSelect) {
        for (let i = 1; i <= 8; i++) {
            const option = document.createElement('option');
            option.value = i;
            option.textContent = i + ' غرفة';
            hotelRoomsSelect.appendChild(option);
        }
    }
    
    // تعبئة خيارات عدد الأطفال في الفنادق (1-8)
    const hotelChildrenSelect = document.getElementById('hotelChildren');
    if (hotelChildrenSelect) {
        for (let i = 1; i <= 8; i++) {
            const option = document.createElement('option');
            option.value = i;
            option.textContent = i + ' طفل';
            hotelChildrenSelect.appendChild(option);
        }
    }
});

// ===== خيارات مكان التسليم =====
function selectReturnOption(option) {
    const options = document.querySelectorAll('.return-option');
    options.forEach(opt => opt.classList.remove('selected'));
    
    if (option === 'same') {
        options[0].classList.add('selected');
        document.getElementById('returnOption').value = 'same';
        document.getElementById('returnLocationContainer').style.display = 'none';
        const pickupLocation = document.getElementById('pickupLocation').value;
        document.getElementById('returnLocation').value = pickupLocation || 'نفس مكان الاستلام';
    } else {
        options[1].classList.add('selected');
        document.getElementById('returnOption').value = 'different';
        document.getElementById('returnLocationContainer').style.display = 'block';
        document.getElementById('returnLocation').value = '';
        document.getElementById('returnLocation').focus();
    }
}

// ===== تفعيل خيارات أعمار الأطفال عند تحديد عددهم (صفحة تأجير السيارات) =====
function toggleChildAges(count) {
    const childAgeGroup = document.getElementById('childAgeGroup');
    const childAgeInputs = document.getElementById('childAgeInputs');
    
    if (count > 0) {
        childAgeGroup.style.display = 'block';
        childAgeInputs.innerHTML = '';
        
        for (let i = 1; i <= count; i++) {
            const ageSelect = document.createElement('div');
            ageSelect.className = 'form-group';
            ageSelect.innerHTML = `
                <label for="childAge${i}">عمر الطفل ${i}</label>
                <select id="childAge${i}" name="childAge${i}" required>
                    <option value="">اختر العمر</option>
                    <option value="1">1 سنة</option>
                    <option value="2">2 سنوات</option>
                    <option value="3">3 سنوات</option>
                    <option value="4">4 سنوات</option>
                    <option value="5">5 سنوات</option>
                    <option value="6">6 سنوات</option>
                    <option value="7">7 سنوات</option>
                    <option value="8">8 سنوات</option>
                    <option value="9">9 سنوات</option>
                    <option value="10">10 سنوات</option>
                </select>
            `;
            childAgeInputs.appendChild(ageSelect);
        }
    } else {
        childAgeGroup.style.display = 'none';
        childAgeInputs.innerHTML = '';
    }
}

// ===== تفعيل خيارات أعمار الأطفال في الفنادق =====
function toggleChildrenAges(count) {
    const container = document.getElementById('childrenAgesContainer');
    const inputs = document.getElementById('childrenAgeInputs');
    
    if (count > 0) {
        container.style.display = 'block';
        inputs.innerHTML = '';
        
        for (let i = 1; i <= count; i++) {
            const ageSelect = document.createElement('div');
            ageSelect.className = 'age-select-group';
            ageSelect.innerHTML = `
                <label for="hotelChildAge${i}">عمر الطفل ${i}</label>
                <select id="hotelChildAge${i}" name="hotelChildAge${i}" required>
                    <option value="">اختر العمر</option>
                    <option value="1">1 سنة</option>
                    <option value="2">2 سنوات</option>
                    <option value="3">3 سنوات</option>
                    <option value="4">4 سنوات</option>
                    <option value="5">5 سنوات</option>
                    <option value="6">6 سنوات</option>
                    <option value="7">7 سنوات</option>
                    <option value="8">8 سنوات</option>
                    <option value="9">9 سنوات</option>
                    <option value="10">10 سنوات</option>
                    <option value="11">11 سنة</option>
                    <option value="12">12 سنة</option>
                </select>
            `;
            inputs.appendChild(ageSelect);
        }
    } else {
        container.style.display = 'none';
        inputs.innerHTML = '';
    }
}

// ===== توزيع الأشخاص على الغرف في الفنادق =====
function toggleRoomOccupancy(roomCount) {
    const container = document.getElementById('roomOccupancyContainer');
    const inputs = document.getElementById('roomOccupancyInputs');
    
    if (roomCount > 1) {
        container.style.display = 'block';
        inputs.innerHTML = '';
        
        for (let i = 1; i <= roomCount; i++) {
            const roomItem = document.createElement('div');
            roomItem.className = 'room-occupancy-item';
            roomItem.innerHTML = `
                <h5>الغرفة ${i}</h5>
                <div class="form-row">
                    <div class="form-group">
                        <label for="room${i}Adults">عدد البالغين</label>
                        <select id="room${i}Adults" name="room${i}Adults" required>
                            <option value="">اختر عدد البالغين</option>
                            <option value="1">1 بالغ</option>
                            <option value="2">2 بالغين</option>
                            <option value="3">3 بالغين</option>
                            <option value="4">4 بالغين</option>
                            <option value="5">5 بالغين</option>
                            <option value="6">6 بالغين</option>
                            <option value="7">7 بالغين</option>
                            <option value="8">8 بالغين</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="room${i}Children">عدد الأطفال</label>
                        <select id="room${i}Children" name="room${i}Children" onchange="toggleRoomChildAges(${i}, this.value)">
                            <option value="0">0 - لا يوجد أطفال</option>
                            <option value="1">1 طفل</option>
                            <option value="2">2 أطفال</option>
                            <option value="3">3 أطفال</option>
                        </select>
                    </div>
                </div>
                <div id="room${i}ChildrenAges" class="children-ages-container" style="display: none; margin-top: 10px;">
                    <label>أعمار الأطفال في الغرفة ${i}</label>
                    <div id="room${i}ChildAgeInputs"></div>
                </div>
            `;
            inputs.appendChild(roomItem);
        }
    } else {
        container.style.display = 'none';
        inputs.innerHTML = '';
    }
}

// ===== تفعيل خيارات أعمار الأطفال لكل غرفة =====
function toggleRoomChildAges(roomNumber, count) {
    const container = document.getElementById(`room${roomNumber}ChildrenAges`);
    const inputs = document.getElementById(`room${roomNumber}ChildAgeInputs`);
    
    if (count > 0) {
        container.style.display = 'block';
        inputs.innerHTML = '';
        
        for (let i = 1; i <= count; i++) {
            const ageSelect = document.createElement('div');
            ageSelect.className = 'age-select-group';
            ageSelect.innerHTML = `
                <label for="room${roomNumber}ChildAge${i}">عمر الطفل ${i}</label>
                <select id="room${roomNumber}ChildAge${i}" name="room${roomNumber}ChildAge${i}" required>
                    <option value="">اختر العمر</option>
                    <option value="1">1 سنة</option>
                    <option value="2">2 سنوات</option>
                    <option value="3">3 سنوات</option>
                    <option value="4">4 سنوات</option>
                    <option value="5">5 سنوات</option>
                    <option value="6">6 سنوات</option>
                    <option value="7">7 سنوات</option>
                    <option value="8">8 سنوات</option>
                    <option value="9">9 سنوات</option>
                    <option value="10">10 سنوات</option>
                    <option value="11">11 سنة</option>
                    <option value="12">12 سنة</option>
                </select>
            `;
            inputs.appendChild(ageSelect);
        }
    } else {
        container.style.display = 'none';
        inputs.innerHTML = '';
    }
}

// ===== تحديث مكان التسليم عند تغيير مكان الاستلام =====
const pickupLocationInput = document.getElementById('pickupLocation');
if (pickupLocationInput) {
    pickupLocationInput.addEventListener('input', function() {
        if (document.getElementById('returnOption') && document.getElementById('returnOption').value === 'same') {
            document.getElementById('returnLocation').value = this.value;
        }
    });
}

// ===== التحقق من حد الركاب في خدمة السائق =====
function checkDriverPassengerLimit(select) {
    const warning = document.getElementById('driverPassengerWarning');
    if (select && select.value === 'more') {
        warning.style.display = 'block';
    } else if (warning) {
        warning.style.display = 'none';
    }
}

// ===== التحقق من حد الركاب في تأجير السيارات =====
function checkPassengerLimit() {
    const totalAdults = parseInt(document.getElementById('totalAdults')?.value) || 0;
    const childrenCount = parseInt(document.getElementById('childrenCount')?.value) || 0;
    const totalPassengers = totalAdults + childrenCount;
    const errorElement = document.getElementById('passengerLimitError');
    
    if (errorElement) {
        if (totalPassengers > 9) {
            errorElement.style.display = 'block';
            errorElement.textContent = `❌ الخطأ: عدد الركاب ${totalPassengers} يتجاوز الحد الأقصى (9 ركاب). إذا كنت بحاجة إلى أكثر من 9 ركاب، يرجى الاتصال بنا مباشرة لتأجير سيارتين.`;
            return false;
        } else {
            errorElement.style.display = 'none';
            return true;
        }
    }
    return true;
}

// ===== نماذج الإرسال - إصلاح مشكلة الرموز في واتساب =====
const carRentalForm = document.getElementById('carRentalForm');
if (carRentalForm) {
    carRentalForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // التحقق من حد الركاب قبل الإرسال
        if (!checkPassengerLimit()) {
            return;
        }
        
        const form = e.target;
        const formData = new FormData(form);
        const data = {};
        const paymentMethods = [];
        const childAges = [];
        
        // جمع بيانات أعمار الأطفال
        const childrenCount = parseInt(formData.get('childrenCount') || 0);
        for (let i = 1; i <= childrenCount; i++) {
            const age = formData.get(`childAge${i}`);
            if (age) childAges.push(age + ' سنوات');
        }
        
        formData.forEach((value, key) => {
            if (key.startsWith('childAge')) return;
            if (key === 'paymentMethod') {
                paymentMethods.push(value);
            } else {
                data[key] = value;
            }
        });
        
        // بناء الرسالة بدون رموز تعبيرية
        const paymentMethodsStr = paymentMethods.length > 0 ? paymentMethods.join('، ') : 'غير محدد';
        const childrenInfo = childrenCount > 0 ? `${childrenCount} طفل، أعمارهم: ${childAges.join('، ')}` : 'لا يوجد أطفال';
        const returnLocation = data.returnOption === 'same' ? 'نفس مكان الاستلام' : data.returnLocation;
        
        // تنسيق التاريخ بالميلادي بدل الهجري
        const now = new Date();
        const formattedDate = now.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        }).replace(',', '');
        
        const message = `*طلب تأجير سيارة - راوند تريب*

*المعلومات الشخصية:*
• الاسم: ${data.carName || 'غير محدد'}
• رقم التواصل: ${data.carPhone || 'غير محدد'}
• البريد: ${data.carEmail || 'غير محدد'}

*تفاصيل الرحلة:*
• مكان الاستلام: ${data.pickupLocation || 'غير محدد'}
• تاريخ الاستلام: ${data.pickupDate || 'غير محدد'}
• وقت الاستلام: ${data.pickupTime || 'غير محدد'}
• مكان التسليم: ${returnLocation || 'غير محدد'}
• تاريخ التسليم: ${data.returnDate || 'غير محدد'}
• وقت التسليم: ${data.returnTime || 'غير محدد'}

*تفاصيل السيارة:*
• نوع السيارة المفضل: ${data.carType || 'غير محدد'}
• عمر السائق: ${data.driverAge || 'غير محدد'} سنة
• عدد البالغين: ${data.totalAdults || 'غير محدد'}
• الأطفال: ${childrenInfo}
• شنط كبيرة: ${data.largeBags || '0'}
• شنط صغيرة: ${data.smallBags || '0'}

*معلومات إضافية:*
• دول أخرى ستزورونها غير بلد الاستلام والتسليم: ${data.otherCountries || 'لا يوجد'}
• طريقة الدفع المفضلة: ${paymentMethodsStr}

*ملاحظات إضافية:*
${data.carNotes || 'لا توجد ملاحظات'}

*تم إرسال الطلب في:* ${formattedDate}
*رقم التواصل:* ${data.carPhone || 'غير محدد'}

--- راوند تريب - خدمة تأجير السيارات ---`;
        
        sendWhatsAppMessage(message);
        setTimeout(() => form.reset(), 2000);
    });
}

// ===== نموذج خدمة السائق الخاص =====
const driverForm = document.getElementById('driverForm');
if (driverForm) {
    driverForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const form = e.target;
        const formData = new FormData(form);
        const data = {};
        const tripTypes = [];
        
        formData.forEach((value, key) => {
            if (key === 'tripType') {
                tripTypes.push(value);
            } else {
                data[key] = value;
            }
        });
        
        const tripTypesStr = tripTypes.length > 0 ? tripTypes.join('، ') : 'غير محدد';
        
        // تنسيق التاريخ بالميلادي
        const now = new Date();
        const formattedDate = now.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        }).replace(',', '');
        
        const message = `*طلب خدمة سائق خاص - راوند تريب*

*المعلومات الشخصية:*
• الاسم: ${data.driverName}
• رقم التواصل: ${data.driverPhone}
• البريد: ${data.driverEmail || 'غير محدد'}
• المدينة/الدولة: ${data.driverCity}

*تفاصيل الرحلة:*
• مكان الانطلاق: ${data.fromLocation}
• مكان الوصول: ${data.toLocation}
• عدد الأشخاص: ${data.driverPassengers} (بما فيهم الأطفال)
• نوع الرحلات المطلوبة: ${tripTypesStr}
• نوع السيارة: ${data.driverCarType}
• عدد الأيام: ${data.driverServiceDays}

*ملاحظات إضافية:*
${data.driverNotes || 'لا توجد ملاحظات'}

${data.driverPassengers === 'more' ? '*ملاحظة:* سيتم تخصيص سيارة إضافية حيث أن الحد الأقصى للركاب هو 8 + السائق\n\n' : ''}
*تم إرسال الطلب في:* ${formattedDate}
*رقم التواصل:* ${data.driverPhone}

--- راوند تريب - خدمة السائق الخاص ---`;
        
        sendWhatsAppMessage(message);
        setTimeout(() => {
            form.reset();
            const warning = document.getElementById('driverPassengerWarning');
            if (warning) warning.style.display = 'none';
        }, 2000);
    });
}

// ===== نموذج شهر العسل =====
const honeymoonForm = document.getElementById('honeymoonForm');
if (honeymoonForm) {
    honeymoonForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const form = e.target;
        const formData = new FormData(form);
        const data = {};
        const services = [];
        
        formData.forEach((value, key) => {
            if (key === 'honeymoonService') {
                services.push(value);
            } else {
                data[key] = value;
            }
        });
        
        const servicesStr = services.length > 0 ? services.join('، ') : 'غير محدد';
        
        // تنسيق التاريخ بالميلادي
        const now = new Date();
        const formattedDate = now.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        }).replace(',', '');
        
        const message = `*طلب رحلة شهر العسل - راوند تريب*

*المعلومات الشخصية:*
• الاسم: ${data.honeymoonName}
• رقم التواصل: ${data.honeymoonPhone}
• البريد: ${data.honeymoonEmail || 'غير محدد'}

*تفاصيل الرحلة:*
• الوجهة: ${data.honeymoonDestination || 'غير محدد'}
• تاريخ السفر: ${data.honeymoonStartDate || 'غير محدد'}
• مدة الرحلة: ${data.honeymoonDuration} يوم
• الميزانية: ${data.honeymoonBudget || '0'} ${data.honeymoonCurrency || 'دينار كويتي'}

*الخدمات المطلوبة:*
${servicesStr}

*طلبات خاصة:*
${data.honeymoonSpecialRequests || 'لا توجد طلبات خاصة'}

*تم إرسال الطلب في:* ${formattedDate}
*رقم التواصل:* ${data.honeymoonPhone}

--- راوند تريب - رحلات شهر العسل ---`;
        
        sendWhatsAppMessage(message);
        setTimeout(() => form.reset(), 2000);
    });
}

// ===== نموذج تنظيم الرحلات والفعاليات =====
const toursForm = document.getElementById('toursForm');
if (toursForm) {
    toursForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const form = e.target;
        const formData = new FormData(form);
        const data = {};
        const activities = [];
        
        formData.forEach((value, key) => {
            if (key === 'tourActivity') {
                activities.push(value);
            } else {
                data[key] = value;
            }
        });
        
        const activitiesStr = activities.length > 0 ? activities.join('، ') : 'غير محدد';
        
        // تنسيق التاريخ بالميلادي
        const now = new Date();
        const formattedDate = now.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        }).replace(',', '');
        
        const message = `*طلب تنظيم رحلة/فعالية - راوند تريب*

*المعلومات الشخصية:*
• الاسم: ${data.toursName}
• رقم التواصل: ${data.toursPhone}
• البريد: ${data.toursEmail || 'غير محدد'}

*تفاصيل الرحلة:*
• نوع الخدمة: ${data.toursType}
• الوجهة: ${data.toursDestination}
• عدد الأشخاص: ${data.toursPeople}
• تاريخ السفر: ${data.toursStartDate || 'غير محدد'}
• مدة الرحلة: ${data.toursDuration || 'غير محدد'} يوم
• الميزانية للشخص: ${data.toursBudget || '0'} ${data.toursCurrency || 'دينار كويتي'}

*الأنشطة المطلوبة:*
${activitiesStr}

*تفاصيل إضافية:*
${data.toursSpecialRequests || 'لا توجد تفاصيل إضافية'}

*تم إرسال الطلب في:* ${formattedDate}
*رقم التواصل:* ${data.toursPhone}

--- راوند تريب - تنظيم الرحلات والفعاليات ---`;
        
        sendWhatsAppMessage(message);
        setTimeout(() => form.reset(), 2000);
    });
}

// ===== نموذج التأشيرات =====
const visaForm = document.getElementById('visaForm');
if (visaForm) {
    visaForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const form = e.target;
        const formData = new FormData(form);
        const data = {};
        formData.forEach((value, key) => data[key] = value);
        
        // تنسيق التاريخ بالميلادي
        const now = new Date();
        const formattedDate = now.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        }).replace(',', '');
        
        const message = `*طلب تأشيرة سفر - راوند تريب*

*المعلومات الشخصية:*
• الاسم: ${data.visaName}
• رقم التواصل: ${data.visaPhone}
• البريد: ${data.visaEmail || 'غير محدد'}
• الجنسية: ${data.visaNationality}

*تفاصيل التأشيرة:*
• الدولة المراد السفر إليها: ${data.visaDestination}
• تاريخ السفر المتوقع: ${data.visaTravelDate || 'غير محدد'}
• عدد الأشخاص: ${data.visaPeople}
• نوع التأشيرة: ${data.visaType || 'غير محدد'}

*ملاحظات إضافية:*
${data.visaNotes || 'لا توجد ملاحظات'}

*تم إرسال الطلب في:* ${formattedDate}
*رقم التواصل:* ${data.visaPhone}

--- راوند تريب - خدمة التأشيرات ---`;
        
        sendWhatsAppMessage(message);
        setTimeout(() => form.reset(), 2000);
    });
}

// ===== نموذج حجز الفنادق =====
const hotelForm = document.getElementById('hotelForm');
if (hotelForm) {
    hotelForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const form = e.target;
        const formData = new FormData(form);
        const data = {};
        const childAges = [];
        
        // جمع بيانات أعمار الأطفال
        const childrenCount = parseInt(formData.get('hotelChildren') || 0);
        for (let i = 1; i <= childrenCount; i++) {
            const age = formData.get(`hotelChildAge${i}`);
            if (age) childAges.push(age + ' سنة');
        }
        
        // جمع بيانات الغرف
        const roomDetails = [];
        const roomCount = parseInt(formData.get('hotelRooms') || 1);
        for (let i = 1; i <= roomCount; i++) {
            const adults = formData.get(`room${i}Adults`) || 'غير محدد';
            const children = formData.get(`room${i}Children`) || '0';
            const roomChildrenAges = [];
            
            // جمع أعمار الأطفال في هذه الغرفة
            for (let j = 1; j <= children; j++) {
                const age = formData.get(`room${i}ChildAge${j}`);
                if (age) roomChildrenAges.push(age + ' سنة');
            }
            
            const roomInfo = `الغرفة ${i}: ${adults} بالغ${children > 0 ? `، ${children} طفل${roomChildrenAges.length > 0 ? ' (أعمارهم: ' + roomChildrenAges.join('، ') + ')' : ''}` : ''}`;
            roomDetails.push(roomInfo);
        }
        
        formData.forEach((value, key) => {
            if (key.startsWith('room') || key.startsWith('hotelChildAge')) return;
            data[key] = value;
        });
        
        const childrenInfo = childrenCount > 0 ? `${childrenCount} طفل، أعمارهم: ${childAges.join('، ')}` : 'لا يوجد أطفال';
        
        // تنسيق التاريخ بالميلادي
        const now = new Date();
        const formattedDate = now.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        }).replace(',', '');
        
        const message = `*طلب حجز فندق - راوند تريب*

*المعلومات الشخصية:*
• الاسم: ${data.hotelName || 'غير محدد'}
• رقم التواصل: ${data.hotelPhone || 'غير محدد'}
• البريد: ${data.hotelEmail || 'غير محدد'}

*تفاصيل الحجز:*
• الوجهة: ${data.hotelDestination || 'غير محدد'}
• تاريخ الوصول: ${data.hotelCheckIn || 'غير محدد'}
• تاريخ المغادرة: ${data.hotelCheckOut || 'غير محدد'}
• عدد الغرف: ${data.hotelRooms || 'غير محدد'}
• الأطفال: ${childrenInfo}
• نوع الفندق: ${data.hotelType || 'غير محدد'}

${roomCount > 1 ? `*تفاصيل الغرف:*\n${roomDetails.join('\n')}\n\n` : ''}
*طلبات خاصة:*
${data.hotelSpecialRequests || 'لا توجد طلبات خاصة'}

*تم إرسال الطلب في:* ${formattedDate}
*رقم التواصل:* ${data.hotelPhone || 'غير محدد'}

--- راوند تريب - خدمة حجز الفنادق ---`;
        
        sendWhatsAppMessage(message);
        setTimeout(() => form.reset(), 2000);
    });
}

// ===== دالة عامة لإرسال الرسائل عبر واتساب =====
function sendWhatsAppMessage(message) {
    const encodedMessage = encodeURIComponent(message);
    const companyWhatsappNumber = "96565750302";
    const whatsappUrl = `https://wa.me/${companyWhatsappNumber}?text=${encodedMessage}`;
    
    // حل لمشكلة فتح واتساب في الموبايل
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        // للأجهزة المحمولة، نفتح في نفس النافذة
        window.location.href = whatsappUrl;
    } else {
        // لأجهزة الكمبيوتر، نفتح في نافذة جديدة
        window.open(whatsappUrl, '_blank');
    }
    
    // رسالة تأكيد بسيطة
    setTimeout(() => {
        alert('✅ تم تجهيز طلبك بنجاح!\n\nسيتم الآن فتح تطبيق واتساب. تأكد من ظهور جميع بياناتك في الرسالة ثم انقر على زر الإرسال.\n\nشكراً لاختيارك راوند تريب!');
    }, 500);
}

// ===== تحسينات للجوال - منع التكبير في حقول الإدخال =====
document.addEventListener('DOMContentLoaded', function() {
    const inputs = document.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        // منع التكبير في حقول الإدخال على الجوال
        input.addEventListener('focus', function() {
            if (window.innerWidth <= 767) {
                setTimeout(() => {
                    window.scrollTo(0, 0);
                    document.body.style.zoom = 1;
                }, 100);
            }
        });
    });
});

// ===== تهيئة إضافية عند تحميل الصفحة بالكامل =====
window.addEventListener('load', function() {
    // إصلاح مساحة الهيدر بعد تحميل الصفحة بالكامل
    setTimeout(adjustHeaderSpace, 500);
    
    // تحسين التمرير للجوال
    if (window.innerWidth <= 767) {
        document.documentElement.style.scrollBehavior = 'smooth';
    }
});

// ===== إصلاح مشكلة الهيدر في iOS =====
if (navigator.userAgent.match(/iPhone|iPad|iPod/i)) {
    document.addEventListener('touchstart', function() {}, {passive: true});
    document.addEventListener('scroll', adjustHeaderSpace, {passive: true});

    // إصلاح مساحة الهيدر ديناميكياً
function adjustHeaderSpace() {
    const header = document.querySelector('.header');
    const main = document.querySelector('main');
    
    if (header && main) {
        const headerHeight = header.offsetHeight;
        
        // على الجوال نزيد المساحة قليلاً
        if (window.innerWidth <= 768) {
            main.style.paddingTop = (headerHeight + 20) + 'px';
        } else {
            main.style.paddingTop = headerHeight + 'px';
        }
    }
}

// دالة لضمان بقاء الفوتر في الأسفل
function fixFooterPosition() {
    const main = document.querySelector('main');
    const footer = document.querySelector('.footer');
    
    if (main && footer) {
        const windowHeight = window.innerHeight;
        const mainHeight = main.offsetHeight;
        const footerHeight = footer.offsetHeight;
        const headerHeight = document.querySelector('.header').offsetHeight;
        
        // إذا كان المحتوى قصيراً، نضبط ارتفاع main ليدفع الفوتر للأسفل
        if (mainHeight + footerHeight + headerHeight < windowHeight) {
            main.style.minHeight = (windowHeight - footerHeight - headerHeight - 20) + 'px';
        } else {
            main.style.minHeight = 'auto';
        }
    }
}

// استدعاء الدوال عند تحميل الصفحة وتغيير الحجم
document.addEventListener('DOMContentLoaded', function() {
    adjustHeaderSpace();
    fixFooterPosition();
    
    // إضافة حدث إخفاء/إظهار الهيدر
    let lastScrollTop = 0;
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // التمرير لأسفل - إخفاء
            header.classList.add('hidden');
        } else {
            // التمرير لأعلى - إظهار
            header.classList.remove('hidden');
        }
        
        lastScrollTop = scrollTop;
    });
});

window.addEventListener('resize', function() {
    adjustHeaderSpace();
    fixFooterPosition();
});

window.addEventListener('load', function() {
    adjustHeaderSpace();
    fixFooterPosition();
});

// دالة فتح واتساب
function openWhatsApp(phoneNumber) {
    const message = "مرحباً، أريد الاستفسار عن خدمات راوند تريب";
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        window.location.href = whatsappUrl;
    } else {
        window.open(whatsappUrl, '_blank');
    }
}
}
