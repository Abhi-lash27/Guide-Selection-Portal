import { useEffect, useState } from "react";
import axios from "axios";

import Header from "../../components/common/heading/Header";

import "../guidelist/Guidelist.css";
import Subhashini from '../../images/subhashini.jpg'

// const Guides = [
//     {
//       profileImg: Subhashini,
//       fullName: "Dr.R.Subhashini",
//       specializations: "AI, Machine Learning, Deep Learning",
//       id: 1,
//     },
// ]

const GuideList = () => {

  const [guides, setGuides] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get('http://localhost:7777/api/staffs');
      const data = res.data.staff
      console.log(data);
      setGuides(data);
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
        <div className="guides-guidelist">
          {guides.map((guide) => {
            return <Guide {...guide} key={guide.id}></Guide>;
          })}
        </div>
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

  export default GuideList;