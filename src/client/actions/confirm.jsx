export const SHOW_CONFIRM = 'SHOW_CONFIRM';
export const HIDE_CONFIRM = 'HIDE_CONFIRM';

/**
 * No operation function, does nothing.
 */
const nop = () => {
};

/**
 * The default options for confirmation dialogs
 */
const defaultOptions = {
    title: 'Please confirm',
    description: 'Are you sure',
    okCallback: nop,
    cancelCallback: nop,
    okButton: 'Ok',
    cancelButton: 'Cancel'
};

/**
 * Creates a redux action that must be used to display a confirmation dialog.
 * @param options an object to configure the dialog
 */
export function showConfirm(options) {
    return {
        type: SHOW_CONFIRM,
        payload: Object.assign({}, defaultOptions, options)
    };
}

/**
 * Creates a redux action that must be used to hide the confirmation dialog
 */
export function hideConfirm() {
    return {
        type: HIDE_CONFIRM,
        payload: Object.assign({}, defaultOptions)
    };
}
