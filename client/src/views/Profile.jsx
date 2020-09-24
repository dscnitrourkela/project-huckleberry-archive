import React,{useEffect,useState} from 'react';
import axios from 'axios';

import Card from '../components/Card';

function Profile(props) {
  const [profile,setProfile]=useState({});
  
  useEffect(()=>{        
    const uuid=localStorage.getItem('uuid')
    if(uuid){
      axios.get( 
        "https://badges.dscnitrourkela.tech/api/badges/collection/"+uuid
      ).then((res)=>{
        console.log(res.data);
        setProfile(res.data);
        
      })
    }
    

  },[]);
  return (
    <div>
      <h1>Profile</h1>
      <h2>Email : {profile.email}</h2>
      {profile.badges!==undefined?profile.badges.map((each,index)=>(
        <Card image={each.image} name={each.name}  key={index}>badge</Card>
      )):<h2>No badges</h2>}
    </div>
  );
}

export default Profile;
