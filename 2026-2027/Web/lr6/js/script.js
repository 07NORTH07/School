// ==============================
// DOM
// ==============================
const tabsContainer = document.querySelector('#tabs');
const tabs = document.querySelectorAll('.tab');
const tabContents = document.querySelectorAll('.tab-content');

const topLeft = document.querySelector('#top-left');
const topRight = document.querySelector('#top-right');
const bottomRight = document.querySelector('#bottom-right');
const bottomLeft = document.querySelector('#bottom-left');

const topLeftValue = document.querySelector('#top-left-value');
const topRightValue = document.querySelector('#top-right-value');
const bottomRightValue = document.querySelector('#bottom-right-value');
const bottomLeftValue = document.querySelector('#bottom-left-value');

// Властивості індивідуального варіанта 18: flex-basis та align-self
const flexBasis = document.querySelector('#flex-basis');
const flexBasisValue = document.querySelector('#flex-basis-value');
const alignSelf = document.querySelector('#align-self');
const alignSelfValue = document.querySelector('#align-self-value');

const ranges = document.querySelectorAll('input[type="range"]');

const preview = document.querySelector('#preview');
const previewText = document.querySelector('#preview span');
const previewButton = document.querySelector('#preview-button');
const coordinates = document.querySelector('#coordinates');

const cssCode = document.querySelector('#css-code');
const copyButton = document.querySelector('#copy-button');
const copyMessage = document.querySelector('#copy-message');

const presetForm = document.querySelector('#preset-form');
const presetName = document.querySelector('#preset-name');
const presetError = document.querySelector('#preset-error');

const scrollTopButton = document.querySelector('#scroll-top');

// ==============================
// TABS
// ==============================
function hideTabs() {
    tabs.forEach(function (tab) {
        tab.classList.remove('active');
    });

    tabContents.forEach(function (content) {
        content.classList.remove('active');
    });
}

function showTab(tabName) {
    const tab = document.querySelector(`[data-tab="${tabName}"]`);
    const content = document.querySelector(`[data-content="${tabName}"]`);

    tab.classList.add('active');
    content.classList.add('active');
}

// ==============================
// BORDER RADIUS
// ==============================
function getRadius() {
    return `${topLeft.value}px ${topRight.value}px ${bottomRight.value}px ${bottomLeft.value}px`;
}

function generateBorderRadius() {
    const radius = getRadius();

    preview.style.borderRadius = radius;

    topLeftValue.textContent = `${topLeft.value} px`;
    topRightValue.textContent = `${topRight.value} px`;
    bottomRightValue.textContent = `${bottomRight.value} px`;
    bottomLeftValue.textContent = `${bottomLeft.value} px`;

    generateCSS();
}

// ==============================
// FLEX BASIS / ALIGN SELF
// ==============================
function generateFlexProperties() {
    previewText.style.flexBasis = `${flexBasis.value}px`;
    previewText.style.alignSelf = alignSelf.value;

    flexBasisValue.textContent = `${flexBasis.value} px`;
    alignSelfValue.textContent = alignSelf.value;

    generateCSS();
}

// ==============================
// CSS CODE
// ==============================
function generateCSS() {
    cssCode.value =
        `border-radius: ${getRadius()};\n` +
        `flex-basis: ${flexBasis.value}px;\n` +
        `align-self: ${alignSelf.value};`;
}

// ==============================
// COPY
// ==============================
function copyCSS() {
    navigator.clipboard.writeText(cssCode.value)
        .then(function () {
            copyMessage.textContent = 'CSS-код скопійовано';
        })
        .catch(function () {
            copyMessage.textContent = 'Не вдалося скопіювати CSS-код';
        });
}

// ==============================
// FORM
// ==============================
function validatePresetName() {
    if (presetName.value.trim() === '') {
        presetName.classList.add('error');
        presetError.textContent = 'Введіть назву пресета';
        return false;
    }

    presetName.classList.remove('error');
    presetError.textContent = '';
    return true;
}

function handlePresetSubmit(event) {
    event.preventDefault();

    if (!validatePresetName()) {
        return;
    }

    console.log(`Пресет: ${presetName.value.trim()}`);
    console.log(cssCode.value);
}

// ==============================
// KEYBOARD
// ==============================
function handleKeyDown(event) {
    if (event.key === 'Escape') {
        ranges.forEach(function (range) {
            range.value = 0;
        });
        alignSelf.value = 'auto';

        generateBorderRadius();
        generateFlexProperties();
    }
}

// ==============================
// SCROLL
// ==============================
function handleScroll() {
    if (window.scrollY > 300) {
        scrollTopButton.classList.add('visible');
    } else {
        scrollTopButton.classList.remove('visible');
    }
}

// ==============================
// EVENTS
// ==============================

// Вкладки (делегування подій)
tabsContainer.addEventListener('click', function (event) {
    console.log(event.type);
    console.log(event.target);
    console.log(event.currentTarget);

    if (!event.target.classList.contains('tab')) {
        return;
    }

    const tabName = event.target.dataset.tab;

    hideTabs();
    showTab(tabName);
});

// Border radius
topLeft.addEventListener('input', generateBorderRadius);
topRight.addEventListener('input', generateBorderRadius);
bottomRight.addEventListener('input', generateBorderRadius);
bottomLeft.addEventListener('input', generateBorderRadius);

// Flex basis та align self
flexBasis.addEventListener('input', generateFlexProperties);
alignSelf.addEventListener('change', generateFlexProperties);

// Копіювання
copyButton.addEventListener('click', copyCSS);

// Форма
presetName.addEventListener('focus', function () {
    presetName.classList.add('focused');
});

presetName.addEventListener('blur', function () {
    presetName.classList.remove('focused');
    validatePresetName();
});

presetForm.addEventListener('submit', handlePresetSubmit);

// Клавіатура
document.addEventListener('keydown', handleKeyDown);

// Поширення подій
preview.addEventListener('click', function () {
    console.log('Preview click');
});

previewButton.addEventListener('click', function (event) {
    event.stopPropagation();
    console.log('Button click');
});

// Події миші
preview.addEventListener('mouseover', function () {
    preview.classList.add('hovered');
});

preview.addEventListener('mouseout', function () {
    preview.classList.remove('hovered');
});

preview.addEventListener('mousemove', function (event) {
    coordinates.textContent = `X: ${event.clientX}; Y: ${event.clientY}`;
    console.log(event.pageX);
    console.log(event.pageY);
});

// Прокручування
window.addEventListener('scroll', handleScroll);

scrollTopButton.addEventListener('click', function () {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Початковий стан
generateBorderRadius();
generateFlexProperties();