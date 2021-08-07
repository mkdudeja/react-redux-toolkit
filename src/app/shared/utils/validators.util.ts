class Validators {
    private static _instance: Validators;

    private constructor() { }

    public static getInstance(): Validators {
        if (!Validators._instance) {
            Validators._instance = new Validators();
        }

        return Validators._instance;
    }

    required() {
        console.log('required validator');
    }

    email() {
        console.log('required email');
    }
}

export const validators = Validators.getInstance();
