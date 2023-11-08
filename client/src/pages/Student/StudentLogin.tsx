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
                    <option value="AERO">AERO</option>
                    <option value="AREN">CSCE</option>          
                    <option value="BAEN">BAEN</option>
                    <option value="BMEN">BMEN</option>
                    <option value="CHEN">CHEN</option>
                    <option value="CVEN">CVEN</option>          
                    <option value="CSCE">CSCE</option>
                    <option value="CPEN">CPEN</option>
                    <option value="ECEN">ECEN</option>     
                    <option value="EVEN">EVEN</option>
                    <option value="ESET">ESET</option>
                    <option value="ISEN">ISEN</option>  
                    <option value="IDIS">IDIS</option>
                    <option value="MSEN">MSEN</option>
                    <option value="MEEN">MEEN</option>
                    <option value="NUEN">NUEN</option>    
                    <option value="OCEN">OCEN</option>
                    <option value="PETE">PETE</option>
                    {/* These disabled options exist so someone can scroll 
                    to the bottom of the list without it cuttign off*/}
                    <option disabled={true} value="NO"></option>
                    <option disabled={true} value="NO"></option>
                    <option disabled={true} value="NO"></option>          
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