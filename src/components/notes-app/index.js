import React, { useCallback, useState, useMemo } from 'react';
import './index.css';

function NotesApp() {
  const [filter, setFilter] = useState('all');
  const [notes, setNotes] = useState([]);
  const [name, setName] = useState('');
  const [status, setStatus] = useState('');

  const filteredNotes = useMemo(() => {
    if (filter === 'all') {
      /**
       * spent a little bit of time on trying to come up
       * with a clever way to do sorting and it all became
       * extremely ugly and flaky, adding a weight property
       * at time of insertion made the most sense.
       */
      return notes.sort((a, b) => a.weight - b.weight);
    }
    return notes.filter((note) => note.status === filter);
  }, [filter, notes]);

  const handleName = useCallback((evt) => {
    setName(evt.target.value);
  }, []);

  const handleStatus = useCallback((evt) => {
    setStatus(evt.target.value);
  }, []);

  const setFilterAll = useCallback(() => {
    setFilter('all');
  }, []);

  const setFilterActive = useCallback(() => {
    setFilter('active');
  }, []);

  const setFilterCompleted = useCallback(() => {
    setFilter('completed');
  }, []);

  const handleAddNote = useCallback(
    (evt) => {
      evt.preventDefault();

      const weight = status === 'active' ? -2 : status === 'completed' ? -1 : 0;

      const newNote = { id: new Date().getTime(), name, status, weight };

      setNotes((notes) => [...notes, { ...newNote }]);
      setName('');
      setStatus('');
    },
    [name, status]
  );

  return (
    <div className='layout-column align-items-center justify-content-start'>
      <section className='layout-row align-items-center justify-content-center mt-30'>
        <input
          data-testid='input-note-name'
          type='text'
          className='large mx-8'
          placeholder='Note Title'
          value={name}
          onChange={handleName}
        />
        <input
          data-testid='input-note-status'
          type='text'
          className='large mx-8'
          placeholder='Note Status'
          value={status}
          onChange={handleStatus}
        />
        <button className='' data-testid='submit-button' onClick={handleAddNote}>
          Add Note
        </button>
      </section>

      <div className='mt-50'>
        <ul className='tabs'>
          <li className='tab-item slide-up-fade-in' data-testid='allButton' onClick={setFilterAll}>
            All
          </li>
          <li className='tab-item slide-up-fade-in' data-testid='activeButton' onClick={setFilterActive}>
            Active
          </li>
          <li className='tab-item slide-up-fade-in' data-testid='completedButton' onClick={setFilterCompleted}>
            Completed
          </li>
        </ul>
      </div>
      <div className='card w-40 pt-30 pb-8'>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody data-testid='noteList'>
            {filteredNotes.map((note) => (
              <tr key={note.id}>
                <td>{note.name}</td>
                <td>{note.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default NotesApp;
