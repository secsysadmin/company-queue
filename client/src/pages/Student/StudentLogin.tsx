import Banner from "../../components/Banner";
import { Input, Select, Button } from '@chakra-ui/react';

export default function StudentLogin() {
    return (
        <div style={{display:"flex", flexDirection: 'column', alignItems:'center'}}>
            <Banner title="Queue Login"></Banner>
            {/*@ts-ignore*/}
            <div style={loginFormStyle}>
                <Input style={{marginBottom: '1em'}} placeholder="Phone Number" variant='filled'></Input>
                <Select placeholder='Major' variant='filled' style={{marginBottom: '1em'}}>
                    <option value="CSCE">CSCE</option>  
                </Select>
                <Button backgroundColor='red.900' color='white'>Join Queue</Button>
            </div>
        </div>
    );
}

const loginFormStyle = {
    marginTop: '5%',
    width: '75vw',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems:'center',
}