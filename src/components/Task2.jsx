import React, {useState} from 'react';
import uuid from 'react-uuid';

export default function Task2() {
    const initNotes = [
        {
            id: uuid(),
            fields: [
                {name: 'prop1', value: 'value11', isEdit: false},
                {name: 'prop2', value: 'value12', isEdit: false},
                {name: 'prop3', value: 'value13', isEdit: false},
            ]
        },
        {
            id: uuid(),
            fields: [
                {name: 'prop1', value: 'value21', isEdit: false},
                {name: 'prop2', value: 'value22', isEdit: false},
                {name: 'prop3', value: 'value23', isEdit: false},
            ]
        },
        {
            id: uuid(),
            fields: [
                {name: 'prop1', value: 'value31', isEdit: false},
                {name: 'prop2', value: 'value32', isEdit: false},
                {name: 'prop3', value: 'value33', isEdit: false},
            ]
        },
    ];
	const [notes, setNotes] = useState(initNotes);
	
	const rows = notes.map(note => {
		const cells = note.fields.map(field => {
			let elem;
			
			if (!field.isEdit) {
				elem = <span onClick={() => auxiliary(note.id, field.name,'event',false)}>
					{field.value}
				</span>;
			} else {
				elem = <input
					value={field.value}
					onChange={(event) => auxiliary(note.id, field.name, event,true)}
					onBlur={() => auxiliary(note.id, field.name,'event',false)}
				/>;
			}
			
			return <td key={field.name}>{elem}</td>;
		});
		
		return <tr key={note.id}>{cells}</tr>;
	});
	
    function auxiliary(id, name, event, isChange) {
        setNotes(notes.map(note => {
			if (note.id === id) {
				const fields = note.fields.map(field => {
                    if (field.name === name) {
                        if(isChange){
                            return {...field, value: event.target.value}
                        }else{
                            return {...field, isEdit: !field.isEdit}
                        }
                    } else {
                        return field;
                    }

				});
				
				return {id, fields};
			} else {
				return note;
			}
		}));
    }
	return <div>
		<table>
			<tbody>
				{rows}
			</tbody>
		</table>
	</div>;
}