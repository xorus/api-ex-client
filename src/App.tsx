import React from 'react';
import './App.css';
import {Profiles} from "./components/Profiles";
import {useCompanies} from "./components/useCompanies";

function App() {
    const companies = useCompanies();

    return (
        <div className="container">
            <Profiles companies={companies}/>
            <details>
                <summary>
                    debug: liste des sociétées
                </summary>
                <table className={"table table-bordered"}>
                    {companies.map(x =>
                        <tr>
                            <td>{x.id}</td>
                            <td>{x.name}</td>
                            <td>{x.url}</td>
                        </tr>)}
                </table>
            </details>
        </div>
    );
}

export default App;
