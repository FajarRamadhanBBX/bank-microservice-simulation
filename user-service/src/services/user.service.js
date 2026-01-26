const repo = require('../repositories/user.repository');

const createUserProfile = async(id, auth_id, fullname, phone, address) => {
    const profile = await repo.createUserProfile(id, auth_id, fullname, phone, address);
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

const updateProfile = async(auth_id, fullname, phone, address) => {
    const newProfile = await repo.updateUserProfile(auth_id, fullname, phone, address);
    return newProfile;
}

const deleteProfile = async(auth_id) => {
    const result = await repo.deleteUserProfileByAuthId(auth_id);
    return result;
}

module.exports = {
    createUserProfile,
    fetchProfileByAuthId,
    fetchAllProfiles,
    updateProfile,
    deleteProfile
}