import React from 'react'
import { nanoid } from 'nanoid'
import {useState} from 'react'
import moment from 'moment'


function FormSteps(props) {
    const ItemDistance = {
        date: moment().format('DD.MM.YYYY'),
        distance: 0
    }

    const [form, setForm] = useState(ItemDistance )
    const [aDistance, setDays] = useState([]);

    const handleFormSubmin = evt => {
        evt.preventDefault();
        setForm(prevForm => ({...prevForm, [evt.target[0].value]: evt.target[1].value}));

        const checkDay = aDistance.filter(d => {
            // console.log('dif: ', d.date, form.date,  moment(d.date,'DD.MM.YYYY').diff(moment(form.date,'DD.MM.YYYY'), 'days'))
            return !moment(d.date,'DD.MM.YYYY').diff(moment(form.date,'DD.MM.YYYY'), 'days')
        });

        if(checkDay.length > 0) {
            const day = {id:nanoid(), date:form.date, distance: +form.distance + +checkDay[0].distance}
            handleRemove(checkDay[0].id);
            setDays(prevDays => [...prevDays, day]);
        } else {
            const day = {id:nanoid(), date:form.date, distance:+form.distance};
            setDays(prevDays => [...prevDays, day]);
        }

        setForm(ItemDistance);
    }

    const handleChange = evt => {
        let {name, value} = evt.target;
        setForm(prevForm => ({...prevForm, [name]: value}));
    }
    const handleRemove  = id => {
        setDays(prevDays => prevDays.filter(day => day.id !== id))
    }

    return (
        <React.Fragment>
            <form className='input-form' onSubmit={handleFormSubmin}>
                <div className='input-wrap'>
                    <div className='day'>
                        <label htmlFor='name'>Дата (ДД.ММ.ГГГГ)</label>
                        <input name='date' value={form.date} onChange={handleChange} />
                    </div>
                    <div className='day'>
                        <label htmlFor='name'>Пройдено км</label>
                        <input name='distance' value={form.distance} onChange={handleChange} />
                    </div>
                    <button className='day submit-btn'> OK </button>
                </div>
            </form>
            <div className='list-wrap'>
                <div>
                    <p className='header-info'>Дата (ДД.ММ.ГГ)</p>
                    <p className='header-info'>Пройдено км</p>
                    <p className='header-info'>Действия</p>
                </div>
                <ul className='days-list'>
                    {
                        aDistance.sort((a, b) => {
                            return moment(a.date,'DD.MM.YYYY').diff(moment(b.date,'DD.MM.YYYY'), 'days');
                        })
                            .reverse()
                            .map( o =>
                                <li className='day-info' key={o.id}>
                                    <p className='day-data'>{o.date}</p>
                                    <p className='day-data'>{o.distance}</p>
                                    <button className='day-data delete-btn' onClick={() => handleRemove(o.id)}>✘</button>
                                </li>
                            )
                    }
                </ul>
            </div>
        </React.Fragment>

    )
}

export default FormSteps