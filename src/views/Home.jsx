import React, {useEffect, useState} from 'react'
import axios from 'axios'

function Header(){
    const [formBody, setFormBody] = useState();
    const [students, setStudents] = useState([]);
    const BASE_URL = "http://localhost:8081/student/";
    const getData = async (url) => {
        const res = await axios.get(url);
        const json = await res.data;
        console.log("returned",json);
        setStudents(json);
    };
useEffect(() => {
    getData(BASE_URL)
}, [])
const postData = async (url, data) => {
    const res = await axios.post(url, {
      ...data,
    });
    const json = await res.data;
    console.log(json);
  };
const handleSubmit = () =>{
    postData(BASE_URL+"add", formBody);
}
const inputChangeHandler = (e) =>{
    const {name, value} = e.target;
    setFormBody({...formBody, [name]: value})
}
        return (
            <main className="container mx-auto px-3 pb-16">
                <h1 className="text-3xl font-bold">Simple React Boilerplate</h1>
                    <div>
                        {students.map(student=> 
                        <div>
                            <span>{student.name}</span>
                            <span>{student.address}</span>
                            <br/>
                        </div>
                        )}
                    </div>
                    <br />
                <h1>Add Student</h1>
                <form onSubmit={handleSubmit}>
                    <label>Name</label>
                    <input type="text" name="name" id="" placeholder='name' onChange={(e)=>inputChangeHandler(e)}/>
                    <label>Email</label>
                    <input type="email" name="address" id="" placeholder='email' onChange={(e)=>inputChangeHandler(e)}/>
                    <input type="submit"/>
                </form>
            </main>
        )
}

export default Header;