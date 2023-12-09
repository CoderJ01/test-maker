// CSS
import './NumberOfQuestions.css';

// utils
import { GetData } from '../../utils/requests';

const NumberOfQuestions = ({ testId }) => {
    const questions = GetData(`api/questions/${testId}`);

    return (
        <p id='tst-questions'>Number of Questions: {questions?.data?.length}</p>
    )
}

export default NumberOfQuestions;