const repo = require('../repositories/user.repo');

const createUserProfile = async(auth_id, fullname, phone, address) => {
    const profile = await repo.createUserProfile(auth_id, fullname, phone, address);
    return profile;
}

const fetchProfileByAuthId = async(auth_id) => {
    const profile = await repo.readUserProfileByAuthId(auth_id);
    if (!profile) {
        throw new Error('User profile not found');
    }
    return profile;
}

const fetchAllProfiles = async() => {
    const profiles = await repo.readAllProfiles();
    return profiles;
}

const updateUserProfile = async(auth_id, fullname, phone, address) => {
    const newProfile = await repo.updateUserProfile(auth_id, fullname, phone, address);
    return newProfile;
}

const removeUserProfile = async(auth_id) => {
    const result = await repo.deleteUserProfileByAuthId(auth_id);
    return result;
}

module.exports = {
    createUserProfile,
    fetchProfileByAuthId,
    fetchAllProfiles,
    updateUserProfile,
    removeUserProfile
}