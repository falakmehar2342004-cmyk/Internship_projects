function StudentList({ students, onDelete, onEdit }) {
  // Yaha data check krna ka liya condition lgae ha agr toh length zero ha toh box mn show ho no record 
  if (students.length === 0) {
    return <p className="box">No students found</p>
  }

  return (
    <ul>
      {/* Mapping ka through data output krwaya ha key ko use kr ka  or edit or delete bhi key ka through kiya ha
        Because key is an efficient way to do these things error nhi ata aesa */}
      {students.map((student) => (
        <li key={student.id}>
          <span>
            {student.name} - {student.course}
          </span>
          <div>
            <button onClick={() => onEdit(student.id)}>Edit</button>
            <button onClick={() => onDelete(student.id)}>Delete</button>
          </div>
        </li>
      ))}
    </ul>
  )
}

export default StudentList