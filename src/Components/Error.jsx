import React from 'react'
import {Result, Button} from 'antd'
import { useNavigate } from 'react-router-dom';

function Error() {
  const navigate = useNavigate()
  const style = {
    width: '100%',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  }
  return (
   <div>
     <Result
     style={style}
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={<Button type="primary" onClick={()=> navigate('/login')}>Back Home</Button>}
    />
   </div>
  );
}

export default Error