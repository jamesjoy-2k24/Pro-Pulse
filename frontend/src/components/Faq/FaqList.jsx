import {faq} from "../../assets/data/faq";
import FaqItem from "./FaqItem";

const FaqList = () => {
    return (
        <ul className="mt-[38px]">
            {faq.map((item, index) => (
                <FaqItem item={item} key={index} />
            ))}
        </ul>
    );
};

export default FaqList;