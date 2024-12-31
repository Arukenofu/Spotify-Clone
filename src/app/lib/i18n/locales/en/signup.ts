export default {
    next: 'Next step',
    steps: {
        title: 'Step {0}',
        first: 'Create a password',
        second: 'About yourself',
        third: 'Terms of Use'
    },
    zero: {
        title: 'Sign up and immerse yourself in music',
        email: 'E-mail',
        haveAnAccount: 'Already have an account?',
        login: 'Log in'
    },
    first: {
        password: 'Password',
        ruleTitle: 'The password must contain at least',
        rules: {
            oneLetter: 'One letter',
            digitSpecial: '1 digit or special character (eg # ? ! &)',
            sixSymbol: '6 symbols'
        }
    },
    second: {
        username: 'Username',
        usernameDesc: 'Your name will appear on your profile.',
        usernameNotChoose: 'Please provide a name for your profile.',

        birthday: 'Birthday',
        day: 'dd',
        month: 'Month',
        year: 'yyyy',

        chooseDayFrom1To31: 'Enter a number from 1 to 31.',
        chooseRealBirthDay: 'Please enter a valid year of birth.',
        tooYoung: 'You are not yet of legal age to create a Spotify account.',
        tooOld: 'Year of birth must be no earlier than 1900.',

        genders: ['Male', 'Female', 'Other', 'Don\'t want to choose'],
        gender: 'Gender',
        genderDesc: 'We use gender when selecting personalized recommendations and advertising.',
        genderNotChoose: 'Choose your gender.',
    },
    third: {
        notSendAdvertisement: 'I do not want to receive promotional messages from Spotify.',
        agreeToProvideInformationToPartners: 'I consent to my registration data being shared with Spotify partners for advertising purposes.',
        agreeWithPolicy: 'I agree to Spotify\'s Terms of Service and Privacy Policy.',

        onNotAgreedWithAllTerms: 'To continue, please accept the Terms of Use.',

        register: 'Signup'
    }
}