
import { TextField, Button, List, ListItemText, ListItem } from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import { useState } from "react";
import { ReactElement } from "react";
import "./signup.css";

interface TechnoList {
    id: number,
    label: string,
    rating: number
}

function Signup( props : any): ReactElement {
    let [githubId, setGithubId] = useState('');
    let [techno, setTechno] = useState('Typescript');
    let [technoList, setTechnoList] = useState([] as TechnoList[]);
    const fetchUserProperties = props.fetchUserProperties;

    const changeGithubId = (event : any) => {
        setGithubId(event.target.value);
    }

    const changeTechno = (event: any) => {
        setTechno(event.target.value);
    }

    const addTechno = () => {
        if(techno !== '') {
            setTechnoList([
                ...technoList,
                {
                    id:technoList.length,
                    label: techno,
                    rating: 3
                }
            ]);
            setTechno('');
        }
    }

    const changeTechnoRating = (id: number, event:any) => {
        let technoListTemp = technoList;
        technoListTemp[id] = {
            id: id,
            label: technoListTemp[id].label,
            rating: Number.parseInt(event.target.value)
        }
        
        setTechnoList([...technoListTemp]);
    }

    const signup = async () => {
        if(technoList.length !== 0 && githubId !== ''){
            await fetch('api/CreateUser', {
                method: "POST",
                body: JSON.stringify({
                    githubId : githubId,
                    technos: technoList
                })
            });

            fetchUserProperties();
        }
    }

    return (
        <div className="signupForm">
            <TextField id="outlined-basic" label="Github Id" variant="outlined" value={githubId} onChange={changeGithubId} /><br/>
            <h2>Technos</h2>
            <div>
                <TextField label='Vos Technos préférées' defaultValue={techno} onChange={changeTechno} value={techno} />
                <Button onClick={addTechno}>Ajouter</Button>
            </div>
            <div>
                <List>
                    {technoList.map((techno) => 
                        <ListItem key={techno.id}>
                            <ListItemText>{techno.label}</ListItemText>
                            <Rating value={techno.rating} key={techno.id} onChange={(event) => changeTechnoRating(techno.id, event)} />
                        </ListItem>
                    )} 
                </List>
                <Button className="signupButton" onClick={signup}>S'enregistrer</Button>
            </div>
        </div>
    );
}

export default Signup;