import { useState } from 'react'
import Navbar from './components/Navbar'
import StudentForm from './components/StudentForm'
import StudentList from './components/StudentList'

function App() {
    //  Yaha data set kiya ha initial data 
  const [students, setStudents] = useState([
    { id: 1, name: 'Ayesha Khan', course: 'Mathematics' },
    { id: 2, name: 'Bilal Ahmed', course: 'Computer Science' },
  ])
  //useState ka through search or editing Id set ki ha
  const [search, setSearch] = useState('')
  const [editingId, setEditingId] = useState(null)

  // find() use krna ha ta ka student ko edit kr ska wo dhondha
  const editingStudent = students.find((s) => s.id === editingId)

  const saveStudent = (name, course) => {
    if (editingStudent) {
      // Edit unka hi edit kra jinka data update hoa ha nhi toh wesa hi data show ho
      setStudents(
        students.map((s) =>
          s.id === editingId ? { ...s, name: name, course: course } : s
        )
      )
      //Edit hona ka bad editting id reset hojae null pa
      setEditingId(null)
    } else {
       //New Students ko add krna ka liya 
      const newStudent = { id: Date.now(), name: name, course: course }
      setStudents([...students, newStudent])
    }
  }

    //Delete student kiya ha through filter or yaha pa double check kiya ha agr ka delte id or student id same nah ho
    //or sath hi students ka data set kr diya ha
  const deleteStudent = (id) => {
    setStudents(students.filter((s) => s.id !== id))
    if (id === editingId) setEditingId(null)
  }

  // filter() for search or lowerCase mn isi liya convert kiya ha ta ka capital or lower case ka masla nah ho search lrta hoa
  const visibleStudents = students.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      <Navbar title="Student List">
        <input
          placeholder="Search by name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Navbar>

      <main className="layout">
        <StudentForm
          key={editingId || 'new'}
          student={editingStudent}
          onSave={saveStudent}
          onCancel={() => setEditingId(null)}
        />

        <StudentList
          students={visibleStudents}
          onDelete={deleteStudent}
          onEdit={setEditingId}
        />
      </main>
    </div>
  )
}

export default App