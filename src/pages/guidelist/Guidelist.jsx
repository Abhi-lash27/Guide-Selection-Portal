import { useEffect, useState } from "react";
import axios from "axios";

import Header from "../../components/common/heading/Header";

import "../guidelist/Guidelist.css";
import * as ReactBootStrap from "react-bootstrap";

const GuideList = () => {

  const [guides, setGuides] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/staffs`);
      const data = res.data.staff
      console.log(data);
      setGuides(data);
      setLoading(true);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  console.log(guides);

    return (
      <>
      <div className="body-guidelist"></div>
      <Header />
        <h2 className="title-guidelist">Guides</h2>
        {loading ?  <div className="guides-guidelist">
          {guides.map((guide) => {
            return <Guide {...guide} key={guide.id}></Guide>;
          })}
        </div> : 
        <div  style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <ReactBootStrap.Spinner animation="border" variant="light" />
        </div>
        }
      </>
    );
  };

  const Guide = (props) => {
    const { profileImg, fullName, specializations, id} = props;
    return (
      <>
        <div className="guide-guidelist" id={id} >
          <img src={profileImg} alt={name}></img>
          <h2 id="s-name-guidelist">{fullName}</h2>
          <h2 id="s-desc-guidelist">{specializations}</h2>
        </div>
      </>
    );
  };

  export default GuideList;