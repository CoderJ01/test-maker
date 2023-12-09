// CSS
import './Scores.style.css';

// utils
import { GetData } from '../../utils/requests';

const Scores = ({ user }) => {
    const scores = GetData(`api/scores/${user.id}`);
    const tests = GetData(`api/scores/${user.id}`);
    
    return (
        <div className='scores'>
            <h2>Scores</h2>
            {
                scores?.data?.scores?.map((score , i) => {
                    return (
                        <div className='scores-single-score'>
                            <p><span style={{ fontWeight: 'bold' }}>Test: </span>{tests?.data?.tests[i].title}</p>
                            <p><span style={{ fontWeight: 'bold' }}>Score: </span>{(score?.score) * 100}%</p>
                        </div>
                    );
                })
            }
        </div>
    );
}

export default Scores;