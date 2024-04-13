import React, { useEffect, useState } from 'react'
import OrganisationsPosts from './OrganisationsPosts'
import { Text } from '@chakra-ui/react'
import axios from "axios";
import { BarLoader } from "react-spinners";


function Organisations() {
    document.title = "Community Connect - Non-Profit Organizations"

    const [data, setData] = useState([]);
    useEffect(() => {
        axios
            .get("https://community-connect-wbs6.vercel.app/orgs")
            .then((data) => {
                setData(data.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <div className='organisations-parent flex'>
            <div style={{ textAlign: "center" }}>
                <Text fontSize='5xl' fontWeight="800" color="#0959aa">Organisations</Text>
                <br />
                <Text fontSize='xl' fontStyle="italic">Organisations registered with us!</Text>
            </div>
            <div className="flex" style={{ justifyContent: "center", gap: "2rem" }}>
                {data.length === 0 ? (
                    <BarLoader color='#0959aa' />
                ) : (
                    <>
                        {data.map((e, i) => {
                            return (<OrganisationsPosts listing={data[i]} key={i} />)
                        })}
                    </>
                )}
            </div>
        </div>
    )
}

export default Organisations;
