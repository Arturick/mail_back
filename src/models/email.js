const fs = require('fs')


const email = {
    check: async (email) => {
        let bd = fs.readFileSync(__dirname+'/bd.json');
        bd = JSON.parse(bd)

        if(email in bd){
            if(Date.now() - Number(bd[email])< 100000){
                return false
                console.log(email)
            }
        }
        bd[email] = Date.now();
        bd = JSON.stringify(bd)

        fs.writeFileSync(__dirname+'/bd.json', bd);
        return true;
    }
}


module.exports = email;