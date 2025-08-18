import Link from 'next/link';
import { IconType } from 'react-icons';

interface ToolCardProps {
    title: string;
    description: string;
    icon: IconType;
    iconColor: string;
    bgColor: string;
    href: string;
}

const ToolCard: React.FC<ToolCardProps> = ({ title, description, icon: Icon, iconColor, bgColor, href }) => {
    return (
        <Link href={href}>
            <div className={`p-6 rounded-xl shadow-lg transition-transform transform hover:scale-105 cursor-pointer flex flex-col items-center text-center ${bgColor}`}>
                <div className={`text-5xl mb-4 ${iconColor}`}>
                    <Icon />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
                <p className="text-sm text-gray-600">{description}</p>
            </div>
        </Link>
    );
};

export default ToolCard;
