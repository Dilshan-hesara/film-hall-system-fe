import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser, verifyOtpApi } from '../services/auth';
import { Mail, User, Lock, ArrowRight, CheckCircle, AlertCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

// 1. Validation Schemas
const registerSchema = yup.object().shape({
  username: yup.string().required('Username is required').min(3, 'Must be at least 3 chars'),
  email: yup.string().required('Email is required').email('Invalid email format'),
  gender: yup.string().required(),
  password: yup.string().required('Password is required').min(6, 'Must be at least 6 chars'),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Confirm Password is required'),
});

const otpSchema = yup.object().shape({
  otp: yup.string().required('OTP is required').length(6, 'OTP must be 6 digits'),
});

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');
  const [userEmail, setUserEmail] = useState(''); // Store email for OTP step

  // 2. React Hook Forms
  // Register Form
  const { register: regForm, handleSubmit: handleRegSubmit, formState: { errors: regErrors } } = useForm({
    resolver: yupResolver(registerSchema),
    defaultValues: { gender: 'Male' }
  });

  // OTP Form
  const { register: otpForm, handleSubmit: handleOtpSubmit, formState: { errors: otpErrors } } = useForm({
    resolver: yupResolver(otpSchema)
  });

  // STEP 1: Handle Registration
  const onRegister = async (data: any) => {
    setLoading(true);
    setApiError('');
    try {
      await registerUser({
        username: data.username,
        email: data.email,
        password: data.password,
        gender: data.gender
      });
      
      setUserEmail(data.email); // Save email for next step
      setStep(2); // Move to OTP
    } catch (err: any) {
      setApiError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  // STEP 2: Handle OTP Verification
  const onVerifyOtp = async (data: any) => {
    setLoading(true);
    setApiError('');
    try {
      const response = await verifyOtpApi({
        email: userEmail,
        otp: data.otp
      });

      localStorage.setItem('user', JSON.stringify(response.user));
      localStorage.setItem('accessToken', response.accessToken);
      localStorage.setItem('refreshToken', response.refreshToken); // If implemented

      alert('Account Verified Successfully!');
      navigate('/'); 
    } catch (err: any) {
      setApiError(err.response?.data?.message || 'Invalid OTP');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex justify-center items-center p-4 relative overflow-hidden">
      
      {/* Background Effect */}
      <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-purple-600/20 rounded-full blur-[100px]"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-blue-600/10 rounded-full blur-[100px]"></div>

      <div className="w-full max-w-md bg-gray-900/90 backdrop-blur-xl p-8 rounded-xl shadow-2xl border border-gray-800 relative z-10">
        
        <h2 className="text-3xl font-bold text-center text-blue-500 mb-2">
          {step === 1 ? 'Create Account' : 'Verify Email'}
        </h2>
        <p className="text-center text-gray-400 mb-6 text-sm">
          {step === 1 ? 'Join MKD Cinemas today!' : `Enter the OTP sent to ${userEmail}`}
        </p>

        {apiError && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-3 rounded-lg mb-6 flex items-center gap-2 text-sm animate-pulse">
                <AlertCircle size={16} /> {apiError}
            </div>
        )}

        {/* --- STEP 1: REGISTER FORM --- */}
        {step === 1 && (
          <form onSubmit={handleRegSubmit(onRegister)} className="space-y-4">
            
            {/* Username */}
            <div>
                <div className="relative">
                    <User className="absolute left-3 top-3.5 text-gray-500" size={18} />
                    <input {...regForm('username')} placeholder="Full Name" className={`w-full bg-gray-800 border rounded-lg p-3 pl-10 focus:outline-none transition-all ${regErrors.username ? 'border-red-500' : 'border-gray-700 focus:border-blue-500'}`}/>
                </div>
                {regErrors.username && <p className="text-red-500 text-xs mt-1 ml-1">{regErrors.username.message as string}</p>}
            </div>

            {/* Email */}
            <div>
                <div className="relative">
                    <Mail className="absolute left-3 top-3.5 text-gray-500" size={18} />
                    <input {...regForm('email')} placeholder="Email Address" className={`w-full bg-gray-800 border rounded-lg p-3 pl-10 focus:outline-none transition-all ${regErrors.email ? 'border-red-500' : 'border-gray-700 focus:border-blue-500'}`}/>
                </div>
                {regErrors.email && <p className="text-red-500 text-xs mt-1 ml-1">{regErrors.email.message as string}</p>}
            </div>

            {/* Gender */}
            <div>
                <select {...regForm('gender')} className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-gray-300 focus:border-blue-500 outline-none">
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                </select>
            </div>

            {/* Password */}
            <div>
                <div className="relative">
                    <Lock className="absolute left-3 top-3.5 text-gray-500" size={18} />
                    <input type="password" {...regForm('password')} placeholder="Password" className={`w-full bg-gray-800 border rounded-lg p-3 pl-10 focus:outline-none transition-all ${regErrors.password ? 'border-red-500' : 'border-gray-700 focus:border-blue-500'}`}/>
                </div>
                {regErrors.password && <p className="text-red-500 text-xs mt-1 ml-1">{regErrors.password.message as string}</p>}
            </div>

            {/* Confirm Password */}
            <div>
                <div className="relative">
                    <Lock className="absolute left-3 top-3.5 text-gray-500" size={18} />
                    <input type="password" {...regForm('confirmPassword')} placeholder="Confirm Password" className={`w-full bg-gray-800 border rounded-lg p-3 pl-10 focus:outline-none transition-all ${regErrors.confirmPassword ? 'border-red-500' : 'border-gray-700 focus:border-blue-500'}`}/>
                </div>
                {regErrors.confirmPassword && <p className="text-red-500 text-xs mt-1 ml-1">{regErrors.confirmPassword.message as string}</p>}
            </div>

            <button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-lg transition-all flex justify-center items-center gap-2">
              {loading ? 'Processing...' : <>Next <ArrowRight size={18} /></>}
            </button>

            <p className="text-center text-sm text-gray-400 mt-4">
              Already have an account? <Link to="/login" className="text-blue-400 hover:underline">Login</Link>
            </p>
          </form>
        )}

        {/* --- STEP 2: OTP FORM --- */}
        {step === 2 && (
          <form onSubmit={handleOtpSubmit(onVerifyOtp)} className="space-y-6 animate-fade-in">
            
            <div className="flex flex-col items-center">
                <div className="bg-blue-900/30 p-4 rounded-full mb-4"><Mail size={40} className="text-blue-400" /></div>
                <p className="text-sm text-gray-300 text-center mb-4">Code sent to <b>{userEmail}</b></p>
            </div>

            <div>
                <input {...otpForm('otp')} type="text" maxLength={6} placeholder="Enter 6-Digit OTP" className="w-full bg-gray-900 border border-gray-600 rounded-lg p-4 text-center text-2xl tracking-widest font-mono focus:border-green-500 outline-none" />
                {otpErrors.otp && <p className="text-red-500 text-xs mt-2 text-center">{otpErrors.otp.message as string}</p>}
            </div>

            <button type="submit" disabled={loading} className="w-full bg-green-600 hover:bg-green-500 text-white font-bold py-3 rounded-lg transition-all flex justify-center items-center gap-2">
              {loading ? 'Verifying...' : <>Verify & Login <CheckCircle size={18} /></>}
            </button>

            <button type="button" onClick={() => setStep(1)} className="w-full text-center text-sm text-gray-500 hover:text-gray-300">Back to Registration</button>
          </form>
        )}

      </div>
    </div>
  );
};

export default Register;