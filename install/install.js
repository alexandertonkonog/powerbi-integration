class App {
    constructor() {
        this.state = {};
        this._progress = 0;
        this.form = document.querySelector('.form');
        this.inputs = [];
        this.progressBar = document.querySelector('.progress__bar');
        this.progressText = document.querySelector('.progress__stage-text');
        this.init();
    }

    set progress(value) {
        if (!value) return false;
        this.progressBar.style.width = value + "%";
        this._progress = value;
    }

    async init() {
        this.formInit();
        this.authStatus = await this.auth();
        this.tables = await this.createTables();
        await this.createTablesColumns();
    }

    async auth() {
        try {
            this.progressText.textContent = 'Аутентификация';
            // const auth = await BX24.getAuth();
        } catch (e) {
            console.log(e);
        } 
    }


    async callMethodPromise(method, body, percents) {
        let promise = new Promise((res, rej) => {
            BX24.callMethod(
                method, 
                body,
                function(result) {
                    if(result.error()) {
                        rej(result.error());
                    } else {
                        res(result.data());
                    }
                }
            );
            // setTimeout(() => {
            //     this.progress = percents;
            //     res([]);
            // }, 500)
        })
        try {
            return await promise;
        } catch (e) {
            this.progressBar.style.backgroundColor = '#BE1622';
            console.log(e);
        }
    }

    formInit() {
        const inputs = this.form.querySelectorAll('.input-container');
        inputs.forEach(item => {
            this.inputs.push(new Input(item, this));
        })
        this.form.addEventListener('submit', async (e) => {
            e.preventDefault();
            await this.saveData();
            return true;
        })
    }

    async saveData() {
        let error = false;
        this.inputs.forEach(item => {
            item.checkError();
            if (item.error) {
                error = true;
            }
        })
        if (!error) {
            this.progressText.textContent = 'Сохранение';
            await this.callMethodPromise('entity.item.add', {
                ENTITY: 'power_bi_settings',
                DATE_ACTIVE_FROM: new Date(),
                DETAIL_PICTURE: '',
                NAME: 'Настройки',
                PROPERTY_VALUES: this.state,
            }, 100)
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
        const max = 200;
        const min = 5;

        if (!this.value) {
            this.error = 'Это поле обязательно';
        } else if (this.value.length < min) {
            this.error = `Значение поля должно быть больше ${min} знаков`;
        } else if (this.value.length > max) {
            this.error = `Значение поля должно быть не больше ${max} знаков`;
        } else {
            this.error = false;
        }       
    }
}

document.addEventListener('DOMContentLoaded', () => {
    if (BX24) {
        BX24.init(function(){
            window.POWERBIAPP = new App();
        }); 
    } else {
        const progressText = document.querySelector('.progress__stage-text');
        progressText.textContent = 'Ошибка загрузки библиотек';
    }
})

