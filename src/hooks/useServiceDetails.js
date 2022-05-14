import { useEffect, useState } from "react";

const useServiceDetail = serviceId => {
    // using state for server info
    const [service, setService] = useState({});

    // load the service data from single api backend server 
    useEffect(() => {
        const url = `http://localhost:5000/service/${serviceId}`;
        console.log(url);
        fetch(url)
            .then(res => res.json())
            .then(data => setService(data));
    }, [serviceId]);
    return [service];
}

export default useServiceDetail;