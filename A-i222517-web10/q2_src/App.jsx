import React, { useState, useEffect } from 'react';
import './index.css';

const INITIAL_DATA = {
  firstName: '', lastName: '', email: '', dob: '',
  emergencyContact: '', addressLine1: '', city: '', stateProvince: '', postalCode: '', country: '',
  profession: '', professionOther: '', travelExperience: '', languages: [],
  username: '', password: '', confirmPassword: '', termsAccept: false, privacyAccept: false
};

const COUNTRIES = {
  US: ['California', 'New York', 'Texas'],
  UK: ['England', 'Scotland', 'Wales'],
  PK: ['Punjab', 'Sindh', 'KPK']
};

export default function App() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState(() => {
    const saved = localStorage.getItem('q2_data');
    return saved ? JSON.parse(saved) : INITIAL_DATA;
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    localStorage.setItem('q2_data', JSON.stringify(data));
  }, [data]);

  useEffect(() => {
    const handleBeforeUnload = (e) => { e.preventDefault(); e.returnValue = ''; };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      if (name === 'languages') {
        const newLangs = checked ? [...data.languages, value] : data.languages.filter(l => l !== value);
        setData({ ...data, languages: newLangs });
      } else {
        setData({ ...data, [name]: checked });
      }
    } else {
      setData({ ...data, [name]: value });
    }
  };

  const validateStep = (currentStep) => {
    let err = {};
    if (currentStep === 1) {
      if (!data.firstName || data.firstName.length < 2 || /[^a-zA-Z\s]/.test(data.firstName)) err.firstName = 'Invalid first name';
      if (!data.lastName || data.lastName.length < 2 || /[^a-zA-Z\s]/.test(data.lastName)) err.lastName = 'Invalid last name';
      if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) err.email = 'Invalid email';
      if (!data.dob || new Date().getFullYear() - new Date(data.dob).getFullYear() < 18) err.dob = 'Must be at least 18';
    }
    if (currentStep === 2) {
      if (!data.emergencyContact || data.emergencyContact.length < 7) err.emergencyContact = 'Invalid contact';
      if (!data.addressLine1 || data.addressLine1.length < 5) err.addressLine1 = 'Min 5 chars';
      if (!data.city || /\d/.test(data.city)) err.city = 'Invalid city';
      if (!data.country) err.country = 'Required';
      if (!data.stateProvince) err.stateProvince = 'Required';
      if (!data.postalCode || data.postalCode.length < 3) err.postalCode = 'Required';
    }
    if (currentStep === 3) {
      if (!data.profession) err.profession = 'Required';
      if (data.profession === 'Other' && !data.professionOther) err.professionOther = 'Required';
      if (data.travelExperience === '' || data.travelExperience < 0) err.travelExperience = 'Invalid';
      if (data.languages.length < 2) err.languages = 'Select at least 2';
    }
    if (currentStep === 4) {
      if (!data.username || data.username.length < 5 || /[^a-zA-Z0-9_]/.test(data.username)) err.username = 'Invalid username';
      if (!data.password || data.password.length < 8) err.password = 'Invalid password (min 8)';
      if (data.password !== data.confirmPassword) err.confirmPassword = 'Passwords do not match';
      if (!data.termsAccept) err.termsAccept = 'Must accept';
      if (!data.privacyAccept) err.privacyAccept = 'Must accept';
    }
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const nextStep = () => { validateStep(step) && setStep(step + 1); };
  const prevStep = () => setStep(step - 1);
  const clearForm = () => { if (window.confirm("Sure?")) { setData(INITIAL_DATA); setStep(1); } };

  const submitForm = () => {
    if (validateStep(4)) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setSubmitted(true);
        localStorage.removeItem('q2_data');
      }, 1500);
    }
  };

  const progress = (step / 4) * 100;
  const color = progress <= 25 ? 'red' : progress <= 50 ? 'orange' : progress <= 75 ? 'blue' : 'green';

  if (submitted) return <div className="container p-4 text-center"><h2>Registration Success!</h2></div>;

  return (
    <div className="container">
      <h2>Traveler Onboarding System</h2>
      <div className="progress-bar">
        <div className="progress" style={{ width: `${progress}%`, backgroundColor: color }}></div>
      </div>
      <p>Progress: {progress}%</p>
      
      {loading ? <p>Loading...</p> : (
        <div className="form-step">
          {step === 1 && (
            <>
              <h3>Step 1: Identity Details</h3>
              <input name="firstName" placeholder="First Name" value={data.firstName} onChange={handleChange} />
              {errors.firstName && <span className="err">{errors.firstName}</span>}
              <input name="lastName" placeholder="Last Name" value={data.lastName} onChange={handleChange} />
              {errors.lastName && <span className="err">{errors.lastName}</span>}
              <input name="email" type="email" placeholder="Email" value={data.email} onChange={handleChange} />
              {errors.email && <span className="err">{errors.email}</span>}
              <input name="dob" type="date" value={data.dob} onChange={handleChange} title="Date of Birth" />
              {errors.dob && <span className="err">{errors.dob}</span>}
            </>
          )}
          {step === 2 && (
            <>
              <h3>Step 2: Contact & Origin</h3>
              <input name="emergencyContact" placeholder="Emergency Contact" value={data.emergencyContact} onChange={handleChange} />
              {errors.emergencyContact && <span className="err">{errors.emergencyContact}</span>}
              <input name="addressLine1" placeholder="Address Line 1" value={data.addressLine1} onChange={handleChange} />
              {errors.addressLine1 && <span className="err">{errors.addressLine1}</span>}
              <input name="city" placeholder="City" value={data.city} onChange={handleChange} />
              {errors.city && <span className="err">{errors.city}</span>}
              <select name="country" value={data.country} onChange={handleChange}>
                <option value="">Select Country</option>
                <option value="US">USA</option>
                <option value="UK">UK</option>
                <option value="PK">Pakistan</option>
              </select>
              {errors.country && <span className="err">{errors.country}</span>}
              {data.country && (
                <select name="stateProvince" value={data.stateProvince} onChange={handleChange}>
                  <option value="">Select State/Province</option>
                  {COUNTRIES[data.country].map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              )}
              {errors.stateProvince && <span className="err">{errors.stateProvince}</span>}
              <input name="postalCode" placeholder="Postal Code" value={data.postalCode} onChange={handleChange} />
              {errors.postalCode && <span className="err">{errors.postalCode}</span>}
            </>
          )}
          {step === 3 && (
            <>
              <h3>Step 3: Background</h3>
              <select name="profession" value={data.profession} onChange={handleChange}>
                <option value="">Select Profession</option>
                <option value="Engineer">Engineer</option>
                <option value="Other">Other</option>
              </select>
              {data.profession === 'Other' && <input name="professionOther" placeholder="Specify" value={data.professionOther} onChange={handleChange} />}
              {errors.profession && <span className="err">{errors.profession}</span>}
              {errors.professionOther && <span className="err">{errors.professionOther}</span>}
              <input name="travelExperience" type="number" placeholder="Years of travel experience" value={data.travelExperience} onChange={handleChange} />
              {errors.travelExperience && <span className="err">{errors.travelExperience}</span>}
              <div className="checkbox-group">
                <label><b>Languages (Select 2+):</b></label>
                {['English', 'Spanish', 'French', 'Urdu'].map(lang => (
                  <label key={lang}>
                    <input type="checkbox" name="languages" value={lang} checked={data.languages.includes(lang)} onChange={handleChange} /> {lang}
                  </label>
                ))}
              </div>
              {errors.languages && <span className="err">{errors.languages}</span>}
            </>
          )}
          {step === 4 && (
            <>
              <h3>Step 4: Account Setup</h3>
              <input name="username" placeholder="Username" value={data.username} onChange={handleChange} />
              {errors.username && <span className="err">{errors.username}</span>}
              <input name="password" type="password" placeholder="Password" value={data.password} onChange={handleChange} />
              {errors.password && <span className="err">{errors.password}</span>}
              <input name="confirmPassword" type="password" placeholder="Confirm Password" value={data.confirmPassword} onChange={handleChange} />
              {errors.confirmPassword && <span className="err">{errors.confirmPassword}</span>}
              
              <div className="checkbox-group">
                <label><input type="checkbox" name="termsAccept" checked={data.termsAccept} onChange={handleChange} /> Accept Terms</label>
                {errors.termsAccept && <span className="err">{errors.termsAccept}</span>}
                <label><input type="checkbox" name="privacyAccept" checked={data.privacyAccept} onChange={handleChange} /> Accept Privacy</label>
                {errors.privacyAccept && <span className="err">{errors.privacyAccept}</span>}
              </div>
            </>
          )}

          <div className="buttons">
            {step > 1 && <button onClick={prevStep}>Previous</button>}
            {step < 4 ? <button onClick={nextStep}>Next</button> : <button className="submit" onClick={submitForm}>Submit</button>}
            <button onClick={clearForm} className="danger">Clear Form</button>
          </div>
        </div>
      )}
    </div>
  );
}
