interface HeadingProps {
    title: string;
    version: string;
    openapi: string;
  }
  
  export const Heading: React.FC<HeadingProps> = ({ title, version, openapi }) => {
    return (
      <div>
        <h2 className="text-slate-900 text-3xl font-semibold tracking-tight ">{title}</h2>
        <div className="flex items-start justify-between">
            <p className=" text-slate-500 text-sm font-normal text-muted-foreground pt-2">Version: {version}</p>
            <p className=" text-slate-500 text-sm font-normal text-muted-foreground pt-2 ml-8">OpenAPI: {openapi}</p>
        </div>
      </div>
    );
  };
  