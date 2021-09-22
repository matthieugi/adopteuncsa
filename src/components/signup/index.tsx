
import { TextField, Button } from "@material-ui/core";
import { ChangeEventHandler, ReactEventHandler, useState } from "react";
import { ReactElement } from "react";

function Signup(): ReactElement {
    let [githubId, setGithubId] = useState('MonHandleGithub');
    let [techno, setTechno] = useState('Typescript');
    // let [preferredTechno, setPreferredTechno] = [];

    const changeGithubId = (event : any) => {
        setGithubId(event.value);
    }

    const changeTechno = (event: any) => {
        console.log('in');
    }

    const addTechno = () => {
        console.log('in');
    }

    return (
        <div>
            <TextField id="outlined-basic" label="Github Id" variant="outlined" value={githubId} onChange={changeGithubId} /><br/>
            <h2>Technos</h2>
            <div>
                <TextField label='Votre Techno préférée' defaultValue='Typescript' onChange={changeTechno} value={techno} />
                <Button onChange={addTechno}>Ajouter</Button>
            </div>
            <div>
                {}
            </div>
        </div>
    );
}

export default Signup;