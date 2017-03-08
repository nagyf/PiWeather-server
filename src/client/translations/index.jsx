import { I18n } from 'react-i18nify';

const translations = {
    en: {
        common: {
            yes: 'Yes',
            no: 'No',
            areYouSure: 'Are you sure?',
            ok: 'Ok',
            cancel: 'Cancel',
            save: 'Save',
            back: 'Back',
            dismiss: 'Dismiss',
            none: 'None',
            double: 'Double',
            triple: 'Triple'
        },
        nav: {
            title: 'Navigation'
        },
        page: {
            dashboard: {
                title: 'Dashboard'
            },
            profile: {
                title: 'Profile'
            },
            users: {
                title: 'Users'
            },
            newUser: {
                title: 'New user'
            },
            editUser: {
                title: 'Edit user'
            },
            login: {
                title: 'Login',
                email: 'E-mail',
                emailError: 'This is not a valid email address',
                password: 'Password',
                passwordError: 'Please enter your password',
                invalidCredentials: 'Invalid username or password'
            },
            logout: {
                title: 'Logout'
            }
        },
        component: {
            userList: {
                delete: 'Delete',
                activate: 'Activate',
                deactivate: 'Deactivate',
                toactivate: 'activate',
                todeactivate: 'deactivate',
                areYouSureActivate: 'Are you sure you want to %{action} this user: %{user}?',
                areYouSureDelete: 'Are you sure you want to delete this user: %{user}?'
            },
            changePass: {
                title: 'Change password',
                password: 'Password',
                passwordError: 'Please enter the new password',
                passwordConfirm: 'Password confirmation',
                passwordConfirmError: 'The passwords must match'
            },
            userForm: {
                name: 'Name',
                nameError: 'Please give me your name',
                nick: 'Nickname',
                nickError: 'What\'s your nickname?',
                email: 'E-mail',
                emailError: 'This is not a valid email address',
                active: 'Active',
                changePassword: 'Change Password',
                admin: 'Admin'
            },
            scoreDialog: {
                title: 'Score'
            }
        }
    },
    hu: {
        common: {
            yes: 'Igen',
            no: 'Nem',
            areYouSure: 'Biztos vagy benne?',
            ok: 'Ok',
            cancel: 'Mégsem',
            save: 'Mentés',
            back: 'Vissza',
            dismiss: 'Bezárás',
            none: 'Sima',
            double: 'Dupla',
            triple: 'Tripla'
        },
        nav: {
            title: 'Navigáció'
        },
        page: {
            dashboard: {
                title: 'Kezdőoldal'
            },
            profile: {
                title: 'Profil'
            },
            users: {
                title: 'Felhasználók'
            },
            newUser: {
                title: 'Új felhasználó'
            },
            editUser: {
                title: 'Felhasználó szerkesztése'
            },
            login: {
                title: 'Bejelentkezés',
                email: 'E-mail',
                emailError: 'Hibás e-mail cím',
                password: 'Jelszó',
                passwordError: 'Add meg a jelszavadat',
                invalidCredentials: 'Hibás felhasználónév vagy jelszó'
            },
            logout: {
                title: 'Kijelentkezés'
            }
        },
        component: {
            userList: {
                delete: 'Törlés',
                activate: 'Aktiválás',
                deactivate: 'Inaktiválás',
                toactivate: 'aktiválni',
                todeactivate: 'deaktiválni',
                areYouSureActivate: 'Biztos vagy benne, hogy %{action} szeretnéd ezt a felhasználót: %{user}?',
                areYouSureDelete: 'Biztos vagy benne, hogy törölni szeretnéd ezt a felhasználót: %{user}?'
            },
            changePass: {
                title: 'Jelszó megváltoztatása',
                password: 'Jelszó',
                passwordError: 'Add meg az új jelszót',
                passwordConfirm: 'Jelszó megerősítése',
                passwordConfirmError: 'A jelszavaknak meg kell egyezniük'
            },
            userForm: {
                name: 'Név',
                nameError: 'Add meg a teljes nevedet',
                nick: 'Becenév',
                nickError: 'Add meg a becenevedet',
                email: 'E-mail',
                emailError: 'Hibás e-mail cím',
                active: 'Aktív',
                changePassword: 'Jelszó megváltoztatása',
                admin: 'Adminisztrátor'
            },
            scoreDialog: {
                title: 'Pontszám'
            }
        }
    }
};

/**
 * Any changes made in the store gets updated in the global I18n object.
 * This way we can change the current locale in the redux way.
 *
 * This function must be applied on the store right after creation.
 */
export function syncTranslationWithStore(store) {
    I18n.setTranslationsGetter(() => {
        return store.getState().i18n.translations;
    });

    I18n.setLocaleGetter(() => {
        return store.getState().i18n.locale;
    });
}

export default translations;
