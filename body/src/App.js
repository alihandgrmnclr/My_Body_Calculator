import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { useState } from "react"
import { Formik, useFormik } from "formik"
import Validation from './components/Validation';

function App() {

  // https://www.omnicalculator.com/health/navy-body-fat

  const [gender, setGender] = useState("");
  const [neck, setNeck] = useState("");
  const [waist, setWaist] = useState("");
  const [height, setHeight] = useState("");
  const [hip, setHip] = useState("");
  const [bodyFat, setBodyFat] = useState("");
  const [weight, setWeight] = useState("");
  const [bmi, setBMI] = useState("");
  const [status, setStatus] = useState("");

  const CalcMan = () => {
    const BodyFat = (495 / (1.0324 - 0.19077 * Math.log10((+waist) - (+neck)) + 0.15456 * Math.log10(height)) - 450).toFixed(2);  // number'a çevirmek için "+" koyduk (veri string olarak geliyor)
    setBodyFat(BodyFat);
    if (BodyFat > 6 && BodyFat < 13) {            // Setting your status (average, obesite exc..)
      setStatus("You are athletic");
    } else if (BodyFat > 13 && BodyFat < 17) {
      setStatus("You are in shape");
    } else if (BodyFat > 17 && BodyFat < 25) {
      setStatus("You are in average");
    } else if (BodyFat > 25) {
      setStatus("You are obesite");
    }
  };

  const CalcWoman = () => {
    const BodyFat = (495 / (1.29579 - 0.35004 * Math.log10((+waist) + (+hip) - (+neck)) + 0.22100 * Math.log10(height)) - 450).toFixed(2);  // number'a çevirmek için "+" koyduk (veri string olarak geliyor)
    setBodyFat(BodyFat);
    if (BodyFat > 10 && BodyFat < 13) {            // Setting your status (average, obesite exc..)
      setStatus("You are essential");
    } else if (BodyFat > 13 && BodyFat < 20) {
      setStatus("You are athletic");
    } else if (BodyFat > 20 && BodyFat < 25) {
      setStatus("You are in shape");
    } else if (BodyFat > 25 && BodyFat < 32) {
      setStatus("You are average");
    } else if (BodyFat > 32) {
      setStatus("You are obesite");
    }
  };

  const CalcBMI = () => {
    setBMI(((+weight) / ((height / 100) ** 2)).toFixed(2));
  };



  //formik
  const { handleSubmit, handleChange, values, errors, touched, handleBlur } = useFormik({
    initialValues: {
      height: "",
      neck: "",
      waist: "",
      weight: "",
      hip: ""
    },
    onSubmit: (values) => {
      console.log(height, neck, weight, waist, hip);
      setHeight(values.height);
      setNeck(values.neck);
      setWaist(values.waist);
      setWeight(values.weight);
      setHip(values.hip);
      CalcMan();
      CalcBMI();
    },
    validationSchema: Validation
  });



  return (
    <div className="App">
      <h1>Welcome To My Body Calculator</h1>
      <div className="container mt-5">
        <div className="row">
          <div className="card">
            <div className="card-header">
              <h3>
                Select Your Gender
              </h3>
              <div className="col-sm-12 d-flex justify-content-center mb-3">

                <input type="radio" name="gender" value="male" onClick={() => setGender("male")} />
                <label htmlFor="radio">Male</label>
                <input type="radio" name="gender" value="famale" onClick={() => setGender("famale")} />
                <label htmlFor="radio">Famale</label>
              </div>
            </div>
          </div>
        </div>
      </div>
      {gender ? (gender === "male" ?
        <div className="container">
          <div className="row">
            <div className="input-wrapper col-sm-12">
              {/* <form onSubmit={handleSubmit}>
                <label htmlFor="height">Your Height</label>
                <input type="number" name='height' value={values.height} onChange={handleChange} onBlur={handleBlur} placeholder="175" />
                {errors.height && touched.height && (<div className='error'>{errors.height}</div>)} <br />

                <label htmlFor="neck">Your Neck</label>
                <input type="number" name='neck' value={values.neck} onChange={handleChange} onBlur={handleBlur} placeholder="35" />
                {errors.neck && touched.neck && (<div className='error'>{errors.neck}</div>)}<br />

                <label htmlFor="waist">Your Waist</label>
                <input type="number" name='waist' value={values.waist} onChange={handleChange} onBlur={handleBlur} placeholder="85" />
                {errors.waist && touched.waist && (<div className='error'>{errors.waist}</div>)} <br />

                <label htmlFor="weight">Your Weight</label>
                <input type="number" name='weight' value={values.weight} onChange={handleChange} onBlur={handleBlur} placeholder="75" />
                {errors.weight && touched.weight && (<div className='error'>{errors.weight}</div>)} <br />
                <br /><br />

                <button type='submit' className='btn btn-primary' >Submit</button>

              </form>
              {bodyFat && <div className='mt-3'>Your Body fat is {bodyFat}% <br /><div>Your BMI is: {bmi}</div></div>} */}
              <div className="inputs">
                <label htmlFor="height">Your Height </label>
                <input placeholder='175' type="number" id='height' value={height} onChange={(e) => setHeight(e.target.value)} />

                <label htmlFor="neck">Your neck width (the widest)</label>
                <input placeholder='35' type="number" id='neck' value={neck} onChange={(e) => setNeck(e.target.value)} />

                <label htmlFor="waist">Your waist circumference (the thinnest)</label>
                <input placeholder='85' type="number" id='waist' value={waist} onChange={(e) => setWaist(e.target.value)} />

                <label htmlFor="weight">Your weight</label>
                <input placeholder='85' type="number" id='weight' value={weight} onChange={(e) => setWeight(e.target.value)} />
              </div>
              <button className="btn btn-primary mt-3" onClick={() => { CalcMan(); CalcBMI(); }}>Calculate</button> <br />
              {bodyFat && <div className='mt-3'>Your Body fat is {bodyFat}% <br /><div>Your BMI is: {bmi} <br /><div>{status}</div></div></div>}

            </div>
          </div>
        </div>
        :
        <div className='container'>
          <div className="row">
            <div className="col-sm-12 inputs">
              <label htmlFor="w-height">Your Height</label>
              <input placeholder='175' type="number" id='w-height' value={height} onChange={(e) => setHeight(e.target.value)} />

              <label htmlFor="w-neck">Your neck width (the widest)</label>
              <input placeholder='35' type="number" id='w-neck' value={neck} onChange={(e) => setNeck(e.target.value)} />

              <label htmlFor="w-waist">Your waist circumference (the thinnest)</label>
              <input placeholder='85' type="number" id='w-waist' value={waist} onChange={(e) => setWaist(e.target.value)} />

              <label htmlFor="w-hip">Your hip circumference (the widest)</label>
              <input placeholder='95' type="number" id='w-hip' value={hip} onChange={(e) => setHip(e.target.value)} />

              <label htmlFor="w-weight">Your weight</label>
              <input placeholder='85' type="number" id='w-weight' value={weight} onChange={(e) => setWeight(e.target.value)} />

              <button className="btn btn-primary mt-3" onClick={() => { CalcWoman(); CalcBMI(); }}>Calculate</button> <br />
              {bodyFat && <div className='mt-3'>Your Body fat is {bodyFat}% <br /><div>Your BMI is: {bmi}<br /><div>{status}</div></div></div>}
            </div>
          </div>
        </div>)
        : <div>{/* gender yoksa boş div */}</div>
      }

    </div>
  );
}

export default App;
