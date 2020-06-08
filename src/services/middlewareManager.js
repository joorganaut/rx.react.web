import Axios from 'axios';
class MiddlewareManager{
    async PostData(url, data) {
        let result = {};
        let error = {};
        await Axios.post(url, data)
            .then(res => {
                result = res;
            }).catch(err=>{
                error = err;
            })
            return {result, error};
    }
    
}
export default MiddlewareManager;