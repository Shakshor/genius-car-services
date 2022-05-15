import useServices from '../../hooks/useServices';

const ManageServices = () => {
    // load data from custom hook
    const [services, setServices] = useServices();


    // For Delete a service
    const handleDelete = id => {
        const proceed = window.confirm('Are you sure?');
        if (proceed) {
            const url = `https://ancient-bastion-68064.herokuapp.com/service/${id}`;
            fetch(url, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    const remaining = services.filter(service => service._id !== id);
                    setServices(remaining);
                });
        }
    }

    return (
        <div className='w-50 mx-auto'>
            <h2>Manage your services</h2>
            {
                services.map(service => <div key={service._id}>
                    <h5>{service.name}<button onClick={() => handleDelete(service._id)}>X</button></h5>

                </div>)
            }
        </div>
    );
};

export default ManageServices;