
import { useParams, Navigate } from 'react-router'
import { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';


const TaskDetails = () => {
    const [loading, setLoading] = useState(true);
    const [task, setTask] = useState({})
    const [error,setError] = useState(null)

    const params = useParams();

    useEffect(()=>{
        const fetchTask = async () => {
            const res = await fetch(`http://localhost:5000/Tasks/${params.id}`);//url id
            const data = await res.json();

            if(res.status === 404){
                setError("task not Found!");
            }

            setTask(data)
            setLoading(false)
          }
        fetchTask()
    })

    if(error){
       return <Navigate to='/'/>
    }
  return loading ? ( <h3>Loading</h3> ):(
    <div>
        <h3>{task.text}</h3>
        <p>{task.day}</p>
        <Link to="/" className="centered">Go back</Link>
    </div>
  )
}

export default TaskDetails
