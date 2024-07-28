export interface ZeroStepForm {
    email: string
}

export interface FirstStepForm {
    password: string
}

export interface SecondStepForm {
    username: string,
    day: number | string | null,
    month: string,
    year: number | string | null,
    gender: string
}

export interface Form extends ZeroStepForm, FirstStepForm, SecondStepForm {}