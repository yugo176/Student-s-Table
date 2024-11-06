import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
const Edit = () => {

    const [student, setStudent] = useState([]);
    const [nom, setNom] = useState (student.Nom);
    const [email, setEmail] = useState(student.Email);
    const [annee, setAnnee] = useState(student.Annee);
    const {id} = useParams();
    const Navigate = useNavigate();
    

    useEffect( ()=>{

        axios.get('http://localhost:3001/read/'+id)
        .then((res) => {
            console.log(res);
            setStudent(res.data[0])
        })
        .catch((err)=> console.log(err))
    },[])

    const update = (e)=>{
        e.preventDefault();

        axios.put('http://localhost:3001/edit/'+id,{nom : nom, email : email, annee : annee})
        .then((res)=> {
            console.log(res);
            Swal.fire({
                icon: 'success',
                title: 'Modification enregistrée',
            });
            Navigate('/')
        })
        .catch((err)=> console.log(err))
    }

    return (
        <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
            <div className='w-50 bg-white rounded p-3'>

                <form onSubmit={update}>
                    <h2>Update Student Details</h2>
                    <div className='mb-2'> 
                        <label htmlFor="" className='m-2'>Nom(s) et Prénom(s) </label> 
                        <input 
                            type="text" 
                            placeholder='Entrez votre Nom(s) et Prénom(s)' 
                            className='form-control' 
                            defaultValue={student.Nom}
                            onChange={(e)=>{setNom(e.target.value)}}
                        />
                    </div>
                    <div className='mb-2'> 
                        <label htmlFor="" className='m-2'>Email</label> 
                        <input 
                            type="text" 
                            placeholder='Entrez votre Email' 
                            className='form-control' 
                            defaultValue={student.Email}
                            onChange={(e)=> {setEmail(e.target.value)}}
                        />
                    </div>
                    <div className='mb-2'> 
                        <label htmlFor="" className='m-2'>Année de Naissance</label> 
                        <input type="Number" 
                            placeholder='Entrez votre Année de Naissance' 
                            className='form-control' 
                            defaultValue={student.Annee}
                            onChange={(e)=> {setAnnee(e.target.value)}}
                        />
                    </div>
                    <button className='btn btn-success'>Enregistrer</button>
                </form>

            </div>
        </div>
    );
};

export default Edit;