import { useState } from 'react'
//Edit or add dono ko ek hi sath implement kiya ha us hisab sa form bnaya ha 
function StudentForm({ student, onSave, onCancel }) {

   // Agr toh student ha toh student-name show ho warna empty
  const [name, setName] = useState(student ? student.name : '')
  const [course, setCourse] = useState(student ? student.course : '')
  const [error, setError] = useState('')

   //Form ka jo auto load ha submit ka wo prevent default ka through khtm kiya ha
  const handleSubmit = (e) => {
    e.preventDefault()

     // trim ka through check kiya ha agr dono mn sa koi cheez empty ha toh error de da
    if (name.trim() === '' || course.trim() === '') {
      setError('Both Student Name and Course are required.')
      return
    }

    //Yaha hmna implement kiya ha agr edit ho rha ha toh save hona pa data save ho ka box mn show ho
     // Nhi toh Sara form at the end automatically empty hojae 
    onSave(name, course)
    setName('')
    setCourse('')
    setError('')
  }

  return (
    <form className="box" onSubmit={handleSubmit}>
      {/* Agr data show ho rha name or subject toh Edit student show ho warna add Student */}
      <h2>{student ? 'Edit student' : 'Add a student'}</h2>

      <label>Student Name</label>
      {/* Yaha form ka through data show ho jesa hi name ae toh setName mn data update hojae */}
      <input value={name} onChange={(e) => setName(e.target.value)} />

      <label>Course</label>
            {/* Yaha form ka through data show ho jesa hi course ae toh setCourse mn data update hojae */}

      <input value={course} onChange={(e) => setCourse(e.target.value)} />

      {/* Error show krna ka liya condition lgae ha agr error ae or error mn value bhi ho toh error message show ho */}
      {error && <p className="error">{error}</p>}
      
          {/* Agr student ka data ha form mn toh Save Changes(Edit data ho rha hoga tb) show ho nhi toh Add Student */}
       <div className="form-button">
          <button type="submit">{student ? 'Save changes' : 'Add student'}</button>

       {/* Agr data a rha ha toh button cancel ka bhi show hoga isi liya condition lgegi */}
      {student && (
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      )}
       </div>
    
    </form>
  )
}

export default StudentForm