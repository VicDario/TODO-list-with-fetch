import './App.css';
import {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

function App() {
	let [toDoList, setList] = useState([]);

	const addItem = (e) => {
		if(e.code === "Enter"){
			setList((prevState) =>{
				return [...prevState, e.target.value];
			})
		}
	}

	const deleteItem = (e) => {
		let id = e.target.parentElement.id;
		let list = toDoList;
		console.log(list);
		list = list.slice(3, 1);
		console.log(list);
		setList(list);
	}

	return (
		<div className="container my-5">
			<h1 className="text-center">TODO List</h1>
			<div className="row my-5">
				<div className="col-md-6 offset-md-3">
					<ul className="list-group">
						<li className="list-group-item"><input className="px-4 py-3" type="text" onKeyPress={addItem} placeholder="What needs to be done?" /></li>
						{
							toDoList.length > 0 ?
							toDoList.map((item, key) =>{
								return <li id={key} className="list-group-item" key={key}>{item}<button className="button-delete" onClick={deleteItem}><FontAwesomeIcon icon={faTrashAlt} style={{opacity: "0.5"}} /></button></li>
							}) :
							<li className="list-group-item">No tasks, add a task</li>
						}
						<li className="list-group-item shadows"><small className="text-muted">{toDoList.length} items left</small></li>
					</ul>
					
				</div>
			</div>
		</div>
	);
}

export default App;
