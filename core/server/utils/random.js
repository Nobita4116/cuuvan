module.exports = {
    generateRandomString(l = 10) {
        let chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let charsLength = chars.length;
        let string = '';
    
          for(let i=0; i<l; i++)
              string += chars.charAt(Math.floor(Math.random() * charsLength));
    
          return string;
    },

    generateRandomCode(l = 10) {
        let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let charsLength = chars.length;
        let string = '';
    
          for(let i=0; i<l; i++)
              string += chars.charAt(Math.floor(Math.random() * charsLength));
    
          return string;
    }
}