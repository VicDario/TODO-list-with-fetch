import './App.css';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

function App() {
	let [toDoList, setList] = useState([]);
	let [numberElements, setNumber] = useState(0);

	const addItem = (e) => {
		if(e.code === "Enter"){
			setList((prevState) =>{
				return [...prevState,{id: numberElements, label: e.target.value}];
			})
			setNumber(numberElements + 1);
		}
	}

	const deleteItem = (id) => {
		let listUpdated = toDoList.filter(item => item.id !== id);
		setList(listUpdated);
		setNumber(numberElements-1);
	}

	return (
		<div className="container my-5">
			<h1 className="text-center">TODO List</h1>
			<div className="row my-5">
				<div className="col-md-6 offset-md-3">
					<ul className="list-group">
						<li className="list-group-item"><input className="px-4 py-3" type="text" onKeyPress={addItem} placeholder="What needs to be done?" /></li>
						{
							numberElements > 0 ?
							toDoList.map((item, key) =>{
								return <li id={item.id} className="list-group-item d-flex justify-content-between align-items-center" key={key}>
									{item.label}<button type="button" className="button-delete" onClick={()=>deleteItem(item.id)}><FontAwesomeIcon id={key} icon={faTrashAlt} /></button></li>
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
