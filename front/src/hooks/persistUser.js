export default function persistUser(context,setContext,localStorage){
    if (localStorage) {
      setContext({
        ...context, userImage:localStorage.userImage , config: {
          headers: {
            "Authorization": `Bearer ${localStorage.token}`
          }
        }
      });
    } 
}