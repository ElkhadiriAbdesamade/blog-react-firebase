import {AiOutlineLoading3Quarters} from 'react-icons/ai'

const Loading = () => {
    return (
        <div>
            <div className="text-center pt-4 lg:px-4 mb-4">
                <div className="p-2 bg-purple-500 items-center text-indigo-100 leading-none lg:rounded-full flex lg:inline-flex" role="alert">
                    <span className="flex rounded-full bg-purple-700 uppercase px-2 py-1 text-xs font-bold mr-3">
                    <AiOutlineLoading3Quarters  className='animate-spin h-5 w-5 mr-3'/>
                        Loading 
                    </span>
                    <span className="font-semibold mr-2 text-left flex-auto">Pleas Wait</span>
                    
                </div>
               
            </div>
        </div>
    );
}

export default Loading;