interface HeadingProps {
    title: string;
    description: string;
  }
  
  export const Heading: React.FC<HeadingProps> = ({ title, description }) => {
    return (
      <div>
        <h2 className="text-slate-900 text-3xl font-semibold  tracking-tight ">{title}</h2>
        <p className=" text-slate-500 text-sm font-normal  text-muted-foreground pt-2">{description}</p>
      </div>
    );
  };
  