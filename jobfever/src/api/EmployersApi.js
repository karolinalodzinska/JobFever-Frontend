import axios from "axios";
import {useEffect, useState} from "react";

const url = "http://localhost:8080/api/employers/";

export const createEmployer = async(userData) =>{
    return await axios.post(url, userData);
}

export const useEmployerById = (id) => {
    const [employer, setEmployer] = useState({});
    const [loading, setLoading] = useState(true);
    console.log(id)

    useEffect(() => {
    const fetchData = async () => {
        try {
            const { data: response } = await axios.get(url, {params:{id:id}});
            setEmployer(response);
        } catch (error) {
            console.error(error)
        }
        setLoading(false);
    };

    fetchData();
}, []);

return {
    data: employer,
    loading,
};
};
export async function editEmployer(id, companyName, nameAndSurname, phoneNumber, localization, aboutUs) {
    if (!aboutUs){
    await axios.put(url, {
        companyName: companyName,
        nameAndSurname: nameAndSurname,
        phoneNumber: parseInt(phoneNumber),
        localization: localization
    },
        {
            params:{id:id}
        });}
    else{
        await axios.put(url, {
            aboutUs: aboutUs
            },
            {
                params:{id:id}
            });
    }

}