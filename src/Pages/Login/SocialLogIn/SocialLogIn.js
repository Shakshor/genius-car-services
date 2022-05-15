import React from 'react';
import google from '../../../images/social/google.png';
import facebook from '../../../images/social/facebook-free-icon.jpg';
import github from '../../../images/social/GitHub-Mark.png';
import auth from '../../../firebase.init';
import { useSignInWithGithub, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import Loading from '../../Shared/Loading/Loading';
import useToken from '../../../hooks/useToken';


const SocialLogIn = () => {
    const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
    const [signInWithGithub, user1, loading1, error1] = useSignInWithGithub(auth);
    // using custom hook for token
    const [token] = useToken(user || user1);
    const navigate = useNavigate();
    let errorElement;
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    if (loading || loading1) {
        return <Loading></Loading>
    }

    if (error || error1) {
        errorElement = <p className='text-danger'>Error: {error?.message}{error1?.message}</p>

    };

    if (token) {
        navigate(from, { replace: true });
    }


    return (
        <div>
            <div className='d-flex align-items-center justify-content-center'>
                <div style={{ height: '1px' }} className='bg-primary w-50'></div>
                <p className='mt-2 px-2'>or</p>
                <div style={{ height: '1px' }} className='bg-primary w-50'></div>
            </div>

            {/* ------ error showing ---------- */}
            {errorElement}

            <div>
                <button onClick={() => signInWithGoogle()} className='btn btn-primary d-block w-50 mx-auto my-2'>
                    <img style={{ width: '30px' }} src={google} alt="" />
                    <span className='px-2'>Google Sign In</span>
                </button>
                <button className='btn btn-primary d-block w-50 mx-auto my-2'>
                    <img style={{ width: '30px' }} src={facebook} alt="" />
                    <span className='px-2'>Facebook Sign In</span>
                </button>
                <button onClick={() => signInWithGithub()} className='btn btn-primary d-block w-50 mx-auto'>
                    <img style={{ width: '30px' }} src={github} alt="" />
                    <span className='px-2'>Github Sign In</span>
                </button>

            </div>

        </div>
    );
};

export default SocialLogIn;