export default {
    getUserId() {
        return window.localStorage.getItem('kawaii-user-id');
    },

    setUserId(userId) {
        window.localStorage.setItem('kawaii-user-id', userId);
    },

    getAccessToken() {
        return window.localStorage.getItem('kawaii-access-token');
    },

    setAccessToken(accessToken) {
        window.localStorage.setItem('kawaii-access-token', accessToken);
    },

    deleteSession() {
        window.localStorage.removeItem('kawaii-user-id');
        window.localStorage.removeItem('kawaii-access-token');
    },

    getKawaiisInLeft() {
        return window.localStorage.getItem('stored-kawaiis-in-left');
    },

    getKawaiisInRight() {
        return window.localStorage.getItem('stored-kawaiis-in-right');
    },

    setKawaiisInLeft(kawaiis) {
        window.localStorage.setItem('stored-kawaiis-in-left', kawaiis);
    },

    setKawaiisInRight(kawaiis) {
        window.localStorage.setItem('stored-kawaiis-in-right', kawaiis);
    },

    setKawaiisBothSides(kawaiisLeft, kawaiisRight) {
        window.localStorage.setItem('stored-kawaiis-in-left', kawaiisLeft);
        window.localStorage.setItem('stored-kawaiis-in-right', kawaiisRight);
    },

    deleteStoredKawaiis() {
        window.localStorage.removeItem('stored-kawaiis-in-left');
        window.localStorage.removeItem('stored-kawaiis-in-right');
    }
}