export const oAuth2 = (req, res, next) => {
    if (req.user) {
        next();
    }
    else {
        res.redirect('/Home');
    }
};
export const isNotAuth2 = (req, res, next) => {
    if (req.user) {
        res.redirect('/api/address');
    }
    else {
        next();
    }
};
//# sourceMappingURL=oauth2.handles.js.map