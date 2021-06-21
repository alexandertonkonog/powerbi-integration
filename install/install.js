class App {
    constructor() {
        this.state = {};
        this._progress = 0;
        this.form = document.querySelector('.form');
        this.inputs = [];
        this.user = null;
        this.progressBar = document.querySelector('.progress__bar');
        this.progressText = document.querySelector('.progress__stage-text');
        this.init();
        this.API_URL = 'http://localhost:8000';
    }

    set progress(value) {
        if (!value) return false;
        this.progressBar.style.width = value + "%";
        this._progress = value;
    }

    async init() {
        BX24.install(async () => {
            this.formInit();
            this.authStatus = await this.auth();
            axios.defaults.headers.common['Authorization'] = 'Basic ' + btoa('jXOJqUHSTK:j1P81OaeLF:'+this.user.ID);
            await this.saveAdmin();
            this.formInit();
        });
    }

    async auth() {
        try {
            this.progressText.textContent = 'Аутентификация';
            this.user = await this.callMethodPromise('profile', {}, 20);
            return true;
        } catch (e) {
            console.log(e);
        } 
    }

    async saveAdmin() {
        try {
            this.progressText.textContent = 'Сохранение пользователя как администратора';
            const result = await axios.post(this.API_URL + '/api/settings/first', {user: +this.user.ID});
            this.progress = 40;
            return true;
        } catch (e) {
            return false;
        }
    }

    async callMethodPromise(method, body = {}, percents = 0) {
        let promise = new Promise((res, rej) => {
            BX24.callMethod(
                method, 
                body,
                function(result) {
                    if(result.error()) {
                        rej(result.error());
                    } else {
                        this.progress = percents;
                        res(result.data());
                    }
                }
            );
        })
        try {
            return await promise;
        } catch (e) {
            this.progressBar.style.backgroundColor = '#BE1622';
            console.log(e);
        }
    }

    async callMethodPromiseMany(method, body = {}, percents = 0) {
        let array = [];
        const promise = new Promise((res, rej) => {
            BX24.callMethod(
                method, 
                body,
                function(result) {
                    if(result.error()) {
                        rej(result.error());
                    } else {
                        this.progress = percents;
                        if (res.more()) {
                            array = [...array, ...result.data()]
                            res.next();
                        } else {
                            res(array);
                        }
                    }
                }
            );
        })
        try {
            return await promise;
        } catch (e) {
            this.progressBar.style.backgroundColor = '#BE1622';
            console.log(e);
        }
    }

    async formInit() {
        const result = axios.get(this.API_URL + '/api/settings/get');
        this.createInputs(result.data);
        const inputs = this.form.querySelectorAll('.input-container');
        inputs.forEach(item => {
            this.inputs.push(new Input(item, this));
        })
        this.form.addEventListener('submit', async (e) => {
            e.preventDefault();
            await this.saveData();
            return true;
        })
        this.form.classList.remove('form_hidden');
    }

    createInputs(data) {
        const str = '';
        data.forEach(item => {
            str += `<div class="input-container">
                        <label for="${item.serviceName}" class="label">
                            <span class="label__text">${item.name}</span>
                            <span class="label__error"></span>
                        </label>
                        <input value="${item.value}" name="${item.serviceName}" id="${item.serviceName}" type="text" class="input" placeholder="${item.name}">
                        <p class="input-des">${item.description}<p>
                    </div>`;
        })
        this.form.innerHTML = str;
    }

    async saveData() {
        const values = Object.values(this.state);
        if (values.length) {
            try {
                const result = await axios.post(this.API_URL + '/api/settings/set', this.state);
                BX24.installFinish();
            } catch (e) {
                return false;
            }
        }
    }
}

class Input {
    constructor(input, wrapper) {
        this.wrapper = wrapper;
        this.container = input;
        this.input = this.container.querySelector('.input');
        this.errorElem = this.container.querySelector('.label__error');
        this.name = this.input.name;
        this._value = this.input.value;
        this._error = false;
        this.touch = false;
        this.initEvents();
    }

    set value(val) {
        this.input.value = val;
        this.wrapper.state[this.name] = val;
        this._value = val;
    }

    get value() {
        return this._value;
    }

    set error(val) {
        if (!val) {
            this.errorElem.textContent = '';
            this.input.classList.remove('input_error');
        } else {
            this.errorElem.textContent = val;
            this.input.classList.add('input_error');
        }
        this._error = val;
    }

    get error() {
        return this._error;
    }

    initEvents() {
        this.input.addEventListener('focusout', () => {
            this.touch = true;
            this.checkError();
        })
        this.input.addEventListener('input', (e) => {
            this.value = e.target.value;
            if (this.touch) {
                this.checkError();
            }
        })
    }

    clear() {
        this.value = '';
        this.error = false;
        this.touch = false;
    }

    checkError() {

    }
}

document.addEventListener('DOMContentLoaded', () => {
    if (BX24) {
        window.POWERBIAPP = new App();
    } else {
        const progressText = document.querySelector('.progress__stage-text');
        progressText.textContent = 'Ошибка загрузки библиотек';
    }
    // window.POWERBIAPP = new App();
})

