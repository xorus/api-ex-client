import {ApiCompany, ApiProfile} from "../apiDef";
import React, {useCallback, useEffect, useState} from "react";
import {BASE_URL} from "../Consts";
import {Profile} from "./Profile";
import {ProfileEdit} from "./ProfileEdit";
import {createProfile} from "../model";


export function Profiles(props: { companies: ApiCompany[] }) {
    const [loaded, setLoaded] = useState<boolean>(false);
    const [profiles, setProfiles] = useState<ApiProfile[]>([]);
    const [createNew, setCreateNew] = useState<boolean>(false);
    const [createError, setCreateError] = useState<string | undefined>(undefined);
    const load = useCallback(() => {
        (async () => {
            // should not blindly copy/paste utility code
            const res = await fetch(BASE_URL + '/profile');
            if (res.ok) {
                const json = await res.json() as ApiProfile[];
                setProfiles(json); // trust server (for this example)
            } else {
                console.error(`Response is not a json, got code: ${res.status}`)
            }
            setLoaded(true);
        })();
    }, []);
    useEffect(() => load(), [load]);

    return <>
        <div style={{float: "right"}}>
            <button className={"btn btn-" + (createNew ? "secondary" : "primary")}
                    onClick={_ => setCreateNew(!createNew)}>
                {createNew ? "Retour" : "Nouveau profil"}
            </button>
        </div>
        <h1 className={"clearfix"}> {createNew ? "Ajouter un nouveau profil" : "Liste des profils"}</h1>
        {createNew ?
            <>
                <div className="card">
                    <div className="card-body">
                        <ProfileEdit profile={{
                            id: 0,
                            company: 0,
                            surname: "",
                            name: "",
                            phone: null
                        }} done={async (changed) => {
                            if (!changed) {
                                setCreateNew(false);
                                return;
                            }
                            setLoaded(false);
                            const ok = await createProfile(changed);
                            if (ok) {
                                await load();
                                setCreateError(undefined);
                                setCreateNew(false);
                            } else {
                                setCreateError("Une erreur est survenue lors de l'enregistrement.");
                            }
                            setLoaded(true);
                        }} companies={props.companies} error={createError} hideCancel={true}/>
                    </div>
                </div>
            </> :
            <>
                {loaded ?
                    profiles.sort((a, b) => a.id < b.id ? -1 : 1)
                        .map(x => <Profile profile={x} key={x.id} companies={props.companies} reload={() => load()}/>)
                    : <div>Chargement en cours...</div>
                }
            </>
        }
    </>;
}
