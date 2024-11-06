import React, {useEffect, useState} from 'react';
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';

const Home = () => {

    const [school, setSchool] = useState ([]);
    const [search, setSearch] = useState([]);
    useEffect(()=>{
        axios.get('http://localhost:3001/')
        .then((res)=>{
            console.log(res);
            setSchool(res.data.sort((a,b)=> (a.Nom > b.Nom ? 1 : -1)));
            setSearch(res.data.sort((a,b)=> (a.Nom > b.Nom ? 1 : -1)))
        })

    },[])
    
    const handleSearch = (e)=>{

        setSearch(school.filter(f => f.Nom.toLowerCase().includes(e.target.value)))
    }  

    const handleDelete = (id)=>{

        axios.delete('http://localhost:3001/delete/'+id)
        .then(res=>window.location.reload()
        ).catch(err=>console.log(err))

    }

    return (
        <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
            <div className='w-50 bg-white rounded p-3'>
                <h2>Student Table</h2>

                <div className='d-flex justify-content-end'>
                    <Link to = '/Create' className='btn btn-success'>Create +</Link>
                </div>
                <input 
                    type="text" 
                    placeholder='Rechercher' 
                    className='form-control m-2'
                    onChange={handleSearch}
                />
                <table>
                    <thead>
                        <tr>
                            <th>Nom Et Prénom</th>
                            <th>Adresse Email</th>
                            <th>Année de Naissance</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {search.map((student, index)=>{
                            return(
                                <tr key={index}>
                                    <td>{student.Nom}</td>
                                    <td>{student.Email}</td>
                                    <td>{student.Annee}</td>
                                    <td>
                                        <Link to={`/read/${student.id}`} className='btn btn-sm btn-info'>Details</Link>
                                        <Link to={`/edit/${student.id}`} className='btn btn-sm btn-primary mx-2 m-2'>Edit</Link>
                                        <button onClick={()=> handleDelete(student.id) } className='btn btn-sm btn-danger'>Delete</button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Home;