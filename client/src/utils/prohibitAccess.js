export const prohibitAccess = (user) => {
    if(user.length === 0 || user.verified !== true) {
        return true;
    }
    return false;
}