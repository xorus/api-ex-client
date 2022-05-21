import {ApiCompany, ApiProfile} from "../apiDef";
import {useState} from "react";
import {ProfileEdit} from "./ProfileEdit";
import {deleteProfile, editProfile} from "../model";

export function Profile(props: {
    profile: ApiProfile,
    companies: ApiCompany[],
    reload: () => void
}) {
    const [editing, setEditing] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | undefined>(undefined);

    const company = props.companies.find(x => x.id === props.profile.company);

    return <div>
        <div className={"card"} style={{marginBottom: "1em"}}>
            <div className="card-body">
                {loading ? <div>Loading...</div> : null}
                {editing ?
                    <ProfileEdit error={error} profile={props.profile} companies={props.companies}
                                 done={async (changed) => {
                                     if (!changed) {
                                         setEditing(false);
                                         return;
                                     }
                                     setLoading(true);
                                     if (await editProfile(changed)) {
                                         setEditing(false);
                                     } else {
                                         setError("Une erreur est survenue lors de l'enregistrement.");
                                     }
                                     setLoading(false);
                                     props.reload();
                                 }}/> :
                    <>
                        <h5 className="card-title">{props.profile.name} {props.profile.surname}</h5>
                        <p className="text-muted">
                            {props.profile.phone && <>📞 {props.profile.phone}<br/></>}
                            🏣 {company ? company.name : "n/a"}
                        </p>
                        <button className={"btn btn-sm btn-secondary"} disabled={loading}
                                onClick={_ => setEditing(true)}>
                            Modifier
                        </button>
                        {' '}
                        <button className={"btn btn-sm btn-danger"} disabled={loading} onClick={async _ => {
                            setLoading(true);
                            await deleteProfile(props.profile);
                            props.reload();
                            // don't do setLoading(false): this component will disappear
                        }}>
                            Supprimer
                        </button>
                    </>
                }
            </div>
        </div>
    </div>;
}
