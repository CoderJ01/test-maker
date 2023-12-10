// React
import { useNavigate } from 'react-router-dom';

// CSS
import './UserTests.style.css';

// util 
import { GetData } from '../../utils/requests';

// URL
import { baseURL_client } from '../../utils/urls';

const UserTests = ({ user }) => {
    const tests = GetData(`api/tests/all/${user.id}`);

    let navigate = useNavigate();

    const routeChange = () => {
        let path = `/create-test`;
        navigate(path);
    }

    return (
        <div className='user-tests'>
            <h2>Your Tests</h2>
            {
                tests?.data?.length === 0 ? 
                (
                    <div className='ut-no-test'>
                        <br/>
                        <p style={{ textAlign: 'center' }}> You have not created a test yet!</p>
                        <br/>
                    </div>
                ) :
                (
                    <div className='user-test-display'>
                    {
                        tests?.data?.map(test => {
                            return (
                                <div className='utd-single-test'>
                                    <h3><a href={`${baseURL_client}/view-test/${user.id}/${test.id}`} target='_blank' rel='noopener noreferrer'>{test.title}</a></h3>
                                    <p>{test.description}</p>
                                    {
                                        test.complete === true ? 
                                        (
                                            ''
                                        ) : 
                                        (
                                            <p id='utdst-incomplete'>Incomplete</p>
                                        )
                                    }
                                </div>
                            );
                        })
                    }
                    </div>
                )
            }
            <div className='ut-bottom'>
                <button onClick={routeChange}>Create New Test</button>
            </div>
        </div>
    );
}

export default UserTests;