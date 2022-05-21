import {useEffect, useState} from "react";
import {ApiCompany} from "../apiDef";
import {BASE_URL} from "../Consts";

export function useCompanies() {
    const [companies, setCompanies] = useState<ApiCompany[]>([]);
    useEffect(() => {
        (async () => {
            const res = await fetch(BASE_URL + '/company');
            if (res.ok) {
                const json = await res.json() as ApiCompany[];
                setCompanies(json); // trust server (for this example)
            } else {
                console.error(`Response is not a json, got code: ${res.status}`)
            }
        })();
    }, []);

    return companies;
}
