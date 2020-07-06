class Auth {
    constructor(){
        this.authenticated = false;
    }

    login(){
        this.authenticated = true;
    }

    logout(){
        this.authenticated = false;
    }

    isAuthenticated(){
        const token = localStorage.getItem('token');
        if(token){
            return true;
        }else{
            return false;
        }
        
    }

}

export default new Auth();