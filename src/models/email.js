const fs = require('fs')


const email = {
    check: async (email) => {
        let bd = fs.readFileSync('D:\\Work\\avito-node\\server\\src\\models\\bd.json');
        bd = JSON.parse(bd)

        if(email in bd){
            if(Date.now() - Number(bd[email])< 100000){
                return false
            }
        }
        bd[email] = Date.now();
        bd = JSON.stringify(bd)

        fs.writeFileSync('D:\\Work\\avito-node\\server\\src\\models\\bd.json', bd);
        return true;
    }
}


module.exports = email;