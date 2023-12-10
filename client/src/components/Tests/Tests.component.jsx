// CSS
import './Tests.style.css';

// utils 
import { GetData } from '../../utils/requests';

// components
import NumberOfQuestions from '../NumberOfQuestions/NumberOfQuestions';

// URL
import { baseURL_client } from '../../utils/urls';

const Tests = ({ user }) => {
    const tests = GetData(`api/tests/other-users/${user.id}`);

    return (
        <div className='tests'>
            <h2>Tests</h2>
            {
                tests?.data?.length === 0 ? 
                (
                    <>
                    <br/>
                    <p style={{ textAlign: 'center' }}>No other users have created a test yet!</p>
                    </>
                ) :
                (
                    tests?.data?.map(test => {
                        return (
                            <div className='test-single-test'>
                                <h3><a href={`${baseURL_client}/take-test/${test.id}`} target='_blank' rel='noopener noreferrer'>{test.title}</a></h3>
                                <p>{test.description}</p>
                                <NumberOfQuestions testId={test.id}/>
                            </div>
                        );
                    })
                )
            }
            {

            }
        </div>
    );
}

export default Tests;