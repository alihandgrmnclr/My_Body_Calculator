import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { useState } from "react"

function App() {

  // https://www.omnicalculator.com/health/navy-body-fat

  const [gender, setGender] = useState("");
  const [neck, setNeck] = useState("");
  const [waist, setWaist] = useState("");
  const [height, setHeight] = useState("");
  const [hip, setHip] = useState("");
  const [bodyFat, setBodyFat] = useState("");

  const CalcMan = () => {
    const BodyFat = (495 / (1.0324 - 0.19077 * Math.log10((+waist) - (+neck)) + 0.15456 * Math.log10(height)) - 450).toFixed(2);  // number'a çevirmek için "+" koyduk (veri string olarak geliyor)
    setBodyFat(BodyFat);
  };

  const CalcWoman = () => {
    const BodyFat = (495 / (1.29579 - 0.35004 * Math.log10((+waist) + (+hip) - (+neck)) + 0.22100 * Math.log10(height)) - 450).toFixed(2);  // number'a çevirmek için "+" koyduk (veri string olarak geliyor)
    setBodyFat(BodyFat);
  };

  return (
    <div className="App">
      <h1>Welcome To My Body Calculator</h1>
      <div className="container mt-5">
        <div className="row">
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

      {gender ? (gender === "male" ?
        <div className="container">
          <div className="row">
            <div className="col-sm-12 justify-content-center">
              <div>
                <span>Your Height </span>
                <input placeholder='175' type="number" value={height} onChange={(e) => setHeight(e.target.value)} /> </div>
              <div>
                <span>Your neck width (the widest)</span>
                <input placeholder='35' type="number" value={neck} onChange={(e) => setNeck(e.target.value)} />
              </div>
              <div>
                <span>Your waist circumference (the thinnest)</span>
                <input placeholder='85' type="number" value={waist} onChange={(e) => setWaist(e.target.value)} />
              </div>
              <button className="btn btn-primary mt-3" onClick={() => CalcMan()}>Calculate</button>
              {bodyFat && <div className='mt-3'>Your Body fat is {bodyFat}%</div>}

            </div>
          </div>
        </div>
        :
        <div>
          <div className="col-sm-12 justify-content-center">
            <div>
              <span>Your Height </span>
              <input placeholder='175' type="number" value={height} onChange={(e) => setHeight(e.target.value)} /> </div>
            <div>
              <span>Your neck width (the widest)</span>
              <input placeholder='35' type="number" value={neck} onChange={(e) => setNeck(e.target.value)} />
            </div>
            <div>
              <span>Your waist circumference (the thinnest)</span>
              <input placeholder='85' type="number" value={waist} onChange={(e) => setWaist(e.target.value)} />
            </div>
            <div>
              <span>Your hip circumference (the widest)</span>
              <input placeholder='95' type="number" value={hip} onChange={(e) => setHip(e.target.value)} />
            </div>
            <button className="btn btn-primary mt-3" onClick={() => CalcWoman()}>Calculate</button>
            {bodyFat && <div className='mt-3'>Your Body fat is {bodyFat}%</div>}

          </div>
        </div>)
        : <div>{/* gender yoksa boş div */}</div>
      }

    </div>
  );
}

export default App;
