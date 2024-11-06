import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const Read = () => {

    const {id} = useParams();
    const [student, setStudent] = useState([]);

    useEffect( ()=>{
        axios.get('http://localhost:3001/read/'+id)
        .then((res) => {
            console.log(res);
            setStudent(res.data[0])
        })
        .catch((err)=> console.log(err))
    },[])

    return (
        <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
            <div className='w-50 bg-white rounded p-3'>
                <h2>Student Details</h2>
                <h4><span>Nom(s) et Prénom(s) : </span> {student.Nom}</h4>
                <h4><span>Adresse Email : </span> {student.Email}</h4>
                <h4><span>Année de Naissance : </span> {student.Annee}</h4>

                <Link to='/' className='btn btn-primary m-2'>Back</Link>
                <Link to={`/edit/${student.id}`} className='btn btn-info'>Edit</Link>

            </div>
        </div>    
    );
};

export default Read;