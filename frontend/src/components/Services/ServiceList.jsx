import {services} from "../../assets/data/services"
import ServiceCard from "./ServiceCard"

const ServiceList = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-[30px] mt-[30px] ">
            {services.map((item, index ) => (
                <ServiceCard key={index} service={item} />
                
            ))}
        </div>
    )
}

export default ServiceList