let dayError = false;
let monthError = false;
let yearError = false;
let dayField = document.querySelector('#day');
let monthField = document.querySelector('#month');
let yearField = document.querySelector('#year');
let errorDay = document.querySelector('#dayError');
let errorMonth = document.querySelector('#monthError');
let errorYear = document.querySelector('#yearError');
let labels = document.querySelectorAll('label');
let errors = document.querySelectorAll('.error');
let displayDayText = document.querySelector('#displayDay');
let displayMonthText = document.querySelector('#displayMonth');
let displayYearText = document.querySelector('#displayYear');
dayField.addEventListener('blur', () => {
    validate(dayField);
});
monthField.addEventListener('blur', () => {
    validate(monthField);
});
yearField.addEventListener('blur', () => {
    validate(yearField);
});
const validate = (field) => {
    checkValidDate();
    if (field.value.length === 0){
        addError(field, 'This field is required');
        dayError = true;
        yearError = true;
        monthError = true;
    } else {
        if (field.id === 'year') {
            if (field.value.length < 4){
                let s = new Array(4 - field.value.length).fill('0');
                s.push(field.value);
                field.value = s.join('');
            }
        } else {
            if (field.value.length === 1) {
                field.value = "0" + field.value;
            }
        }
    }
}
const dayMonthInput = (key) => {
    if (document.querySelector('#' + key.srcElement.id).value.length < 2) {
        if (key.charCode > 47 && key.charCode < 58) {
            return true;
        }
    }
    return false;
}
const yearInput = (key) => {
    if (yearField.value.length < 4) {
        if (key.charCode > 47 && key.charCode < 58) {
            return true;
        }
    }
    return false;
}

document.querySelector("form").addEventListener("submit", function(event){
    event.preventDefault();
    let date = new Date();
    if (!dayError && !monthError && !yearError) {
        displayDayText.textContent = Math.abs(date.getDate() - dayField.value) + ' ';
        displayMonthText.textContent = Math.abs(date.getMonth() + 1 - monthField.value) + ' ';
        displayYearText.textContent = Math.abs(date.getFullYear() - yearField.value) + ' ';
    }
});
const addError = (field, errorText) => {
    for(let label of labels) {
        label.style.color = 'hsl(0, 100%, 67%)';
    }
    for(let error of errors) {
        if (error.id.includes(field.id)) {
            error.textContent = errorText;
        }
    }
    for(let field of [dayField, monthField, yearField]) {
        field.style.border = '1px solid hsl(0, 100%, 67%)';
    }
}
const removeError = (...args) => {
    if (!dayError && !monthError && !yearError) {
        for(let label of labels) {
            label.style.color = 'hsl(0, 1%, 44%)';
        }
        for(let field of [dayField, monthField, yearField]) {
            field.style.border = '1px solid hsl(0, 0%, 86%)';
        }
    }
    for (let field of args) {
        for(let error of errors) {
            if (error.id.includes(field.id)) {
                error.textContent = '';
            }
        }
    }
}
const checkValidDate = () => {
    let dayLength = dayField.value.length;
    let monthLength = monthField.value.length;
    let yearLength = yearField.value.length;
    let date = new Date();
    if (yearLength) {
        if (yearField.value > date.getFullYear()) {
            addError(yearField, 'Must be in the past');
            yearError = true;
        } else {
            removeError(yearField);
            yearError = false;
        }
        if (monthLength && dayLength) {
            let enteredDate = new Date(monthField.value + '/' + dayField.value + '/' + yearField.value);
            if (enteredDate > date) {
                addError(yearField, 'Must be in the past');
                yearError = true;
            } else {
                removeError(yearField);
                yearError = false;
            }
        }
    }
    if (monthLength) {
        if (monthField.value < 1 || monthField.value > 12) {
            addError(monthField, 'Must be a valid date');
            monthError = true;
        } else {
            removeError(monthField);
            monthError = false;
        }
    }
    if (dayLength) {
        if (dayField.value < 1 || (dayField.value > 30 && [4, 6, 9, 11].includes(+monthField.value))
            || dayField.value > 31 || (!isLeapYear(+yearField.value) && dayField.value > 28 && +monthField.value === 2)
            || (isLeapYear(+yearField.value) && dayField.value > 29 && +monthField.value === 2)) {
            addError(dayField, 'Must be a valid date');
            dayError = true;
        } else {
            removeError(dayField);
            dayError = false;
        }
    }
    if (!yearError && !dayError && !monthError) {
        removeError(dayField, monthField, yearError);
    }
}

const isLeapYear = (year) => {
    if (year % 400 === 0) return true;
    if (year % 100 === 0) return false;
    if (year % 4 === 0) return true;
    return false;
}
