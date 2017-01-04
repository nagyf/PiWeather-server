const initialState = [
    {
        url: '/',
        name: 'page.dashboard.title',
        icon: 'dashboard'
    },
    {
        url: '/users',
        name: 'page.users.title',
        icon: 'people'
    },
    {
        url: '/me',
        name: 'page.profile.title',
        icon: 'person'
    },
    {
        url: '/logout',
        name: 'page.logout.title',
        icon: 'lock_outline'
    }
];

export default (state = initialState) => {
    return state.slice();
};
