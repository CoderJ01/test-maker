// React
import { useParams } from 'react-router-dom';

// CSS 
import './ViewTest.style.css';

// util
import { GetData } from '../../utils/requests';

const ViewTest = ({ user }) => {
    const { userId, testId } = useParams();

    const test = GetData(`api/tests/single-test/${testId}`);
    const questions = GetData(`api/questions/${testId}`);

    if(user.id !== userId) {
        return (
            <>
            <br/>
            <h2>You not not authorized to view this page!</h2>
            </>
        );
    }

    return (
        <div className='view-test'>
            <h2>{test?.data?.title}</h2>
            <p id='vt-description'>{test?.data?.description}</p>
            {
                questions?.data?.length === 0 ? 
                (
                    <>
                        <br/>
                        <p style={{ textAlign: 'center' }}>This test was never completed!</p>
                    </>
                ) : 
                (
                    <div className='view-test-questions'>
                    {
                        questions?.data?.map(question => {
                            return (
                                <div className='vtq-question'>
                                    <h3>{question.question_header}</h3>
                                    <br/>
                                    <p><span style={{ fontWeight: 'bold' }}>Correct answer: </span>{question.correct_answer}</p>
                                    <p><span style={{ fontWeight: 'bold' }}>Choice: </span>{question.second_choice}</p>
                                    <p><span style={{ fontWeight: 'bold' }}>Choice: </span>{question.third_choice}</p>
                                    <p><span style={{ fontWeight: 'bold' }}>Choice: </span>{question.fourth_choice}</p>
                                    <br/>
                                </div>
                            );
                        })
                    }
                    </div>
                )
            }
        </div>
    );
}

export default ViewTest;