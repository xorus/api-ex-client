import {ApiProfile} from "./apiDef";
import {BASE_URL} from "./Consts";

export async function createProfile(profile: ApiProfile) {
    const r = await fetch(BASE_URL + '/profile/', {
        method: 'POST',
        body: JSON.stringify(profile)
    })
    return r.ok;
}

export async function editProfile(profile: ApiProfile) {
    const r = await fetch(BASE_URL + '/profile/' + profile.id, {
        method: 'PUT',
        body: JSON.stringify(profile)
    })

    return r.ok;
}

export async function deleteProfile(profile: ApiProfile) {
    const r = await fetch(BASE_URL + '/profile/' + profile.id, {
        method: 'DELETE'
    })
    return r.ok;
}
