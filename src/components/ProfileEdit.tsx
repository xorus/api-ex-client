import {ApiCompany, ApiProfile} from "../apiDef";
import {useEffect, useState} from "react";
import {editProfile} from "../model";

export function ProfileEdit(props: {
    profile: ApiProfile,
    companies: ApiCompany[],
    error?: string,
    done: (changed?: ApiProfile) => void,
    hideCancel?: boolean
}) {
    const id = `profile-${props.profile.id}-`;
    const [name, setName] = useState<string>(props.profile.name);
    const [surname, setSurname] = useState<string>(props.profile.surname);
    const [phone, setPhone] = useState<string>(props.profile.phone ?? "");
    const [company, setCompany] = useState<number>(props.profile.company);

    useEffect(() => {
        // check if company is in list
        const found = props.companies.find(x => x.id === company);
        if (!found && props.companies.length > 0) {
            setCompany(props.companies[0].id);
        }
    }, [company, props.companies]);

    return <>
        <form className="" onSubmit={async (e) => {
            e.preventDefault();
            props.done({
                id: props.profile.id,
                name,
                surname,
                company,
                phone: phone.trim().length > 0 ? phone.trim() : null
            });
        }}>
            {props.error && <div className="alert alert-danger" role="alert">{props.error}</div>}
            <div className="row g-2">
                <div className="col-auto">
                    <label htmlFor={id + "name"}>Name</label>
                    <input type="text" className="form-control" id={id + "name"}
                           value={name} onChange={e => setName(e.target.value)}/>
                </div>
                <div className="col-auto">
                    <label htmlFor={id + "surname"}>Surname</label>
                    <input type="text" className="form-control" id={id + "surname"}
                           value={surname} onChange={e => setSurname(e.target.value)}/>
                </div>
                <div className="col-auto">
                    <label htmlFor={id + "surname"}>Tel</label>
                    <input type="text" className="form-control" id={id + "surname"}
                           value={phone} onChange={e => setPhone(e.target.value)}/>
                </div>
                <div className="col-auto">
                    <label htmlFor={id + "company"}>Société</label>
                    <select name={id + "company"} className="form-control"
                            onChange={e => setCompany(parseInt(e.target.value))} value={"" + company}>
                        {props.companies.map(x => <option value={x.id} key={x.id}>{x.name}</option>)}
                    </select>
                </div>
            </div>
            <div className="col-auto">
                <button type="submit" className="btn btn-primary mb-3">Enregistrer</button>
            </div>
        </form>
        {!props.hideCancel &&
            <button className={"btn btn-sm btn-secondary"} onClick={_ => props.done()}>Annuler</button>}
    </>
}
