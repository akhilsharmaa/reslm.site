import UploadObject from "./UploadFileView"; 
import GetAllFilesView from "./GetAllFilesView"

export default function UploadView() { 

    return (  
        <div className="p-10">
            <UploadObject/>
            <GetAllFilesView/>
        </div>  
    );
}
