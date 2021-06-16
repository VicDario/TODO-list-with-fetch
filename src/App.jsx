import './App.css';
import { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

function App() {
	let [toDoList, setList] = useState([]);
	let [numberElements, setNumber] = useState(0);

	let input = useRef();

	let url = 'https://assets.breatheco.de/apis/fake/todos/user/vicdario';

	useEffect(()=>{
		getList(url);
	}, [])

/* 	const createAPI = (url, options = {}) => {
		fetch(url, {
			method: 'POST', // or 'PUT'
			body: JSON.stringify({}), // data can be `string` or {object}!
			headers:{
			  'Content-Type': 'application/json'
			}
		  }).then(res => res.json())
		  .catch(error => console.error('Error:', error))
		  .then(response => console.log('Success:', response));
		  
    } */

	const getList = async (url) => {
        try {
            const response = await fetch(url, { 
				method: 'GET',
				headers: { 'Content-Type': 'application/json' }
			});
            if (response.status === 404) throw new Error("Pagina No encontrada");
            const data = await response.json();
        	setList([...data]);
			setNumber(data.length);
        } catch (error) {
            console.log(error);
        }
    }

	const PushItemList = async (url, item) => {
        try {
            const response = await fetch(url, {
				method: 'PUT',
				body: JSON.stringify(item),
				headers: { 'Content-Type': 'application/json' }
			});
            if (response.status === 404) throw new Error("Pagina No encontrada");
            const data = await response.json();
			console.log(data);
			getList(url);
        } catch (error) {
            console.log(error);
        }
    }

	const handleSubmit = (e) => {
		e.preventDefault();
		let listUpdated = [
			...toDoList,
			{"label": input.current.value, "done": false}
		];
		console.log(input.current.value);
		PushItemList(url, listUpdated)
	}

	const deleteItem = (label) => {
		let listUpdated = toDoList.filter(item => item.label !== label);
		PushItemList(url, listUpdated);
		getList(url);
	}

	const deleteAll = () => {
		PushItemList(url, []);
		getList(url);
	}

	return (
		<div className="container my-5">
			<h1 className="text-center">TODO List</h1>
			<div className="row my-5">
				<div className="col-md-6 offset-md-3">
					<ul className="list-group">
						<li className="list-group-item">	
							<form action="submit" onSubmit={handleSubmit} >
								<input ref={input} type="text" className="px-4 py-3" placeholder="What needs to be done?" />
							</form>
						</li>
						{
							!!toDoList ?
							toDoList.map((item, key) => {
								return <li id={item.id} className="list-group-item d-flex justify-content-between align-items-center" key={key}>
									{item.label}<FontAwesomeIcon className="button-delete" onClick={()=>deleteItem(item.label)} id={key} icon={faTrashAlt} /></li>
							}) :
							<li className="list-group-item">No tasks, add a task</li>
						}
						<li className="list-group-item shadows"><small className="text-muted">{numberElements} items left</small></li>
					</ul>
				</div>
			</div>
		</div>
	);
}

export default App;