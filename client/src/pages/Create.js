import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'



const Create = () => {

    const [nom, setNom] = useState ("");
    const [email, setEmail] = useState("");
    const [annee, setAnnee] = useState(0)
    const [isEmail, setIsEmail] = useState(true)


    const Navigate = useNavigate()
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!isEmail) {

            Swal.fire({
                icon: 'error',
                title: "Erreur d'adresse !",
                text: 'Entrez une adresse Email'
            })

        }else if (nom===''){
            Swal.fire({
                icon: 'error',
                title: "Erreur d'identification",
                text: 'Veuillez entrez votre nom(s) et votre prénom(s)!'
            })
        }else if(annee >= 2008  ){
            Swal.fire({
                icon: 'error',
                title: "Vous n'avez pas l'âge requis",
                text: 'Vous devez avoir au moins 16ans'
            })
        }else
        
        {     
            axios.post('http://localhost:3001/students', {
                nom : nom,
                email : email,
                annee : annee
            })
            .then((res)=>{
                console.log(res);
                Swal.fire({
                    icon: 'success',
                    title: 'Enregistrement réussi',
                    text: 'Vous avez été enregistré avec succès.'
                });
                Navigate('/');
            })
            .catch((err)=>console.log(err))
            
        }
        
        
    }
 
    return (
        <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
            <div className='w-50 bg-white rounded p-3'>

                <form onSubmit={handleSubmit}>
                    <h2>Add Student</h2>
                    <div className='mb-2'> 
                        <label htmlFor="" className='m-2'>Nom(s) et Prénom(s) </label> 
                        <input type="text" placeholder='Entrez votre Nom(s) et Prénom(s)' className='form-control' 
                            onChange={(e)=>{setNom(e.target.value)}}
                        />
                    </div>
                    <div className='mb-2'> 
                        <label htmlFor="" className='m-2'>Email</label> 
                        <input type="text" placeholder='Entrez votre Email' className='form-control' 
                            onChange={(e)=> {
                                setEmail(e.target.value)
                                setIsEmail(e.target.value.includes('@gmail.com'))
                            }}
                        />
                    </div>
                    {!isEmail && <p>Entrez une adresse Mail valide s'il vous plaît </p>}
                    <div className='mb-2'> 
                        <label htmlFor="" className='m-2'>Année de Naissance</label> 
                        <input type="Number" placeholder='Entrez votre Année de Naissance' className='form-control' 
                            onChange={(e)=> {setAnnee(e.target.value)}}
                        />
                    </div>
                    <button className='btn btn-success'>Enregistrer</button>
                </form>

            </div>
        </div>
    );
};

export default Create;