import { useParams } from "react-router";
import useStudent from "../../hooks/useStudent";
import useSubject from "../../hooks/useSubject";

const StudentSubjectDetails = () => {
  const {id} = useParams();
  const {} = useStudent();
  const {} = useSubject();
  const {} = useNote();

  return (
    <div>StudentSubjectDetails</div>
  )
}

export default StudentSubjectDetails